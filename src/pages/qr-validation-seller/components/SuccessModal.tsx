/**
 * SuccessModal - Modal de confirmación de validación exitosa
 * Se cierra automáticamente después de 3 segundos
 */
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  code,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Auto-cierre después de 3 segundos
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div 
        className={`
          absolute inset-0 bg-black/50 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Contenedor del modal */}
      <div 
        className={`
          relative w-full max-w-sm z-10
          transition-all duration-500 ease-out
          ${isAnimating
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-4'
          }
        `}
        style={{
          transitionTimingFunction: isAnimating 
            ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
            : 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenido del modal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            {/* Icono de éxito animado */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce-once">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            {/* Título */}
            <h3 className="font-bold text-2xl text-gray-900 mb-2">
              ¡Pedido Validado!
            </h3>
            
            {/* Mensaje */}
            <p className="text-gray-600 mb-4">
              El pedido ha sido entregado exitosamente
            </p>
            
            {/* Código validado */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-green-700 mb-1">
                Código validado
              </p>
              <p className="text-lg font-bold text-green-900">
                {code}
              </p>
            </div>
            
            {/* Botón de cerrar */}
            <button
              onClick={handleClose}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Aceptar
            </button>
            
            <p className="text-xs text-gray-400 mt-3">
              Este mensaje se cerrará automáticamente
            </p>
          </div>
        </div>
      </div>

      {/* Animación de bounce una sola vez */}
      <style>{`
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};
