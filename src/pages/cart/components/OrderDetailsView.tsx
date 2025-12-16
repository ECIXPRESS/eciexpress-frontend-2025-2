/**
 * OrderDetailsView - Vista de resumen final antes de confirmar la compra
 * Muestra método de pago, punto de recogida y hora de entrega
 */
import { CreditCard, MapPin, Clock } from 'lucide-react';

interface OrderDetailsViewProps {
  selectedPaymentMethod: string;
  selectedPickupMethod: string;
  pickupLocation: string;
  deliveryDate: string;
  deliveryTime: string;
}

export default function OrderDetailsView({
  selectedPaymentMethod = 'Billetera',
  selectedPickupMethod = 'Punto de venta',
  pickupLocation = 'Harvies - Costado Oeste del coliseo El otoño',
  deliveryDate = '11 nov, 2025',
  deliveryTime = '12:50 pm',
}: OrderDetailsViewProps) {
  return (
    <div className="space-y-4">
      {/* Sección de Pago */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#262626] mb-4">Pago</h3>
        
        <div className="flex items-center gap-4 p-4 bg-[#FDDF65] rounded-xl">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <CreditCard className="w-6 h-6 text-[#262626]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[#262626]">{selectedPaymentMethod}</p>
            {selectedPaymentMethod === 'Billetera' && (
              <p className="text-sm text-[#262626]">125.000</p>
            )}
          </div>
        </div>
      </div>

      {/* Sección de Punto de recogida */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#262626] mb-4">Punto de recogida</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-[#FDDF65] rounded-full flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#262626]" />
            </div>
            <div>
              <p className="font-semibold text-[#262626] mb-1">{selectedPickupMethod}</p>
              <p className="text-sm text-gray-600">{pickupLocation}</p>
            </div>
          </div>

          {/* Mapa placeholder */}
          <div className="w-full h-32 bg-[#E8D9C4] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-[#262626] opacity-30" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Hora de entrega */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#262626] mb-4">Hora de entrega</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#5AC7E1]" />
              <span className="text-sm text-gray-600">Hora de entrega programada:</span>
            </div>
            <span className="font-semibold text-[#262626]">{deliveryTime} {deliveryDate}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#5AC7E1]" />
              <span className="text-sm text-gray-600">Hora de entrega esperada:</span>
            </div>
            <span className="font-semibold text-[#262626]">{deliveryTime} {deliveryDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
