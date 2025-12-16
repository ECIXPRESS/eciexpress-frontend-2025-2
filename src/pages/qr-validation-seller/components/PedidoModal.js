import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * PedidoModal - Modal de detalles completos del pedido
 * Muestra información de contacto, entrega, pago y lista de productos
 */
import { useEffect, useState } from 'react';
import { X, User, Phone, Clock, CreditCard, ChefHat, DollarSign } from 'lucide-react';
export const PedidoModal = ({ pedido, isOpen, onClose, }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    // Gestiona el ciclo de vida del modal y tecla Escape para cerrar
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
    if (!pedido)
        return null;
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
          `, style: { transitionDelay: isAnimating ? '200ms' : '0ms' }, "aria-label": "Cerrar modal", children: _jsx(X, { className: "w-5 h-5 group-hover:rotate-90 transition-transform duration-300" }) }), _jsx("div", { className: "bg-white rounded-xl shadow-2xl overflow-hidden", children: _jsxs("div", { className: "h-full flex flex-col max-h-[85vh]", children: [_jsxs("div", { className: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-4 flex-shrink-0", children: [_jsx("div", { className: "flex justify-between items-start mb-2", children: _jsxs("div", { children: [_jsxs("h3", { className: "font-bold text-lg", children: ["Pedido #", pedido.codigo] }), _jsx("p", { className: "text-sm text-yellow-100", children: pedido.nombreCliente })] }) }), _jsxs("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-white/20", children: [_jsx("span", { className: "text-sm text-yellow-100", children: "Total del Pedido" }), _jsxs("div", { className: "flex items-center text-2xl font-bold", children: [_jsx(DollarSign, { className: "w-6 h-6" }), _jsx("span", { children: pedido.total.toLocaleString() })] })] })] }), _jsxs("div", { className: "flex-grow overflow-y-auto p-4", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "font-bold text-gray-900 text-sm mb-2 flex items-center", children: "Informaci\u00F3n de Contacto" }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-3 space-y-2", children: [_jsxs("div", { className: "flex items-center text-sm", children: [_jsx(User, { className: "w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" }), _jsx("span", { className: "font-medium text-gray-900", children: pedido.nombreCliente })] }), _jsxs("div", { className: "flex items-center text-sm", children: [_jsx(Phone, { className: "w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" }), _jsx("span", { className: "text-gray-700", children: pedido.telefonoCliente })] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "font-bold text-gray-900 text-sm mb-2", children: "Detalles de Entrega" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2.5", children: [_jsxs("div", { className: "flex items-center text-gray-600", children: [_jsx(Clock, { className: "w-3.5 h-3.5 mr-2" }), _jsx("span", { children: "Hora de entrega" })] }), _jsx("span", { className: "font-semibold text-gray-900", children: pedido.horaEntrega })] }), _jsxs("div", { className: "flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2.5", children: [_jsxs("div", { className: "flex items-center text-gray-600", children: [_jsx(CreditCard, { className: "w-3.5 h-3.5 mr-2" }), _jsx("span", { children: "M\u00E9todo de pago" })] }), _jsxs("span", { className: `font-semibold ${pedido.pagado ? 'text-green-600' : 'text-orange-600'}`, children: [pedido.pagado ? 'Pagado' : 'Pendiente', " \u2022 ", pedido.metodoPago] })] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsxs("h4", { className: "font-bold text-gray-900 text-sm mb-2 flex items-center", children: [_jsx(ChefHat, { className: "w-4 h-4 mr-1.5 text-yellow-500" }), "Productos Ordenados"] }), _jsx("div", { className: "space-y-2", children: pedido.productos.map((producto, index) => (_jsx("div", { className: "bg-white border border-gray-200 rounded-lg p-2.5", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("p", { className: "font-medium text-sm text-gray-900", children: [_jsxs("span", { className: "text-yellow-500", children: [producto.cantidad, "x"] }), " ", producto.nombre] }), producto.observaciones && (_jsx("p", { className: "text-xs text-gray-500 mt-1", children: producto.observaciones }))] }), _jsxs("span", { className: "font-bold text-sm text-yellow-500 ml-2 flex-shrink-0", children: ["$", (producto.cantidad * producto.precioUnitario).toLocaleString()] })] }) }, index))) })] }), pedido.observaciones && (_jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3", children: [_jsx("p", { className: "text-xs font-semibold text-yellow-800 mb-1", children: "Observaciones del Pedido" }), _jsx("p", { className: "text-sm text-yellow-900", children: pedido.observaciones })] }))] })] }) })] })] }));
};
