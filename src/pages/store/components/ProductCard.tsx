import { StoreProduct } from '../types/store.types';
import { Star, Clock, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '../../cart/context/CartContext';

interface ProductCardProps {
  product: StoreProduct;
  onProductClick: (productId: number) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      {
        productId: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: '',
        maxQuantity: 99
      },
      1
    );
    toast.success(`${product.name} agregado al carrito`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  return (
    <div
      onClick={() => onProductClick(product.id)}
      className="bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="relative">
        <div className="w-full h-48 sm:h-56 bg-gray-300"></div>
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
          <button
            onClick={handleAddToCart}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#5AC7E1] hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-colors shadow-md"
          >
            <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
