/**
 * pedidos.ts - Definiciones de tipos para el módulo de validación QR
 * Contiene interfaces para pedidos, productos, filtros y resultados de validación
 */
import type { EstadoPedido } from '../../../utils/qr-validation-seller';

/**
 * Producto individual dentro de un pedido
 */
export interface ProductoPedido {
  id: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  observaciones?: string;
  imagen?: string;
  categoria?: string;
}

/**
 * Pedido completo con información del cliente, productos y estado
 */
export interface Pedido {
  id: string;
  codigo: string;                    // Código único del pedido (ej: 'A182C3D4E')
  nombreCliente: string;
  telefonoCliente: string;
  horaEntrega: string;
  estado: EstadoPedido;              // 'preparacion' | 'completado'
  productos: ProductoPedido[];
  total: number;
  observaciones?: string;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia' | 'digital';
  pagado: boolean;
  fechaCreacion: string;
  tiempoPreparacion?: number;        // Tiempo estimado en minutos
}

/**
 * Resumen de conteo de pedidos por estado
 * Usado en EstadoNavigation para mostrar totales
 */
export interface ResumenPedidos {
  completados: number;
  pendientes: number;
  total: number;
}

/**
 * Filtros aplicables a la lista de pedidos
 */
export interface FiltrosPedidos {
  query: string;                     // Texto de búsqueda
  estado?: EstadoPedido;             // Filtro por estado
  fecha?: string;                    // Filtro por fecha (opcional)
}

/**
 * Resultado de validación de código QR
 */
export interface QRValidationResult {
  valid: boolean;
  status: 'paid' | 'pending' | 'used' | 'expired' | 'invalid';
  order?: Pedido;
  message: string;
}

/**
 * Registro de entrega para historial
 */
export interface DeliveryRecord {
  id: string;
  orderId: string;
  vendorId: string;
  deliveryTime: string;
  deliveryType: 'qr' | 'manual';     // Método de validación usado
  paymentMethod: string;
  totalAmount: number;
  reason?: string;                   // Razón si hubo algún problema
}

/** Tipos de vista disponibles para la lista de pedidos */
export type VistaType = 'grid' | 'list';

/** Cantidad de items por página en la paginación */
export const ITEMS_PER_PAGE = 3;