import { Cart, CartItem } from '../types/cart.types';

export const cartItemsMock: CartItem[] = [
  {
    id: 'cart-item-1',
    productId: 'combo-hamburguesa-deluxe',
    name: 'Combo Hamburguesa',
    description: 'Bebida 400 ml | Papas pequeñas',
    price: 15000,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    maxQuantity: 10
  },
  {
    id: 'cart-item-2',
    productId: 'te-hatsu',
    name: 'Té Hatsu',
    description: '',
    price: 5000,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    maxQuantity: 20
  },
  {
    id: 'cart-item-3',
    productId: 'chicles-trident',
    name: 'Chicles trident',
    description: '',
    price: 2500,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
    maxQuantity: 50
  }
];

// Simular funciones del controller
export const cartMockFunctions = {
  getCart: (): Cart => {
    const items = cartItemsMock;
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discounts = 0;
    const total = subtotal - discounts;

    return {
      items,
      summary: {
        subtotal,
        discounts,
        total
      }
    };
  },

  updateItemQuantity: (itemId: string, newQuantity: number): CartItem[] => {
    return cartItemsMock.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity || 99)) }
        : item
    );
  },

  removeItem: (itemId: string): CartItem[] => {
    return cartItemsMock.filter(item => item.id !== itemId);
  },

  clearCart: (): CartItem[] => {
    return [];
  }
};