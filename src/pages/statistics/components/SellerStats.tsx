import { useState, useRef, useEffect } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Download, Calendar } from 'lucide-react';
import DatePicker from './DatePicker';
import StatsCard from './StatsCard';
import WeeklySalesChart from './WeeklySalesChart';
import StockChart from './StockChart';
import TopProductsTable from './TopProductsTable';
import DailySalesChart from './DailySalesChart';
import ExportModal from './ExportModal';
import { 
  mockSummaryReport, 
  mockTopProducts, 
  mockWeeklySalesData,
  mockStockByCategory,
  mockDailySalesData
} from '../mock/statisticsMock';
import { statisticsService } from '../hooks/statisticsService';

export default function SellerStats() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const startPickerRef = useRef<HTMLDivElement | null>(null);
  const endPickerRef = useRef<HTMLDivElement | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startPickerRef.current && !startPickerRef.current.contains(e.target as Node)) {
        setShowStartPicker(false);
      }
      if (endPickerRef.current && !endPickerRef.current.contains(e.target as Node)) {
        setShowEndPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplay = (d: string) => {
    if (!d) return '';
    try {
      const [y, m, day] = d.split('-');
      return `${day}/${m}/${y.slice(2)}`;
    } catch { return d; }
  };

  const handleExport = async (format: 'pdf' | 'excel') => {
    await statisticsService.exportAllStatistics('STORE-01', format);
  };

  const handleFilter = () => {
    console.log('Filtrando con:', { startDate, endDate, selectedProduct });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-yellow-400">Estadísticas</h1>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#5AC7E1] hover:bg-[#4ab5cf] text-white px-6 py-3 rounded-2xl font-medium transition-colors shadow-md"
          >
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha inicio</label>
              <div className="relative" ref={startPickerRef}>
                <input
                  type="text"
                  placeholder="dd/mm/yy"
                  readOnly
                  value={formatDisplay(startDate)}
                  onClick={() => setShowStartPicker(prev => !prev)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent cursor-pointer"
                />
                <button type="button" onClick={() => setShowStartPicker(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/0 hover:bg-gray-50 transition-colors">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </button>

                {showStartPicker && (
                  <div className="absolute z-50 right-0 mt-2 w-72">
                    <DatePicker value={startDate} onChange={(v) => { setStartDate(v); setShowStartPicker(false); }} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha fin</label>
              <div className="relative" ref={endPickerRef}>
                <input
                  type="text"
                  placeholder="dd/mm/yy"
                  readOnly
                  value={formatDisplay(endDate)}
                  onClick={() => setShowEndPicker(prev => !prev)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent cursor-pointer"
                />
                <button type="button" onClick={() => setShowEndPicker(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/0 hover:bg-gray-50 transition-colors">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </button>

                {showEndPicker && (
                  <div className="absolute z-50 right-0 mt-2 w-72">
                    <DatePicker value={endDate} onChange={(v) => { setEndDate(v); setShowEndPicker(false); }} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
              <input
                type="text"
                placeholder="Buscar producto..."
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleFilter}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#FFFFFF] font-medium px-6 py-2 rounded-xl transition-colors"
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={DollarSign}
            iconColor="bg-[#5AC7E1]"
            title="Ingresos totales"
            value={`$${mockSummaryReport.totalRevenue.toLocaleString('es-CO')}`}
          />
          <StatsCard
            icon={ShoppingBag}
            iconColor="bg-yellow-400"
            title="Total ventas"
            value={mockSummaryReport.totalOrders.toLocaleString('es-CO')}
          />
          <StatsCard
            icon={TrendingUp}
            iconColor="bg-green-500"
            title="Ventas vs Semana"
            value="+24%"
          />
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklySalesChart data={mockWeeklySalesData} />
          <StockChart data={mockStockByCategory} />
        </div>

        {/* Top productos y ventas diarias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProductsTable products={mockTopProducts} />
          <DailySalesChart data={mockDailySalesData} />
        </div>
      </div>

      {/* Modal de exportación */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
}