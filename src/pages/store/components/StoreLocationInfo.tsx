import { StoreLocation } from '../types/store.types';
import { MapPin } from 'lucide-react';

interface StoreLocationInfoProps {
  location: StoreLocation;
}

export default function StoreLocationInfo({ location }: StoreLocationInfoProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-[#FDDF65]" />
        <span className="text-gray-600 text-sm">{location.description}</span>
      </div>
      
      {/* Mapa placeholder */}
      <div className="w-full h-48 sm:h-64 bg-[#E8DCC4] rounded-2xl overflow-hidden shadow-md">
        {/* Aquí iría un componente de mapa real, por ahora usamos un placeholder */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {/* Simulación simple de mapa */}
          <svg
            viewBox="0 0 400 250"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Calles */}
            <path d="M 50 100 L 350 100" stroke="#D4C4A8" strokeWidth="30" />
            <path d="M 200 0 L 200 250" stroke="#D4C4A8" strokeWidth="30" />
            <path d="M 100 180 L 300 180" stroke="#D4C4A8" strokeWidth="20" />
            
            {/* Edificios */}
            <circle cx="120" cy="50" r="25" fill="#C4B69C" opacity="0.6" />
            <circle cx="280" cy="60" r="30" fill="#C4B69C" opacity="0.6" />
            <circle cx="150" cy="220" r="20" fill="#C4B69C" opacity="0.6" />
            <circle cx="260" cy="130" r="35" fill="#C4B69C" opacity="0.6" />
            
            {/* Rotonda central */}
            <circle cx="200" cy="100" r="25" fill="#BFB39E" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
