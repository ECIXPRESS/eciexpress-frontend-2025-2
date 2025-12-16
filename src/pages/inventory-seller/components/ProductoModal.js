import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ProductoModal - Modal de detalles completos del producto
 */
import { useEffect, useState } from 'react';
import { X, DollarSign, Package, Calendar, Tag } from 'lucide-react';
import { getEstadoStock } from '../types/inventario';
import { StockBadge, CategoriaBadge } from './Badge';
export const ProductoModal = ({ producto, isOpen, onClose, onEditStock, }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
        }
        else {
            setIsAnimating(false);
            document.body.style.overflow = 'unset';
        }
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);
    if (!producto)
        return null;
    const estadoStock = getEstadoStock(producto.stock, producto.stockMinimo);
    return (_jsxs("div", { className: `
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `, onClick: onClose, children: [_jsx("div", { className: `
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        ` }), _jsxs("div", { className: `
          relative w-full max-w-md z-10
          transition-all duration-500 ease-out
          ${isAnimating
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-75 -translate-y-12'}
        `, style: {
                    transitionTimingFunction: isAnimating
                        ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'cubic-bezier(0.4, 0, 0.2, 1)'
                }, onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: onClose, className: `
            absolute -top-12 right-0 bg-white hover:bg-gray-100 text-gray-700 
            p-2.5 rounded-lg shadow-lg hover:shadow-xl z-20 group
            transition-all duration-300
            ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `, style: { transitionDelay: isAnimating ? '200ms' : '0ms' }, "aria-label": "Cerrar modal", children: _jsx(X, { className: "w-5 h-5 group-hover:rotate-90 transition-transform duration-300" }) }), _jsx("div", { className: "bg-white rounded-xl shadow-2xl overflow-hidden", children: _jsxs("div", { className: "h-full flex flex-col max-h-[85vh]", children: [_jsxs("div", { className: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-4 flex-shrink-0", children: [_jsx("div", { className: "flex justify-between items-start mb-2", children: _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg", children: producto.nombre }), _jsx("div", { className: "mt-1", children: _jsx(CategoriaBadge, { categoria: producto.categoria }) })] }) }), _jsxs("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-white/20", children: [_jsx("span", { className: "text-sm text-yellow-100", children: "Precio de venta" }), _jsxs("div", { className: "flex items-center text-2xl font-bold", children: [_jsx(DollarSign, { className: "w-6 h-6" }), _jsx("span", { children: producto.precio.toLocaleString() })] })] })] }), _jsxs("div", { className: "flex-grow overflow-y-auto p-4", children: [_jsxs("div", { className: "mb-4", children: [_jsxs("h4", { className: "font-bold text-gray-900 text-sm mb-2 flex items-center", children: [_jsx(Package, { className: "w-4 h-4 mr-1.5 text-yellow-500" }), "Informaci\u00F3n de Stock"] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-3 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Estado" }), _jsx(StockBadge, { estado: estadoStock })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Cantidad disponible" }), _jsxs("span", { className: "font-bold text-gray-900", children: [producto.stock, " unidades"] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Stock m\u00EDnimo" }), _jsxs("span", { className: "font-semibold text-gray-700", children: [producto.stockMinimo, " unidades"] })] })] })] }), producto.descripcion && (_jsxs("div", { className: "mb-4", children: [_jsxs("h4", { className: "font-bold text-gray-900 text-sm mb-2 flex items-center", children: [_jsx(Tag, { className: "w-4 h-4 mr-1.5 text-yellow-500" }), "Descripci\u00F3n"] }), _jsx("p", { className: "text-sm text-gray-600 bg-gray-50 rounded-lg p-3", children: producto.descripcion })] })), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Calendar, { className: "w-4 h-4 text-yellow-500" }), _jsx("p", { className: "text-xs font-semibold text-yellow-800", children: "\u00DAltima actualizaci\u00F3n" })] }), _jsx("p", { className: "text-sm text-yellow-900", children: new Date(producto.fechaActualizacion).toLocaleDateString('es-CO', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) })] })] }), _jsx("div", { className: "p-4 border-t border-gray-100 flex-shrink-0", children: _jsx("button", { onClick: () => {
                                            onClose();
                                            onEditStock(producto.id);
                                        }, className: "w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg", children: "Editar Stock" }) })] }) })] })] }));
};
