import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Package, Ticket, FolderOpen, ShoppingCart, TrendingUp, Users } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalCoupons: number;
  totalOrders: number;
  totalRevenue: number;
  activeProducts: number;
}

export const DashboardStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCategories: 0,
    totalCoupons: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products stats
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('id, in_stock');
        
        // Fetch categories count
        const { count: categoriesCount, error: categoriesError } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true });

        // Fetch coupons count
        const { count: couponsCount, error: couponsError } = await supabase
          .from('coupons')
          .select('*', { count: 'exact', head: true });

        // Fetch orders stats
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('total_amount');

        if (productsError || categoriesError || couponsError || ordersError) {
          console.error('Error fetching stats:', { productsError, categoriesError, couponsError, ordersError });
          return;
        }

        const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
        const activeProducts = products?.filter(p => p.in_stock).length || 0;

        setStats({
          totalProducts: products?.length || 0,
          totalCategories: categoriesCount || 0,
          totalCoupons: couponsCount || 0,
          totalOrders: orders?.length || 0,
          totalRevenue,
          activeProducts
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      description: `${stats.activeProducts} em estoque`,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Categorias',
      value: stats.totalCategories,
      description: 'Categorias ativas',
      icon: FolderOpen,
      color: 'text-green-600'
    },
    {
      title: 'Cupons',
      value: stats.totalCoupons,
      description: 'Cupons cadastrados',
      icon: Ticket,
      color: 'text-purple-600'
    },
    {
      title: 'Pedidos',
      value: stats.totalOrders,
      description: 'Total de pedidos',
      icon: ShoppingCart,
      color: 'text-orange-600'
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      description: 'Faturamento total',
      icon: TrendingUp,
      color: 'text-emerald-600'
    }
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-muted rounded w-24 animate-pulse" />
              </CardTitle>
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 animate-pulse mb-1" />
              <div className="h-3 bg-muted rounded w-20 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};