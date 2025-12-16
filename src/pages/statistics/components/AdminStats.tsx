import { useState } from 'react';
import { DollarSign, ShoppingBag, Users as UsersIcon, Download, Calendar } from 'lucide-react';
import StatsCard from './StatsCard';
import OrdersChart from './OrdersChart';
import UsersChart from './UsersChart';
import StoreStatsTable from './StoreStatsTable';
import ExportModal from './ExportModal';
import { 
  mockOrdersData,
  mockUsersData,
  mockStoreStats
} from '../mock/statisticsMock';
import { statisticsService } from '../hooks/statisticsService';

export default function AdminStats() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [activeTab, setActiveTab] = useState('Reggio');

  const handleExport = async (format: 'pdf' | 'excel') => {
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Punto de Venta</label>
              <input
                type="text"
                placeholder="Seleccionar tienda..."
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AC7E1] focus:border-transparent"
              />
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
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleFilter}
              className="bg-yellow-400 hover:bg-yellow-500 text-[#FFFFFF] font-medium px-8 py-2 rounded-xl transition-colors"
            >
              Filtrar
            </button>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={DollarSign}
            iconColor="bg-[#5AC7E1]"
            title="Ingresos totales"
            value={`$${totalRevenue.toLocaleString('es-CO')}`}
          />
          <StatsCard
            icon={ShoppingBag}
            iconColor="bg-yellow-400"
            title="Total pedidos"
            value={totalOrders.toLocaleString('es-CO')}
          />
          <StatsCard
            icon={UsersIcon}
            iconColor="bg-[#5AC7E1]"
            title="Total tiendas"
            value={totalStores}
          />
        </div>

        {/* Tabs y gráficos */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'text-[#5AC7E1] border-b-2 border-[#5AC7E1]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido de tabs */}
          <div className="p-6">
            <OrdersChart data={mockOrdersData} />
          </div>
        </div>

        {/* Usuarios y tabla de tiendas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UsersChart data={mockUsersData} />
          <StoreStatsTable stores={mockStoreStats} />
        </div>

        {/* Comparativa de ventas (placeholder) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#262626]">Comparativa de ventas</h3>
            <button className="text-[#5AC7E1] text-sm font-medium hover:underline">
              Ver más
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-400" />
              <span className="text-sm text-gray-600">Reggio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-400" />
              <span className="text-sm text-gray-600">Café Leyenda</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-400"></div>
              <span className="text-sm text-gray-600">Harvies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#FDDF65]"></div>
              <span className="text-sm text-gray-600">Cafetería I-H</span>
            </div>
          </div>
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