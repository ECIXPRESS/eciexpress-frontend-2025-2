import { useState } from 'react';
import { ShoppingCart, CreditCard, FileText, Filter, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import PaymentSection from './components/PaymentSection';
import PickupSection from './components/PickupSection';
import DeliverySchedule from './components/DeliverySchedule';
import OrderDetailsView from './components/OrderDetailsView';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { useCart } from './context/CartContext';
import { CartTab } from './types/cart.types';

/**
 * Página principal del carrito de compras
 */
export default function CartPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CartTab>('carrito');
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Estado para trackear las selecciones del usuario
  const [orderData, setOrderData] = useState({
    paymentMethod: 'Billetera',
    paymentDetails: '125.000',
    pickupMethod: 'Punto de venta',
    pickupLocation: 'Harvies - Costado Oeste del coliseo El otoño',
    deliveryDate: `${new Date().getDate()} nov, ${new Date().getFullYear()}`,
    deliveryTime: '12:50 pm'
  });

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
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

    // Navegar a la siguiente pestaña
    if (activeTab === 'carrito') {
      setActiveTab('pago');
    } else if (activeTab === 'pago') {
      setActiveTab('detalles');
    }
  };

  const handleCompletePurchase = () => {
    // Generar número de orden aleatorio
    const orderNum = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderNumber(orderNum);
    
    // Mostrar modal de éxito
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // Limpiar carrito y redirigir
    clearCart();
    navigate('/orders-seller');
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
                      className={`
                        flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-full
                        transition-all duration-300
                        ${isActive
                          ? 'bg-[#FDDF65] text-[#262626]'
                          : isCompleted 
                            ? 'bg-[#FDDF65] text-[#262626]'
                            : 'bg-gray-200 text-gray-400'
                        }
                        cursor-pointer
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
          {/* Columna izquierda: Contenido según tab activa */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {/* Tab: Carrito */}
            {activeTab === 'carrito' && (
              <>
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
              </>
            )}

            {/* Tab: Pago */}
            {activeTab === 'pago' && (
              <div className="space-y-4">
                <PaymentSection 
                  onPaymentMethodChange={(method, details) => 
                    setOrderData({ ...orderData, paymentMethod: method, paymentDetails: details })
                  }
                />
                <PickupSection 
                  onPickupChange={(method, location) => 
                    setOrderData({ ...orderData, pickupMethod: method, pickupLocation: location })
                  }
                />
                <DeliverySchedule 
                  onScheduleChange={(date, time) => 
                    setOrderData({ ...orderData, deliveryDate: date, deliveryTime: time })
                  }
                />
              </div>
            )}

            {/* Tab: Detalles */}
            {activeTab === 'detalles' && (
              <OrderDetailsView
                selectedPaymentMethod={orderData.paymentMethod}
                paymentDetails={orderData.paymentDetails}
                selectedPickupMethod={orderData.pickupMethod}
                pickupLocation={orderData.pickupLocation}
                deliveryDate={orderData.deliveryDate}
                deliveryTime={orderData.deliveryTime}
              />
            )}
          </div>

            {/* Columna derecha: Resumen del pedido */}
          <div className="lg:col-span-1">
            {/* Desktop: sticky, Mobile: fixed bottom con toggle */}
            <div className="hidden lg:block lg:sticky lg:top-6">
              <CartSummary
                items={cart.items}
                onContinue={activeTab === 'detalles' ? handleCompletePurchase : handleContinue}
                buttonText={activeTab === 'detalles' ? 'Comprar' : 'Continuar'}
              />
            </div>

            {/* Mobile: Resumen flotante mejorado */}
            {activeTab === 'carrito' && (
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
            )}
            <div className="lg:hidden h-20" />
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        orderNumber={orderNumber}
        total={cart.summary.total}
      />
    </div>
  );
}