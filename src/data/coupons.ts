export interface Coupon {
  code: string;
  type: 'discount' | 'gift';
  discount?: number; // Percentual de desconto (ex: 10 para 10%)
  giftProduct?: {
    name: string;
    description?: string;
  };
  active: boolean;
}

export const coupons: Coupon[] = [
  {
    code: '10OFF',
    type: 'discount',
    discount: 10,
    active: true
  },
  {
    code: 'ESSENCIA',
    type: 'discount',
    discount: 20,
    active: true
  },
  {
    code: 'PRIMEIRACOMPRA',
    type: 'gift',
    giftProduct: {
      name: 'Escalda Pés Relaxar 50g',
      description: 'Brinde especial para primeira compra'
    },
    active: true
  }
];

export const validateCoupon = (code: string): Coupon | null => {
  const normalizedCode = code.trim().toUpperCase();
  const coupon = coupons.find(c => 
    c.code.toUpperCase() === normalizedCode && c.active
  );
  return coupon || null;
};