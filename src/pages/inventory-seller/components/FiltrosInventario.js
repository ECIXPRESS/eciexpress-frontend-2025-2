import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * FiltrosInventario - Barra de búsqueda y filtros
 * Permite buscar productos y filtrar por categoría o estado de stock
 */
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
const CATEGORIAS = [
    'Almuerzo',
    'Desayuno',
    'Bebidas',
    'Snacks',
    'Postres',
    'Combos'
];
const ESTADOS_STOCK = [
    { value: 'disponible', label: 'Disponible' },
    { value: 'stock-bajo', label: 'Stock Bajo' },
    { value: 'agotado', label: 'Agotado' },
];
export const FiltrosInventario = ({ filtros, onFiltrosChange, }) => {
    const [showFilters, setShowFilters] = useState(false);
    const handleSearchChange = (e) => {
        onFiltrosChange({
            ...filtros,
            query: e.target.value
        });
    };
    const handleCategoriaChange = (categoria) => {
        onFiltrosChange({
            ...filtros,
            categoria
        });
    };
    const handleEstadoChange = (estado) => {
        onFiltrosChange({
            ...filtros,
            estadoStock: estado
        });
    };
    const clearFilters = () => {
        onFiltrosChange({
            query: '',
            categoria: undefined,
            estadoStock: undefined
        });
    };
    const hasActiveFilters = filtros.categoria || filtros.estadoStock;
    return (_jsxs("div", { className: "mb-5 flex-shrink-0", children: [_jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-4 shadow-sm", children: [_jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Buscar producto...", value: filtros.query, onChange: handleSearchChange, className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200" })] }) }), _jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
              ${showFilters || hasActiveFilters
                                    ? 'bg-yellow-400 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `, children: [_jsx(SlidersHorizontal, { className: "w-4 h-4" }), _jsx("span", { children: "Filtros" }), hasActiveFilters && (_jsx("span", { className: "bg-white text-yellow-500 text-xs font-bold px-1.5 py-0.5 rounded-full", children: (filtros.categoria ? 1 : 0) + (filtros.estadoStock ? 1 : 0) }))] })] }), showFilters && (_jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200 animate-fadeIn", children: [_jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Categor\u00EDa" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { onClick: () => handleCategoriaChange(undefined), className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${!filtros.categoria
                                                            ? 'bg-yellow-400 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: "Todas" }), CATEGORIAS.map((cat) => (_jsx("button", { onClick: () => handleCategoriaChange(cat), className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${filtros.categoria === cat
                                                            ? 'bg-yellow-400 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: cat }, cat)))] })] }), _jsxs("div", { className: "lg:w-auto", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Estado de Stock" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { onClick: () => handleEstadoChange(undefined), className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${!filtros.estadoStock
                                                            ? 'bg-yellow-400 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: "Todos" }), ESTADOS_STOCK.map((estado) => (_jsx("button", { onClick: () => handleEstadoChange(estado.value), className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${filtros.estadoStock === estado.value
                                                            ? 'bg-yellow-400 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: estado.label }, estado.value)))] })] })] }), hasActiveFilters && (_jsx("div", { className: "mt-4 flex justify-end", children: _jsxs("button", { onClick: clearFilters, className: "flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200", children: [_jsx(X, { className: "w-4 h-4" }), "Limpiar filtros"] }) }))] }))] }), _jsx("style", { children: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      ` })] }));
};
