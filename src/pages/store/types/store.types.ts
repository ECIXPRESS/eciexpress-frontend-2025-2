/**
 * store.types.ts - Definiciones de tipos para el módulo de tienda
 * Contiene interfaces para tiendas, productos y horarios
 */

/**
 * Tipo de categoría de tienda
 */
export type StoreCategory = 'cafeteria' | 'papeleria';

/**
 * Horarios de operación de la tienda
 */
export interface StoreSchedule {
  weekday: string;  // ej: "Lunes - Viernes"
  hours: string;    // ej: "7:00 am - 5:30 pm"
}

/**
 * Información de ubicación de la tienda
 */
export interface StoreLocation {
  description: string;  // ej: "Enfrente del edificio D"
  latitude?: number;
  longitude?: number;
}

/**
 * Producto de la tienda
 */
export interface StoreProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  time?: number | null;  // Tiempo de preparación en minutos (null para papelería)
  image?: string;
  isFavorite?: boolean;
}

/**
 * Información completa de una tienda
 */
export interface Store {
  id: number;
  name: string;
  category: StoreCategory;
  rating: number;
  image?: string;
  schedules: StoreSchedule[];
  location: StoreLocation;
  products: StoreProduct[];
}
