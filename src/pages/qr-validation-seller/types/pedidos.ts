import type { EstadoPedido } from '@shared';

export interface ProductoPedido {
  id: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  observaciones?: string;
  imagen?: string;
  categoria?: string;
}

export interface Pedido {
  id: string;
  codigo: string;
  nombreCliente: string;
  telefonoCliente: string;
  horaEntrega: string;
  estado: EstadoPedido; // Ahora usa 'preparacion' en lugar de 'pendiente'
  productos: ProductoPedido[];
  total: number;
  observaciones?: string;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia' | 'digital';
  pagado: boolean;
  fechaCreacion: string;
  tiempoPreparacion?: number; // en minutos
}

export interface ResumenPedidos {
  completados: number;
  pendientes: number;
  total: number;
}

export interface FiltrosPedidos {
  query: string;
  estado?: EstadoPedido;
  fecha?: string;
}

// Para el módulo QR
export interface QRValidationResult {
  valid: boolean;
  status: 'paid' | 'pending' | 'used' | 'expired' | 'invalid';
  order?: Pedido;
  message: string;
}

export interface DeliveryRecord {
  id: string;
  orderId: string;
  vendorId: string;
  deliveryTime: string;
  deliveryType: 'qr' | 'manual';
  paymentMethod: string;
  totalAmount: number;
  reason?: string;
}

export type VistaType = 'grid' | 'list';

export const ITEMS_PER_PAGE = 3;