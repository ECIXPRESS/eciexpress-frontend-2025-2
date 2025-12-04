import { useState } from 'react';
import { Heart, Star, Clock, Plus } from 'lucide-react';
import bannerImage from '@/assets/home/advertisement.png';
import Sidebar from '@/utils/Sidebar';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('cafeteria');
  const [activeTab, setActiveTab] = useState('populares');

  const storesByCategoryData = {
    cafeteria: [
      { id: 1, name: 'Reggio' },
      { id: 2, name: 'Harvies' },
      { id: 3, name: 'Arepas' },
    ],
    papeleria: [
      { id: 6, name: 'PaperFlash' },
      { id: 7, name: 'Fondeci' },
      { id: 8, name: 'Papelería U' },
    ],
  };

  const productsByCategoryData = {
    cafeteria: [
      {
        id: 1,
        name: 'Combo de hamburguesa',
        description: 'Hamburguesa, papas y gaseosa',
        price: 15000,
        rating: 4.0,
        time: 15,
        isFavorite: true,
      },
      {
        id: 2,
        name: 'Lasaña',
        description: 'Lasaña de carne y gaseosa',
        price: 16400,
        rating: 4.2,
        time: 10,
        isFavorite: false,
      },
      {
        id: 3,
        name: 'Pasta boloñesa',
        description: 'Espagueti con salsa boloñesa y gaseosa',
        price: 13200,
        rating: 4.5,
        time: 15,
        isFavorite: false,
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
      },
      {
        id: 5,
        name: 'Termo de agua 1L',
        description: 'Capacidad de un litro.',
        price: 16000,
        rating: 4.0,
        time: null,
        isFavorite: false,
      },
      {
        id: 6,
        name: 'Impresión a color',
        description: 'Impresión de una página a color en hoja oficio',
        price: 1000,
        rating: 4.4,
        time: null,
        isFavorite: false,
      },
    ],
  };

  const stores = storesByCategoryData[activeCategory as keyof typeof storesByCategoryData];
  const products = productsByCategoryData[activeCategory as keyof typeof productsByCategoryData];

  return (
    <div className="flex min-h-screen bg-[#F6F6F6]">
      <Sidebar />
      
      {/* Contenido principal - responsive */}
      <div className="flex-1 md:ml-20 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Botones de categoría - responsive */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 mt-16 md:mt-0">
            <button
              onClick={() => setActiveCategory('cafeteria')}
              className={`px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md transition-colors ${
                activeCategory === 'cafeteria'
                  ? 'bg-[#FDDF65] text-[#262626]'
                  : 'bg-white text-gray-600'
              }`}
            >
              Cafetería
            </button>
            <button
              onClick={() => setActiveCategory('papeleria')}
              className={`px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md transition-colors ${
                activeCategory === 'papeleria'
                  ? 'bg-[#FDDF65] text-[#262626]'
                  : 'bg-white text-gray-600'
              }`}
            >
              Papelería
            </button>
          </div>

          {/* Banner - responsive */}
          <div className="rounded-2xl sm:rounded-3xl md:rounded-[32px] mb-6 sm:mb-8 relative overflow-hidden shadow-lg">
            <img 
              src={bannerImage} 
              alt="Banner ECIEXPRESS" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Tiendas - responsive con scroll horizontal en mobile */}
          <div className="mb-8 sm:mb-10">
            <h3 className="text-sm text-gray-500 mb-4 sm:mb-6 font-medium">Tiendas</h3>
            {/* Desktop: grid centrado con scroll si es necesario */}
            <div className="hidden md:flex justify-center gap-8 lg:gap-12 overflow-x-auto pb-4 -mx-4 px-4">
              {stores.map((store) => (
                <button
                  key={store.id}
                  className="flex flex-col items-center gap-3 group flex-shrink-0"
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-300 rounded-full shadow-md group-hover:scale-105 transition-transform"></div>
                  <span className="text-sm text-[#262626] font-semibold">{store.name}</span>
                </button>
              ))}
            </div>
            {/* Mobile/Tablet: scroll horizontal */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 sm:gap-8 min-w-max">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full shadow-md group-hover:scale-105 transition-transform"></div>
                    <span className="text-sm text-[#262626] font-semibold whitespace-nowrap">
                      {store.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs - responsive */}
          <div className="mb-6 sm:mb-8">
            <div className="flex gap-6 sm:gap-8 border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab('populares')}
                className={`pb-2 sm:pb-3 px-1 font-bold text-sm sm:text-base relative transition-colors ${
                  activeTab === 'populares' ? 'text-[#FDDF65]' : 'text-gray-400'
                }`}
              >
                Populares
                {activeTab === 'populares' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FDDF65]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('favoritos')}
                className={`pb-2 sm:pb-3 px-1 font-bold text-sm sm:text-base relative transition-colors ${
                  activeTab === 'favoritos' ? 'text-[#FDDF65]' : 'text-gray-400'
                }`}
              >
                Favoritos
                {activeTab === 'favoritos' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FDDF65]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Grid de productos - responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="w-full h-48 sm:h-56 bg-gray-300"></div>
                  <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        product.isFavorite
                          ? 'fill-[#FDDF65] text-[#FDDF65]'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#262626] text-base sm:text-lg mb-1 sm:mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl ml-3 sm:ml-4 flex-shrink-0">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FDDF65] text-[#FDDF65]" />
                      <span className="text-sm sm:text-base font-bold text-[#262626]">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-[#262626] mb-1 sm:mb-2">
                        $ {product.price.toLocaleString('es-CO')}
                      </div>
                      {product.time && (
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#5AC7E1]" />
                          <span className="font-semibold">{product.time} min</span>
                        </div>
                      )}
                    </div>
                    <button className="w-12 h-12 sm:w-14 sm:h-14 bg-[#5AC7E1] hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-colors shadow-md">
                      <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}