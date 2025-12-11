import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxQuantity: number;
  minQuantity?: number;
}

/**
 * Selector de cantidad con botones +/- y validación de stock
 * Aplica Ley de Fitts con botones grandes (48x48px) para fácil interacción
 */
export default function QuantitySelector({
  quantity,
  onQuantityChange,
  maxQuantity,
  minQuantity = 1
}: QuantitySelectorProps) {
  
  const handleDecrease = () => {
    if (quantity > minQuantity) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const canDecrease = quantity > minQuantity;
  const canIncrease = quantity < maxQuantity;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDecrease}
        disabled={!canDecrease}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center 
          transition-all duration-200
          ${canDecrease 
            ? 'bg-[#FDDF65] hover:bg-[#f5d74e] active:scale-95' 
            : 'bg-gray-200 cursor-not-allowed opacity-50'
          }
        `}
        aria-label="Disminuir cantidad"
      >
        <Minus className="w-5 h-5 text-[#262626]" />
      </button>

      <div className="min-w-[3rem] text-center">
        <span className="text-2xl font-bold text-[#262626]">
          {quantity}
        </span>
      </div>

      <button
        onClick={handleIncrease}
        disabled={!canIncrease}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center 
          transition-all duration-200
          ${canIncrease 
            ? 'bg-[#FDDF65] hover:bg-[#f5d74e] active:scale-95' 
            : 'bg-gray-200 cursor-not-allowed opacity-50'
          }
        `}
        aria-label="Aumentar cantidad"
      >
        <Plus className="w-5 h-5 text-[#262626]" />
      </button>
    </div>
  );
}