/**
 * ProductoCard - Tarjeta de producto con efecto flip para vista cuadrícula
 * Frente: Vista resumida con imagen y datos principales
 * Reverso: Vista detallada con información de stock y acciones
 */
import React, { useState } from 'react';
import type { Producto } from '../types/inventario';
import { getEstadoStock } from '../types/inventario';
import { Card } from './Card';
import { StockBadge, CategoriaBadge } from './Badge';
import { 
  DollarSign, 
  Package, 
  RotateCcw,
  Edit3,
  AlertTriangle
} from 'lucide-react';

interface ProductoCardProps {
  producto: Producto;
  onEditStock: (id: string) => void;
  onVerDetalles: (id: string) => void;
}

/** Obtiene la ruta de imagen según la categoría */
const getImagenProducto = (producto: Producto): string => {
  if (producto.imagen) return producto.imagen;
  
  const categoriaLower = producto.categoria.toLowerCase();
  if (categoriaLower.includes('almuerzo')) return '/src/assets/qr-validation-seller/productos/1.jpg';
  if (categoriaLower.includes('desayuno')) return '/src/assets/qr-validation-seller/productos/2.jpg';
  if (categoriaLower.includes('bebidas')) return '/src/assets/qr-validation-seller/productos/3.jpg';
  return '/src/assets/qr-validation-seller/productos/1.jpg';
};

export const ProductoCard: React.FC<ProductoCardProps> = ({ 
  producto, 
  onEditStock,
  onVerDetalles,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const estadoStock = getEstadoStock(producto.stock, producto.stockMinimo);

  const handleFlip = () => setIsFlipped(!isFlipped);

  /** Frente de la tarjeta */
  const CardFront = () => (
    <div className="h-full flex flex-col">
      {/* Imagen del producto con badges */}
      <div className="relative h-44 overflow-hidden rounded-t-xl">
        <img 
          src={getImagenProducto(producto)} 
          alt={producto.nombre}
          className="w-full h-full object-cover"
        />
        
        {/* Badge de categoría */}
        <div className="absolute top-3 left-3">
          <CategoriaBadge categoria={producto.categoria} />
        </div>

        {/* Badge de stock bajo */}
        {estadoStock === 'stock-bajo' && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Stock Bajo
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
          {producto.nombre}
        </h3>
        
        {producto.descripcion && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {producto.descripcion}
          </p>
        )}

        {/* Precio y stock */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <div className="flex items-center text-lg font-bold text-primary-600">
            <DollarSign className="w-5 h-5" />
            <span>{producto.precio.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Stock:</span>
            <input
              type="number"
              value={producto.stock}
              readOnly
              className="w-14 text-center text-sm font-semibold border border-gray-300 rounded-lg py-1 bg-gray-50"
            />
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
          <button 
            onClick={() => onEditStock(producto.id)}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <Edit3 className="w-4 h-4 mr-1.5" />
            Editar
          </button>
        </div>
      </div>
    </div>
  );

  /** Reverso de la tarjeta */
  const CardBack = () => (
    <div className="h-full flex flex-col">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-xl">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0 mr-2">
            <h3 className="font-bold text-lg truncate">{producto.nombre}</h3>
            <p className="text-sm text-primary-100">{producto.categoria}</p>
          </div>
          <button 
            onClick={handleFlip}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
          <span className="text-sm text-primary-100">Precio</span>
          <div className="flex items-center text-2xl font-bold">
            <DollarSign className="w-6 h-6" />
            <span>{producto.precio.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Estado del stock */}
        <div className="mb-4">
          <h4 className="font-bold text-gray-900 text-sm mb-2">Estado del Stock</h4>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Estado actual</span>
              <StockBadge estado={estadoStock} />
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Cantidad disponible</span>
              <span className="font-bold text-gray-900">{producto.stock} unidades</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Stock mínimo</span>
              <span className="font-semibold text-gray-700">{producto.stockMinimo} unidades</span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        {producto.descripcion && (
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 text-sm mb-2">Descripción</h4>
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              {producto.descripcion}
            </p>
          </div>
        )}

        {/* Última actualización */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-800 mb-1">Última actualización</p>
          <p className="text-sm text-blue-900">
            {new Date(producto.fechaActualizacion).toLocaleDateString('es-CO', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Footer con acción */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => onEditStock(producto.id)}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Editar Stock
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
