import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle, Ticket, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export const CartTrigger: React.FC = () => {
  const { getTotalItems, setIsOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsOpen(true)}
      className="relative border-nature/20 hover:border-nature hover:bg-nature/5"
    >
      <ShoppingCart className="h-4 w-4" />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-nature text-primary-foreground text-xs">
          {totalItems}
        </Badge>
      )}
    </Button>
  );
};

export const Cart: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    getFinalPrice,
    getDiscountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart, 
    isOpen, 
    setIsOpen 
  } = useCart();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const result = applyCoupon(couponCode);
    if (result.success) {
      toast({
        title: "Cupom aplicado!",
        description: result.message,
      });
      setCouponCode('');
      setShowCouponInput(false);
    } else {
      toast({
        title: "Erro",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Cupom removido",
      description: "O cupom foi removido do seu carrinho",
    });
  };

  const sendToWhatsApp = () => {
    if (items.length === 0) return;

    let message = "🌿 *Pedido Ser Essência* 🌿\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      if (item.product.price > 0) {
        message += `   Preço unitário: R$ ${item.product.price.toFixed(2)}\n`;
        message += `   Subtotal: R$ ${(item.product.price * item.quantity).toFixed(2)}\n\n`;
      } else {
        message += `   🎁 *BRINDE*\n\n`;
      }
    });

    const subtotal = getTotalPrice();
    message += `💵 *Subtotal: R$ ${subtotal.toFixed(2)}*\n`;
    
    if (appliedCoupon) {
      if (appliedCoupon.type === 'discount') {
        const discount = getDiscountAmount();
        message += `🎟️ *Cupom ${appliedCoupon.code}: -R$ ${discount.toFixed(2)} (${appliedCoupon.discount}%)*\n`;
        message += `💰 *Total: R$ ${getFinalPrice().toFixed(2)}*\n\n`;
      } else {
        message += `🎁 *Cupom ${appliedCoupon.code}: Brinde incluído*\n`;
        message += `💰 *Total: R$ ${getFinalPrice().toFixed(2)}*\n\n`;
      }
    } else {
      message += `💰 *Total: R$ ${getFinalPrice().toFixed(2)}*\n\n`;
    }
    
    message += "Gostaria de finalizar este pedido! 😊";

    const whatsappUrl = `https://wa.me/5547999382587?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrinho de compras
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8 ml-auto"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                {/* Seção do Cupom */}
                <div className="space-y-2">
                  {!appliedCoupon ? (
                    <>
                      {!showCouponInput ? (
                        <Button
                          variant="outline"
                          onClick={() => setShowCouponInput(true)}
                          className="w-full"
                        >
                          <Ticket className="h-4 w-4 mr-2" />
                          Aplicar cupom
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Digite o código do cupom"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                            className="flex-1"
                          />
                          <Button onClick={handleApplyCoupon} size="sm">
                            Aplicar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setShowCouponInput(false);
                              setCouponCode('');
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {appliedCoupon.code} aplicado
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Cálculos do Carrinho */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  {appliedCoupon && appliedCoupon.type === 'discount' && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Desconto ({appliedCoupon.discount}%):</span>
                      <span>-{formatPrice(getDiscountAmount())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{formatPrice(getFinalPrice())}</span>
                  </div>
                  <div className="text-sm text-gray-600 text-right -mt-2">Frete a combinar</div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={sendToWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar para WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full"
                  >
                    Limpar carrinho
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};