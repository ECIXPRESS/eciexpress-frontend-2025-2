import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Star, Clock, Package, ShoppingCart, AlertCircle } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { toast } from 'react-toastify';
/**
 * Componente de información del producto con opciones y selector de cantidad
 */
export default function ProductInfo({ product, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    // Validar que todas las opciones requeridas estén seleccionadas
    const allOptionsSelected = useMemo(() => {
        if (!product.options || product.options.length === 0)
            return true;
        return product.options.every(option => selectedOptions[option.id]);
    }, [product.options, selectedOptions]);
    // Calcular precio total
    const totalPrice = useMemo(() => {
        return product.price * quantity;
    }, [product.price, quantity]);
    const handleOptionChange = (optionId, value) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionId]: value
        }));
    };
    const handleAddToCart = () => {
        if (!allOptionsSelected) {
            toast.error('Por favor selecciona todas las opciones', {
                position: 'bottom-right',
                autoClose: 2000
            });
            return;
        }
        if (product.stock < quantity) {
            toast.error('No hay suficiente stock disponible', {
                position: 'bottom-right',
                autoClose: 2000
            });
            return;
        }
        onAddToCart(quantity, selectedOptions);
        toast.success(`${quantity} ${quantity > 1 ? 'productos agregados' : 'producto agregado'} al carrito`, {
            position: 'bottom-right',
            autoClose: 2000
        });
    };
    const stockStatus = useMemo(() => {
        if (product.stock === 0)
            return { text: 'Agotado', color: 'text-red-600 bg-red-50' };
        if (product.stock <= 5)
            return { text: `Últimas ${product.stock} unidades`, color: 'text-orange-600 bg-orange-50' };
        return { text: 'Disponible', color: 'text-green-600 bg-green-50' };
    }, [product.stock]);
    return (_jsxs("div", { className: "flex flex-col h-full", children: [product.tags && product.tags.length > 0 && (_jsx("div", { className: "flex gap-2 mb-4", children: product.tags.map((tag, index) => (_jsx("span", { className: "px-3 py-1 text-xs font-medium rounded-full bg-[#5AC7E1] text-white", children: tag }, index))) })), _jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#262626] mb-3", children: product.name }), _jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "flex items-center gap-1", children: [...Array(5)].map((_, index) => (_jsx(Star, { className: `w-5 h-5 ${index < Math.floor(product.rating)
                                ? 'fill-[#FDDF65] text-[#FDDF65]'
                                : 'fill-gray-200 text-gray-200'}` }, index))) }), _jsx("span", { className: "text-2xl font-bold text-[#262626]", children: product.rating }), _jsxs("span", { className: "text-sm text-gray-500", children: ["(", product.reviewCount, " rese\u00F1as)"] })] }), _jsx("p", { className: "text-gray-600 mb-6 leading-relaxed", children: product.description }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: product.vendorLogo }), _jsxs("span", { className: "text-sm text-gray-600", children: ["Vendido por ", _jsx("span", { className: "font-semibold text-[#262626]", children: product.vendor })] })] }), product.preparationTime && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(Clock, { className: "w-4 h-4 text-[#5AC7E1]" }), _jsx("span", { children: product.preparationTime })] }))] }), product.options && product.options.length > 0 && (_jsx("div", { className: "space-y-5 mb-6", children: product.options.map(option => (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-semibold text-[#262626] mb-3", children: [option.label, ":"] }), _jsx("div", { className: "flex flex-wrap gap-2", children: option.values.map(value => (_jsx("button", { onClick: () => handleOptionChange(option.id, value), className: `
                      px-4 py-2 rounded-full border-2 transition-all duration-200
                      font-medium text-sm
                      ${selectedOptions[option.id] === value
                                    ? 'border-[#5AC7E1] bg-[#5AC7E1] text-white'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-[#5AC7E1]'}
                    `, children: value }, value))) })] }, option.id))) })), _jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(Package, { className: `w-5 h-5 ${stockStatus.color.split(' ')[0]}` }), _jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`, children: stockStatus.text })] }), _jsxs("div", { className: "bg-gray-50 rounded-2xl p-6 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm text-gray-600 block mb-1", children: "Precio unitario" }), _jsxs("span", { className: "text-2xl font-bold text-[#262626]", children: ["$ ", product.price.toLocaleString('es-CO')] })] }), _jsx(QuantitySelector, { quantity: quantity, onQuantityChange: setQuantity, maxQuantity: product.stock })] }), quantity > 1 && (_jsx("div", { className: "pt-4 border-t border-gray-200", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium text-gray-600", children: "Total:" }), _jsxs("span", { className: "text-3xl font-bold text-[#262626]", children: ["$ ", totalPrice.toLocaleString('es-CO')] })] }) }))] }), _jsxs("button", { onClick: handleAddToCart, disabled: product.stock === 0 || !allOptionsSelected, className: `
          w-full h-14 rounded-2xl font-bold text-lg
          flex items-center justify-center gap-3
          transition-all duration-300 shadow-lg
          ${product.stock === 0 || !allOptionsSelected
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#5AC7E1] text-white hover:bg-[#4ab5cf] active:scale-[0.98] hover:shadow-xl'}
        `, children: [_jsx(ShoppingCart, { className: "w-6 h-6" }), product.stock === 0 ? 'Agotado' : 'Agregar al carrito'] }), !allOptionsSelected && product.stock > 0 && (_jsxs("div", { className: "flex items-start gap-2 mt-3 p-3 bg-orange-50 rounded-lg", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" }), _jsx("p", { className: "text-sm text-orange-600", children: "Selecciona todas las opciones antes de agregar al carrito" })] }))] }));
}
