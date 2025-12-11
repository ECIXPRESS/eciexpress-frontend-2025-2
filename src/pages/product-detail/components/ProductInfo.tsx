import { useState, useMemo } from 'react';
import { Star, Clock, Package, ShoppingCart, AlertCircle } from 'lucide-react';
import { Product } from '../types/product.types';
import QuantitySelector from './QuantitySelector';
import { toast } from 'react-toastify';

interface ProductInfoProps {
  product: Product;
  onAddToCart: (quantity: number, selectedOptions: Record<string, string>) => void;
}

/**
 * Componente de información del producto con opciones y selector de cantidad
 * Aplica principios de jerarquía visual y agrupación lógica
 */
export default function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Validar que todas las opciones requeridas estén seleccionadas
  const allOptionsSelected = useMemo(() => {
    if (!product.options || product.options.length === 0) return true;
    return product.options.every(option => selectedOptions[option.id]);
  }, [product.options, selectedOptions]);

  // Calcular precio total
  const totalPrice = useMemo(() => {
    return product.price * quantity;
  }, [product.price, quantity]);

  const handleOptionChange = (optionId: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: value
    }));
  };

  const handleAddToCart = () => {
    if (!allOptionsSelected) {
      toast.error('Por favor selecciona todas las opciones', {
        position: 'bottom-right',
        autoClose: 2000
      });
      return;
    }

    if (product.stock < quantity) {
      toast.error('No hay suficiente stock disponible', {
        position: 'bottom-right',
        autoClose: 2000
      });
      return;
    }

    onAddToCart(quantity, selectedOptions);
    toast.success(`${quantity} ${quantity > 1 ? 'productos agregados' : 'producto agregado'} al carrito`, {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const stockStatus = useMemo(() => {
    if (product.stock === 0) return { text: 'Agotado', color: 'text-red-600 bg-red-50' };
    if (product.stock <= 5) return { text: `Últimas ${product.stock} unidades`, color: 'text-orange-600 bg-orange-50' };
    return { text: 'Disponible', color: 'text-green-600 bg-green-50' };
  }, [product.stock]);

  return (
    <div className="flex flex-col h-full">
      {/* Tags superiores */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex gap-2 mb-4">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-[#5AC7E1] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Nombre del producto */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#262626] mb-3">
        {product.name}
      </h1>

      {/* Rating y reseñas */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < Math.floor(product.rating)
                  ? 'fill-[#FDDF65] text-[#FDDF65]'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-2xl font-bold text-[#262626]">{product.rating}</span>
        <span className="text-sm text-gray-500">({product.reviewCount} reseñas)</span>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {product.description}
      </p>

      {/* Info del vendedor y tiempo de preparación */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{product.vendorLogo}</span>
          <span className="text-sm text-gray-600">
            Vendido por <span className="font-semibold text-[#262626]">{product.vendor}</span>
          </span>
        </div>
        
        {product.preparationTime && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-[#5AC7E1]" />
            <span>{product.preparationTime}</span>
          </div>
        )}
      </div>

      {/* Opciones del producto */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-5 mb-6">
          {product.options.map(option => (
            <div key={option.id}>
              <label className="block text-sm font-semibold text-[#262626] mb-3">
                {option.label}:
              </label>
              <div className="flex flex-wrap gap-2">
                {option.values.map(value => (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(option.id, value)}
                    className={`
                      px-4 py-2 rounded-full border-2 transition-all duration-200
                      font-medium text-sm
                      ${selectedOptions[option.id] === value
                        ? 'border-[#5AC7E1] bg-[#5AC7E1] text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#5AC7E1]'
                      }
                    `}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stock badge */}
      <div className="flex items-center gap-2 mb-6">
        <Package className={`w-5 h-5 ${stockStatus.color.split(' ')[0]}`} />
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
          {stockStatus.text}
        </span>
      </div>

      {/* Precio y selector de cantidad */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-600 block mb-1">Precio unitario</span>
            <span className="text-2xl font-bold text-[#262626]">
              $ {product.price.toLocaleString('es-CO')}
            </span>
          </div>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            maxQuantity={product.stock}
          />
        </div>

        {/* Total */}
        {quantity > 1 && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Total:</span>
              <span className="text-3xl font-bold text-[#262626]">
                $ {totalPrice.toLocaleString('es-CO')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Botón de agregar al carrito */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0 || !allOptionsSelected}
        className={`
          w-full h-14 rounded-2xl font-bold text-lg
          flex items-center justify-center gap-3
          transition-all duration-300 shadow-lg
          ${product.stock === 0 || !allOptionsSelected
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-[#5AC7E1] text-white hover:bg-[#4ab5cf] active:scale-[0.98] hover:shadow-xl'
          }
        `}
      >
        <ShoppingCart className="w-6 h-6" />
        {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
      </button>

      {/* Mensaje de opciones faltantes */}
      {!allOptionsSelected && product.stock > 0 && (
        <div className="flex items-start gap-2 mt-3 p-3 bg-orange-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-600">
            Selecciona todas las opciones antes de agregar al carrito
          </p>
        </div>
      )}
    </div>
  );
}