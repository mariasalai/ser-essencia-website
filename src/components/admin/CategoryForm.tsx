import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: any;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ isOpen, onClose, onSuccess, category }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    active: true
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name || '',
          description: category.description || '',
          slug: category.slug || '',
          active: category.active ?? true
        });
      } else {
        setFormData({
          name: '',
          description: '',
          slug: '',
          active: true
        });
      }
    }
  }, [isOpen, category]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = {
        name: formData.name,
        description: formData.description || null,
        slug: formData.slug || generateSlug(formData.name),
        active: formData.active
      };

      let error;
      if (category) {
        ({ error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', category.id));
      } else {
        ({ error } = await supabase
          .from('categories')
          .insert([categoryData]));
      }

      if (error) throw error;

      toast({
        title: category ? "Categoria atualizada!" : "Categoria criada!",
        description: "As alterações foram salvas com sucesso."
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Erro ao salvar categoria",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-amigavel"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL amigável para a categoria (gerado automaticamente)
            </p>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Descrição da categoria"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                className="mr-2"
              />
              Categoria ativa
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : category ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};