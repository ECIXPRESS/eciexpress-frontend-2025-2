import { Product, RelatedProduct } from '../types/product.types';

export const productsMock: Record<string, Product> = {
  'termo-agua-1l': {
    id: 'termo-agua-1l',
    name: 'Termo de agua 1L',
    description: 'Termo de agua con boquilla. Tiene una capacidad de 1L y una amarradera al lado.',
    price: 16000,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
    category: 'papeleria',
    stock: 15,
    rating: 4.0,
    reviewCount: 23,
    vendor: 'Fondeci',
    vendorLogo: '🏪',
    options: [
      {
        id: 'color',
        label: 'Color',
        values: ['Gris', 'Rojo', 'Azul']
      }
    ],
    tags: ['Nuevo', 'Popular']
  },

  'cuadernos-multicolor': {
    id: 'cuadernos-multicolor',
    name: 'Cuadernos argollados multicolor',
    description: '6 cuadernos de 100 hojas cuadriculadas con diseños coloridos ideales para organizar tus materias.',
    price: 7000,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
    category: 'papeleria',
    stock: 8,
    rating: 5.0,
    reviewCount: 45,
    vendor: 'Fondeci',
    vendorLogo: '🏪',
    tags: ['Oferta']
  },

  'impresion-color': {
    id: 'impresion-color',
    name: 'Impresión a color',
    description: 'Impresión de archivo en hoja tamaño oficio. Servicio de alta calidad con colores vibrantes.',
    price: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800',
    category: 'papeleria',
    stock: 50,
    rating: 4.4,
    reviewCount: 89,
    vendor: 'Fondeci',
    vendorLogo: '🏪',
    options: [
      {
        id: 'paperType',
        label: 'Tipo de hoja',
        values: ['Hoja Oficio', 'Hoja Carta']
      }
    ],
    preparationTime: 'Listo en 10 minutos'
  },

  'combo-hamburguesa-deluxe': {
    id: 'combo-hamburguesa-deluxe',
    name: 'Combo Hamburguesa Deluxe',
    description: 'Hamburguesa de 200g con queso cheddar, lechuga, tomate, cebolla caramelizada, tocino crujiente. Incluye papas fritas criollas y bebida a elección.',
    price: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    category: 'cafeteria',
    stock: 12,
    rating: 4.8,
    reviewCount: 156,
    vendor: 'Cafetería Central',
    vendorLogo: '☕',
    options: [
      {
        id: 'preparation',
        label: 'Término de carne',
        values: ['Término medio', 'Bien cocida', 'Jugosa']
      },
      {
        id: 'drink',
        label: 'Bebida',
        values: ['Coca-Cola', 'Agua', 'Jugo Natural', 'Té helado']
      },
      {
        id: 'extras',
        label: 'Extras',
        values: ['Sin extras', 'Doble queso (+$2000)', 'Tocineta extra (+$2500)', 'Aguacate (+$1500)']
      }
    ],
    tags: ['Mejor valorado', 'Combo'],
    preparationTime: 'Listo en 15-20 minutos'
  },

  'sandwich-pollo-pesto': {
    id: 'sandwich-pollo-pesto',
    name: 'Sándwich de Pollo al Pesto',
    description: 'Pechuga de pollo a la plancha con salsa pesto casera, tomate, rúgula y queso mozzarella en pan integral.',
    price: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800',
    category: 'cafeteria',
    stock: 8,
    rating: 4.6,
    reviewCount: 72,
    vendor: 'Cafetería Central',
    vendorLogo: '☕',
    options: [
      {
        id: 'bread',
        label: 'Tipo de pan',
        values: ['Integral', 'Blanco', 'Ciabatta']
      }
    ],
    tags: ['Saludable'],
    preparationTime: 'Listo en 10-12 minutos'
  },

  'cafe-latte': {
    id: 'cafe-latte',
    name: 'Café Latte Grande',
    description: 'Espresso doble con leche vaporizada y arte latte. Disponible con leche entera, deslactosada o vegetal.',
    price: 7500,
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
    category: 'cafeteria',
    stock: 25,
    rating: 4.9,
    reviewCount: 203,
    vendor: 'Cafetería Central',
    vendorLogo: '☕',
    options: [
      {
        id: 'milk',
        label: 'Tipo de leche',
        values: ['Entera', 'Deslactosada', 'Almendras', 'Soya']
      },
      {
        id: 'sweetener',
        label: 'Endulzante',
        values: ['Sin azúcar', 'Azúcar blanca', 'Stevia', 'Miel']
      }
    ],
    tags: ['Popular'],
    preparationTime: 'Listo en 5 minutos'
  }
};

export const relatedProductsMock: Record<string, RelatedProduct[]> = {
  'termo-agua-1l': [
    {
      id: 'cuadernos-multicolor',
      name: 'Cuadernos argollados multicolor',
      price: 7000,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      rating: 5.0,
      category: 'papeleria'
    },
    {
      id: 'impresion-color',
      name: 'Impresión a color',
      price: 1000,
      imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400',
      rating: 4.4,
      category: 'papeleria'
    },
    {
      id: 'cuadernos-multicolor',
      name: 'Cuadernos argollados',
      price: 7000,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      rating: 5.0,
      category: 'papeleria'
    }
  ],
  'cuadernos-multicolor': [
    {
      id: 'termo-agua-1l',
      name: 'Termo de agua 1L',
      price: 16000,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      rating: 4.0,
      category: 'papeleria'
    },
    {
      id: 'impresion-color',
      name: 'Impresión a color',
      price: 1000,
      imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400',
      rating: 4.4,
      category: 'papeleria'
    },
    {
      id: 'termo-agua-1l',
      name: 'Termo 1L',
      price: 16000,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      rating: 4.0,
      category: 'papeleria'
    }
  ],
  'impresion-color': [
    {
      id: 'cuadernos-multicolor',
      name: 'Cuadernos argollados multicolor',
      price: 7000,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      rating: 5.0,
      category: 'papeleria'
    },
    {
      id: 'termo-agua-1l',
      name: 'Termo de agua 1L',
      price: 16000,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      rating: 4.0,
      category: 'papeleria'
    },
    {
      id: 'cuadernos-multicolor',
      name: 'Cuadernos multicolor',
      price: 7000,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      rating: 5.0,
      category: 'papeleria'
    }
  ],
  'combo-hamburguesa-deluxe': [
    {
      id: 'sandwich-pollo-pesto',
      name: 'Sándwich de Pollo al Pesto',
      price: 12000,
      imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      rating: 4.6,
      category: 'cafeteria'
    },
    {
      id: 'cafe-latte',
      name: 'Café Latte Grande',
      price: 7500,
      imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
      rating: 4.9,
      category: 'cafeteria'
    },
    {
      id: 'sandwich-pollo-pesto',
      name: 'Sándwich de Pollo',
      price: 12000,
      imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      rating: 4.6,
      category: 'cafeteria'
    }
  ],
  'sandwich-pollo-pesto': [
    {
      id: 'combo-hamburguesa-deluxe',
      name: 'Combo Hamburguesa Deluxe',
      price: 18500,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      rating: 4.8,
      category: 'cafeteria'
    },
    {
      id: 'cafe-latte',
      name: 'Café Latte Grande',
      price: 7500,
      imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
      rating: 4.9,
      category: 'cafeteria'
    },
    {
      id: 'combo-hamburguesa-deluxe',
      name: 'Combo Hamburguesa',
      price: 18500,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      rating: 4.8,
      category: 'cafeteria'
    }
  ],
  'cafe-latte': [
    {
      id: 'combo-hamburguesa-deluxe',
      name: 'Combo Hamburguesa Deluxe',
      price: 18500,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      rating: 4.8,
      category: 'cafeteria'
    },
    {
      id: 'sandwich-pollo-pesto',
      name: 'Sándwich de Pollo al Pesto',
      price: 12000,
      imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      rating: 4.6,
      category: 'cafeteria'
    },
    {
      id: 'combo-hamburguesa-deluxe',
      name: 'Combo Hamburguesa',
      price: 18500,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      rating: 4.8,
      category: 'cafeteria'
    }
  ]
};

export const getProductById = (id: string): Product | undefined => {
  return productsMock[id];
};

export const getRelatedProducts = (productId: string): RelatedProduct[] => {
  return relatedProductsMock[productId] || [];
};