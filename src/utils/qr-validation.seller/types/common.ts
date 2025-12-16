/**
 * common.ts - Tipos y definiciones compartidas entre módulos
 */

/** Props base para componentes presentacionales */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/** Estados posibles de un pedido */
export type EstadoPedido = 'preparacion' | 'completado' | 'validado';

/** Respuesta estándar de la API */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

/** Criterios de filtrado y búsqueda */
export interface FiltrosBusqueda {
  query: string;
  estado?: EstadoPedido;
  fecha?: string;
}