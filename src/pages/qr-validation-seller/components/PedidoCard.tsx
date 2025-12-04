/**
 * PedidoCard - Tarjeta de pedido con efecto flip para vista cuadrícula
 * Frente: Vista resumida con imagen y datos principales
 * Reverso: Vista detallada con información completa del pedido
 */
import React, { useState } from 'react';
import type { Pedido } from '../types/pedidos';
import { Card, Badge } from '../../../utils/qr-validation-seller';
import { 
  Clock, 
  User, 
  Phone, 
  CreditCard, 
  CheckCircle, 
  RotateCcw,
  DollarSign
} from 'lucide-react';

interface PedidoCardProps {
  pedido: Pedido;
  onValidar?: (id: string) => void;
  onVerDetalles?: (id: string) => void;
}

/** Mapeo de emojis por categoría de producto */
const emojisProductos: { [key: string]: string } = {
  hamburguesa: '🍔',
  pizza: '🍕',
  ensalada: '🥗',
  bebida: '🥤',
  papas: '🍟',
  alitas: '🍗',
  postre: '🍰',
  default: '📦'
};

/** Obtiene la ruta de imagen según el tipo de producto */
const getImagenRealProducto = (nombre: string): string => {
  const nombreLower = nombre.toLowerCase();
  if (nombreLower.includes('hamburguesa')) return '/src/assets/qr-validation-seller/productos/1.jpg';
  if (nombreLower.includes('pizza')) return '/src/assets/qr-validation-seller/productos/2.jpg';
  if (nombreLower.includes('ensalada')) return '/src/assets/qr-validation-seller/productos/3.jpg';
  return '/src/assets/qr-validation-seller/productos/1.jpg';
};

/** Obtiene el emoji correspondiente al producto */
const getEmojiProducto = (nombre: string): string => {
  const nombreLower = nombre.toLowerCase();
  if (nombreLower.includes('hamburguesa')) return emojisProductos.hamburguesa;
  if (nombreLower.includes('pizza')) return emojisProductos.pizza;
  if (nombreLower.includes('ensalada')) return emojisProductos.ensalada;
  if (nombreLower.includes('gaseosa') || nombreLower.includes('jugo') || nombreLower.includes('bebida')) return emojisProductos.bebida;
  if (nombreLower.includes('papas')) return emojisProductos.papas;
  if (nombreLower.includes('alitas')) return emojisProductos.alitas;
  if (nombreLower.includes('postre')) return emojisProductos.postre;
  return emojisProductos.default;
};

export const PedidoCard: React.FC<PedidoCardProps> = ({ 
  pedido, 
  onValidar,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleValidar = () => {
    onValidar?.(pedido.id);
    setIsFlipped(false);
  };

  const productoPrincipal = pedido.productos[0];

  /** Frente de la tarjeta - Vista resumida */
  const CardFront = () => (
    <div className="h-full flex flex-col">
      {/* Imagen del producto con badge de estado */}
      <div className="relative h-52 overflow-hidden rounded-t-xl">
        <img 
          src={getImagenRealProducto(productoPrincipal.nombre)} 
          alt={productoPrincipal.nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        {/* Fallback con emoji si la imagen falla */}
        <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
          <span className="text-6xl">{getEmojiProducto(productoPrincipal.nombre)}</span>
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge estado={pedido.estado} />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
          {pedido.nombreCliente}
        </h3>
        
        <p className="text-sm text-gray-500 mb-3">
          Pedido #{pedido.codigo}
        </p>

        {/* Hora y precio */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1.5 text-primary-500" />
            <span className="font-medium">{pedido.horaEntrega}</span>
          </div>
          
          <div className="flex items-center text-lg font-bold text-primary-600">
            <DollarSign className="w-5 h-5" />
            <span>{pedido.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Lista de productos (máximo 2) */}
        <div className="mb-3 flex-grow">
          <div className="space-y-2">
            {pedido.productos.slice(0, 2).map((producto, index) => (
              <div key={index} className="flex items-start text-sm">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-primary-600">{producto.cantidad}x</span>
                  <span className="text-gray-700 ml-1">{producto.nombre}</span>
                </div>
              </div>
            ))}
            {pedido.productos.length > 2 && (
              <p className="text-xs text-gray-500 italic">
                +{pedido.productos.length - 2} producto(s) más
              </p>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 mt-auto">
          <button 
            onClick={handleFlip}
            className="flex-1 bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-500 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center"
          >
            Ver Detalles
          </button>
          {pedido.estado === 'preparacion' && (
            <button 
              onClick={handleValidar}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <CheckCircle className="w-4 h-4 mr-1.5" />
              Entregar
            </button>
          )}
        </div>
      </div>
    </div>
  );

  /** Reverso de la tarjeta - Vista detallada */
  const CardBack = () => (
    <div className="h-full flex flex-col">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-xl">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">Pedido #{pedido.codigo}</h3>
            <p className="text-sm text-primary-100">{pedido.nombreCliente}</p>
          </div>
          <button 
            onClick={handleFlip}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        
        {/* Total */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
          <span className="text-sm text-primary-100">Total del Pedido</span>
          <div className="flex items-center text-2xl font-bold">
            <DollarSign className="w-6 h-6" />
            <span>{pedido.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Información de contacto */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 text-sm mb-2">Información de Contacto</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center text-sm">
              <User className="w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" />
              <span className="font-medium text-gray-900">{pedido.nombreCliente}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" />
              <span className="text-gray-700">{pedido.telefonoCliente}</span>
            </div>
          </div>
        </div>

        {/* Detalles de entrega */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 text-sm mb-2">Detalles de Entrega</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2.5">
              <div className="flex items-center text-gray-600">
                <Clock className="w-3.5 h-3.5 mr-2" />
                <span>Hora de entrega</span>
              </div>
              <span className="font-semibold text-gray-900">{pedido.horaEntrega}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2.5">
              <div className="flex items-center text-gray-600">
                <CreditCard className="w-3.5 h-3.5 mr-2" />
                <span>Método de pago</span>
              </div>
              <span className={`font-semibold ${pedido.pagado ? 'text-green-600' : 'text-orange-600'}`}>
                {pedido.pagado ? 'Pagado' : 'Pendiente'} • {pedido.metodoPago}
              </span>
            </div>
          </div>
        </div>

        {/* Lista completa de productos */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 text-sm mb-2">Productos Ordenados</h4>
          <div className="space-y-2">
            {pedido.productos.map((producto, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">
                      <span className="text-primary-600">{producto.cantidad}x</span> {producto.nombre}
                    </p>
                    {producto.observaciones && (
                      <p className="text-xs text-gray-500 mt-1">{producto.observaciones}</p>
                    )}
                  </div>
                  <span className="font-bold text-sm text-primary-600 ml-2 flex-shrink-0">
                    ${(producto.cantidad * producto.precioUnitario).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Observaciones del pedido */}
        {pedido.observaciones && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-yellow-800 mb-1">Observaciones del Pedido</p>
            <p className="text-sm text-yellow-900">{pedido.observaciones}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div 
      className="relative w-full h-[500px]"
      style={{ perspective: '1000px' }}
    >
      {/* Contenedor con transformación 3D para el flip */}
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
          <Card className="h-full hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden">
            <CardFront />
          </Card>
        </div>
        {/* Cara posterior */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Card className="h-full hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden">
            <CardBack />
          </Card>
        </div>
      </div>
    </div>
  );
};