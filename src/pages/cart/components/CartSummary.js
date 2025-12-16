import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle } from 'lucide-react';
/**
 * Componente de resumen del pedido
 */
export default function CartSummary({ items, onContinue, buttonText = 'Continuar' }) {
    // Calcular subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Descuentos (actualmente 0, pero preparado para el futuro)
    const discounts = 0;
    // Total
    const total = subtotal - discounts;
    return (_jsxs("div", { className: "bg-white rounded-3xl p-5 md:p-6 shadow-md", children: [_jsx("h2", { className: "text-xl md:text-2xl font-bold text-[#262626] mb-4 md:mb-6", children: "Resumen pedido" }), _jsx("div", { className: "space-y-2.5 md:space-y-3 mb-5 md:mb-6 max-h-60 overflow-y-auto", children: items.map(item => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-700 flex-1 pr-2", children: item.name }), _jsxs("span", { className: "text-sm font-semibold text-[#262626] whitespace-nowrap", children: ["$ ", (item.price * item.quantity).toLocaleString('es-CO')] })] }, item.id))) }), discounts > 0 && (_jsxs("div", { className: "flex justify-between items-center mb-4 pb-4 border-b border-gray-200", children: [_jsx("span", { className: "text-sm text-gray-700", children: "Descuentos" }), _jsxs("span", { className: "text-sm font-semibold text-green-600", children: ["-$ ", discounts.toLocaleString('es-CO')] })] })), _jsx("div", { className: "pt-4 border-t border-gray-200 mb-5 md:mb-6", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-base md:text-lg font-bold text-[#262626]", children: "Total" }), _jsxs("span", { className: "text-xl md:text-2xl font-bold text-[#262626]", children: ["$ ", total.toLocaleString('es-CO')] })] }) }), _jsx("button", { onClick: onContinue, disabled: items.length === 0, className: `
          w-full h-12 md:h-14 rounded-2xl font-bold text-base md:text-lg
          flex items-center justify-center gap-2
          transition-all duration-300 shadow-md
          ${items.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : buttonText === 'Comprar'
                        ? 'bg-[#FDDF65] text-[#262626] hover:bg-[#f5d74e] active:scale-[0.98] hover:shadow-lg'
                        : 'bg-[#5AC7E1] text-white hover:bg-[#4ab5cf] active:scale-[0.98] hover:shadow-lg'}
        `, children: buttonText }), _jsxs("div", { className: "mt-3 md:mt-4 flex items-start gap-2 p-3 bg-orange-50 rounded-xl", children: [_jsx(AlertCircle, { className: "w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0 mt-0.5" }), _jsx("p", { className: "text-xs text-orange-600 leading-relaxed", children: "La disponibilidad de los art\u00EDculos no est\u00E1n garantizados hasta que se finalice el pago." })] })] }));
}
