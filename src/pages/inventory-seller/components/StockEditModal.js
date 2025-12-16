import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * StockEditModal - Modal para editar la cantidad de stock de un producto
 */
import { useEffect, useState } from 'react';
import { X, Minus, Plus, Package, AlertTriangle } from 'lucide-react';
export const StockEditModal = ({ producto, isOpen, onClose, onSave, }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [newStock, setNewStock] = useState(0);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (isOpen && producto) {
            document.body.style.overflow = 'hidden';
            setNewStock(producto.stock);
            setError(null);
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
        }
        else {
            setIsAnimating(false);
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, producto]);
    const handleIncrement = () => {
        setNewStock(prev => prev + 1);
        setError(null);
    };
    const handleDecrement = () => {
        if (newStock > 0) {
            setNewStock(prev => prev - 1);
            setError(null);
        }
    };
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        if (value >= 0) {
            setNewStock(value);
            setError(null);
        }
    };
    const handleSave = () => {
        if (!producto)
            return;
        if (newStock < 0) {
            setError('El stock no puede ser negativo');
            return;
        }
        onSave(producto.id, newStock);
        onClose();
    };
    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
    };
    if (!producto)
        return null;
    const isLowStock = newStock <= producto.stockMinimo && newStock > 0;
    const isOutOfStock = newStock === 0;
    const hasChanged = newStock !== producto.stock;
    return (_jsxs("div", { className: `
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `, onClick: handleClose, children: [_jsx("div", { className: `
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        ` }), _jsxs("div", { className: `
          relative w-full max-w-sm z-10
          transition-all duration-500 ease-out
          ${isAnimating
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-75 -translate-y-12'}
        `, style: {
                    transitionTimingFunction: isAnimating
                        ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'cubic-bezier(0.4, 0, 0.2, 1)'
                }, onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: handleClose, className: `
            absolute -top-12 right-0 bg-white hover:bg-gray-100 text-gray-700 
            p-2.5 rounded-lg shadow-lg hover:shadow-xl z-20 group
            transition-all duration-300
            ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `, style: { transitionDelay: isAnimating ? '200ms' : '0ms' }, children: _jsx(X, { className: "w-5 h-5 group-hover:rotate-90 transition-transform duration-300" }) }), _jsxs("div", { className: "bg-white rounded-2xl shadow-2xl overflow-hidden", children: [_jsxs("div", { className: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3", children: _jsx(Package, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "font-bold text-xl mb-1 text-white", children: "Editar Stock" }), _jsx("p", { className: "text-white/90 text-sm", children: producto.nombre })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("p", { className: "text-sm text-gray-500 mb-1", children: "Stock actual" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [producto.stock, " unidades"] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3 text-center", children: "Nuevo stock" }), _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("button", { onClick: handleDecrement, disabled: newStock === 0, className: "w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center", children: _jsx(Minus, { className: "w-5 h-5 text-gray-700" }) }), _jsx("input", { type: "number", value: newStock, onChange: handleInputChange, className: "w-24 text-center text-3xl font-bold text-gray-900 border-2 border-gray-200 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400", min: "0" }), _jsx("button", { onClick: handleIncrement, className: "w-12 h-12 rounded-full bg-yellow-50 hover:bg-yellow-100 transition-colors duration-200 flex items-center justify-center", children: _jsx(Plus, { className: "w-5 h-5 text-yellow-700" }) })] })] }), isLowStock && (_jsxs("div", { className: "mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-orange-800", children: "Stock bajo" }), _jsxs("p", { className: "text-xs text-orange-600", children: ["El stock est\u00E1 por debajo del m\u00EDnimo (", producto.stockMinimo, " unidades)"] })] })] })), isOutOfStock && (_jsxs("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-red-800", children: "Producto agotado" }), _jsx("p", { className: "text-xs text-red-600", children: "El producto no estar\u00E1 disponible para la venta" })] })] })), error && (_jsx("div", { className: "mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg", children: _jsx("p", { className: "text-sm text-red-700 font-medium", children: error }) })), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { onClick: handleSave, disabled: !hasChanged, className: `
                  w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-200
                  ${hasChanged
                                                    ? 'bg-yellow-400 hover:bg-yellow-500 text-white shadow-lg hover:shadow-xl'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `, children: "Guardar Cambios" }), _jsx("button", { onClick: handleClose, className: "w-full py-3 px-4 rounded-xl font-semibold bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 transition-all duration-200", children: "Cancelar" })] })] })] })] })] }));
};
