/**
 * mockProductos.ts - Datos de prueba para el módulo de inventario
 */
import type { Producto, ResumenInventario } from '../types/inventario';

export const mockProductos: Producto[] = [
  {
    id: '1',
    nombre: 'Hamburguesa Clásica',
    descripcion: 'Deliciosa hamburguesa con carne de res, lechuga, tomate y salsa especial',
    precio: 15000,
    stock: 25,
    stockMinimo: 10,
    categoria: 'Almuerzo',
    disponible: true,
    fechaActualizacion: '2025-01-15T10:30:00Z',
    unidadMedida: 'unidades'
  },
  {
    id: '2',
    nombre: 'Arepa con Huevo',
    descripcion: 'Arepa tradicional rellena de huevo frito',
    precio: 5500,
    stock: 8,
    stockMinimo: 15,
    categoria: 'Desayuno',
    disponible: true,
    fechaActualizacion: '2025-01-15T08:00:00Z',
    unidadMedida: 'unidades'
  },
  {
    id: '3',
    nombre: 'Jugo Natural de Naranja',
    descripcion: 'Jugo 100% natural de naranja recién exprimido',
    precio: 4000,
    stock: 0,
    stockMinimo: 20,
    categoria: 'Bebidas',
    disponible: false,
    fechaActualizacion: '2025-01-14T16:45:00Z',
    unidadMedida: 'vasos'
  },
  {
    id: '4',
    nombre: 'Empanada de Carne',
    descripcion: 'Empanada crujiente rellena de carne molida sazonada',
    precio: 3500,
    stock: 45,
    stockMinimo: 20,
    categoria: 'Snacks',
    disponible: true,
    fechaActualizacion: '2025-01-15T09:15:00Z',
    unidadMedida: 'unidades'
  },
  {
    id: '5',
    nombre: 'Brownie de Chocolate',
    descripcion: 'Brownie casero con trozos de chocolate y nueces',
    precio: 4500,
    stock: 12,
    stockMinimo: 10,
    categoria: 'Postres',
    disponible: true,
    fechaActualizacion: '2025-01-15T07:30:00Z',
    unidadMedida: 'porciones'
  },
  {
    id: '6',
    nombre: 'Combo Ejecutivo',
    descripcion: 'Plato del día + bebida + postre a precio especial',
    precio: 18500,
    stock: 5,
    stockMinimo: 10,
    categoria: 'Combos',
    disponible: true,
    fechaActualizacion: '2025-01-15T11:00:00Z',
    unidadMedida: 'combos'
  },
  {
    id: '7',
    nombre: 'Sándwich de Pollo',
    descripcion: 'Sándwich con pechuga de pollo, queso, lechuga y mayonesa',
    precio: 12000,
    stock: 18,
    stockMinimo: 15,
    categoria: 'Almuerzo',
    disponible: true,
    fechaActualizacion: '2025-01-15T10:00:00Z',
    unidadMedida: 'unidades'
  },
  {
    id: '8',
    nombre: 'Café Americano',
    descripcion: 'Café negro preparado con granos seleccionados',
    precio: 2500,
    stock: 100,
    stockMinimo: 30,
    categoria: 'Bebidas',
    disponible: true,
    fechaActualizacion: '2025-01-15T06:00:00Z',
    unidadMedida: 'tazas'
  },
  {
    id: '9',
    nombre: 'Papas Fritas',
    descripcion: 'Porción de papas fritas crujientes con sal',
    precio: 5000,
    stock: 3,
    stockMinimo: 25,
    categoria: 'Snacks',
    disponible: true,
    fechaActualizacion: '2025-01-15T12:30:00Z',
    unidadMedida: 'porciones'
  },
  {
    id: '10',
    nombre: 'Torta de Zanahoria',
    descripcion: 'Torta húmeda de zanahoria con frosting de queso crema',
    precio: 5500,
    stock: 0,
    stockMinimo: 8,
    categoria: 'Postres',
    disponible: false,
    fechaActualizacion: '2025-01-14T18:00:00Z',
    unidadMedida: 'porciones'
  },
  {
    id: '11',
    nombre: 'Huevos Pericos',
    descripcion: 'Huevos revueltos con tomate y cebolla, estilo colombiano',
    precio: 6000,
    stock: 30,
    stockMinimo: 15,
    categoria: 'Desayuno',
    disponible: true,
    fechaActualizacion: '2025-01-15T07:00:00Z',
    unidadMedida: 'porciones'
  },
  {
    id: '12',
    nombre: 'Combo Estudiante',
    descripcion: 'Hamburguesa + papas + gaseosa a precio especial',
    precio: 16000,
    stock: 20,
    stockMinimo: 10,
    categoria: 'Combos',
    disponible: true,
    fechaActualizacion: '2025-01-15T11:30:00Z',
    unidadMedida: 'combos'
  },
];

/**
 * Calcula el resumen del inventario basado en los productos
 */
export const calcularResumen = (productos: Producto[]): ResumenInventario => {
  return {
    total: productos.length,
    stockBajo: productos.filter(p => p.stock > 0 && p.stock <= p.stockMinimo).length,
    disponibles: productos.filter(p => p.stock > p.stockMinimo).length,
    agotados: productos.filter(p => p.stock === 0).length,
  };
};
