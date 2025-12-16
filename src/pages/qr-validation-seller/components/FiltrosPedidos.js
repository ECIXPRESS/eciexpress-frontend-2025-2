import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from 'lucide-react';
export const FiltrosPedidos = ({ filtros, onFiltrosChange, }) => {
    /** Actualiza el texto de búsqueda */
    const handleSearchChange = (e) => {
        onFiltrosChange({
            ...filtros,
            query: e.target.value
        });
    };
    /** Actualiza el filtro de estado seleccionado */
    const handleEstadoChange = (estado) => {
        onFiltrosChange({
            ...filtros,
            estado: estado
        });
    };
    return (_jsx("div", { className: "mb-5 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex-shrink-0", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Buscar Pedido" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Buscar por c\u00F3digo, cliente o producto...", value: filtros.query, onChange: handleSearchChange, className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200" })] })] }), _jsxs("div", { className: "lg:w-auto", children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Filtrar por Estado" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleEstadoChange('preparacion'), className: `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${filtros.estado === 'preparacion'
                                        ? 'bg-red-600 text-white shadow-md hover:bg-red-700'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:border-red-300 hover:bg-red-50'}`, children: "En Preparaci\u00F3n" }), _jsx("button", { onClick: () => handleEstadoChange('completado'), className: `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${filtros.estado === 'completado'
                                        ? 'bg-green-500 text-white shadow-md hover:bg-green-600'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:border-green-300 hover:bg-green-50'}`, children: "Completados" }), _jsx("button", { onClick: () => handleEstadoChange(undefined), className: `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${!filtros.estado
                                        ? 'bg-yellow-400 text-white shadow-md hover:bg-yellow-500'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-200 hover:bg-gray-50'}`, children: "Todos" })] })] })] }) }));
};
