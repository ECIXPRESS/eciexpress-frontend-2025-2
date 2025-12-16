import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Componente de encabezado principal de la aplicación
 */
import { useState, useEffect } from 'react';
const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12)
        return 'Buenos días';
    if (hora >= 12 && hora < 19)
        return 'Buenas tardes';
    return 'Buenas noches';
};
export const Header = ({ fecha, nombreAdmin = 'Cafe Leyenda', rol = 'Cafetería' }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);
    const fechaActual = fecha || currentTime.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const horaActual = currentTime.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
    return (_jsx("header", { className: "bg-primary-500 text-white shadow-lg rounded-b-2xl", children: _jsx("div", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "w-14 h-14 rounded-full overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-primary-500 shadow-md", children: [_jsx("img", { src: "/src/assets/qr-validation-seller/cafeterias/eci.png", alt: "ECI Express", className: "w-full h-full object-cover", onError: (e) => {
                                                    const target = e.currentTarget;
                                                    target.style.display = 'none';
                                                    const fallback = target.nextElementSibling;
                                                    if (fallback)
                                                        fallback.style.display = 'flex';
                                                } }), _jsx("div", { className: "hidden w-full h-full items-center justify-center bg-white", children: _jsx("span", { className: "text-primary-600 text-xl font-bold", children: "EC" }) })] }), _jsx("div", { className: "absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-primary-500 shadow-sm" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-baseline gap-2", children: [_jsxs("h1", { className: "text-2xl font-bold text-white", children: [getSaludo(), ","] }), _jsx("span", { className: "text-2xl font-bold text-white", children: nombreAdmin })] }), _jsx("p", { className: "text-sm text-primary-100 font-medium", children: rol })] })] }), _jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 shadow-lg", children: [_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm font-bold text-white capitalize leading-tight", children: fechaActual.split(',')[0] }), _jsx("div", { className: "text-xs text-primary-100 font-medium", children: fechaActual.split(',').slice(1).join(',').trim() })] }), _jsx("div", { className: "h-8 w-px bg-white/30" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "text-xl font-bold text-white tabular-nums leading-tight", children: horaActual }), _jsx("div", { className: "text-xs text-primary-100 font-medium", children: "hora actual" })] })] }), _jsx("div", { className: "flex sm:hidden items-center bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20", children: _jsx("div", { className: "text-lg font-bold text-white tabular-nums", children: horaActual }) })] })] }) }) }));
};
