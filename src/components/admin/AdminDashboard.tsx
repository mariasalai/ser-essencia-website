import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ProductsManager } from './ProductsManager';
import { CouponsManager } from './CouponsManager';
import { CategoriesManager } from './CategoriesManager';
import { OrdersManager } from './OrdersManager';
import { DashboardStats } from './DashboardStats';
import { DataMigration } from './DataMigration';
import { LogOut, Package, Ticket, FolderOpen, ShoppingCart, BarChart3, Database } from 'lucide-react';

export const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Ser Essência - Admin</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Cupons
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="migration" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Migração
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h2>
                <p className="text-muted-foreground">
                  Visão geral do seu catálogo e vendas
                </p>
              </div>
              <DashboardStats />
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Produtos</h2>
                <p className="text-muted-foreground">
                  Gerencie seu catálogo de produtos
                </p>
              </div>
              <ProductsManager />
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Categorias</h2>
                <p className="text-muted-foreground">
                  Organize seus produtos por categorias
                </p>
              </div>
              <CategoriesManager />
            </div>
          </TabsContent>

          <TabsContent value="coupons" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Cupons</h2>
                <p className="text-muted-foreground">
                  Crie e gerencie cupons de desconto e brindes
                </p>
              </div>
              <CouponsManager />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Pedidos</h2>
                <p className="text-muted-foreground">
                  Acompanhe e gerencie os pedidos
                </p>
              </div>
              <OrdersManager />
            </div>
          </TabsContent>

          <TabsContent value="migration" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Migração de Dados</h2>
                <p className="text-muted-foreground">
                  Migre os dados existentes para o banco de dados
                </p>
              </div>
              <DataMigration />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};