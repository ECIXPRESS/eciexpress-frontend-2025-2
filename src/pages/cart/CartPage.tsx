import { useState } from 'react';
import { ShoppingCart, CreditCard, FileText, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import { cartMockFunctions } from './mock/cartMocks';
import { CartTab } from './types/cart.types';

/**
 * Página principal del carrito de compras
 */
export default function CartPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CartTab>('carrito');
  
  // Estado del carrito (en producción vendría de Context o Redux)
  const [cart, setCart] = useState(cartMockFunctions.getCart());

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const updatedItems = cartMockFunctions.updateItemQuantity(itemId, newQuantity);
    
    // Recalcular carrito
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCart({
      items: updatedItems,
      summary: {
        subtotal,
        discounts: 0,
        total: subtotal
      }
    });
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = cartMockFunctions.removeItem(itemId);
    
    // Recalcular carrito
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCart({
      items: updatedItems,
      summary: {
        subtotal,
        discounts: 0,
        total: subtotal
      }
    });

    toast.success('Producto eliminado del carrito', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const handleContinue = () => {
    if (cart.items.length === 0) {
      toast.error('Tu carrito está vacío', {
        position: 'bottom-right',
        autoClose: 2000
      });
      return;
    }

    // Navegar a pago
    setActiveTab('pago');
    toast.info('Función de pago próximamente', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const handleFilter = () => {
    toast.info('Filtros próximamente', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  // Configuración de tabs
  const tabs = [
    { id: 'carrito' as CartTab, label: 'Carrito', icon: ShoppingCart },
    { id: 'pago' as CartTab, label: 'Pago', icon: CreditCard },
    { id: 'detalles' as CartTab, label: 'Detalles', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con tabs - Diseño corregido según Figma */}
        <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex items-center justify-between">
            {/* Tabs - Diseño horizontal compacto */}
            <div className="flex items-center gap-2 md:gap-4">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isCompleted = tabs.findIndex(t => t.id === activeTab) > index;

                return (
                  <div key={tab.id} className="flex items-center">
                    {/* Tab button */}
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      disabled={tab.id !== 'carrito'}
                      className={`
                        flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-full
                        transition-all duration-300
                        ${isActive
                          ? 'bg-[#FDDF65] text-[#262626]'
                          : 'bg-gray-200 text-gray-400'
                        }
                        ${tab.id !== 'carrito' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                      `}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-sm md:text-base font-semibold hidden sm:inline">
                        {tab.label}
                      </span>
                    </button>

                    {/* Línea conectora - Solo en desktop */}
                    {index < tabs.length - 1 && (
                      <div className="hidden md:block w-8 lg:w-12 h-0.5 bg-gray-200 mx-1" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Botón Filtrar */}
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#FDDF65] hover:bg-[#f5d74e] rounded-full font-semibold text-[#262626] transition-colors shadow-md text-sm md:text-base"
            >
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
          </div>
        </div>

        {/* Contenido principal: Grid responsive mejorado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Columna izquierda: Lista de items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cart.items.length === 0 ? (
              /* Carrito vacío */
              <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm">
                <ShoppingCart className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-gray-400 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-sm md:text-base text-gray-500 mb-6">
                  Agrega productos para comenzar tu pedido
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-[#5AC7E1] text-white rounded-xl font-medium hover:bg-[#4ab5cf] transition-colors"
                >
                  Ir al catálogo
                </button>
              </div>
            ) : (
              /* Lista de items */
              <>
                {cart.items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </>
            )}
          </div>

            {/* Columna derecha: Resumen del pedido */}
          <div className="lg:col-span-1">
            {/* Desktop: sticky, Mobile: fixed bottom con toggle */}
            <div className="hidden lg:block lg:sticky lg:top-6">
              <CartSummary
                items={cart.items}
                onContinue={handleContinue}
              />
            </div>

            {/* Mobile: Resumen flotante mejorado */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
              {/* Barra compacta con total */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-xl font-bold text-[#262626]">
                    $ {cart.summary.total.toLocaleString('es-CO')}
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={cart.items.length === 0}
                  className={`
                    px-6 py-3 rounded-xl font-bold text-base
                    transition-all duration-300 shadow-md
                    ${cart.items.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#5AC7E1] text-white hover:bg-[#4ab5cf] active:scale-[0.98]'
                    }
                  `}
                >
                  Continuar
                </button>
              </div>
            </div>
            <div className="lg:hidden h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}