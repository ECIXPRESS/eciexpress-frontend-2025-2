import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import Sidebar from '@/utils/Sidebar';
import StoreHeader from './components/StoreHeader';
import StoreSchedules from './components/StoreSchedules';
import StoreLocationInfo from './components/StoreLocationInfo';
import ProductCard from './components/ProductCard';
import { storesMockData } from './mock/storeMocks';
import { mockProductIds } from '@/pages/home/mock/homeMocks';

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();

  const store = storeId ? storesMockData[parseInt(storeId)] : null;

  if (!store) {
    return (
      <div className="flex min-h-screen bg-[#F6F6F6]">
        <Sidebar />
        <div className="flex-1 md:ml-20 p-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-600">
                Tienda no encontrada
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleProductClick = (productId: number) => {
    const productSlug = mockProductIds[productId] || 'combo-hamburguesa-deluxe';
    navigate(`/product/${productSlug}`);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F6F6]">
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 md:ml-20 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto mt-16 md:mt-0">
          {/* Botón de volver */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>

          {/* Header de la tienda */}
          <StoreHeader name={store.name} rating={store.rating} image={store.image} />

          {/* Horarios */}
          <StoreSchedules schedules={store.schedules} />

          {/* Ubicación y mapa */}
          <StoreLocationInfo location={store.location} />

          {/* Sección de productos */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#262626]">Productos</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <span className="text-sm font-medium">Filtrar</span>
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Grid de productos */}
            {store.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {store.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <p className="text-gray-500">
                  No hay productos disponibles en esta tienda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
