import { Clock, ChevronRight } from 'lucide-react';
import type { ProximoPedido } from '../types';

interface ProximosPedidosProps {
  pedidos: ProximoPedido[];
  onVerDetalle?: (pedidoId: string) => void;
}

export function ProximosPedidos({ pedidos, onVerDetalle }: ProximosPedidosProps) {
  if (pedidos.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#262626]">Próximos pedidos</h2>
      
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <button
            key={pedido.id}
            onClick={() => onVerDetalle?.(pedido.id)}
            className="w-full bg-[#E8F8FC] hover:bg-[#d8f0f7] rounded-2xl p-4 sm:p-5 transition-colors flex items-center gap-4"
          >
            {/* Icono de estado */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#5AC7E1] rounded-full flex items-center justify-center">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-xs text-center mt-1 font-semibold text-[#5AC7E1]">
                Pendiente
              </div>
            </div>

            {/* Información del pedido */}
            <div className="flex-1 text-left">
              <h3 className="font-bold text-[#262626] text-base sm:text-lg mb-1">
                {pedido.titulo}
              </h3>
              
              {/* Vendedor con avatar */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-[#262626] font-medium">{pedido.vendedor}</span>
              </div>
              
              {/* Tiempo estimado */}
              <p className="text-sm text-gray-600">{pedido.tiempoEstimado}</p>
            </div>

            {/* Icono de navegación */}
            <div className="flex-shrink-0">
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
