import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users as UsersIcon, Download, Calendar } from 'lucide-react';
import DatePicker from './DatePicker';
import StatsCard from './StatsCard';
import OrdersChart from './OrdersChart';
import UsersChart from './UsersChart';
import StoreStatsTable from './StoreStatsTable';
import ExportModal from './ExportModal';
import { mockOrdersData, mockUsersData, mockStoreStats } from '../mock/statisticsMock';
import { statisticsService } from '../hooks/statisticsService';
export default function AdminStats() {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [activeTab, setActiveTab] = useState('Reggio');
    const startPickerRef = useRef(null);
    const endPickerRef = useRef(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (startPickerRef.current && !startPickerRef.current.contains(e.target)) {
                setShowStartPicker(false);
            }
            if (endPickerRef.current && !endPickerRef.current.contains(e.target)) {
                setShowEndPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const formatDisplay = (d) => {
        if (!d)
            return '';
        try {
            const [y, m, day] = d.split('-');
            return `${day}/${m}/${y.slice(2)}`;
        }
        catch {
            return d;
        }
    };
    const handleExport = async (format) => {
        await statisticsService.exportAllStatistics('ALL-STORES', format);
    };
    const handleFilter = () => {
        console.log('Filtrando con:', { startDate, endDate, selectedStore, selectedProduct });
    };
    // Calcular métricas totales desde mockStoreStats
    const totalRevenue = mockStoreStats.reduce((sum, store) => sum + store.sales, 0);
    const totalOrders = mockStoreStats.reduce((sum, store) => sum + store.orders, 0);
    const totalStores = mockStoreStats.filter(store => store.status === 'active').length;
    const tabs = ['Reggio', 'Café Leyenda', 'Harvies', 'Cafetería I-H', 'Papelería C', 'Papelería A'];
    return (_jsxs("div", { className: "min-h-screen bg-[#F6F6F6] p-4 md:p-6", children: [_jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsx("h1", { className: "text-3xl font-bold text-yellow-400", children: "Estad\u00EDsticas" }), _jsxs("button", { onClick: () => setIsExportModalOpen(true), className: "flex items-center justify-center gap-2 bg-[#5AC7E1] hover:bg-[#4ab5cf] text-white px-6 py-3 rounded-2xl font-medium transition-colors shadow-md", children: [_jsx(Download, { className: "w-5 h-5" }), "Exportar"] })] }), _jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Fecha inicio" }), _jsxs("div", { className: "relative", ref: startPickerRef, children: [_jsx("input", { type: "text", placeholder: "dd/mm/yy", readOnly: true, value: formatDisplay(startDate), onClick: () => setShowStartPicker(prev => !prev), className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent cursor-pointer" }), _jsx("button", { type: "button", onClick: () => setShowStartPicker(prev => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/0 hover:bg-gray-50 transition-colors", children: _jsx(Calendar, { className: "w-5 h-5 text-gray-400" }) }), showStartPicker && (_jsx("div", { className: "absolute z-50 right-0 mt-2 w-72", children: _jsx(DatePicker, { value: startDate, onChange: (v) => { setStartDate(v); setShowStartPicker(false); } }) }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Fecha fin" }), _jsxs("div", { className: "relative", ref: endPickerRef, children: [_jsx("input", { type: "text", placeholder: "dd/mm/yy", readOnly: true, value: formatDisplay(endDate), onClick: () => setShowEndPicker(prev => !prev), className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent cursor-pointer" }), _jsx("button", { type: "button", onClick: () => setShowEndPicker(prev => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/0 hover:bg-gray-50 transition-colors", children: _jsx(Calendar, { className: "w-5 h-5 text-gray-400" }) }), showEndPicker && (_jsx("div", { className: "absolute z-50 right-0 mt-2 w-72", children: _jsx(DatePicker, { value: endDate, onChange: (v) => { setEndDate(v); setShowEndPicker(false); } }) }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Punto de Venta" }), _jsx("input", { type: "text", placeholder: "Seleccionar tienda...", value: selectedStore, onChange: (e) => setSelectedStore(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Producto" }), _jsx("input", { type: "text", placeholder: "Buscar producto...", value: selectedProduct, onChange: (e) => setSelectedProduct(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent" })] })] }), _jsx("div", { className: "mt-4 flex justify-end", children: _jsx("button", { onClick: handleFilter, className: "bg-yellow-400 hover:bg-yellow-500 text-[#FFFFFF] font-medium px-8 py-2 rounded-xl transition-colors", children: "Filtrar" }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(StatsCard, { icon: DollarSign, iconColor: "bg-[#5AC7E1]", title: "Ingresos totales", value: `$${totalRevenue.toLocaleString('es-CO')}` }), _jsx(StatsCard, { icon: ShoppingBag, iconColor: "bg-yellow-400", title: "Total pedidos", value: totalOrders.toLocaleString('es-CO') }), _jsx(StatsCard, { icon: UsersIcon, iconColor: "bg-[#5AC7E1]", title: "Total tiendas", value: totalStores })] }), _jsxs("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden", children: [_jsx("div", { className: "border-b border-gray-200 overflow-x-auto", children: _jsx("div", { className: "flex", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                                            ? 'text-[#5AC7E1] border-b-2 border-[#5AC7E1]'
                                            : 'text-gray-500 hover:text-gray-700'}`, children: tab }, tab))) }) }), _jsx("div", { className: "p-6", children: _jsx(OrdersChart, { data: mockOrdersData }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(UsersChart, { data: mockUsersData }), _jsx(StoreStatsTable, { stores: mockStoreStats })] }), _jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-lg font-bold text-[#262626]", children: "Comparativa de ventas" }), _jsx("button", { className: "text-[#5AC7E1] text-sm font-medium hover:underline", children: "Ver m\u00E1s" })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 rounded bg-yellow-400" }), _jsx("span", { className: "text-sm text-gray-600", children: "Reggio" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 rounded bg-yellow-400" }), _jsx("span", { className: "text-sm text-gray-600", children: "Caf\u00E9 Leyenda" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 rounded bg-gray-400" }), _jsx("span", { className: "text-sm text-gray-600", children: "Harvies" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 rounded bg-yellow-400" }), _jsx("span", { className: "text-sm text-gray-600", children: "Cafeter\u00EDa I-H" })] })] })] })] }), _jsx(ExportModal, { isOpen: isExportModalOpen, onClose: () => setIsExportModalOpen(false), onExport: handleExport })] }));
}
