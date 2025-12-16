import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid3x3, List } from 'lucide-react';
export const ViewSelector = ({ vistaActual, onVistaChange, }) => {
    return (_jsxs("div", { className: "flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 shadow-sm", children: [_jsxs("button", { onClick: () => onVistaChange('grid'), className: `
          flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
          ${vistaActual === 'grid'
                    ? 'bg-yellow-400 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'}
        `, title: "Vista de cuadr\u00EDcula", children: [_jsx(Grid3x3, { className: "w-4 h-4" }), _jsx("span", { children: "Cuadr\u00EDcula" })] }), _jsxs("button", { onClick: () => onVistaChange('list'), className: `
          flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
          ${vistaActual === 'list'
                    ? 'bg-yellow-400 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'}
        `, title: "Vista de lista", children: [_jsx(List, { className: "w-4 h-4" }), _jsx("span", { children: "Lista" })] })] }));
};
