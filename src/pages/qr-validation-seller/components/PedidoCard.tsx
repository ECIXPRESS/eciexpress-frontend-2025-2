import React, { useState } from 'react';
import { Clock, DollarSign, Phone, CreditCard, CheckCircle, Eye, RotateCcw, Package, User } from 'lucide-react';
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
  const [isFlipped, setIsFlipped] = useState(false);
  const resumen = pedido.productos.slice(0, 2).map(p => `${p.cantidad}x ${p.nombre}`).join(', ');
  const restantes = Math.max(pedido.productos.length - 2, 0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onVerDetalles(pedido.id);
  };

  /** Frente de la tarjeta */
  const CardFront = () => (
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
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span className="capitalize">{pedido.metodoPago}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${pedido.pagado ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {pedido.pagado ? 'Pagado' : 'Pendiente'}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
          <p className="font-semibold text-amber-600 mb-1">{pedido.productos.length} producto(s)</p>
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
            onClick={handleFlip}
            className="w-full bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Ver detalles
          </button>
          <button
            onClick={() => onValidar(pedido.id)}
            disabled={pedido.estado !== 'preparacion'}
            className={`w-full rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              pedido.estado === 'preparacion'
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg'
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

  /** Reverso de la tarjeta */
  const CardBack = () => (
    <div className="h-full flex flex-col">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-t-2xl">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0 mr-2">
            <h3 className="font-bold text-lg truncate">{pedido.nombreCliente}</h3>
            <p className="text-sm text-amber-100">Pedido #{pedido.codigo}</p>
          </div>
          <button 
            onClick={handleFlip}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
          <span className="text-sm text-amber-100">Total</span>
          <div className="flex items-center text-2xl font-bold">
            <DollarSign className="w-6 h-6" />
            <span>{pedido.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Información del cliente */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 text-sm mb-2">Información del Cliente</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                Cliente
              </span>
              <span className="font-semibold text-gray-900">{pedido.nombreCliente}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono
              </span>
              <span className="font-semibold text-gray-900">{pedido.telefonoCliente}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora entrega
              </span>
              <span className="font-semibold text-gray-900">{pedido.horaEntrega}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Método pago
              </span>
              <span className="font-semibold text-gray-900 capitalize">{pedido.metodoPago}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Estado pago</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                pedido.pagado ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {pedido.pagado ? 'Pagado' : 'Pendiente'}
              </span>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 text-sm mb-2">Productos</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            {pedido.productos.map((producto, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-700">{producto.nombre}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {producto.cantidad}x ${producto.precioUnitario.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Observaciones */}
        {pedido.observaciones && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-yellow-800 mb-1">Observaciones</p>
            <p className="text-sm text-yellow-900">{pedido.observaciones}</p>
          </div>
        )}
      </div>

      {/* Footer con acción */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => onValidar(pedido.id)}
          disabled={pedido.estado !== 'preparacion'}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg ${
            pedido.estado === 'preparacion'
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {pedido.estado === 'preparacion' ? 'Entregar Pedido' : 'Pedido Entregado'}
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="relative w-full h-[420px]"
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 ease-in-out ${
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Cara frontal */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardFront />
          </div>
        </div>
        {/* Cara posterior */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-xl">
            <CardBack />
          </div>
        </div>
      </div>
    </div>
  );
};