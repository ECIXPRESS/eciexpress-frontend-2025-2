import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { COLORES_CATEGORIA } from '../types/inventario';
/**
 * Badge para mostrar el estado del stock
 */
export const StockBadge = ({ estado }) => {
    const config = {
        'disponible': {
            bg: 'bg-green-100',
            text: 'text-green-700',
            label: 'Disponible'
        },
        'stock-bajo': {
            bg: 'bg-orange-100',
            text: 'text-orange-700',
            label: 'Stock Bajo'
        },
        'agotado': {
            bg: 'bg-red-100',
            text: 'text-red-700',
            label: 'Agotado'
        }
    };
    const { bg, text, label } = config[estado];
    return (_jsxs("span", { className: `
      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
      ${bg} ${text}
    `, children: [estado === 'stock-bajo' && (_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse" })), label] }));
};
/**
 * Badge para mostrar la categoría del producto
 */
export const CategoriaBadge = ({ categoria }) => {
    return (_jsx("span", { className: `
      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
      ${COLORES_CATEGORIA[categoria]}
    `, children: categoria }));
};
