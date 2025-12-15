/**
 * ProductoListItem - Elemento de producto para vista de lista
 * Diseño horizontal compacto con toda la información visible
 */
import React from 'react';
import type { Producto } from '../types/inventario';
import { getEstadoStock } from '../types/inventario';
import { Card } from './Card';
import { StockBadge, CategoriaBadge } from './Badge';
import { 
  DollarSign, 
  Package, 
  Edit3,
  Eye,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

interface ProductoListItemProps {
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

export const ProductoListItem: React.FC<ProductoListItemProps> = ({ 
  producto, 
  onEditStock,
  onVerDetalles,
}) => {
  const estadoStock = getEstadoStock(producto.stock, producto.stockMinimo);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Imagen del producto */}
        <div className="relative flex-shrink-0 w-full sm:w-48 h-32 overflow-hidden rounded-lg">
          <img 
            src={getImagenProducto(producto)} 
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
          
          {/* Badge de categoría */}
          <div className="absolute top-2 left-2">
            <CategoriaBadge categoria={producto.categoria} />
          </div>

          {/* Badge de stock bajo */}
          {estadoStock === 'stock-bajo' && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Stock Bajo
              </span>
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-xl mb-1 truncate">
              {producto.nombre}
            </h3>
            
            {producto.descripcion && (
              <p className="text-sm text-gray-500 line-clamp-2">
                {producto.descripcion}
              </p>
            )}
          </div>

          {/* Información secundaria */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Precio */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Precio</span>
              <div className="flex items-center text-xl font-bold text-primary-600">
                <DollarSign className="w-5 h-5" />
                <span>{producto.precio.toLocaleString()}</span>
              </div>
            </div>

            {/* Stock */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Stock</span>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-lg font-bold text-gray-900">{producto.stock}</span>
                <span className="text-sm text-gray-500">unidades</span>
              </div>
            </div>

            {/* Estado */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Estado</span>
              <div className="flex items-start">
                <StockBadge estado={estadoStock} />
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 sm:gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-4 pt-4 sm:pt-0">
          <button 
            onClick={() => onVerDetalles(producto.id)}
            className="flex-1 sm:w-auto bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-500 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Ver Detalles</span>
          </button>
          <button 
            onClick={() => onEditStock(producto.id)}
            className="flex-1 sm:w-auto bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
          >
            <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Editar Stock</span>
          </button>
        </div>
      </div>
    </Card>
  );
};