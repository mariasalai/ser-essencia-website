import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { products } from '@/data/products';
import { coupons } from '@/data/coupons';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Database } from 'lucide-react';

export const DataMigration = () => {
  const [migrationStatus, setMigrationStatus] = useState<{
    categories: 'pending' | 'running' | 'success' | 'error';
    products: 'pending' | 'running' | 'success' | 'error';
    coupons: 'pending' | 'running' | 'success' | 'error';
  }>({
    categories: 'pending',
    products: 'pending',
    coupons: 'pending'
  });
  
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const migrateCategories = async () => {
    setMigrationStatus(prev => ({ ...prev, categories: 'running' }));
    
    try {
      const categories = [
        { name: 'Banho e Corpo', description: 'Produtos para cuidados do corpo', slug: 'banho-corpo' },
        { name: 'Bem-estar', description: 'Produtos para relaxamento e bem-estar', slug: 'bem-estar' },
        { name: 'Aromaterapia', description: 'Óleos essenciais e produtos aromáticos', slug: 'aromaterapia' },
        { name: 'Cuidados Pessoais', description: 'Produtos para cuidados diários', slug: 'cuidados-pessoais' },
        { name: 'Tratamentos', description: 'Produtos para tratamentos específicos', slug: 'tratamentos' }
      ];

      for (const category of categories) {
        const { error } = await supabase
          .from('categories')
          .upsert(category, { onConflict: 'slug' });
        
        if (error) throw error;
      }

      setMigrationStatus(prev => ({ ...prev, categories: 'success' }));
      toast({ title: 'Categorias migradas com sucesso!' });
    } catch (error) {
      console.error('Error migrating categories:', error);
      setMigrationStatus(prev => ({ ...prev, categories: 'error' }));
      toast({ title: 'Erro ao migrar categorias', variant: 'destructive' });
    }
  };

  const migrateProducts = async () => {
    setMigrationStatus(prev => ({ ...prev, products: 'running' }));
    
    try {
      // First get category mappings
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, slug');
      
      const categoryMap = new Map(categoriesData?.map(cat => [cat.slug, cat.id]) || []);
      
      // Map old categories to new ones
      const categoryMapping: Record<string, string> = {
        'banho-corpo': 'banho-corpo',
        'bem-estar': 'bem-estar',
        'aromaterapia': 'aromaterapia',
        'cuidados-pessoais': 'cuidados-pessoais',
        'tratamentos': 'tratamentos'
      };

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        // Get the category string directly from the product
        const productCategory = product.category;
        const categorySlug = typeof productCategory === 'string' ? 
          (categoryMapping[productCategory] || 'cuidados-pessoais') : 'cuidados-pessoais';
        const categoryId = categoryMap.get(categorySlug);

        const productData = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          category_id: categoryId,
          featured: product.featured,
          ingredients: product.ingredients,
          benefits: product.benefits,
          how_to_use: product.howToUse,
          in_stock: product.inStock,
          stock_quantity: 100, // Default stock
          sku: `SKU-${product.id.substring(0, 8).toUpperCase()}`
        };

        const { error } = await supabase
          .from('products')
          .upsert(productData, { onConflict: 'id' });
        
        if (error) throw error;

        setProgress(((i + 1) / products.length) * 50 + 25);
      }

      setMigrationStatus(prev => ({ ...prev, products: 'success' }));
      toast({ title: 'Produtos migrados com sucesso!' });
    } catch (error) {
      console.error('Error migrating products:', error);
      setMigrationStatus(prev => ({ ...prev, products: 'error' }));
      toast({ title: 'Erro ao migrar produtos', variant: 'destructive' });
    }
  };

  const migrateCoupons = async () => {
    setMigrationStatus(prev => ({ ...prev, coupons: 'running' }));
    
    try {
      for (let i = 0; i < coupons.length; i++) {
        const coupon = coupons[i];
        
        const couponData = {
          code: coupon.code,
          type: coupon.type,
          discount_percentage: coupon.discount,
          gift_product_name: coupon.giftProduct?.name,
          gift_product_description: coupon.giftProduct?.description,
          active: coupon.active,
          usage_count: 0,
          max_usage: null,
          expires_at: null
        };

        const { error } = await supabase
          .from('coupons')
          .upsert(couponData, { onConflict: 'code' });
        
        if (error) throw error;

        setProgress(75 + ((i + 1) / coupons.length) * 25);
      }

      setMigrationStatus(prev => ({ ...prev, coupons: 'success' }));
      toast({ title: 'Cupons migrados com sucesso!' });
    } catch (error) {
      console.error('Error migrating coupons:', error);
      setMigrationStatus(prev => ({ ...prev, coupons: 'error' }));
      toast({ title: 'Erro ao migrar cupons', variant: 'destructive' });
    }
  };

  const runFullMigration = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Reset status
    setMigrationStatus({
      categories: 'pending',
      products: 'pending',
      coupons: 'pending'
    });

    try {
      await migrateCategories();
      setProgress(25);
      
      await migrateProducts();
      setProgress(75);
      
      await migrateCoupons();
      setProgress(100);
      
      toast({ 
        title: 'Migração completa!', 
        description: 'Todos os dados foram migrados com sucesso.' 
      });
    } catch (error) {
      toast({ 
        title: 'Erro na migração', 
        description: 'Ocorreu um erro durante a migração.',
        variant: 'destructive'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: typeof migrationStatus.categories) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'running':
        return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          Esta ferramenta irá migrar todos os dados hardcoded (produtos, categorias e cupons) 
          para o banco de dados Supabase. Execute apenas uma vez para evitar duplicações.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Status da Migração</CardTitle>
          <CardDescription>
            Acompanhe o progresso da migração de dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso geral</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(migrationStatus.categories)}
                <span className="font-medium">Categorias</span>
              </div>
              <span className="text-sm text-muted-foreground">5 categorias</span>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(migrationStatus.products)}
                <span className="font-medium">Produtos</span>
              </div>
              <span className="text-sm text-muted-foreground">{products.length} produtos</span>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(migrationStatus.coupons)}
                <span className="font-medium">Cupons</span>
              </div>
              <span className="text-sm text-muted-foreground">{coupons.length} cupons</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={runFullMigration} 
              disabled={isRunning}
              className="flex-1"
            >
              {isRunning ? 'Migrando...' : 'Executar Migração Completa'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};