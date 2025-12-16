/**
 * CartContext - Contexto global simple para el carrito de compras
 * Permite agregar productos desde Home, Store, ProductDetail, etc.
 */
import { createContext, useContext, useState, ReactNode } from 'react';
import { Cart, CartItem } from '../types/cart.types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    summary: { subtotal: 0, discounts: 0, total: 0 }
  });

  const calculateSummary = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discounts = 0;
    const total = subtotal - discounts;
    return { subtotal, discounts, total };
  };

  const addToCart = (product: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(item => item.productId === product.productId);

      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...product,
          id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          quantity
        };
        newItems = [...prevCart.items, newItem];
      }

      return { items: newItems, summary: calculateSummary(newItems) };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxQuantity || 99)) }
          : item
      );
      return { items: newItems, summary: calculateSummary(newItems) };
    });
  };

  const removeItem = (itemId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      return { items: newItems, summary: calculateSummary(newItems) };
    });
  };

  const clearCart = () => {
    setCart({ items: [], summary: { subtotal: 0, discounts: 0, total: 0 } });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
