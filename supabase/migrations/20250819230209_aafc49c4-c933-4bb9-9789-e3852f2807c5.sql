-- Fase 1: Estrutura do Banco de Dados

-- Criar enum para tipos de cupom
CREATE TYPE coupon_type AS ENUM ('discount', 'gift');

-- Criar enum para status de pedido
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'completed', 'cancelled');

-- Criar tabela de categorias
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de produtos
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES public.categories(id),
  featured BOOLEAN DEFAULT false,
  ingredients TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  how_to_use TEXT,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de cupons
CREATE TABLE public.coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type coupon_type NOT NULL,
  discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  gift_product_name TEXT,
  gift_product_description TEXT,
  active BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  max_usage INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de pedidos
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total_amount DECIMAL(10,2) NOT NULL,
  coupon_id UUID REFERENCES public.coupons(id),
  coupon_discount DECIMAL(10,2) DEFAULT 0,
  status order_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Criar função para verificar se usuário é admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Políticas RLS para categories
CREATE POLICY "Categories são visíveis para todos" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Apenas admins podem inserir categories" ON public.categories
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem atualizar categories" ON public.categories
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem deletar categories" ON public.categories
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Políticas RLS para products
CREATE POLICY "Products são visíveis para todos" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Apenas admins podem inserir products" ON public.products
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem atualizar products" ON public.products
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem deletar products" ON public.products
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Políticas RLS para coupons
CREATE POLICY "Coupons são visíveis para todos" ON public.coupons
  FOR SELECT USING (true);

CREATE POLICY "Apenas admins podem inserir coupons" ON public.coupons
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem atualizar coupons" ON public.coupons
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem deletar coupons" ON public.coupons
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Políticas RLS para profiles
CREATE POLICY "Users podem ver seu próprio profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os profiles" ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Users podem criar seu próprio profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users podem atualizar seu próprio profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Apenas admins podem atualizar roles" ON public.profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));

-- Políticas RLS para orders
CREATE POLICY "Apenas admins podem ver orders" ON public.orders
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Qualquer um pode criar orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Apenas admins podem atualizar orders" ON public.orders
  FOR UPDATE USING (public.is_admin(auth.uid()));

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers para updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Criar função para criar profile automaticamente ao signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar profile automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Criar storage bucket para imagens dos produtos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

-- Políticas para storage de imagens
CREATE POLICY "Product images são visíveis para todos" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Apenas admins podem fazer upload de product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem atualizar product images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Apenas admins podem deletar product images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND public.is_admin(auth.uid()));