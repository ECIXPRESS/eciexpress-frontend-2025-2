import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * EstadoNavigation - Navegación principal por estados de pedidos
 * Muestra tarjetas con contadores animados para cada estado
 * Estados: Total, En Preparación, Entregados
 */
import { useEffect, useState } from 'react';
/**
 * AnimatedCounter - Contador con animación de incremento
 * Anima el valor desde 0 hasta el valor final en 1 segundo
 */
const AnimatedCounter = ({ value, isActive }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(0);
        const duration = 1000;
        const steps = 30;
        const increment = value / steps;
        const stepDuration = duration / steps;
        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep === steps) {
                setCount(value);
                clearInterval(timer);
            }
            else {
                setCount(Math.floor(increment * currentStep));
            }
        }, stepDuration);
        return () => clearInterval(timer);
    }, [value]);
    return (_jsx("span", { className: `transition-all duration-300 ${isActive ? 'scale-110' : ''}`, children: count }));
};
export const EstadoNavigation = ({ resumen, estadoActivo, onEstadoChange, }) => {
    // Configuración de cada tarjeta de estado
    const items = [
        {
            key: 'total',
            label: 'Total de Pedidos',
            value: resumen.total,
            color: 'text-yellow-500',
            activeColor: 'text-white',
            bgColor: 'bg-white',
            activeBg: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
            borderColor: 'border-gray-200',
            activeBorder: 'border-yellow-400',
        },
        {
            key: 'pendientes',
            label: 'En Preparación',
            value: resumen.pendientes,
            color: 'text-red-700',
            activeColor: 'text-white',
            bgColor: 'bg-white',
            activeBg: 'bg-gradient-to-br from-red-600 to-red-700',
            borderColor: 'border-gray-200',
            activeBorder: 'border-red-600',
        },
        {
            key: 'completados',
            label: 'Entregados',
            value: resumen.completados,
            color: 'text-green-600',
            activeColor: 'text-white',
            bgColor: 'bg-white',
            activeBg: 'bg-gradient-to-br from-green-500 to-green-600',
            borderColor: 'border-gray-200',
            activeBorder: 'border-green-500',
        },
    ];
    return (_jsx("div", { className: "mb-5 flex-shrink-0", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: items.map((item) => {
                const isActive = estadoActivo === item.key;
                return (_jsxs("button", { onClick: () => onEstadoChange(item.key), className: `
                relative p-6 rounded-xl border-2 transition-all duration-200
                ${isActive ?
                        `${item.activeBg} ${item.activeBorder} shadow-lg` :
                        `${item.bgColor} ${item.borderColor} hover:border-gray-300 hover:shadow-md`}
              `, children: [_jsxs("div", { className: "flex flex-col space-y-4", children: [_jsx("div", { children: _jsx("h3", { className: `
                    text-lg font-bold transition-colors duration-200 text-left
                    ${isActive ? 'text-white' : 'text-gray-900'}
                  `, children: item.label }) }), _jsxs("div", { className: "flex items-baseline space-x-2", children: [_jsx("div", { className: `
                    text-5xl font-black transition-colors duration-200 tabular-nums
                    ${isActive ? item.activeColor : item.color}
                  `, children: _jsx(AnimatedCounter, { value: item.value, isActive: isActive }) }), _jsx("span", { className: `
                    text-lg font-semibold transition-colors duration-200
                    ${isActive ? 'text-white/80' : 'text-gray-500'}
                  `, children: item.value === 1 ? 'pedido' : 'pedidos' })] })] }), isActive && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1.5 bg-white/40 rounded-b-lg" }))] }, item.key));
            }) }) }));
};
