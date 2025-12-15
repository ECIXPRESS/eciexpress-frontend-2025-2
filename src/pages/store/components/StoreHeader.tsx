import { Star } from 'lucide-react';

interface StoreHeaderProps {
  name: string;
  rating: number;
  image?: string;
}

export default function StoreHeader({ name, rating, image }: StoreHeaderProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 mb-6">
      {/* Imagen de la tienda */}
      <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gray-300 rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full"></div>
        )}
      </div>

      {/* Nombre y rating */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#262626]">
            {name}
          </h1>
          <div className="flex items-center gap-2">
            <Star className="w-7 h-7 sm:w-8 sm:h-8 fill-[#FDDF65] text-[#FDDF65]" />
            <span className="text-3xl sm:text-4xl font-bold text-[#FDDF65]">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
