import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Download, Calendar } from 'lucide-react';
import DatePicker from './DatePicker';
import StatsCard from './StatsCard';
import WeeklySalesChart from './WeeklySalesChart';
import StockChart from './StockChart';
import TopProductsTable from './TopProductsTable';
import DailySalesChart from './DailySalesChart';
import ExportModal from './ExportModal';
import { mockSummaryReport, mockTopProducts, mockWeeklySalesData, mockStockByCategory, mockDailySalesData } from '../mock/statisticsMock';
import { statisticsService } from '../hooks/statisticsService';
export default function SellerStats() {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
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
        await statisticsService.exportAllStatistics('STORE-01', format);
    };
    const handleFilter = () => {
        console.log('Filtrando con:', { startDate, endDate, selectedProduct });
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#F6F6F6] p-4 md:p-6", children: [_jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsx("h1", { className: "text-3xl font-bold text-yellow-400", children: "Estad\u00EDsticas" }), _jsxs("button", { onClick: () => setIsExportModalOpen(true), className: "flex items-center justify-center gap-2 bg-[#5AC7E1] hover:bg-[#4ab5cf] text-white px-6 py-3 rounded-2xl font-medium transition-colors shadow-md", children: [_jsx(Download, { className: "w-5 h-5" }), "Exportar"] })] }), _jsx("div", { className: "bg-white rounded-2xl p-6 shadow-sm", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Fecha inicio" }), _jsxs("div", { className: "relative", ref: startPickerRef, children: [_jsx("input", { type: "text", placeholder: "dd/mm/yy", readOnly: true, value: formatDisplay(startDate), onClick: () => setShowStartPicker(prev => !prev), className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent cursor-pointer" }), _jsx("button", { type: "button", onClick: () => setShowStartPicker(prev => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/0 hover:bg-gray-50 transition-colors", children: _jsx(Calendar, { className: "w-5 h-5 text-gray-400" }) }), showStartPicker && (_jsx("div", { className: "absolute z-50 right-0 mt-2 w-72", children: _jsx(DatePicker, { value: startDate, onChange: (v) => { setStartDate(v); setShowStartPicker(false); } }) }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Fecha fin" }), _jsxs("div", { className: "relative", ref: endPickerRef, children: [_jsx("input", { type: "text", placeholder: "dd/mm/yy", readOnly: true, value: formatDisplay(endDate), onClick: () => setShowEndPicker(prev => !prev), className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent cursor-pointer" }), _jsx("button", { type: "button", onClick: () => setShowEndPicker(prev => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/0 hover:bg-gray-50 transition-colors", children: _jsx(Calendar, { className: "w-5 h-5 text-gray-400" }) }), showEndPicker && (_jsx("div", { className: "absolute z-50 right-0 mt-2 w-72", children: _jsx(DatePicker, { value: endDate, onChange: (v) => { setEndDate(v); setShowEndPicker(false); } }) }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Producto" }), _jsx("input", { type: "text", placeholder: "Buscar producto...", value: selectedProduct, onChange: (e) => setSelectedProduct(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent" })] }), _jsx("div", { className: "flex items-end", children: _jsx("button", { onClick: handleFilter, className: "w-full bg-yellow-400 hover:bg-yellow-500 text-[#FFFFFF] font-medium px-6 py-2 rounded-xl transition-colors", children: "Filtrar" }) })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(StatsCard, { icon: DollarSign, iconColor: "bg-[#5AC7E1]", title: "Ingresos totales", value: `$${mockSummaryReport.totalRevenue.toLocaleString('es-CO')}` }), _jsx(StatsCard, { icon: ShoppingBag, iconColor: "bg-yellow-400", title: "Total ventas", value: mockSummaryReport.totalOrders.toLocaleString('es-CO') }), _jsx(StatsCard, { icon: TrendingUp, iconColor: "bg-green-500", title: "Ventas vs Semana", value: "+24%" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(WeeklySalesChart, { data: mockWeeklySalesData }), _jsx(StockChart, { data: mockStockByCategory })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(TopProductsTable, { products: mockTopProducts }), _jsx(DailySalesChart, { data: mockDailySalesData })] })] }), _jsx(ExportModal, { isOpen: isExportModalOpen, onClose: () => setIsExportModalOpen(false), onExport: handleExport })] }));
}
