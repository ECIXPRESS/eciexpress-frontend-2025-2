import { StoreLocation } from '../types/store.types';
import { MapPin } from 'lucide-react';
import locationMapImg from '@/assets/stores/mapa.png';

interface StoreLocationInfoProps {
  location: StoreLocation;
}

export default function StoreLocationInfo({ location }: StoreLocationInfoProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-[#FDDF65]" />
        <span className="text-gray-600 text-sm sm:text-base">{location.description}</span>
      </div>
      
      {/* Mapa */}
      <div className="w-full h-56 sm:h-72 md:h-80 bg-[#E8DCC4] rounded-2xl overflow-hidden shadow-md">
        <img 
          src={locationMapImg} 
          alt="Mapa de ubicación" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
