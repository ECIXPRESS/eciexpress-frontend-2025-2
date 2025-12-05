/**
 * inventario.ts - Definiciones de tipos para el módulo de inventario
 * Contiene interfaces para productos, categorías, filtros y estados de stock
 */

/**
 * Estado del stock de un producto
 */
export type EstadoStock = 'disponible' | 'stock-bajo' | 'agotado';

/**
 * Categoría de producto disponible en la cafetería
 */
export type CategoriaProducto = 
  | 'Almuerzo'
  | 'Desayuno'
  | 'Bebidas'
  | 'Snacks'
  | 'Postres'
  | 'Combos';

/**
 * Producto individual del inventario
 */
export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  stockMinimo: number;              // Umbral para alertas de stock bajo
  categoria: CategoriaProducto;
  imagen?: string;
  disponible: boolean;
  fechaActualizacion: string;
  unidadMedida?: string;            // ej: 'unidades', 'porciones', 'litros'
}

/**
 * Resumen de conteo de productos por estado de stock
 * Usado en EstadoNavigation para mostrar totales
 */
export interface ResumenInventario {
  total: number;
  stockBajo: number;
  disponibles: number;
  agotados: number;
}

/**
 * Filtros aplicables a la lista de productos
 */
export interface FiltrosInventario {
  query: string;                     // Texto de búsqueda
  categoria?: CategoriaProducto;     // Filtro por categoría
  estadoStock?: EstadoStock;         // Filtro por estado de stock
}

/**
 * Historial de cambios de stock
 */
export interface HistorialStock {
  id: string;
  productoId: string;
  cantidadAnterior: number;
  cantidadNueva: number;
  fecha: string;
  motivo?: string;
  usuario?: string;
}

/** Tipos de vista disponibles para la lista de productos */
export type VistaType = 'grid' | 'list';

/** Cantidad de items por página en la paginación */
export const ITEMS_PER_PAGE = 6;

/** Umbral porcentual para considerar stock bajo (20% del stock mínimo) */
export const UMBRAL_STOCK_BAJO = 0.2;

/**
 * Determina el estado del stock basado en la cantidad actual
 */
export const getEstadoStock = (stock: number, stockMinimo: number): EstadoStock => {
  if (stock === 0) return 'agotado';
  if (stock <= stockMinimo) return 'stock-bajo';
  return 'disponible';
};

/**
 * Colores asociados a cada categoría
 */
export const COLORES_CATEGORIA: Record<CategoriaProducto, string> = {
  'Almuerzo': 'bg-red-100 text-red-700',
  'Desayuno': 'bg-yellow-100 text-yellow-700',
  'Bebidas': 'bg-blue-100 text-blue-700',
  'Snacks': 'bg-purple-100 text-purple-700',
  'Postres': 'bg-pink-100 text-pink-700',
  'Combos': 'bg-green-100 text-green-700',
};
