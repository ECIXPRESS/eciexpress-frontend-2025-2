import { Store } from '../types/store.types';
import reggioImg from '@/assets/stores/reggio.png';
import harviesImg from '@/assets/stores/harvies.png';
import arepasImg from '@/assets/stores/arepas.png';
import paperflashImg from '@/assets/stores/paperFlash.png';
import fondeciImg from '@/assets/stores/fondeci.png';
import papeleriaUImg from '@/assets/stores/papeleriaU.png';

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
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
      },
      {
        id: 2,
        name: 'Pechuga a la plancha',
        description: 'Pechuga, papas y gaseosa',
        price: 17800,
        rating: 4.1,
        time: 15,
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop',
      },
      {
        id: 3,
        name: 'Carne a la plancha',
        description: 'Carne, papas y gaseosa',
        price: 17800,
        rating: 4.4,
        time: 15,
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop',
      },
      {
        id: 4,
        name: 'Salchipapa',
        description: 'Salchipapa y gaseosa',
        price: 10400,
        rating: 4.0,
        time: 15,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop',
      },
      {
        id: 5,
        name: 'Perro caliente',
        description: 'Perro caliente con salsas',
        price: 8500,
        rating: 3.8,
        time: 10,
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop',
      },
      {
        id: 6,
        name: 'Arepa con queso',
        description: 'Arepa con queso a la plancha',
        price: 6000,
        rating: 5.0,
        time: 8,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop',
      },
      {
        id: 7,
        name: 'Pastel de pollo',
        description: 'Pastel de hojaldre relleno de pollo',
        price: 5500,
        rating: 4.0,
        time: 5,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
      },
      {
        id: 8,
        name: 'Empanada de pollo',
        description: 'Empanada frita rellena de pollo',
        price: 3000,
        rating: 3.7,
        time: 5,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop',
      },
      {
        id: 10,
        name: 'Pasta boloñesa',
        description: 'Espagueti con salsa boloñesa y gaseosa',
        price: 13200,
        rating: 4.5,
        time: 15,
        image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=400&fit=crop',
      },
      {
        id: 13,
        name: 'Impresión a Color',
        description: 'Impresión a color en hoja oficio',
        price: 1000,
        rating: 4.0,
        time: null,
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop',
      },
      {
        id: 14,
        name: 'Carne a la plancha',
        description: 'Carne, papas y gaseosa',
        price: 17800,
        rating: 4.4,
        time: null,
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop',
      },
      {
        id: 15,
        name: 'Salchipapa',
        description: 'Salchipapa y gaseosa',
        price: 10400,
        rating: 4.0,
        time: null,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop',
      },
      {
        id: 16,
        name: 'Perro caliente',
        description: 'Perro caliente con salsas',
        price: 8500,
        rating: 3.8,
        time: null,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop',
      },
      {
        id: 17,
        name: 'Arepa con queso',
        description: 'Arepa con queso a la plancha',
        price: 6000,
        rating: 5.0,
        time: null,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop',
      },
      {
        id: 18,
        name: 'Pastel de pollo',
        description: 'Pastel de hojaldre relleno de pollo',
        price: 5500,
        rating: 4.0,
        time: null,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
      },
      {
        id: 19,
        name: 'Empanada de pollo',
        description: 'Empanada frita rellena de pollo',
        price: 3000,
        rating: 3.7,
        time: null,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop',
      },
    ],
  },
};
