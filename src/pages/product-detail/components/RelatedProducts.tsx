import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RelatedProduct } from '../types/product.types';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

/**
 * Componente de productos relacionados
 * Muestra cards horizontales con productos similares o complementarios
 */
export default function RelatedProducts({ products }: RelatedProductsProps) {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return null;
  }

  const handleProductClick = (productId: string) => {
    // Scroll to top y navegar
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/product/${productId}`);
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-[#262626] mb-6">
        Otros productos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
          >
            {/* Imagen del producto */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Info del producto */}
            <div className="p-4">
              <h3 className="font-semibold text-[#262626] mb-2 line-clamp-2 group-hover:text-[#5AC7E1] transition-colors">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FDDF65] text-[#FDDF65]" />
                  <span className="text-sm font-semibold text-[#262626]">
                    {product.rating}
                  </span>
                </div>
              </div>

              {/* Precio y botón */}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#262626]">
                  $ {product.price.toLocaleString('es-CO')}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                  className="px-4 py-2 bg-[#5AC7E1] text-white text-sm font-medium rounded-xl hover:bg-[#4ab5cf] transition-colors"
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}