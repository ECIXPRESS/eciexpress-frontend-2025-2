import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
/**
 * Componente de productos relacionados
 * Muestra cards horizontales con productos similares o complementarios
 */
export default function RelatedProducts({ products }) {
    const navigate = useNavigate();
    if (!products || products.length === 0) {
        return null;
    }
    const handleProductClick = (productId) => {
        // Scroll to top y navegar
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/product/${productId}`);
    };
    return (_jsxs("div", { className: "mt-12 pt-8 border-t border-gray-200", children: [_jsx("h2", { className: "text-2xl font-bold text-[#262626] mb-6", children: "Otros productos" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: products.map(product => (_jsxs("div", { onClick: () => handleProductClick(product.id), className: "bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group", children: [_jsx("div", { className: "relative h-48 bg-gray-100 overflow-hidden", children: _jsx("img", { src: product.imageUrl, alt: product.name, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" }) }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold text-[#262626] mb-2 line-clamp-2 group-hover:text-[#5AC7E1] transition-colors", children: product.name }), _jsx("div", { className: "flex items-center gap-2 mb-3", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 fill-[#FDDF65] text-[#FDDF65]" }), _jsx("span", { className: "text-sm font-semibold text-[#262626]", children: product.rating })] }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xl font-bold text-[#262626]", children: ["$ ", product.price.toLocaleString('es-CO')] }), _jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                handleProductClick(product.id);
                                            }, className: "px-4 py-2 bg-[#5AC7E1] text-white text-sm font-medium rounded-xl hover:bg-[#4ab5cf] transition-colors", children: "Ver m\u00E1s" })] })] })] }, product.id))) })] }));
}
