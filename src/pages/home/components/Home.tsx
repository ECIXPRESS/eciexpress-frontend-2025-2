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
      { id: 4, name: 'Cafeteria' },
      { id: 5, name: 'Restaurante' },
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
    <>
      <Sidebar />
      <div className="min-h-screen bg-[#F6F6F6] p-8 ml-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveCategory('cafeteria')}
              className={`px-10 py-3 rounded-full font-semibold text-base shadow-md transition-colors ${
                activeCategory === 'cafeteria'
                  ? 'bg-[#FDDF65] text-[#262626]'
                  : 'bg-white text-gray-600'
              }`}
            >
              Cafetería
            </button>
            <button
              onClick={() => setActiveCategory('papeleria')}
              className={`px-10 py-3 rounded-full font-semibold text-base shadow-md transition-colors ${
                activeCategory === 'papeleria'
                  ? 'bg-[#FDDF65] text-[#262626]'
                  : 'bg-white text-gray-600'
              }`}
            >
              Papelería
            </button>
          </div>

          <div className="rounded-[32px] mb-8 relative overflow-hidden shadow-lg">
            <img 
              src={bannerImage} 
              alt="Banner ECIEXPRESS" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-10">
            <h3 className="text-sm text-gray-500 mb-6 font-medium">Tiendas</h3>
            <div className="flex justify-center gap-12">
              {stores.map((store) => (
                <button
                  key={store.id}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-24 h-24 bg-gray-300 rounded-full shadow-md group-hover:scale-105 transition-transform"></div>
                  <span className="text-sm text-[#262626] font-semibold">{store.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex gap-8 border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab('populares')}
                className={`pb-3 px-1 font-bold text-base relative transition-colors ${
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
                className={`pb-3 px-1 font-bold text-base relative transition-colors ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="w-full h-56 bg-gray-300"></div>
                  <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart
                      className={`w-6 h-6 ${
                        product.isFavorite
                          ? 'fill-[#FDDF65] text-[#FDDF65]'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#262626] text-lg mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl ml-4 flex-shrink-0">
                      <Star className="w-5 h-5 fill-[#FDDF65] text-[#FDDF65]" />
                      <span className="text-base font-bold text-[#262626]">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-[#262626] mb-2">
                        $ {product.price.toLocaleString('es-CO')}
                      </div>
                      {product.time && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-5 h-5 text-[#5AC7E1]" />
                          <span className="font-semibold">{product.time} min</span>
                        </div>
                      )}
                    </div>
                    <button className="w-14 h-14 bg-[#5AC7E1] hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-colors shadow-md">
                      <Plus className="w-7 h-7 text-white stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}