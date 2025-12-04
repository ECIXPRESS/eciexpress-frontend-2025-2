/**
 * index.ts - Barrel file del módulo shared
 * Exporta componentes UI, Layout y tipos compartidos
 * Uso: import { Card, Badge, Header } from '@shared';
 */

// Componentes UI
export { Card } from './components/UI/Card';
export { Badge } from './components/UI/Badge';

// Componentes de Layout
export { Header } from './components/layout/Header';
export { Container } from './components/layout/Container';

// Tipos compartidos
export type { 
  BaseComponentProps, 
  EstadoPedido, 
  ApiResponse, 
  FiltrosBusqueda 
} from './types/common';