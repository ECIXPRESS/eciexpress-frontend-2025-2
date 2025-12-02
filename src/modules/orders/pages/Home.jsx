import { useState } from 'react';
import { Heart, Star, Clock, Plus } from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('cafeteria');
  const [activeTab, setActiveTab] = useState('populares');

  return (
    <div className="w-full min-h-screen p-8" style={{ backgroundColor: '#F6F6F6' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveCategory('cafeteria')}
            className="px-8 py-2.5 rounded-full font-semibold text-base shadow-md transition-all"
            style={{
              backgroundColor: activeCategory === 'cafeteria' ? '#FDDF65' : '#FFFFFF',
              color: activeCategory === 'cafeteria' ? '#262626' : '#6B7280'
            }}
          >
            Cafetería
          </button>
          <button
            onClick={() => setActiveCategory('papeleria')}
            className="px-8 py-2.5 rounded-full font-semibold text-base shadow-md transition-all"
            style={{
              backgroundColor: activeCategory === 'papeleria' ? '#FDDF65' : '#FFFFFF',
              color: activeCategory === 'papeleria' ? '#262626' : '#6B7280'
            }}
          >
            Papelería
          </button>
        </div>

        <div 
          className="rounded-[32px] p-10 mb-8 relative overflow-hidden shadow-lg"
          style={{ 
            background: 'linear-gradient(to right, #FDDF65, #FDDF65)'
          }}
        >
          <div className="relative z-10">
            <h1 className="text-5xl font-black leading-tight" style={{ color: '#262626' }}>
              BIENVENIDOS A
            </h1>
            <h2 className="text-5xl font-black leading-tight text-white">
              ECIEXPRESS
            </h2>
          </div>
          <div 
            className="absolute right-8 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full"
            style={{ backgroundColor: '#D1D5DB' }}
          ></div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm mb-5 font-medium" style={{ color: '#6B7280' }}>Tiendas</h3>
          <div className="flex gap-8">
            {['Reggio', 'Harvies', 'Arepas', 'Cafeteria', 'Restaurante'].map((store) => (
              <button key={store} className="flex flex-col items-center gap-2.5">
                <div 
                  className="w-20 h-20 rounded-full shadow-md"
                  style={{ backgroundColor: '#D1D5DB' }}
                ></div>
                <span className="text-sm text-gray-700">{store}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-6 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('populares')}
              className="pb-3 px-2 font-semibold text-base relative"
              style={{ color: activeTab === 'populares' ? '#FDDF65' : '#9CA3AF' }}
            >
              Populares
              {activeTab === 'populares' && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#FDDF65' }}
                ></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('favoritos')}
              className="pb-3 px-2 font-semibold text-base relative"
              style={{ color: activeTab === 'favoritos' ? '#FDDF65' : '#9CA3AF' }}
            >
              Favoritos
              {activeTab === 'favoritos' && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#FDDF65' }}
                ></div>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Combo de hamburguesa', desc: 'Hamburguesa, papas y gaseosa', price: 15000, rating: 4.0, time: 15, favorite: true },
            { name: 'Lasaña', desc: 'Lasaña de carne y gaseosa', price: 16400, rating: 4.2, time: 10, favorite: false },
            { name: 'Pasta boloñesa', desc: 'Espagueti con salsa boloñesa y gaseosa', price: 13200, rating: 4.5, time: 15, favorite: false }
          ].map((product) => (
            <div key={product.name} className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="relative">
                <div 
                  className="w-full h-48"
                  style={{ backgroundColor: '#D1D5DB' }}
                ></div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Heart
                    className="w-5 h-5"
                    style={{
                      fill: product.favorite ? '#FDDF65' : 'transparent',
                      color: product.favorite ? '#FDDF65' : '#9CA3AF'
                    }}
                  />
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1.5" style={{ color: '#262626' }}>
                      {product.name}
                    </h3>
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                      {product.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-lg ml-3">
                    <Star 
                      className="w-4 h-4"
                      style={{ fill: '#FDDF65', color: '#FDDF65' }}
                    />
                    <span className="text-sm font-bold" style={{ color: '#262626' }}>
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="text-2xl font-bold mb-1" style={{ color: '#262626' }}>
                      $ {product.price.toLocaleString('es-CO')}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: '#6B7280' }}>
                      <Clock className="w-4 h-4" style={{ color: '#5AC7E1' }} />
                      <span>{product.time} min</span>
                    </div>
                  </div>
                  <button 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-colors"
                    style={{ backgroundColor: '#5AC7E1' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4AB5CF'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5AC7E1'}
                  >
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}