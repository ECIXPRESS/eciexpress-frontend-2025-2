import type { Movement } from '../types';

interface MovementsListProps {
  movimientos: Movement[];
}

export function MovementsList({ movimientos }: MovementsListProps) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#262626]">Movimientos</h2>
      
      {/* Encabezado */}
      <div className="hidden sm:grid grid-cols-3 gap-4 mb-4 px-4 bg-gradient-to-r from-[#FDDF65] to-[#f5d74e] rounded-xl py-3">
        <div className="text-white font-bold">Tipo</div>
        <div className="text-white font-bold text-center">Fecha</div>
        <div className="text-white font-bold text-right">Acciones</div>
      </div>

      {/* Lista de movimientos */}
      <div className="space-y-2">
        {movimientos.map((movimiento) => (
          <div 
            key={movimiento.id} 
            className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 gap-3 sm:gap-4 items-center px-3 sm:px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              {movimiento.tipo === 'recarga' ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <div className="sm:contents">
                <span className="font-medium text-sm sm:text-base text-[#262626]">{movimiento.descripcion}</span>
                <span className="text-xs sm:hidden text-gray-500 block">{movimiento.fecha}</span>
              </div>
            </div>
            
            <div className="hidden sm:block text-center text-gray-600">
              {movimiento.fecha}
            </div>
            
            <div className="text-right">
              <button className="text-gray-500 hover:text-gray-700 p-1">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
