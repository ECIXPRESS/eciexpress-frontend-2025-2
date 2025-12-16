export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  maxQuantity?: number;
}

export interface CartSummary {
  subtotal: number;
  discounts: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  summary: CartSummary;
}

export type CartTab = 'carrito' | 'pago' | 'detalles';