import React, { useState, useRef, useEffect } from 'react';
import { OrdersList } from './components/OrdersList';

export default function OrdersUserPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilters(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Pedidos</h1>
            <p className="text-sm text-gray-600">Revisa y realiza tus pedidos</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Buscar pedido por nombre o tienda..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                  <circle cx="10.5" cy="10.5" r="6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="relative" ref={filterRef}>
              <button onClick={() => setShowFilters(prev => !prev)} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Filtrar
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-3 w-56 z-50">
                  <p className="text-sm font-semibold mb-2">Estado</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => { setStatusFilter(undefined); setShowFilters(false); }} className={`text-left px-3 py-1 rounded ${statusFilter === undefined ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>Todos</button>
                    <button onClick={() => { setStatusFilter('preparacion'); setShowFilters(false); }} className={`text-left px-3 py-1 rounded ${statusFilter === 'preparacion' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>En proceso</button>
                    <button onClick={() => { setStatusFilter('entregado'); setShowFilters(false); }} className={`text-left px-3 py-1 rounded ${statusFilter === 'entregado' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>Entregado</button>
                    <button onClick={() => { setStatusFilter('cancelado'); setShowFilters(false); }} className={`text-left px-3 py-1 rounded ${statusFilter === 'cancelado' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>Cancelado</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Recientes</h2>

        <OrdersList query={query} status={statusFilter} />
      </div>
    </div>
  );
}
