/**
 * FiltrosPedidos - Barra de búsqueda y filtros de estado
 * Permite buscar pedidos por código, cliente o producto
 * y filtrar por estado (preparación, completado, todos)
 */
import React from 'react';
import type { FiltrosPedidos as FiltrosType } from '../types/pedidos';
import { Search } from 'lucide-react';

interface FiltrosPedidosProps {
  filtros: FiltrosType;
  onFiltrosChange: (filtros: FiltrosType) => void;
}

export const FiltrosPedidos: React.FC<FiltrosPedidosProps> = ({
  filtros,
  onFiltrosChange,
}) => {
  /** Actualiza el texto de búsqueda */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({
      ...filtros,
      query: e.target.value
    });
  };

  /** Actualiza el filtro de estado seleccionado */
  const handleEstadoChange = (estado: string | undefined) => {
    onFiltrosChange({
      ...filtros,
      estado: estado as any
    });
  };

  return (
    <div className="mb-5 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex-shrink-0">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Campo de búsqueda */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Buscar Pedido
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, cliente o producto..."
              value={filtros.query}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Botones de filtro por estado */}
        <div className="lg:w-auto">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filtrar por Estado
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleEstadoChange('preparacion')}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                filtros.estado === 'preparacion' 
                  ? 'bg-red-600 text-white shadow-md hover:bg-red-700' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              En Preparación
            </button>
            <button
              onClick={() => handleEstadoChange('completado')}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                filtros.estado === 'completado' 
                  ? 'bg-green-500 text-white shadow-md hover:bg-green-600' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              Completados
            </button>
            <button
              onClick={() => handleEstadoChange(undefined)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !filtros.estado 
                  ? 'bg-primary-500 text-white shadow-md hover:bg-primary-600' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};