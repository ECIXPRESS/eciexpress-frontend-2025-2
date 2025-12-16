import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin } from 'lucide-react';
import locationMapImg from '@/assets/stores/mapa.png';
export default function StoreLocationInfo({ location }) {
    return (_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(MapPin, { className: "w-5 h-5 text-[#FDDF65]" }), _jsx("span", { className: "text-gray-600 text-sm sm:text-base", children: location.description })] }), _jsx("div", { className: "w-full h-56 sm:h-72 md:h-80 bg-[#E8DCC4] rounded-2xl overflow-hidden shadow-md", children: _jsx("img", { src: locationMapImg, alt: "Mapa de ubicaci\u00F3n", className: "w-full h-full object-cover" }) })] }));
}
