/**
 * pedidos.ts - Tipos para el módulo de validación QR
 */
export interface ProductoPedido {
  id: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export type EstadoPedido = 'preparacion' | 'completado';
export type MetodoPago = 'digital' | 'efectivo' | 'tarjeta';

export interface Pedido {
  id: string;
  codigo: string;
  nombreCliente: string;
  telefonoCliente: string;
  horaEntrega: string;
  estado: EstadoPedido;
  productos: ProductoPedido[];
  total: number;
  metodoPago: MetodoPago;
  pagado: boolean;
  fechaCreacion: string;
  observaciones?: string;
}

export interface ResumenPedidos {
  completados: number;
  pendientes: number;
  total: number;
}

export interface FiltrosPedidos {
  query: string;
  estado?: EstadoPedido;
}