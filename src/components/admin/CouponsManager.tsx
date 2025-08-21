import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Percent, Gift } from 'lucide-react';
import { CouponForm } from './CouponForm';

interface Coupon {
  id: string;
  code: string;
  type: 'discount' | 'gift';
  discount_percentage?: number;
  gift_product_name?: string;
  gift_product_description?: string;
  active: boolean;
  usage_count: number;
  max_usage?: number;
  expires_at?: string;
}

export const CouponsManager = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast({
        title: 'Erro ao carregar cupons',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cupom?')) return;

    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCoupons(coupons.filter(c => c.id !== id));
      toast({ title: 'Cupom excluído com sucesso!' });
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast({
        title: 'Erro ao excluir cupom',
        variant: 'destructive'
      });
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ active: !active })
        .eq('id', id);

      if (error) throw error;

      setCoupons(coupons.map(c => 
        c.id === id ? { ...c, active: !active } : c
      ));
      
      toast({ 
        title: `Cupom ${!active ? 'ativado' : 'desativado'}!` 
      });
    } catch (error) {
      console.error('Error updating coupon:', error);
      toast({
        title: 'Erro ao atualizar cupom',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCoupon(null);
  };

  const handleFormSuccess = () => {
    fetchCoupons();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Gerenciar Cupons</h3>
          <p className="text-sm text-muted-foreground">
            {coupons.length} cupons cadastrados
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Uso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div className="font-mono font-medium">
                      {coupon.code}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {coupon.type === 'discount' ? (
                        <Percent className="h-4 w-4 text-green-600" />
                      ) : (
                        <Gift className="h-4 w-4 text-purple-600" />
                      )}
                      <span>
                        {coupon.type === 'discount' ? 'Desconto' : 'Brinde'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {coupon.type === 'discount' ? (
                      <span>{coupon.discount_percentage}% OFF</span>
                    ) : (
                      <div>
                        <div className="font-medium">{coupon.gift_product_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {coupon.gift_product_description}
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{coupon.usage_count} usos</div>
                      {coupon.max_usage && (
                        <div className="text-muted-foreground">
                          Máx: {coupon.max_usage}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={coupon.active ? 'default' : 'secondary'}>
                      {coupon.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(coupon)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleActive(coupon.id, coupon.active)}
                      >
                        {coupon.active ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteCoupon(coupon.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CouponForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        coupon={editingCoupon}
      />
    </div>
  );
};