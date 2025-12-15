import { Star } from 'lucide-react';

interface StoreHeaderProps {
  name: string;
  rating: number;
  image?: string;
}

export default function StoreHeader({ name, rating, image }: StoreHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-4 sm:gap-6 mb-4">
        {/* Imagen de la tienda */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-300 rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full"></div>
          )}
        </div>

        {/* Nombre y rating */}
        <div className="flex-1 pt-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#262626] mb-3">
            {name}
          </h1>
          <div className="flex items-center gap-2">
            <Star className="w-7 h-7 fill-[#FDDF65] text-[#FDDF65]" />
            <span className="text-2xl font-bold text-[#FDDF65]">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
