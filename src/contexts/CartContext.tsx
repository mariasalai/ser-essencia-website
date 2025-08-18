import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';
import { Coupon, validateCoupon } from '@/data/coupons';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getDiscountAmount: () => number;
  getFinalPrice: () => number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro do CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const applyCoupon = (code: string) => {
    const coupon = validateCoupon(code);
    if (!coupon) {
      return { success: false, message: 'Cupom inválido ou expirado' };
    }

    setAppliedCoupon(coupon);

    // Se for brinde, adiciona o produto grátis ao carrinho
    if (coupon.type === 'gift' && coupon.giftProduct) {
      const giftProduct: Product = {
        id: `gift-${Date.now()}`,
        name: coupon.giftProduct.name,
        description: coupon.giftProduct.description || 'Produto brinde',
        price: 0,
        image: '', // Produto brinde sem imagem
        images: [],
        category: ['brinde'],
        featured: false,
        inStock: true
      };
      
      // Verifica se o brinde já não foi adicionado
      const existingGift = items.find(item => item.product.category.includes('brinde'));
      if (!existingGift) {
        addToCart(giftProduct, 1);
      }
    }

    return { 
      success: true, 
      message: coupon.type === 'discount' 
        ? `Cupom aplicado! Desconto de ${coupon.discount}%` 
        : `Cupom aplicado! Brinde adicionado: ${coupon.giftProduct?.name}`
    };
  };

  const removeCoupon = () => {
    if (appliedCoupon?.type === 'gift') {
      // Remove produtos brinde do carrinho
      setItems(prevItems => prevItems.filter(item => !item.product.category.includes('brinde')));
    }
    setAppliedCoupon(null);
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon || appliedCoupon.type !== 'discount') return 0;
    const subtotal = getTotalPrice();
    return (subtotal * (appliedCoupon.discount || 0)) / 100;
  };

  const getFinalPrice = () => {
    const subtotal = getTotalPrice();
    const discount = getDiscountAmount();
    return subtotal - discount;
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getFinalPrice,
    isOpen,
    setIsOpen,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};