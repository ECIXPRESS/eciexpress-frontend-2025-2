import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Heart } from 'lucide-react';
import { useState } from 'react';
/**
 * Componente de imagen del producto con fondo decorativo
 */
export default function ProductImage({ imageUrl, productName, onFavoriteToggle }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        onFavoriteToggle?.();
    };
    return (_jsxs("div", { className: "relative w-full h-full min-h-[400px] md:min-h-[500px]", children: [_jsx("div", { className: "absolute inset-0 bg-[#FDDF65] rounded-3xl" }), _jsx("div", { className: "absolute inset-0 m-8 bg-white rounded-2xl overflow-hidden", children: _jsx("div", { className: "relative z-10 flex items-center justify-center h-full p-4", children: _jsx("img", { src: imageUrl, alt: productName, className: "max-w-full max-h-full object-contain", style: {
                            maxHeight: '100%',
                            maxWidth: '100%'
                        } }) }) }), _jsx("button", { onClick: handleFavoriteClick, className: `
          absolute top-6 right-6 z-20
          w-12 h-12 rounded-full 
          flex items-center justify-center
          transition-all duration-300
          ${isFavorite
                    ? 'bg-red-500 hover:bg-red-600 scale-110'
                    : 'bg-white hover:bg-gray-50'}
          shadow-lg hover:shadow-xl
        `, "aria-label": isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos', children: _jsx(Heart, { className: `w-5 h-5 transition-all ${isFavorite
                        ? 'fill-white text-white'
                        : 'text-gray-600'}` }) })] }));
}
