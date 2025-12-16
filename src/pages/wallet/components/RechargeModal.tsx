import { X, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export function RechargeModal({ isOpen, onClose, onConfirm }: RechargeModalProps) {
  const [activeTab, setActiveTab] = useState<'tarjeta' | 'pse'>('pse');
  const [amount, setAmount] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  // Campos para tarjeta
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardLastName, setCardLastName] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  
  // Campos para PSE
  const [bank, setBank] = useState('');
  const [pseAmount, setPseAmount] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const numAmount = activeTab === 'tarjeta' ? parseFloat(amount) : parseFloat(pseAmount);
    
    // Validar que el monto sea válido
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Por favor ingresa un monto válido', {
        position: 'bottom-right',
      });
      return;
    }

    // Validar monto mínimo
    if (numAmount < 5000) {
      toast.warning('El monto mínimo de recarga es $5.000', {
        position: 'bottom-right',
      });
      return;
    }

    // Validar monto máximo
    if (numAmount > 1000000) {
      toast.warning('El monto máximo de recarga es $1.000.000', {
        position: 'bottom-right',
      });
      return;
    }

    // Validaciones específicas por método de pago
    if (activeTab === 'pse') {
      if (!bank) {
        toast.error('Por favor selecciona un banco', {
          position: 'bottom-right',
        });
        return;
      }
      if (!email || !email.includes('@')) {
        toast.error('Por favor ingresa un correo electrónico válido', {
          position: 'bottom-right',
        });
        return;
      }
    } else {
      if (cardNumber.length < 15) {
        toast.error('Número de tarjeta inválido', {
          position: 'bottom-right',
        });
        return;
      }
      if (!cardCVV || cardCVV.length < 3) {
        toast.error('CVV inválido', {
          position: 'bottom-right',
        });
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        toast.error('Fecha de expiración inválida', {
          position: 'bottom-right',
        });
        return;
      }
    }

    // Simular proceso de pago
    const metodo = activeTab === 'pse' ? 'PSE' : 'Tarjeta de crédito';
    
    toast.info(`Procesando recarga de $${numAmount.toLocaleString('es-CO')} mediante ${metodo}...`, {
      position: 'bottom-right',
      autoClose: 2000,
    });

    // Simular delay de procesamiento
    setTimeout(() => {
      onConfirm(numAmount);
      
      toast.success(`¡Recarga exitosa! Se han agregado $${numAmount.toLocaleString('es-CO')} a tu billetera`, {
        position: 'bottom-right',
        autoClose: 4000,
      });

      // Reset form
      setAmount('');
      setPseAmount('');
      setCardNumber('');
      setCardName('');
      setCardLastName('');
      setCardCVV('');
      setCardExpiry('');
      setBank('');
      setEmail('');
    }, 2000);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay con animación */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Panel lateral con animación de deslizamiento */}
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#F6F6F6] shadow-2xl z-[101] overflow-y-auto transition-transform duration-300 ease-out ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header amarillo con animación de fade */}
        <div className={`sticky top-0 bg-gradient-to-r from-[#FDDF65] to-[#f5d74e] px-6 py-8 flex items-center justify-between z-10 shadow-md transition-opacity duration-300 delay-100 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-white">Recargar billetera</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Contenido con animación */}
        <div className="p-6">
          {/* Sección de método de pago con animación escalonada */}
          <section className={`bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 delay-150 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-lg font-bold text-[#262626] mb-5">Método de pago</h3>
            
            {/* Tabs con animación */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('pse')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'pse'
                    ? 'bg-[#FDDF65] text-[#262626] shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <span className="text-xl">PSE</span>
              </button>
              
              <button
                onClick={() => setActiveTab('tarjeta')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'tarjeta'
                    ? 'bg-[#FDDF65] text-[#262626] shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <CreditCard className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido de PSE con animación de fade */}
            {activeTab === 'pse' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label htmlFor="bank" className="block text-sm text-gray-600 mb-2">
                    Banco
                  </label>
                  <select
                    id="bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona tu banco</option>
                    <option value="bancolombia">Bancolombia</option>
                    <option value="davivienda">Davivienda</option>
                    <option value="bbva">BBVA</option>
                    <option value="banco-bogota">Banco de Bogotá</option>
                    <option value="banco-popular">Banco Popular</option>
                    <option value="nequi">Nequi</option>
                    <option value="daviplata">Daviplata</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pse-amount" className="block text-sm text-gray-600 mb-2">
                    Monto
                  </label>
                  <input
                    id="pse-amount"
                    type="number"
                    value={pseAmount}
                    onChange={(e) => setPseAmount(e.target.value)}
                    placeholder="Ingresa el monto"
                    min="0"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa el correo"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Contenido de Tarjeta con animación de fade */}
            {activeTab === 'tarjeta' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label htmlFor="card-number" className="block text-sm text-gray-600 mb-2">
                    Número
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Ingresa el número de la tarjeta"
                    maxLength={19}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="card-name" className="block text-sm text-gray-600 mb-2">
                      Nombre
                    </label>
                    <input
                      id="card-name"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Nombre"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="card-lastname" className="block text-sm text-gray-600 mb-2">
                      Apellido
                    </label>
                    <input
                      id="card-lastname"
                      type="text"
                      value={cardLastName}
                      onChange={(e) => setCardLastName(e.target.value)}
                      placeholder="Apellido"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="card-cvv" className="block text-sm text-gray-600 mb-2">
                      CVV
                    </label>
                    <input
                      id="card-cvv"
                      type="text"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      placeholder="CVV"
                      maxLength={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="card-expiry" className="block text-sm text-gray-600 mb-2">
                      Fecha de expiración
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="mm/aa"
                      maxLength={5}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="card-amount" className="block text-sm text-gray-600 mb-2">
                    Monto
                  </label>
                  <input
                    id="card-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Monto"
                    min="0"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer con animación de slide-up */}
        <div className={`sticky bottom-0 bg-[#F6F6F6] px-6 py-6 border-t border-gray-200 transition-all duration-300 delay-150 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 bg-[#FDDF65] hover:bg-[#f5d74e] rounded-2xl font-bold text-[#262626] text-base transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            disabled={
              activeTab === 'pse'
                ? !bank || !pseAmount || !email
                : !cardNumber || !cardName || !cardLastName || !cardCVV || !cardExpiry || !amount
            }
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  );
}