/**
 * inventario.ts - Definiciones de tipos para el módulo de inventario
 * Contiene interfaces para productos, categorías, filtros y estados de stock
 */
/** Cantidad de items por página en la paginación */
export const ITEMS_PER_PAGE = 6;
/** Umbral porcentual para considerar stock bajo (20% del stock mínimo) */
export const UMBRAL_STOCK_BAJO = 0.2;
/**
 * Determina el estado del stock basado en la cantidad actual
 */
export const getEstadoStock = (stock, stockMinimo) => {
    if (stock === 0)
        return 'agotado';
    if (stock <= stockMinimo)
        return 'stock-bajo';
    return 'disponible';
};
/**
 * Colores asociados a cada categoría
 */
export const COLORES_CATEGORIA = {
    'Almuerzo': 'bg-red-100 text-red-700',
    'Desayuno': 'bg-yellow-100 text-yellow-700',
    'Bebidas': 'bg-blue-100 text-blue-700',
    'Snacks': 'bg-purple-100 text-purple-700',
    'Postres': 'bg-pink-100 text-pink-700',
    'Combos': 'bg-green-100 text-green-700',
};
