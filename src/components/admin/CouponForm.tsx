import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CouponFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  coupon?: any;
}

export const CouponForm: React.FC<CouponFormProps> = ({ isOpen, onClose, onSuccess, coupon }) => {
  const [formData, setFormData] = useState({
    code: '',
    type: 'discount' as 'discount' | 'gift',
    discount_percentage: '',
    gift_product_name: '',
    gift_product_description: '',
    max_usage: '',
    expires_at: '',
    active: true
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (coupon) {
        setFormData({
          code: coupon.code || '',
          type: coupon.type || 'discount',
          discount_percentage: coupon.discount_percentage?.toString() || '',
          gift_product_name: coupon.gift_product_name || '',
          gift_product_description: coupon.gift_product_description || '',
          max_usage: coupon.max_usage?.toString() || '',
          expires_at: coupon.expires_at ? new Date(coupon.expires_at).toISOString().split('T')[0] : '',
          active: coupon.active ?? true
        });
      } else {
        setFormData({
          code: '',
          type: 'discount',
          discount_percentage: '',
          gift_product_name: '',
          gift_product_description: '',
          max_usage: '',
          expires_at: '',
          active: true
        });
      }
    }
  }, [isOpen, coupon]);

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const couponData = {
        code: formData.code.toUpperCase(),
        type: formData.type,
        discount_percentage: formData.type === 'discount' ? parseInt(formData.discount_percentage) || null : null,
        gift_product_name: formData.type === 'gift' ? formData.gift_product_name || null : null,
        gift_product_description: formData.type === 'gift' ? formData.gift_product_description || null : null,
        max_usage: formData.max_usage ? parseInt(formData.max_usage) : null,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        active: formData.active
      };

      let error;
      if (coupon) {
        ({ error } = await supabase
          .from('coupons')
          .update(couponData)
          .eq('id', coupon.id));
      } else {
        ({ error } = await supabase
          .from('coupons')
          .insert([couponData]));
      }

      if (error) throw error;

      toast({
        title: coupon ? "Cupom atualizado!" : "Cupom criado!",
        description: "As alterações foram salvas com sucesso."
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast({
        title: "Erro ao salvar cupom",
        description: error instanceof Error ? error.message : 'Erro desconhecido',
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
          <DialogTitle>{coupon ? 'Editar Cupom' : 'Novo Cupom'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="code">Código *</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                placeholder="Ex: DESCONTO10"
                required
              />
              <Button type="button" onClick={generateCode} variant="outline" size="sm">
                Gerar
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="type">Tipo *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'discount' | 'gift') => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Desconto</SelectItem>
                <SelectItem value="gift">Brinde</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'discount' && (
            <div>
              <Label htmlFor="discount_percentage">Percentual de Desconto *</Label>
              <Input
                id="discount_percentage"
                type="number"
                min="1"
                max="100"
                value={formData.discount_percentage}
                onChange={(e) => setFormData(prev => ({ ...prev, discount_percentage: e.target.value }))}
                placeholder="Ex: 10"
                required
              />
            </div>
          )}

          {formData.type === 'gift' && (
            <>
              <div>
                <Label htmlFor="gift_product_name">Nome do Brinde *</Label>
                <Input
                  id="gift_product_name"
                  value={formData.gift_product_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, gift_product_name: e.target.value }))}
                  placeholder="Ex: Escalda Pés Relaxar 50g"
                  required
                />
              </div>
              <div>
                <Label htmlFor="gift_product_description">Descrição do Brinde</Label>
                <Textarea
                  id="gift_product_description"
                  value={formData.gift_product_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, gift_product_description: e.target.value }))}
                  placeholder="Descrição do produto brinde"
                  rows={2}
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="max_usage">Limite de Uso</Label>
            <Input
              id="max_usage"
              type="number"
              min="1"
              value={formData.max_usage}
              onChange={(e) => setFormData(prev => ({ ...prev, max_usage: e.target.value }))}
              placeholder="Ex: 100 (deixe vazio para ilimitado)"
            />
          </div>

          <div>
            <Label htmlFor="expires_at">Data de Expiração</Label>
            <Input
              id="expires_at"
              type="date"
              value={formData.expires_at}
              onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
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
              Cupom ativo
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : coupon ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};