import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSuccess, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    category_id: '',
    how_to_use: '',
    stock_quantity: '',
    in_stock: true,
    featured: false,
    ingredients: [] as string[],
    benefits: [] as string[],
    images: [] as string[]
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (product) {
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price?.toString() || '',
          sku: product.sku || '',
          category_id: product.category_id || '',
          how_to_use: product.how_to_use || '',
          stock_quantity: product.stock_quantity?.toString() || '',
          in_stock: product.in_stock ?? true,
          featured: product.featured ?? false,
          ingredients: product.ingredients || [],
          benefits: product.benefits || [],
          images: product.images || []
        });
      } else {
        setFormData({
          name: '',
          description: '',
          price: '',
          sku: '',
          category_id: '',
          how_to_use: '',
          stock_quantity: '',
          in_stock: true,
          featured: false,
          ingredients: [],
          benefits: [],
          images: []
        });
      }
    }
  }, [isOpen, product]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .eq('active', true)
      .order('name');
    
    if (data) setCategories(data);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const imageUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));

      toast({
        title: "Imagens enviadas com sucesso!"
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Erro ao enviar imagens",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        sku: formData.sku || null,
        category_id: formData.category_id || null,
        how_to_use: formData.how_to_use || null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        in_stock: formData.in_stock,
        featured: formData.featured,
        ingredients: formData.ingredients,
        benefits: formData.benefits,
        images: formData.images
      };

      let error;
      if (product) {
        ({ error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id));
      } else {
        ({ error } = await supabase
          .from('products')
          .insert([productData]));
      }

      if (error) throw error;

      toast({
        title: product ? "Produto atualizado!" : "Produto criado!",
        description: "As alterações foram salvas com sucesso."
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Erro ao salvar produto",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Preço *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock_quantity">Estoque</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="how_to_use">Como usar</Label>
            <Textarea
              id="how_to_use"
              value={formData.how_to_use}
              onChange={(e) => setFormData(prev => ({ ...prev, how_to_use: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label>Ingredientes</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Adicionar ingrediente"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
              />
              <Button type="button" onClick={addIngredient} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1">
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="ml-2 text-xs"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Benefícios</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Adicionar benefício"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
              />
              <Button type="button" onClick={addBenefit} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1">
                  {benefit}
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="ml-2 text-xs"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Imagens</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {uploading ? 'Enviando...' : 'Clique para selecionar imagens'}
                </span>
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Produto ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.in_stock}
                onChange={(e) => setFormData(prev => ({ ...prev, in_stock: e.target.checked }))}
                className="mr-2"
              />
              Em estoque
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="mr-2"
              />
              Produto destacado
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? 'Salvando...' : product ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};