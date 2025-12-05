/**
 * ProductoListItem - Componente de producto para vista de lista
 * Muestra información resumida del producto en formato horizontal
 */
import React from 'react';
import type { Producto } from '../types/inventario';
import { getEstadoStock } from '../types/inventario';
import { StockBadge, CategoriaBadge } from './Badge';
import { DollarSign, Eye, Edit3, Package } from 'lucide-react';

interface ProductoListItemProps {
  producto: Producto;
  onEditStock: (id: string) => void;
  onVerDetalles: (id: string) => void;
}

const getImagenProducto = (producto: Producto): string => {
  if (producto.imagen) return producto.imagen;
  const categoriaLower = producto.categoria.toLowerCase();
  if (categoriaLower.includes('almuerzo')) return '/src/assets/qr-validation-seller/productos/1.jpg';
  if (categoriaLower.includes('desayuno')) return '/src/assets/qr-validation-seller/productos/2.jpg';
  return '/src/assets/qr-validation-seller/productos/1.jpg';
};

export const ProductoListItem: React.FC<ProductoListItemProps> = ({
  producto,
  onEditStock,
  onVerDetalles,
}) => {
  const estadoStock = getEstadoStock(producto.stock, producto.stockMinimo);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center p-4 gap-4">
        {/* Imagen del producto */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-visible">
          <img
            src={getImagenProducto(producto)}
            alt={producto.nombre}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute -top-2 -left-2">
            <CategoriaBadge categoria={producto.categoria} />
          </div>
        </div>

        {/* Información principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="font-bold text-gray-900 text-lg truncate">
                {producto.nombre}
              </h3>
              {producto.descripcion && (
                <p className="text-sm text-gray-500 truncate">
                  {producto.descripcion}
                </p>
              )}
            </div>
            {/* Precio */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-center text-xl font-bold text-primary-600">
                <DollarSign className="w-5 h-5" />
                <span>{producto.precio.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Stock y estado */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Stock:</span>
              <span className="font-bold text-gray-900">{producto.stock}</span>
            </div>
            <StockBadge estado={estadoStock} />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => onVerDetalles(producto.id)}
            className="bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-500 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-w-[130px]"
          >
            <Eye className="w-4 h-4" />
            Ver Detalles
          </button>
          <button
            onClick={() => onEditStock(producto.id)}
            className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg min-w-[130px]"
          >
            <Edit3 className="w-4 h-4" />
            Editar Stock
          </button>
        </div>
      </div>
    </div>
  );
};
