/**
 * FiltrosInventario - Barra de búsqueda y filtros
 * Permite buscar productos y filtrar por categoría o estado de stock
 */
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { FiltrosInventario as FiltrosType, CategoriaProducto, EstadoStock } from '../types/inventario';

interface FiltrosInventarioProps {
  filtros: FiltrosType;
  onFiltrosChange: (filtros: FiltrosType) => void;
}

const CATEGORIAS: CategoriaProducto[] = [
  'Almuerzo',
  'Desayuno',
  'Bebidas',
  'Snacks',
  'Postres',
  'Combos'
];

const ESTADOS_STOCK: { value: EstadoStock; label: string }[] = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'stock-bajo', label: 'Stock Bajo' },
  { value: 'agotado', label: 'Agotado' },
];

export const FiltrosInventario: React.FC<FiltrosInventarioProps> = ({
  filtros,
  onFiltrosChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({
      ...filtros,
      query: e.target.value
    });
  };

  const handleCategoriaChange = (categoria: CategoriaProducto | undefined) => {
    onFiltrosChange({
      ...filtros,
      categoria
    });
  };

  const handleEstadoChange = (estado: EstadoStock | undefined) => {
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

  return (
    <div className="mb-5 flex-shrink-0">
      {/* Barra principal */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Campo de búsqueda */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Buscar Producto
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

          {/* Botón de filtros */}
          <div className="lg:w-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filtros Avanzados
            </label>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                ${showFilters || hasActiveFilters
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros</span>
              {hasActiveFilters && (
                <span className="bg-white text-primary-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {(filtros.categoria ? 1 : 0) + (filtros.estadoStock ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Panel de filtros expandible */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Filtro por categoría */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoriaChange(undefined)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      !filtros.categoria
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Todas
                  </button>
                  {CATEGORIAS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoriaChange(cat)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        filtros.categoria === cat
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro por estado de stock */}
              <div className="lg:w-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado de Stock
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEstadoChange(undefined)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      !filtros.estadoStock
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Todos
                  </button>
                  {ESTADOS_STOCK.map((estado) => (
                    <button
                      key={estado.value}
                      onClick={() => handleEstadoChange(estado.value)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        filtros.estadoStock === estado.value
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {estado.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botón limpiar filtros */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};
