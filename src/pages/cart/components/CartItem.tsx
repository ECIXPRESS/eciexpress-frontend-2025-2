import { Trash2, ChevronDown } from 'lucide-react';
import { CartItem as CartItemType } from '../types/cart.types';
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

/**
 * Componente de item individual del carrito
 */
export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);

  const handleQuantitySelect = (newQuantity: number) => {
    onQuantityChange(item.id, newQuantity);
    setIsQuantityOpen(false);
  };

  // Generar opciones de cantidad (1 a maxQuantity o 10)
  const quantityOptions = Array.from(
    { length: Math.min(item.maxQuantity || 10, 10) }, 
    (_, i) => i + 1
  );

  return (
    <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-3 md:gap-4">
        {/* Imagen del producto - Más pequeña en mobile */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="flex-1 min-w-0">
          {/* Nombre y botón eliminar en la misma línea */}
          <div className="flex justify-between items-start gap-2 mb-1 md:mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#262626] text-sm md:text-base mb-0.5 md:mb-1 truncate">
                {item.name}
              </h3>
              {item.description && (
                <p className="text-xs text-gray-500 line-clamp-1">
                  {item.description}
                </p>
              )}
            </div>

            {/* Botón eliminar - Más pequeño en mobile */}
            <button
              onClick={() => onRemove(item.id)}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors group flex-shrink-0"
              aria-label="Eliminar producto"
            >
              <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Precio y selector de cantidad en mobile más compacto */}
          <div className="flex justify-between items-center mt-2 md:mt-3">
            <div className="text-base md:text-lg font-bold text-[#262626]">
              $ {item.price.toLocaleString('es-CO')}
            </div>

            {/* Selector de cantidad - Más compacto en mobile */}
            <div className="relative">
              <button
                onClick={() => setIsQuantityOpen(!isQuantityOpen)}
                className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2 border border-gray-300 rounded-lg hover:border-[#5AC7E1] transition-colors bg-white min-w-[70px] md:min-w-[80px] text-sm"
              >
                <span className="font-medium">Cant. {item.quantity}</span>
                <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isQuantityOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown de cantidad */}
              {isQuantityOpen && (
                <>
                  {/* Overlay para cerrar el dropdown */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsQuantityOpen(false)}
                  />
                  
                  {/* Lista de opciones */}
                  <div className="absolute right-0 mt-2 w-28 md:w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {quantityOptions.map(qty => (
                      <button
                        key={qty}
                        onClick={() => handleQuantitySelect(qty)}
                        className={`w-full px-3 md:px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                          qty === item.quantity ? 'bg-[#5AC7E1]/10 text-[#5AC7E1] font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}