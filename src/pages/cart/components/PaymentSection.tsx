/**
 * PaymentSection - Sección de pago con métodos de pago (acordeón)
 * Métodos soportados: Billetera, Tarjeta débito, PSE, Efectivo
 */
import { useState } from 'react';
import { ChevronRight, ChevronDown, Wallet, CreditCard, Building2, Banknote } from 'lucide-react';

type PaymentMethod = 'billetera' | 'tarjeta' | 'pse' | 'efectivo';

interface PaymentSectionProps {
  onPaymentMethodChange?: (method: string, details: string) => void;
}

export default function PaymentSection({ onPaymentMethodChange }: PaymentSectionProps) {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod | null>('billetera');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    lastName: '',
    cvv: '',
    expiry: ''
  });
  const [pseInfo, setPseInfo] = useState({
    bank: '',
    email: ''
  });

  const handleMethodToggle = (method: PaymentMethod) => {
    setActiveMethod(activeMethod === method ? null : method);
    
    // Notificar el cambio con detalles según el método
    let details = '';
    if (method === 'billetera') {
      details = '125.000';
    } else if (method === 'tarjeta' && cardInfo.number) {
      details = `**** ${cardInfo.number.slice(-4)}`;
    } else if (method === 'pse' && pseInfo.bank) {
      details = pseInfo.bank;
    } else if (method === 'efectivo') {
      details = 'Pago en punto de venta';
    }
    
    const methodLabels = {
      billetera: 'Billetera',
      tarjeta: 'Tarjeta débito',
      pse: 'PSE',
      efectivo: 'Efectivo'
    };
    
    onPaymentMethodChange?.(methodLabels[method], details);
  };

  const paymentMethods = [
    { id: 'billetera' as PaymentMethod, label: 'Billetera', icon: Wallet },
    { id: 'tarjeta' as PaymentMethod, label: 'Tarjeta debito', icon: CreditCard },
    { id: 'pse' as PaymentMethod, label: 'Pse', icon: Building2 },
    { id: 'efectivo' as PaymentMethod, label: 'Efectivo', icon: Banknote }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#262626] mb-4">Pago</h2>
        
        <div className="space-y-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isActive = activeMethod === method.id;

            return (
              <div key={method.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                {/* Header del método de pago */}
                <button
                  onClick={() => handleMethodToggle(method.id)}
                  className={`
                    w-full flex items-center justify-between p-4 transition-colors
                    ${isActive ? 'bg-[#FDDF65]' : 'bg-white hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {isActive ? (
                      <ChevronDown className="w-5 h-5 text-[#262626]" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[#262626]" />
                    )}
                    <span className="font-semibold text-[#262626]">{method.label}</span>
                  </div>
                </button>

                {/* Contenido expandible */}
                {isActive && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    {/* Billetera */}
                    {method.id === 'billetera' && (
                      <div>
                        <p className="text-sm font-semibold text-[#262626] mb-2">Saldo disponible:</p>
                        <div className="bg-[#FDDF65] rounded-2xl p-4 flex items-center justify-between">
                          <div className="w-8 h-8 bg-white rounded-full" />
                          <span className="text-2xl font-bold text-[#262626]">125.000</span>
                        </div>
                      </div>
                    )}

                    {/* Tarjeta débito */}
                    {method.id === 'tarjeta' && (
                      <div className="space-y-4">
                        <p className="text-sm font-semibold text-[#262626] mb-3">Información de pago</p>
                        
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Número</label>
                          <input
                            type="text"
                            placeholder="Ingresa el número de la tarjeta"
                            value={cardInfo.number}
                            onChange={(e) => {
                              const newInfo = { ...cardInfo, number: e.target.value };
                              setCardInfo(newInfo);
                              if (newInfo.number.length >= 4) {
                                onPaymentMethodChange?.('Tarjeta débito', `**** ${newInfo.number.slice(-4)}`);
                              }
                            }}
                            maxLength={16}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                            <input
                              type="text"
                              placeholder="Nombre"
                              value={cardInfo.name}
                              onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Apellido</label>
                            <input
                              type="text"
                              placeholder="Apellido"
                              value={cardInfo.lastName}
                              onChange={(e) => setCardInfo({ ...cardInfo, lastName: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">CVV</label>
                            <input
                              type="text"
                              placeholder="cvv"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                              maxLength={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Fecha de expiración</label>
                            <input
                              type="text"
                              placeholder="mm/aa"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                              maxLength={5}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PSE */}
                    {method.id === 'pse' && (
                      <div className="space-y-4">
                        <p className="text-sm font-semibold text-[#262626] mb-3">Información de pago</p>
                        
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Banco</label>
                          <select
                            value={pseInfo.bank}
                            onChange={(e) => {
                              const newInfo = { ...pseInfo, bank: e.target.value };
                              setPseInfo(newInfo);
                              if (newInfo.bank) {
                                const bankName = e.target.options[e.target.selectedIndex].text;
                                onPaymentMethodChange?.('PSE', bankName);
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent appearance-none bg-white"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23262626' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 1rem center'
                            }}
                          >
                            <option value="">Selecciona tu banco</option>
                            <option value="bancolombia">Bancolombia</option>
                            <option value="davivienda">Davivienda</option>
                            <option value="bogota">Banco de Bogotá</option>
                            <option value="occidente">Banco de Occidente</option>
                            <option value="popular">Banco Popular</option>
                            <option value="bbva">BBVA</option>
                            <option value="av-villas">AV Villas</option>
                            <option value="colpatria">Colpatria</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Correo Electrónico</label>
                          <input
                            type="email"
                            placeholder="Ingresa el correo"
                            value={pseInfo.email}
                            onChange={(e) => setPseInfo({ ...pseInfo, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    {/* Efectivo */}
                    {method.id === 'efectivo' && (
                      <div className="bg-[#FDDF65] rounded-2xl p-4">
                        <p className="text-sm font-semibold text-[#262626] mb-2">Información de pago</p>
                        <p className="text-sm text-[#262626]">
                          Por favor, paga en efectivo en el punto de recogida el precio indicado en la factura.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
