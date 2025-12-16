import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { X, QrCode, MessageCircle } from 'lucide-react';
export default function OrderDetailsDrawer({ order, isOpen, onClose }) {
    const [showQr, setShowQr] = useState(false);
    const [status, setStatus] = useState(order?.status || 'pendiente');
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef(null);
    useEffect(() => {
        // reset when opened
        if (isOpen) {
            setShowQr(false);
            setIsClosing(false);
            setStatus(order?.status || 'pendiente');
        }
        return () => {
            if (timerRef.current)
                window.clearTimeout(timerRef.current);
        };
    }, [isOpen, order]);
    if (!isOpen || !order)
        return null;
    const handleContinue = () => {
        // mark as delivered and show QR
        setStatus('entregado');
        setShowQr(true);
    };
    const handleRequestClose = () => {
        // play exit animation then call onClose
        setIsClosing(true);
        timerRef.current = window.setTimeout(() => {
            onClose();
        }, 250); // match animation duration
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", children: [_jsx("style", { children: `
        @keyframes slideInFromRight { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutToRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(24px); opacity: 0; } }
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOutOverlay { from { opacity: 1; } to { opacity: 0; } }
        .drawer-slide-in { animation: slideInFromRight 320ms cubic-bezier(.22,1,.36,1) forwards; }
        .drawer-slide-out { animation: slideOutToRight 220ms ease-in forwards; }
        .overlay-fade-in { animation: fadeInOverlay 200ms ease-out forwards; }
        .overlay-fade-out { animation: fadeOutOverlay 180ms ease-in forwards; }
      ` }), _jsx("div", { className: `absolute inset-0 bg-black/30 ${isClosing ? 'overlay-fade-out' : 'overlay-fade-in'}`, onClick: handleRequestClose }), _jsxs("aside", { className: `relative bg-white w-full max-w-sm h-full overflow-y-auto shadow-2xl ${isClosing ? 'drawer-slide-out' : 'drawer-slide-in'}`, children: [_jsxs("div", { className: "bg-gradient-to-r from-yellow-400 to-yellow-500 pt-20 pb-6 p-5 text-white relative", children: [_jsx("button", { onClick: handleRequestClose, className: "absolute left-4 top-8 text-white", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("h2", { className: "text-2xl font-semibold", children: "Detalles" })] }), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsx("div", { children: _jsx("p", { className: "text-sm text-gray-500", children: "Codigo del pedido" }) }), _jsx("div", { className: "text-right", children: _jsx("p", { className: "font-medium text-gray-900", children: order.id }) }), _jsx("div", { children: _jsx("p", { className: "text-sm text-gray-500", children: "Fecha de compra" }) }), _jsx("div", { className: "text-right", children: _jsx("p", { className: "text-gray-700", children: "12 nov, 2025 11:45 am" }) }), _jsx("div", { children: _jsx("p", { className: "text-sm text-gray-500", children: "Fecha de entrega" }) }), _jsx("div", { className: "text-right", children: _jsx("p", { className: "text-gray-700", children: "12 nov, 2025 02:30 pm" }) }), _jsx("div", { children: _jsx("p", { className: "text-sm text-gray-500", children: "Metodo de pago" }) }), _jsx("div", { className: "text-right", children: _jsx("p", { className: "text-gray-700", children: "Billetera" }) }), _jsx("div", { children: _jsx("p", { className: "text-sm text-gray-500", children: "Estado" }) }), _jsx("div", { className: "text-right", children: status === 'entregado' ? (_jsx("span", { className: "inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs", children: "Entregado" })) : (_jsx("span", { className: "inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs", children: "Pendiente" })) })] }), _jsxs("div", { className: "flex items-center gap-4 py-3 border-t border-gray-100", children: [_jsx("button", { className: "p-2 rounded-md bg-gray-100", children: _jsx(QrCode, { className: "w-5 h-5 text-gray-700" }) }), _jsx("button", { className: "p-2 rounded-md bg-gray-100", children: _jsx(MessageCircle, { className: "w-5 h-5 text-gray-700" }) })] }), _jsx("hr", { className: "my-4" }), !showQr ? (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-lg font-semibold mb-3", children: "Recibo" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-gray-700", children: [_jsx("span", { children: "Combo De Hamburguesa" }), _jsx("span", { children: "$ 15.000" })] }), _jsxs("div", { className: "flex justify-between text-gray-700", children: [_jsx("span", { children: "T\u00E9 Hatsu" }), _jsx("span", { children: "$ 5.000" })] }), _jsxs("div", { className: "flex justify-between text-gray-700", children: [_jsx("span", { children: "Chicles Trident" }), _jsx("span", { children: "$ 2.500" })] }), _jsxs("div", { className: "flex justify-between text-gray-500", children: [_jsx("span", { children: "Descuentos" }), _jsx("span", { children: "-$ 0" })] })] }), _jsxs("div", { className: "mt-4 border-t border-gray-100 pt-4 flex items-center justify-between", children: [_jsx("h4", { className: "text-lg font-bold", children: "Total" }), _jsxs("div", { className: "text-lg font-bold text-gray-900", children: ["$ ", order.total.toLocaleString()] })] }), _jsx("div", { className: "mt-6", children: _jsx("button", { onClick: handleContinue, className: "w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-full", children: "Continuar" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Codigo QR" }), _jsx("button", { onClick: () => setShowQr(false), className: "text-gray-500", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "flex items-center justify-center py-6", children: _jsx("div", { className: "w-56 h-56 bg-white shadow-inner flex items-center justify-center rounded-md overflow-hidden", children: _jsx("img", { src: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(order.id)}`, alt: "QR code", className: "w-full h-full object-cover" }) }) })] }))] })] })] }));
}
