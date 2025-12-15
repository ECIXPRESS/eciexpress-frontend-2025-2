import React from 'react';
import { Clock, DollarSign, Phone, CreditCard, CheckCircle, Eye } from 'lucide-react';
import type { Pedido } from '../types/pedidos';
import { Badge } from '@/utils/qr-validation.seller/Components/UI/Badge';

interface PedidoCardProps {
  pedido: Pedido;
  onValidar: (id: string) => void;
  onVerDetalles: (id: string) => void;
}

const getImagenProducto = (nombre: string): string => {
  const n = nombre.toLowerCase();
  if (n.includes('hamburguesa')) return '/src/assets/qr-validation-seller/productos/1.jpg';
  if (n.includes('pizza')) return '/src/assets/qr-validation-seller/productos/2.jpg';
  if (n.includes('ensalada')) return '/src/assets/qr-validation-seller/productos/3.jpg';
  return '/src/assets/qr-validation-seller/productos/1.jpg';
};

export const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, onValidar, onVerDetalles }) => {
  const resumen = pedido.productos.slice(0, 2).map(p => `${p.cantidad}x ${p.nombre}`).join(', ');
  const restantes = Math.max(pedido.productos.length - 2, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-40">
        <img src={getImagenProducto(pedido.productos[0].nombre)} alt={pedido.productos[0].nombre} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <Badge estado={pedido.estado} />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span>{pedido.horaEntrega}</span>
          </div>
          <div className="flex items-center gap-1 text-lg font-bold">
            <DollarSign className="w-5 h-5" />
            <span>{pedido.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase text-gray-400 font-semibold">Pedido #{pedido.codigo}</p>
            <h3 className="text-lg font-bold text-gray-900 truncate">{pedido.nombreCliente}</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="truncate">{pedido.telefonoCliente}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-gray-600">
            <div className="flex items-center gap-1 font-semibold text-gray-800">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span className="capitalize">{pedido.metodoPago}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${pedido.pagado ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {pedido.pagado ? 'Pagado' : 'Pendiente'}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
          <p className="font-semibold text-blue-600 mb-1">{pedido.productos.length} producto(s)</p>
          <p className="text-gray-600 leading-snug">
            {resumen}
            {restantes > 0 && ` +${restantes} más`}
          </p>
        </div>

        {pedido.observaciones && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
            {pedido.observaciones}
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            onClick={() => onVerDetalles(pedido.id)}
            className="w-full bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Ver detalles
          </button>
          <button
            onClick={() => onValidar(pedido.id)}
            disabled={pedido.estado !== 'preparacion'}
            className={`w-full rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              pedido.estado === 'preparacion'
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            {pedido.estado === 'preparacion' ? 'Entregar' : 'Entregado'}
          </button>
        </div>
      </div>
    </div>
  );
};