/**
 * SuccessToast - Notificación de éxito al actualizar stock
 * Se muestra brevemente y se auto-oculta
 */
import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  isVisible,
  message,
  onClose,
  duration = 3000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 flex items-center gap-3 
        bg-green-500 text-white px-5 py-4 rounded-xl shadow-2xl
        transition-all duration-300 ease-out
        ${isAnimating 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95'
        }
      `}
    >
      <div className="flex-shrink-0">
        <CheckCircle className="w-6 h-6" />
      </div>
      <p className="font-semibold">{message}</p>
      <button
        onClick={() => {
          setIsAnimating(false);
          setTimeout(onClose, 300);
        }}
        className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
