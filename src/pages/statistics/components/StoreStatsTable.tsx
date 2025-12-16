import { TrendingUp } from 'lucide-react';
import { StoreStats } from '../types/statistics.types';

interface StoreStatsTableProps {
  stores: StoreStats[];
}

export default function StoreStatsTable({ stores }: StoreStatsTableProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#262626]">Estadísticas por Tienda</h3>
        <button className="text-[#5AC7E1] text-sm font-medium hover:underline">
          Ver más
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Cafetería</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Ventas</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Pedidos</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Calificación</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Crecimiento</th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.storeName} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 font-medium text-[#262626]">{store.storeName}</td>
                <td className="py-4 px-2 text-right font-semibold text-[#262626]">
                  ${(store.sales / 1000000).toFixed(1)}M
                </td>
                <td className="py-4 px-2 text-right text-gray-600">{store.orders.toLocaleString('es-CO')}</td>
                <td className="py-4 px-2 text-right text-gray-600">{store.rating}</td>
                <td className="py-4 px-2 text-right">
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    +{store.growth}%
                  </span>
                </td>
                <td className="py-4 px-2 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    store.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {store.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}