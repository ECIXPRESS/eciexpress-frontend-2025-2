/**
 * index.ts - Barrel file del módulo qr-validation-seller
 * Exporta todos los componentes y tipos del módulo para facilitar importaciones
 * Uso: import { PedidosList, Pedido } from '@pages/qr-validation-seller';
 */

// Componentes de lista y visualización de pedidos
export { PedidosList } from './components/PedidosList';
export { PedidoCard } from './components/PedidoCard';
export { PedidoListItem } from './components/PedidoListItem';
export { PedidoModal } from './components/PedidoModal';

// Modales de validación
export { ValidationModal } from './components/ValidationModal';
export { SuccessModal } from './components/SuccessModal';
export { ErrorModal } from './components/ErrorModal';

// Componentes de navegación y filtros
export { EstadoNavigation } from './components/EstadoNavigation';
export { FiltrosPedidos } from './components/FiltrosPedidos';
export { ViewSelector } from './components/ViewSelector';

// Componentes de paginación
export { Pagination } from './components/Pagination';
export { SlideNavigation } from './components/SlideNavigation';

// Tipos exportados para uso externo
export type { 
  Pedido, 
  ResumenPedidos as ResumenPedidosType, 
  FiltrosPedidos as FiltrosPedidosType,
  VistaType
} from './types/pedidos';