import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { OrdersList } from './components/OrdersList';
export default function OrdersUserPage() {
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState(undefined);
    const [showFilters, setShowFilters] = useState(false);
    const filterRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target))
                setShowFilters(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (_jsx("div", { className: "p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-yellow-400", children: "Pedidos" }), _jsx("p", { className: "text-sm text-gray-600", children: "Revisa y realiza tus pedidos" })] }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsx("div", { className: "flex-1 mr-4", children: _jsxs("div", { className: "relative", children: [_jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), type: "text", placeholder: "Buscar pedido por nombre o tienda...", className: "pl-10 pr-4 py-2 rounded-xl border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400" }), _jsxs("svg", { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [_jsx("path", { strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-4.35-4.35" }), _jsx("circle", { cx: "10.5", cy: "10.5", r: "6.5", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] })] }) }), _jsxs("div", { className: "relative", ref: filterRef, children: [_jsxs("button", { onClick: () => setShowFilters(prev => !prev), className: "flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full", children: [_jsx(SlidersHorizontal, { className: "w-4 h-4" }), "Filtrar"] }), showFilters && (_jsxs("div", { className: "absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-3 w-56 z-50", children: [_jsx("p", { className: "text-sm font-semibold mb-2", children: "Estado" }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("button", { onClick: () => { setStatusFilter(undefined); setShowFilters(false); }, className: `text-left px-3 py-1 rounded ${statusFilter === undefined ? 'bg-yellow-50' : 'hover:bg-gray-50'}`, children: "Todos" }), _jsx("button", { onClick: () => { setStatusFilter('preparacion'); setShowFilters(false); }, className: `text-left px-3 py-1 rounded ${statusFilter === 'preparacion' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`, children: "En proceso" }), _jsx("button", { onClick: () => { setStatusFilter('entregado'); setShowFilters(false); }, className: `text-left px-3 py-1 rounded ${statusFilter === 'entregado' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`, children: "Entregado" }), _jsx("button", { onClick: () => { setStatusFilter('cancelado'); setShowFilters(false); }, className: `text-left px-3 py-1 rounded ${statusFilter === 'cancelado' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`, children: "Cancelado" })] })] }))] })] })] }), _jsx("h2", { className: "text-xl font-semibold mb-4", children: "Recientes" }), _jsx(OrdersList, { query: query, status: statusFilter })] }) }));
}
