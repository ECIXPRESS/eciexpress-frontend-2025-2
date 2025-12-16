import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * PaymentSection - Sección de pago con métodos de pago (acordeón)
 * Métodos soportados: Billetera, Tarjeta débito, PSE, Efectivo
 */
import { useState } from 'react';
import { ChevronRight, ChevronDown, Wallet, CreditCard, Building2, Banknote } from 'lucide-react';
export default function PaymentSection({ onPaymentMethodChange }) {
    const [activeMethod, setActiveMethod] = useState('billetera');
    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        lastName: '',
        cvv: '',
        expiry: ''
    });
    const [pseInfo, setPseInfo] = useState({
        bank: '',
        email: ''
    });
    const handleMethodToggle = (method) => {
        setActiveMethod(activeMethod === method ? null : method);
        // Notificar el cambio con detalles según el método
        let details = '';
        if (method === 'billetera') {
            details = '125.000';
        }
        else if (method === 'tarjeta' && cardInfo.number) {
            details = `**** ${cardInfo.number.slice(-4)}`;
        }
        else if (method === 'pse' && pseInfo.bank) {
            details = pseInfo.bank;
        }
        else if (method === 'efectivo') {
            details = 'Pago en punto de venta';
        }
        const methodLabels = {
            billetera: 'Billetera',
            tarjeta: 'Tarjeta débito',
            pse: 'PSE',
            efectivo: 'Efectivo'
        };
        onPaymentMethodChange?.(methodLabels[method], details);
    };
    const paymentMethods = [
        { id: 'billetera', label: 'Billetera', icon: Wallet },
        { id: 'tarjeta', label: 'Tarjeta debito', icon: CreditCard },
        { id: 'pse', label: 'Pse', icon: Building2 },
        { id: 'efectivo', label: 'Efectivo', icon: Banknote }
    ];
    return (_jsx("div", { className: "bg-white rounded-3xl shadow-sm overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-xl font-bold text-[#262626] mb-4", children: "Pago" }), _jsx("div", { className: "space-y-2", children: paymentMethods.map((method) => {
                        const Icon = method.icon;
                        const isActive = activeMethod === method.id;
                        return (_jsxs("div", { className: "border border-gray-200 rounded-2xl overflow-hidden", children: [_jsx("button", { onClick: () => handleMethodToggle(method.id), className: `
                    w-full flex items-center justify-between p-4 transition-colors
                    ${isActive ? 'bg-[#FDDF65]' : 'bg-white hover:bg-gray-50'}
                  `, children: _jsxs("div", { className: "flex items-center gap-3", children: [isActive ? (_jsx(ChevronDown, { className: "w-5 h-5 text-[#262626]" })) : (_jsx(ChevronRight, { className: "w-5 h-5 text-[#262626]" })), _jsx("span", { className: "font-semibold text-[#262626]", children: method.label })] }) }), isActive && (_jsxs("div", { className: "p-4 bg-white border-t border-gray-200", children: [method.id === 'billetera' && (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-[#262626] mb-2", children: "Saldo disponible:" }), _jsxs("div", { className: "bg-[#FDDF65] rounded-2xl p-4 flex items-center justify-between", children: [_jsx("div", { className: "w-8 h-8 bg-white rounded-full" }), _jsx("span", { className: "text-2xl font-bold text-[#262626]", children: "125.000" })] })] })), method.id === 'tarjeta' && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm font-semibold text-[#262626] mb-3", children: "Informaci\u00F3n de pago" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-600 mb-1", children: "N\u00FAmero" }), _jsx("input", { type: "text", placeholder: "Ingresa el n\u00FAmero de la tarjeta", value: cardInfo.number, onChange: (e) => {
                                                                const newInfo = { ...cardInfo, number: e.target.value };
                                                                setCardInfo(newInfo);
                                                                if (newInfo.number.length >= 4) {
                                                                    onPaymentMethodChange?.('Tarjeta débito', `**** ${newInfo.number.slice(-4)}`);
                                                                }
                                                            }, maxLength: 16, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-600 mb-1", children: "Nombre" }), _jsx("input", { type: "text", placeholder: "Nombre", value: cardInfo.name, onChange: (e) => setCardInfo({ ...cardInfo, name: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-600 mb-1", children: "Apellido" }), _jsx("input", { type: "text", placeholder: "Apellido", value: cardInfo.lastName, onChange: (e) => setCardInfo({ ...cardInfo, lastName: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-600 mb-1", children: "CVV" }), _jsx("input", { type: "text", placeholder: "cvv", value: cardInfo.cvv, onChange: (e) => setCardInfo({ ...cardInfo, cvv: e.target.value }), maxLength: 3, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-600 mb-1", children: "Fecha de expiraci\u00F3n" }), _jsx("input", { type: "text", placeholder: "mm/aa", value: cardInfo.expiry, onChange: (e) => setCardInfo({ ...cardInfo, expiry: e.target.value }), maxLength: 5, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" })] })] })] })), method.id === 'pse' && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm font-semibold text-[#262626] mb-3", children: "Informaci\u00F3n de pago" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-600 mb-1", children: "Banco" }), _jsxs("select", { value: pseInfo.bank, onChange: (e) => {
                                                                const newInfo = { ...pseInfo, bank: e.target.value };
                                                                setPseInfo(newInfo);
                                                                if (newInfo.bank) {
                                                                    const bankName = e.target.options[e.target.selectedIndex].text;
                                                                    onPaymentMethodChange?.('PSE', bankName);
                                                                }
                                                            }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent appearance-none bg-white", style: {
                                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23262626' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                                                backgroundRepeat: 'no-repeat',
                                                                backgroundPosition: 'right 1rem center'
                                                            }, children: [_jsx("option", { value: "", children: "Selecciona tu banco" }), _jsx("option", { value: "bancolombia", children: "Bancolombia" }), _jsx("option", { value: "davivienda", children: "Davivienda" }), _jsx("option", { value: "bogota", children: "Banco de Bogot\u00E1" }), _jsx("option", { value: "occidente", children: "Banco de Occidente" }), _jsx("option", { value: "popular", children: "Banco Popular" }), _jsx("option", { value: "bbva", children: "BBVA" }), _jsx("option", { value: "av-villas", children: "AV Villas" }), _jsx("option", { value: "colpatria", children: "Colpatria" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-600 mb-1", children: "Correo Electr\u00F3nico" }), _jsx("input", { type: "email", placeholder: "Ingresa el correo", value: pseInfo.email, onChange: (e) => setPseInfo({ ...pseInfo, email: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" })] })] })), method.id === 'efectivo' && (_jsxs("div", { className: "bg-[#FDDF65] rounded-2xl p-4", children: [_jsx("p", { className: "text-sm font-semibold text-[#262626] mb-2", children: "Informaci\u00F3n de pago" }), _jsx("p", { className: "text-sm text-[#262626]", children: "Por favor, paga en efectivo en el punto de recogida el precio indicado en la factura." })] }))] }))] }, method.id));
                    }) })] }) }));
}
