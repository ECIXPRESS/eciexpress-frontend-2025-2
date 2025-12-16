import { jsx as _jsx } from "react/jsx-runtime";
/**
 * CartContext - Contexto global simple para el carrito de compras
 * Permite agregar productos desde Home, Store, ProductDetail, etc.
 */
import { createContext, useContext, useState } from 'react';
const CartContext = createContext(undefined);
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        items: [],
        summary: { subtotal: 0, discounts: 0, total: 0 }
    });
    const calculateSummary = (items) => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discounts = 0;
        const total = subtotal - discounts;
        return { subtotal, discounts, total };
    };
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.items.find(item => item.productId === product.productId);
            let newItems;
            if (existingItem) {
                newItems = prevCart.items.map(item => item.productId === product.productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item);
            }
            else {
                const newItem = {
                    ...product,
                    id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    quantity
                };
                newItems = [...prevCart.items, newItem];
            }
            return { items: newItems, summary: calculateSummary(newItems) };
        });
    };
    const updateQuantity = (itemId, quantity) => {
        setCart((prevCart) => {
            const newItems = prevCart.items.map(item => item.id === itemId
                ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxQuantity || 99)) }
                : item);
            return { items: newItems, summary: calculateSummary(newItems) };
        });
    };
    const removeItem = (itemId) => {
        setCart((prevCart) => {
            const newItems = prevCart.items.filter(item => item.id !== itemId);
            return { items: newItems, summary: calculateSummary(newItems) };
        });
    };
    const clearCart = () => {
        setCart({ items: [], summary: { subtotal: 0, discounts: 0, total: 0 } });
    };
    return (_jsx(CartContext.Provider, { value: { cart, addToCart, updateQuantity, removeItem, clearCart }, children: children }));
};
