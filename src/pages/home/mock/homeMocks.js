import reggioLogo from '@/assets/home/reggio-logo.png';
import harviesLogo from '@/assets/home/harvies-logo.png';
import arepasLogo from '@/assets/home/arepas-logo.png';
import paperflashLogo from '@/assets/home/paperflash-logo.png';
import fondeciLogo from '@/assets/home/fondeci-logo.png';
import papeleriaULogo from '@/assets/home/papeleria-u-logo.png';
export const storesByCategoryData = {
    cafeteria: [
        { id: 1, name: 'Reggio', logo: reggioLogo },
        { id: 2, name: 'Harvies', logo: harviesLogo },
        { id: 3, name: 'Arepas', logo: arepasLogo },
    ],
    papeleria: [
        { id: 6, name: 'PaperFlash', logo: paperflashLogo },
        { id: 7, name: 'Fondeci', logo: fondeciLogo },
        { id: 8, name: 'Papelería U', logo: papeleriaULogo },
    ],
};
export const productsByCategoryData = {
    cafeteria: [
        {
            id: 1,
            name: 'Combo de hamburguesa',
            description: 'Hamburguesa, papas y gaseosa',
            price: 15000,
            rating: 4.0,
            time: 15,
            isFavorite: true,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
        },
        {
            id: 2,
            name: 'Lasaña',
            description: 'Lasaña de carne y gaseosa',
            price: 16400,
            rating: 4.2,
            time: 10,
            isFavorite: false,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
        },
        {
            id: 3,
            name: 'Pasta boloñesa',
            description: 'Espagueti con salsa boloñesa y gaseosa',
            price: 13200,
            rating: 4.5,
            time: 15,
            isFavorite: false,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
        },
    ],
    papeleria: [
        {
            id: 4,
            name: 'Cuadernos argollados multicolor',
            description: '6 cuadernos de 100 hojas cuadriculadas',
            price: 7000,
            rating: 5.0,
            time: null,
            isFavorite: false,
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
        },
        {
            id: 5,
            name: 'Termo de agua 1L',
            description: 'Capacidad de un litro.',
            price: 16000,
            rating: 4.0,
            time: null,
            isFavorite: false,
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
        },
        {
            id: 6,
            name: 'Impresión a color',
            description: 'Impresión de una página a color en hoja oficio',
            price: 1000,
            rating: 4.4,
            time: null,
            isFavorite: false,
            image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800',
        },
    ],
};
export const mockProductIds = {
    1: 'combo-hamburguesa-deluxe',
    2: 'sandwich-pollo-pesto',
    3: 'cafe-latte',
    4: 'cuadernos-multicolor',
    5: 'termo-agua-1l',
    6: 'impresion-color'
};
