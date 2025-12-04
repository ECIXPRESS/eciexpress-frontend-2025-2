/**
 * ManualCodeModal - Modal para ingreso manual de código de validación
 * Alternativa al escáner QR cuando la cámara no está disponible
 * Permite ingresar códigos de 9 caracteres alfanuméricos
 */
import React, { useEffect, useState, useRef } from 'react';
import { X, Hash } from 'lucide-react';

interface ManualCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
  onBackToScanner: () => void;
  pedidoId: string;
}

export const ManualCodeModal: React.FC<ManualCodeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onBackToScanner,
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Gestiona apertura/cierre del modal y enfoca el primer input
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 400);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      setCode(['', '', '', '', '', '', '', '', '']);
      setError(null);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /** Maneja pegado de código completo desde portapapeles */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^A-Za-z0-9]/g, '').slice(0, 9).toUpperCase();
    const newCode = pastedData.split('').concat(Array(9 - pastedData.length).fill(''));
    setCode(newCode);
    
    const lastIndex = Math.min(pastedData.length, 8);
    inputRefs.current[lastIndex]?.focus();
  };

  /** Valida que el código tenga 9 caracteres antes de enviar */
  const handleValidate = () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 9) {
      setError('El código debe tener 9 dígitos');
      return;
    }

    onSuccess(fullCode);
  };

  /** Transición suave de vuelta al escáner QR */
  const handleBackToScanner = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onBackToScanner();
      setIsTransitioning(false);
    }, 300);
  };

  const isComplete = code.every(digit => digit !== '');

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className={`
          absolute inset-0 bg-black/70 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Contenedor del modal - mismo tamaño exacto que QR */}
      <div 
        className={`
          relative w-full max-w-md z-10
          transition-all duration-500 ease-out
          ${isAnimating
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 -translate-y-12'
          }
          ${isTransitioning ? 'opacity-0 scale-95' : ''}
        `}
        style={{
          transitionTimingFunction: isAnimating 
            ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
            : 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className={`
            absolute -top-12 right-0 bg-white hover:bg-gray-100 text-gray-700 
            p-2.5 rounded-lg shadow-lg hover:shadow-xl z-20 group
            transition-all duration-300
            ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
          style={{ transitionDelay: isAnimating ? '200ms' : '0ms' }}
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        {/* Contenido del modal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header - igual que QR */}
          <div className="bg-white p-6 border-b border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-3">
                <Hash className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">
                Escanea el código de validación
              </h3>
              <p className="text-sm text-gray-500">
                Ingresa el código del usuario que retira el pedido
              </p>
            </div>
          </div>

          {/* Área de entrada del código - mismo tamaño EXACTO que video QR */}
          <div className="relative bg-white aspect-square">
            {/* Contenido centrado */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-xs">
                {/* Label del código */}
                <div className="text-center mb-6">
                  <p className="text-base font-semibold text-gray-700">
                    Código de validación
                  </p>
                </div>

                {/* Campo de texto único */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={code.join('')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 9).toUpperCase();
                      const newCode = value.split('').concat(Array(9 - value.length).fill(''));
                      setCode(newCode);
                      setError(null);
                    }}
                    onPaste={handlePaste}
                    placeholder="Ingresa el código"
                    className={`
                      w-full px-4 py-4 bg-gray-50 rounded-xl text-center text-xl font-bold uppercase
                      border-2 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                      placeholder:text-gray-400 placeholder:font-normal placeholder:normal-case
                      ${error ? 'border-red-400 shake bg-red-50' : 'border-gray-200'}
                    `}
                    maxLength={9}
                  />
                  
                  {/* Contador de caracteres */}
                  <div className="mt-3 text-center">
                    <span className={`text-sm font-medium transition-colors duration-200 ${
                      isComplete ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {code.filter(d => d).length} / 9 caracteres
                    </span>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                    <p className="text-sm text-red-700 font-medium text-center">
                      {error}
                    </p>
                  </div>
                )}

                {/* Detalles de entrega cuando está completo */}
                {isComplete && !error && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
                    <p className="text-xs font-semibold text-gray-600 mb-3">
                      Detalles de la entrega
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Código:</span>
                        <span className="font-bold text-gray-900">{code.join('')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monto:</span>
                        <span className="font-semibold text-green-600">$ 10.500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Descripción:</span>
                        <span className="font-medium text-gray-900 text-right">Combo hamburguesa</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer - igual que QR */}
          <div className="p-6 bg-white">
            <button
              onClick={handleValidate}
              disabled={!isComplete}
              className={`
                w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-200 
                flex items-center justify-center gap-2 text-base mb-3
                ${isComplete
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Validar
            </button>

            <button
              onClick={handleBackToScanner}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:border-gray-300"
            >
              Volver
            </button>
            
            <p className="text-xs text-gray-400 text-center mt-3">
              El código se encuentra en el comprobante del pedido
            </p>
          </div>
        </div>
      </div>

      {/* Animación de shake para error */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};
