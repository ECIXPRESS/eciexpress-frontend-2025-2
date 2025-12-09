import { useState } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Download, Calendar } from 'lucide-react';
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
          <h1 className="text-3xl font-bold text-[#FDDF65]">Estadísticas</h1>
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="dd/mm/yy"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha fin</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="dd/mm/yy"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                className="w-full bg-[#FDDF65] hover:bg-[#f5d74e] text-[#262626] font-medium px-6 py-2 rounded-xl transition-colors"
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
            iconColor="bg-[#FDDF65]"
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
          <TopProductsTable products={mockTopProducts.slice(0, 2)} />
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