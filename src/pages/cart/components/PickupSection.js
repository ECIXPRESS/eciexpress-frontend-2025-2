import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * PickupSection - Sección de punto de recogida
 */
import { MapPin, Truck } from 'lucide-react';
export default function PickupSection({ onPickupChange }) {
    const handlePickupChange = (method, location) => {
        onPickupChange?.(method, location);
    };
    return (_jsxs("div", { className: "bg-white rounded-3xl shadow-sm p-6", children: [_jsx("h2", { className: "text-xl font-bold text-[#262626] mb-4", children: "Punto de recogida" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3 p-4 border-2 border-[#FDDF65] bg-[#FDDF65]/10 rounded-2xl cursor-pointer", children: [_jsx("input", { type: "radio", name: "pickup", defaultChecked: true, onChange: () => handlePickupChange('Punto de venta', 'Harvies - Costado Oeste del coliseo El otoño'), className: "w-5 h-5 text-[#FDDF65] focus:ring-[#FDDF65] focus:ring-2" }), _jsx(MapPin, { className: "w-5 h-5 text-[#262626]" }), _jsx("span", { className: "font-semibold text-[#262626]", children: "Punto de venta" })] }), _jsxs("label", { className: "flex items-center gap-3 p-4 border-2 border-gray-200 bg-gray-50 rounded-2xl cursor-not-allowed opacity-60", children: [_jsx("input", { type: "radio", name: "pickup", disabled: true, className: "w-5 h-5 text-gray-400" }), _jsx(Truck, { className: "w-5 h-5 text-gray-400" }), _jsx("span", { className: "font-semibold text-gray-400", children: "Env\u00EDo (No disponible)" })] })] })] }));
}
