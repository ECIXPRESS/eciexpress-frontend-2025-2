import { AlertCircle } from 'lucide-react';
import { CartItem } from '../types/cart.types';

interface CartSummaryProps {
  items: CartItem[];
  onContinue: () => void;
  buttonText?: string;
}

/**
 * Componente de resumen del pedido
 */
export default function CartSummary({ items, onContinue, buttonText = 'Continuar' }: CartSummaryProps) {
  // Calcular subtotal
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Descuentos (actualmente 0, pero preparado para el futuro)
  const discounts = 0;
  
  // Total
  const total = subtotal - discounts;

  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 shadow-md">
      {/* Título */}
      <h2 className="text-xl md:text-2xl font-bold text-[#262626] mb-4 md:mb-6">
        Resumen pedido
      </h2>

      {/* Lista de items */}
      <div className="space-y-2.5 md:space-y-3 mb-5 md:mb-6 max-h-60 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <span className="text-sm text-gray-700 flex-1 pr-2">
              {item.name}
            </span>
            <span className="text-sm font-semibold text-[#262626] whitespace-nowrap">
              $ {(item.price * item.quantity).toLocaleString('es-CO')}
            </span>
          </div>
        ))}
      </div>

      {/* Descuentos */}
      {discounts > 0 && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-700">Descuentos</span>
          <span className="text-sm font-semibold text-green-600">
            -$ {discounts.toLocaleString('es-CO')}
          </span>
        </div>
      )}

      {/* Total */}
      <div className="pt-4 border-t border-gray-200 mb-5 md:mb-6">
        <div className="flex justify-between items-center">
          <span className="text-base md:text-lg font-bold text-[#262626]">Total</span>
          <span className="text-xl md:text-2xl font-bold text-[#262626]">
            $ {total.toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      {/* Botón de acción */}
      <button
        onClick={onContinue}
        disabled={items.length === 0}
        className={`
          w-full h-12 md:h-14 rounded-2xl font-bold text-base md:text-lg
          flex items-center justify-center gap-2
          transition-all duration-300 shadow-md
          ${items.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : buttonText === 'Comprar' 
              ? 'bg-[#FDDF65] text-[#262626] hover:bg-[#f5d74e] active:scale-[0.98] hover:shadow-lg'
              : 'bg-[#5AC7E1] text-white hover:bg-[#4ab5cf] active:scale-[0.98] hover:shadow-lg'
          }
        `}
      >
        {buttonText}
      </button>

      {/* Disclaimer */}
      <div className="mt-3 md:mt-4 flex items-start gap-2 p-3 bg-orange-50 rounded-xl">
        <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-orange-600 leading-relaxed">
          La disponibilidad de los artículos no están garantizados hasta que se finalice el pago.
        </p>
      </div>
    </div>
  );
}