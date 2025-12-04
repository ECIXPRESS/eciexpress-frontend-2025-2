/**
 * PedidoListItem - Componente de pedido para vista de lista
 * Muestra información resumida del pedido en formato horizontal
 */
import React from 'react';
import type { Pedido } from '../types/pedidos';
import { Badge } from '../../../utils/qr-validation-seller';
import { Clock, User, DollarSign, Eye, CheckCircle } from 'lucide-react';

interface PedidoListItemProps {
  pedido: Pedido;
  onValidar: (id: string) => void;
  onVerDetalles: (id: string) => void;
}

/**
 * Obtiene la ruta de imagen según el tipo de producto
 */
const getImagenProducto = (nombre: string): string => {
  const nombreLower = nombre.toLowerCase();
  if (nombreLower.includes('hamburguesa')) return '/src/assets/qr-validation-seller/productos/1.jpg';
  if (nombreLower.includes('pizza')) return '/src/assets/qr-validation-seller/productos/2.jpg';
  if (nombreLower.includes('ensalada')) return '/src/assets/qr-validation-seller/productos/3.jpg';
  return '/src/assets/qr-validation-seller/productos/1.jpg';
};

export const PedidoListItem: React.FC<PedidoListItemProps> = ({
  pedido,
  onValidar,
  onVerDetalles,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center p-4 gap-4">
        {/* Imagen del producto principal con badge de estado */}
        <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-visible">
          <img
            src={getImagenProducto(pedido.productos[0].nombre)}
            alt={pedido.productos[0].nombre}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute -top-2 -left-2">
            <Badge estado={pedido.estado} />
          </div>
        </div>

        {/* Información principal del pedido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="font-bold text-gray-900 text-lg truncate">
                {pedido.nombreCliente}
              </h3>
              <p className="text-sm text-gray-500">
                Pedido #{pedido.codigo}
              </p>
            </div>
            {/* Total del pedido */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-center text-xl font-bold text-primary-600">
                <DollarSign className="w-5 h-5" />
                <span>{pedido.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Hora y teléfono */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span className="font-medium">{pedido.horaEntrega}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">{pedido.telefonoCliente}</span>
            </div>
          </div>

          {/* Resumen de productos */}
          <div className="text-sm text-gray-700">
            <span className="font-semibold text-primary-600">{pedido.productos.length} producto(s): </span>
            <span className="text-gray-600">
              {pedido.productos.slice(0, 2).map(p => `${p.cantidad}x ${p.nombre}`).join(', ')}
              {pedido.productos.length > 2 && ` +${pedido.productos.length - 2} más`}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => onVerDetalles(pedido.id)}
            className="bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-500 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-w-[140px]"
          >
            <Eye className="w-4 h-4" />
            Ver Detalles
          </button>
          {pedido.estado === 'preparacion' && (
            <button
              onClick={() => onValidar(pedido.id)}
              className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg min-w-[140px]"
            >
              <CheckCircle className="w-4 h-4" />
              Entregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
