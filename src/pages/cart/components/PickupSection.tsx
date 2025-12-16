/**
 * PickupSection - Sección de punto de recogida
 */
import { MapPin, Truck } from 'lucide-react';

interface PickupSectionProps {
  onPickupChange?: (method: string, location: string) => void;
}

export default function PickupSection({ onPickupChange }: PickupSectionProps) {
  const handlePickupChange = (method: string, location: string) => {
    onPickupChange?.(method, location);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-[#262626] mb-4">Punto de recogida</h2>
      
      <div className="space-y-3">
        {/* Opción: Punto de venta */}
        <label className="flex items-center gap-3 p-4 border-2 border-[#FDDF65] bg-[#FDDF65]/10 rounded-2xl cursor-pointer">
          <input
            type="radio"
            name="pickup"
            defaultChecked
            onChange={() => handlePickupChange('Punto de venta', 'Harvies - Costado Oeste del coliseo El otoño')}
            className="w-5 h-5 text-[#FDDF65] focus:ring-[#FDDF65] focus:ring-2"
          />
          <MapPin className="w-5 h-5 text-[#262626]" />
          <span className="font-semibold text-[#262626]">Punto de venta</span>
        </label>

        {/* Opción: Envío (No disponible) */}
        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 bg-gray-50 rounded-2xl cursor-not-allowed opacity-60">
          <input
            type="radio"
            name="pickup"
            disabled
            className="w-5 h-5 text-gray-400"
          />
          <Truck className="w-5 h-5 text-gray-400" />
          <span className="font-semibold text-gray-400">Envío (No disponible)</span>
        </label>
      </div>
    </div>
  );
}
