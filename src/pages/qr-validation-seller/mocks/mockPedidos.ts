/**
 * mockPedidos.ts - Datos de prueba para el módulo de validación QR
 */
import type { Pedido, ResumenPedidos } from '../types/pedidos';

export const mockPedidos: Pedido[] = [
  {
    id: '1',
    codigo: 'A182C3D4E',
    nombreCliente: 'David Salamanca',
    telefonoCliente: '+57 300 123 4567',
    horaEntrega: '3:30 PM',
    estado: 'preparacion',
    productos: [
      { id: '1', nombre: 'Hamburguesa Clásica', cantidad: 2, precioUnitario: 15000 },
      { id: '2', nombre: 'Papas Fritas Grandes', cantidad: 1, precioUnitario: 8000 },
      { id: '3', nombre: 'Gaseosa Personal', cantidad: 2, precioUnitario: 4000 },
    ],
    total: 46000,
    metodoPago: 'digital',
    pagado: true,
    fechaCreacion: '2024-01-20',
  },
  {
    id: '2', 
    codigo: 'E1F2G3H4I',
    nombreCliente: 'Tomas Ramirez',
    telefonoCliente: '+57 301 234 5678',
    horaEntrega: '4:30 PM',
    estado: 'preparacion',
    productos: [
      { id: '4', nombre: 'Pizza Mediana', cantidad: 1, precioUnitario: 25000 },
      { id: '5', nombre: 'Alitas BBQ Picantes', cantidad: 1, precioUnitario: 18000 },
    ],
    total: 43000,
    metodoPago: 'efectivo',
    pagado: false,
    fechaCreacion: '2024-01-20',
    observaciones: 'Sin picante en las alitas, por favor',
  },
  {
    id: '3',
    codigo: 'B2C3D4E5F',
    nombreCliente: 'Carmen Aguilar',
    telefonoCliente: '+57 302 345 6789',
    horaEntrega: '5:30 PM',
    estado: 'completado',
    productos: [
      { id: '6', nombre: 'Ensalada César', cantidad: 1, precioUnitario: 12000 },
      { id: '7', nombre: 'Jugo Natural', cantidad: 1, precioUnitario: 6000 },
    ],
    total: 18000,
    metodoPago: 'tarjeta',
    pagado: true,
    fechaCreacion: '2024-01-20',
  },
  {
    id: '4',
    codigo: 'C3D4E5F6G',
    nombreCliente: 'David Salamanca',
    telefonoCliente: '+57 300 123 4567',
    horaEntrega: '6:00 PM',
    estado: 'preparacion',
    productos: [
      { id: '8', nombre: 'Pizza Mediana', cantidad: 2, precioUnitario: 25000 },
      { id: '9', nombre: 'Gaseosa Personal', cantidad: 2, precioUnitario: 4000 },
    ],
    total: 58000,
    metodoPago: 'tarjeta',
    pagado: true,
    fechaCreacion: '2024-01-20',
    observaciones: 'Entregar en recepción',
  },
  {
    id: '5',
    codigo: 'D4E5F6G7H',
    nombreCliente: 'Tomas Ramirez',
    telefonoCliente: '+57 301 234 5678',
    horaEntrega: '6:30 PM',
    estado: 'completado',
    productos: [
      { id: '10', nombre: 'Hamburguesa Clásica', cantidad: 1, precioUnitario: 15000 },
      { id: '11', nombre: 'Papas Fritas Grandes', cantidad: 1, precioUnitario: 8000 },
    ],
    total: 23000,
    metodoPago: 'efectivo',
    pagado: true,
    fechaCreacion: '2024-01-20',
  },
  {
    id: '6',
    codigo: 'E5F6G7H8I',
    nombreCliente: 'Carmen Aguilar',
    telefonoCliente: '+57 302 345 6789',
    horaEntrega: '7:00 PM',
    estado: 'preparacion',
    productos: [
      { id: '12', nombre: 'Ensalada César', cantidad: 2, precioUnitario: 12000 },
      { id: '13', nombre: 'Jugo Natural', cantidad: 2, precioUnitario: 6000 },
      { id: '14', nombre: 'Papas Fritas Grandes', cantidad: 1, precioUnitario: 8000 },
    ],
    total: 44000,
    metodoPago: 'digital',
    pagado: false,
    fechaCreacion: '2024-01-20',
  },
  {
    id: '7',
    codigo: 'F6G7H8I9J',
    nombreCliente: 'David Salamanca',
    telefonoCliente: '+57 300 123 4567',
    horaEntrega: '7:30 PM',
    estado: 'completado',
    productos: [
      { id: '15', nombre: 'Pizza Mediana', cantidad: 1, precioUnitario: 25000 },
      { id: '16', nombre: 'Alitas BBQ Picantes', cantidad: 1, precioUnitario: 18000 },
    ],
    total: 43000,
    metodoPago: 'tarjeta',
    pagado: true,
    fechaCreacion: '2024-01-20',
  },
  {
    id: '8',
    codigo: 'G7H8I9J0K',
    nombreCliente: 'Tomas Ramirez',
    telefonoCliente: '+57 301 234 5678',
    horaEntrega: '8:00 PM',
    estado: 'preparacion',
    productos: [
      { id: '17', nombre: 'Hamburguesa Clásica', cantidad: 3, precioUnitario: 15000 },
      { id: '18', nombre: 'Papas Fritas Grandes', cantidad: 2, precioUnitario: 8000 },
      { id: '19', nombre: 'Gaseosa Personal', cantidad: 3, precioUnitario: 4000 },
    ],
    total: 73000,
    metodoPago: 'digital',
    pagado: true,
    fechaCreacion: '2024-01-20',
    observaciones: 'Favor tocar el timbre',
  },
  {
    id: '9',
    codigo: 'H8I9J0K1L',
    nombreCliente: 'Carmen Aguilar',
    telefonoCliente: '+57 302 345 6789',
    horaEntrega: '8:30 PM',
    estado: 'completado',
    productos: [
      { id: '20', nombre: 'Ensalada César', cantidad: 1, precioUnitario: 12000 },
    ],
    total: 12000,
    metodoPago: 'efectivo',
    pagado: true,
    fechaCreacion: '2024-01-20',
  },
];

/**
 * Calcula el resumen de pedidos
 */
export const calcularResumenPedidos = (pedidos: Pedido[]): ResumenPedidos => {
  return {
    completados: pedidos.filter(p => p.estado === 'completado').length,
    pendientes: pedidos.filter(p => p.estado === 'preparacion').length,
    total: pedidos.length,
  };
};