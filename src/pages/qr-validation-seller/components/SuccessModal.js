import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * SuccessModal - Modal de confirmación de validación exitosa
 * Se cierra automáticamente después de 3 segundos
 */
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
export const SuccessModal = ({ isOpen, onClose, code, }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            // Auto-cierre después de 3 segundos
            const timer = setTimeout(() => {
                handleClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
        else {
            setIsAnimating(false);
        }
    }, [isOpen]);
    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: `
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `, onClick: handleClose, children: [_jsx("div", { className: `
          absolute inset-0 bg-black/50 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        ` }), _jsx("div", { className: `
          relative w-full max-w-sm z-10
          transition-all duration-500 ease-out
          ${isAnimating
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-75 translate-y-4'}
        `, style: {
                    transitionTimingFunction: isAnimating
                        ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'cubic-bezier(0.4, 0, 0.2, 1)'
                }, onClick: (e) => e.stopPropagation(), children: _jsx("div", { className: "bg-white rounded-2xl shadow-2xl overflow-hidden", children: _jsxs("div", { className: "p-8 text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce-once", children: _jsx(CheckCircle, { className: "w-12 h-12 text-green-600" }) }), _jsx("h3", { className: "font-bold text-2xl text-gray-900 mb-2", children: "\u00A1Pedido Validado!" }), _jsx("p", { className: "text-gray-600 mb-4", children: "El pedido ha sido entregado exitosamente" }), _jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-3 mb-4", children: [_jsx("p", { className: "text-xs font-semibold text-green-700 mb-1", children: "C\u00F3digo validado" }), _jsx("p", { className: "text-lg font-bold text-green-900", children: code })] }), _jsx("button", { onClick: handleClose, className: "w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg", children: "Aceptar" }), _jsx("p", { className: "text-xs text-gray-400 mt-3", children: "Este mensaje se cerrar\u00E1 autom\u00E1ticamente" })] }) }) }), _jsx("style", { children: `
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
      ` })] }));
};
