import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductImageProps {
  imageUrl: string;
  productName: string;
  onFavoriteToggle?: () => void;
}

/**
 * Componente de imagen del producto con fondo decorativo
 * Incluye botón de favoritos en la esquina superior derecha
 */
export default function ProductImage({ 
  imageUrl, 
  productName,
  onFavoriteToggle 
}: ProductImageProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.();
  };

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      {/* Fondo decorativo amarillo con formas geométricas */}
      <div className="absolute inset-0 bg-[#FDDF65] rounded-3xl overflow-hidden">
        {/* Formas decorativas triangulares */}
        <div className="absolute top-10 left-10 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-[#f5d74e] border-r-[30px] border-r-transparent opacity-30 rotate-12" />
        <div className="absolute bottom-16 right-16 w-0 h-0 border-l-[25px] border-l-transparent border-t-[45px] border-t-[#f5d74e] border-r-[25px] border-r-transparent opacity-30 -rotate-45" />
        <div className="absolute top-1/3 right-10 w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-[#f5d74e] border-r-[20px] border-r-transparent opacity-30 rotate-90" />
        <div className="absolute bottom-1/4 left-16 w-0 h-0 border-l-[18px] border-l-transparent border-t-[30px] border-t-[#f5d74e] border-r-[18px] border-r-transparent opacity-30 -rotate-12" />
        
        {/* Círculos decorativos */}
        <div className="absolute top-20 right-1/4 w-16 h-16 rounded-full bg-[#f5d74e] opacity-20" />
        <div className="absolute bottom-32 left-1/3 w-12 h-12 rounded-full bg-[#f5d74e] opacity-20" />
      </div>

      {/* Imagen del producto */}
      <div className="relative z-10 flex items-center justify-center h-full p-8">
        <img
          src={imageUrl}
          alt={productName}
          className="max-w-full max-h-full object-contain drop-shadow-2xl"
          style={{ 
            maxHeight: '450px',
            maxWidth: '100%',
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))'
          }}
        />
      </div>

      {/* Botón de favoritos */}
      <button
        onClick={handleFavoriteClick}
        className={`
          absolute top-6 right-6 z-20
          w-12 h-12 rounded-full 
          flex items-center justify-center
          transition-all duration-300
          ${isFavorite 
            ? 'bg-red-500 hover:bg-red-600 scale-110' 
            : 'bg-white/80 hover:bg-white'
          }
          shadow-lg hover:shadow-xl
        `}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <Heart 
          className={`w-5 h-5 transition-all ${
            isFavorite 
              ? 'fill-white text-white' 
              : 'text-gray-600'
          }`}
        />
      </button>
    </div>
  );
}