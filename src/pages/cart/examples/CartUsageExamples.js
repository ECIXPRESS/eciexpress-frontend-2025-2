import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Ejemplo de uso del carrito desde cualquier componente
 * Copia este código en tus componentes Home, Store, ProductDetail, etc.
 */
import { useCart } from '@/pages/cart/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
// ============================================
// EJEMPLO 1: Botón simple para agregar al carrito
// ============================================
export function EjemploBotonSimple() {
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        addToCart({
            productId: 'producto-123', // ID único del producto
            name: 'Hamburguesa Clásica',
            description: 'Hamburguesa con queso y papas',
            price: 15000,
            imageUrl: 'url-de-la-imagen.jpg',
            maxQuantity: 10
        }, 1); // Cantidad (opcional, default es 1)
        toast.success('Producto agregado al carrito');
    };
    return (_jsxs("button", { onClick: handleAddToCart, className: "bg-blue-500 text-white px-4 py-2 rounded", children: [_jsx(ShoppingCart, { className: "w-5 h-5" }), "Agregar al carrito"] }));
}
export function ProductCardExample({ product }) {
    const { addToCart } = useCart();
    const handleAdd = () => {
        addToCart({
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            maxQuantity: 99
        });
        toast.success(`${product.name} agregado al carrito`, {
            position: 'bottom-right',
            autoClose: 2000
        });
    };
    return (_jsxs("div", { className: "border rounded-lg p-4", children: [_jsx("img", { src: product.imageUrl, alt: product.name, className: "w-full h-48 object-cover rounded" }), _jsx("h3", { className: "font-bold mt-2", children: product.name }), _jsx("p", { className: "text-gray-600 text-sm", children: product.description }), _jsxs("div", { className: "flex items-center justify-between mt-4", children: [_jsxs("span", { className: "text-lg font-bold", children: ["$", product.price.toLocaleString()] }), _jsx("button", { onClick: handleAdd, className: "bg-[#5AC7E1] text-white px-4 py-2 rounded-lg hover:bg-[#4ab5cf]", children: "Agregar" })] })] }));
}
// ============================================
// EJEMPLO 3: Página completa con productos
// ============================================
export function ExampleProductPage() {
    const { addToCart, cart } = useCart();
    const productos = [
        { id: '1', name: 'Pizza', description: 'Pizza de queso', price: 25000, imageUrl: '/pizza.jpg' },
        { id: '2', name: 'Hamburguesa', description: 'Hamburguesa clásica', price: 15000, imageUrl: '/burger.jpg' },
    ];
    const handleAddProduct = (product) => {
        addToCart({
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            maxQuantity: 20
        });
        toast.success('Agregado al carrito');
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "Productos disponibles" }), _jsxs("p", { children: ["Items en carrito: ", cart.items.length] }), _jsx("div", { className: "grid grid-cols-3 gap-4", children: productos.map(producto => (_jsxs("div", { children: [_jsx("img", { src: producto.imageUrl, alt: producto.name }), _jsx("h3", { children: producto.name }), _jsxs("button", { onClick: () => handleAddProduct(producto), children: ["Agregar $", producto.price.toLocaleString()] })] }, producto.id))) })] }));
}
