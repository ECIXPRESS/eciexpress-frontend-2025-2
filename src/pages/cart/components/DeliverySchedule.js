import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * DeliverySchedule - Sección de programación de entrega
 */
import { Calendar, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
export default function DeliverySchedule({ onScheduleChange }) {
    const today = new Date();
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('50');
    const [period, setPeriod] = useState('pm');
    const formattedDate = today.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    // Notificar cambios de hora
    useEffect(() => {
        const timeString = `${hour}:${minute} ${period}`;
        const dateString = `${today.getDate()} nov, ${today.getFullYear()}`;
        onScheduleChange?.(dateString, timeString);
    }, [hour, minute, period]);
    return (_jsxs("div", { className: "bg-white rounded-3xl shadow-sm p-6", children: [_jsx("h2", { className: "text-xl font-bold text-[#262626] mb-4", children: "Programar entrega" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm text-gray-600 mb-2 flex items-center gap-2", children: [_jsx(Calendar, { className: "w-4 h-4" }), "Fecha"] }), _jsx("div", { className: "relative", children: _jsx("input", { type: "text", defaultValue: `${today.getDate()} nov, ${today.getFullYear()} (hoy)`, readOnly: true, className: "w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl font-medium text-[#262626] cursor-not-allowed" }) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm text-gray-600 mb-2 flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4" }), "Hora"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "number", min: "1", max: "12", value: hour, onChange: (e) => setHour(e.target.value), className: "w-20 px-3 py-3 bg-gray-100 border border-gray-300 rounded-xl text-center font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" }), _jsx("span", { className: "flex items-center justify-center text-gray-400", children: ":" }), _jsx("input", { type: "number", min: "0", max: "59", value: minute, onChange: (e) => setMinute(e.target.value.padStart(2, '0')), className: "w-20 px-3 py-3 bg-gray-100 border border-gray-300 rounded-xl text-center font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent" }), _jsxs("select", { value: period, onChange: (e) => setPeriod(e.target.value), className: "px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent", children: [_jsx("option", { value: "am", children: "am" }), _jsx("option", { value: "pm", children: "pm" })] })] })] })] })] }));
}
