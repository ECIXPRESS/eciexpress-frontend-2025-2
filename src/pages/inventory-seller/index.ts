/**
 * index.ts - Barrel file del módulo inventory-seller
 * Exporta todos los componentes y tipos del módulo para facilitar importaciones
 */

// Componentes de lista y visualización de productos
export { ProductosList } from './components/ProductosList';
export { ProductoCard } from './components/ProductoCard';
export { ProductoListItem } from './components/ProductoListItem';
export { ProductoModal } from './components/ProductoModal';

// Modal de edición de stock
export { StockEditModal } from './components/StockEditModal';

// Componentes de navegación y filtros
export { EstadoNavigation } from './components/EstadoNavigation';
export { FiltrosInventario } from './components/FiltrosInventario';
export { ViewSelector } from './components/ViewSelector';

// Componentes de paginación
export { Pagination } from './components/Pagination';
export { SlideNavigation } from './components/SlideNavigation';

// Componentes UI base
export { Card } from './components/Card';
export { StockBadge, CategoriaBadge } from './components/Badge';

// Notificaciones
export { SuccessToast } from './components/SuccessToast';

// Tipos exportados para uso externo
export type { 
  Producto, 
  ResumenInventario,
  FiltrosInventario as FiltrosInventarioType,
  VistaType,
  EstadoStock,
  CategoriaProducto,
  HistorialStock
} from './types/inventario';

// Utilidades y constantes
export { 
  getEstadoStock, 
  ITEMS_PER_PAGE, 
  UMBRAL_STOCK_BAJO,
  COLORES_CATEGORIA 
} from './types/inventario';
