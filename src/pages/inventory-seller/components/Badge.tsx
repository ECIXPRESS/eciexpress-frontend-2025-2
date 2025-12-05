/**
 * Badge - Componente para mostrar estado de stock y categorías
 */
import React from 'react';
import type { EstadoStock, CategoriaProducto } from '../types/inventario';
import { COLORES_CATEGORIA } from '../types/inventario';

interface StockBadgeProps {
  estado: EstadoStock;
}

interface CategoriaBadgeProps {
  categoria: CategoriaProducto;
}

/**
 * Badge para mostrar el estado del stock
 */
export const StockBadge: React.FC<StockBadgeProps> = ({ estado }) => {
  const config = {
    'disponible': {
      bg: 'bg-green-100',
      text: 'text-green-700',
      label: 'Disponible'
    },
    'stock-bajo': {
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      label: 'Stock Bajo'
    },
    'agotado': {
      bg: 'bg-red-100',
      text: 'text-red-700',
      label: 'Agotado'
    }
  };

  const { bg, text, label } = config[estado];

  return (
    <span className={`
      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
      ${bg} ${text}
    `}>
      {estado === 'stock-bajo' && (
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse" />
      )}
      {label}
    </span>
  );
};

/**
 * Badge para mostrar la categoría del producto
 */
export const CategoriaBadge: React.FC<CategoriaBadgeProps> = ({ categoria }) => {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
      ${COLORES_CATEGORIA[categoria]}
    `}>
      {categoria}
    </span>
  );
};
