import { Store } from '../types/store.types';
import reggioImg from '@/assets/stores/reggio.jpg';
import harviesImg from '@/assets/stores/harvies.jpg';
import arepasImg from '@/assets/stores/arepas.jpg';
import paperflashImg from '@/assets/stores/paperFlash.jpg';
import fondeciImg from '@/assets/stores/fondeci.jpg';
import papeleriaUImg from '@/assets/stores/papeleriaU.jpg';

export const storesMockData: Record<number, Store> = {
  1: {
    id: 1,
    name: 'Reggio',
    category: 'cafeteria',
    rating: 4.5,
    image: reggioImg,
    schedules: [
      {
        weekday: 'Lunes - Viernes',
        hours: '7:00 am - 5:30 pm',
      },
      {
        weekday: 'Sábado',
        hours: '7:00 am- 1:00 pm',
      },
    ],
    location: {
      description: 'Enfrente del edificio D',
    },
    products: [
      {
        id: 1,
        name: 'Combo de hamburguesa',
        description: 'Hamburguesa, papas y gaseosa',
        price: 15400,
        rating: 4.0,
        time: 15,
      },
      {
        id: 2,
        name: 'Pechuga a la plancha',
        description: 'Pechuga, papas y gaseosa',
        price: 17800,
        rating: 4.1,
        time: 15,
      },
      {
        id: 3,
        name: 'Carne a la plancha',
        description: 'Carne, papas y gaseosa',
        price: 17800,
        rating: 4.4,
        time: 15,
      },
      {
        id: 4,
        name: 'Salchipapa',
        description: 'Salchipapa y gaseosa',
        price: 10400,
        rating: 4.0,
        time: 15,
      },
      {
        id: 5,
        name: 'Perro caliente',
        description: 'Perro caliente con salsas',
        price: 8500,
        rating: 3.8,
        time: 10,
      },
      {
        id: 6,
        name: 'Arepa con queso',
        description: 'Arepa con queso a la plancha',
        price: 6000,
        rating: 5.0,
        time: 8,
      },
      {
        id: 7,
        name: 'Pastel de pollo',
        description: 'Pastel de hojaldre relleno de pollo',
        price: 5500,
        rating: 4.0,
        time: 5,
      },
      {
        id: 8,
        name: 'Empanada de pollo',
        description: 'Empanada frita rellena de pollo',
        price: 3000,
        rating: 3.7,
        time: 5,
      },
    ],
  },
  2: {
    id: 2,
    name: 'Harvies',
    category: 'cafeteria',
    rating: 4.3,
    image: harviesImg,
    schedules: [
      {
        weekday: 'Lunes - Viernes',
        hours: '7:00 am - 5:00 pm',
      },
      {
        weekday: 'Sábado',
        hours: '8:00 am - 12:00 pm',
      },
    ],
    location: {
      description: 'Al lado del edificio C',
    },
    products: [
      {
        id: 9,
        name: 'Lasaña',
        description: 'Lasaña de carne y gaseosa',
        price: 16400,
        rating: 4.2,
        time: 10,
      },
      {
        id: 10,
        name: 'Pasta boloñesa',
        description: 'Espagueti con salsa boloñesa y gaseosa',
        price: 13200,
        rating: 4.5,
        time: 15,
      },
    ],
  },
  3: {
    id: 3,
    name: 'Arepas',
    category: 'cafeteria',
    rating: 4.7,
    image: arepasImg,
    schedules: [
      {
        weekday: 'Lunes - Viernes',
        hours: '6:30 am - 4:00 pm',
      },
    ],
    location: {
      description: 'Plaza central',
    },
    products: [],
  },
  6: {
    id: 6,
    name: 'PaperFlash',
    category: 'papeleria',
    rating: 4.2,
    image: paperflashImg,
    schedules: [
      {
        weekday: 'Lunes - Viernes',
        hours: '7:00 am - 6:00 pm',
      },
      {
        weekday: 'Sábado',
        hours: '8:00 am - 2:00 pm',
      },
    ],
    location: {
      description: 'Edificio administrativo',
    },
    products: [
      {
        id: 11,
        name: 'Cuadernos argollados multicolor',
        description: '6 cuadernos de 100 hojas cuadriculadas',
        price: 7000,
        rating: 5.0,
        time: null,
      },
    ],
  },
  7: {
    id: 7,
    name: 'Fondeci',
    category: 'papeleria',
    rating: 4.6,
    image: fondeciImg,
    schedules: [
      {
        weekday: 'Lunes - Viernes',
        hours: '7:00 am - 5:30 pm',
      },
    ],
    location: {
      description: 'Al lado del edificio E',
    },
    products: [
      {
        id: 12,
        name: 'Termo de agua 1L',
        description: 'Capacidad de un litro.',
        price: 16000,
        rating: 4.0,
        time: null,
      },
      {
        id: 13,
        name: 'Impresión a Color',
        description: 'Impresión a color en hoja oficio',
        price: 1000,
        rating: 4.0,
        time: null,
      },
      {
        id: 14,
        name: 'Carne a la plancha',
        description: 'Carne, papas y gaseosa',
        price: 17800,
        rating: 4.4,
        time: null,
      },
      {
        id: 15,
        name: 'Salchipapa',
        description: 'Salchipapa y gaseosa',
        price: 10400,
        rating: 4.0,
        time: null,
      },
      {
        id: 16,
        name: 'Perro caliente',
        description: 'Perro caliente con salsas',
        price: 8500,
        rating: 3.8,
        time: null,
      },
      {
        id: 17,
        name: 'Arepa con queso',
        description: 'Arepa con queso a la plancha',
        price: 6000,
        rating: 5.0,
        time: null,
      },
      {
        id: 18,
        name: 'Pastel de pollo',
        description: 'Pastel de hojaldre relleno de pollo',
        price: 5500,
        rating: 4.0,
        time: null,
      },
      {
        id: 19,
        name: 'Empanada de pollo',
        description: 'Empanada frita rellena de pollo',
        price: 3000,
        rating: 3.7,
        time: null,
      },
    ],
  },
  8: {
    id: 8,
    name: 'Papelería U',
    category: 'papeleria',
    rating: 4.4,
    image: papeleriaUImg,
    schedules: [
      {
        weekday: 'Lunes - Viernes',
        hours: '7:00 am - 5:00 pm',
      },
    ],
    location: {
      description: 'Biblioteca central',
    },
    products: [
      {
        id: 20,
        name: 'Impresión a color',
        description: 'Impresión de una página a color en hoja oficio',
        price: 1000,
        rating: 4.4,
        time: null,
      },
    ],
  },
};
