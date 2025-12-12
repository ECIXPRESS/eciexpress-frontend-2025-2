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
      {/* Fondo amarillo simple sin formas decorativas */}
      <div className="absolute inset-0 bg-[#FDDF65] rounded-3xl" />

      {/* Contenedor blanco interior para la imagen */}
      <div className="absolute inset-0 m-8 bg-white rounded-2xl overflow-hidden">
        {/* Imagen del producto */}
        <div className="relative z-10 flex items-center justify-center h-full p-4">
          <img
            src={imageUrl}
            alt={productName}
            className="max-w-full max-h-full object-contain"
            style={{ 
              maxHeight: '100%',
              maxWidth: '100%'
            }}
          />
        </div>
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
            : 'bg-white hover:bg-gray-50'
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