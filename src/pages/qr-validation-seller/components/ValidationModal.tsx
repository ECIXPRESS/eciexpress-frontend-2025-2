/**
 * ValidationModal - Modal de validación con pestañas QR y código manual
 * Permite validar pedidos mediante escaneo QR o ingreso manual del código
 */
import React, { useEffect, useRef, useState } from 'react';
import { X, QrCode, Hash, AlertCircle} from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/library';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
  pedidoId: string;
  initialTab?: 'qr' | 'manual';
}

type TabType = 'qr' | 'manual';

export const ValidationModal: React.FC<ValidationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'qr',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [code, setCode] = useState(['', '', '', '', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [, setIsScanning] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);

  // Sincroniza la pestaña activa con initialTab cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Gestiona el ciclo de vida del modal y el escáner
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      if (activeTab === 'qr') {
        startScanning();
      } else {
        setTimeout(() => {
          const manualInput = document.querySelector('input[placeholder="Ingresa el código"]') as HTMLInputElement;
          manualInput?.focus();
        }, 400);
      }
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      stopScanning();
      setCode(['', '', '', '', '', '', '', '', '']);
      setError(null);
      setQrError(null);
    }

    return () => {
      document.body.style.overflow = 'unset';
      stopScanning();
    };
  }, [isOpen, activeTab]);

  // Inicia el escáner de códigos QR
  const startScanning = async () => {
    try {
      setQrError(null);
      setIsScanning(true);

      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      const videoInputDevices = await codeReader.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        throw new Error('No se encontró ninguna cámara en tu dispositivo');
      }

      // Prioriza la cámara trasera si está disponible
      const selectedDevice = videoInputDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('trasera')
      ) || videoInputDevices[0];

      codeReader.decodeFromVideoDevice(
        selectedDevice.deviceId,
        videoRef.current!,
        (result) => {
          if (result) {
            const code = result.getText();
            onSuccess(code);
            stopScanning();
          }
        }
      );
    } catch (err: any) {
      console.error('Error al iniciar escáner:', err);
      setQrError(err.message || 'No se pudo acceder a la cámara');
      setIsScanning(false);
    }
  };

  // Detiene el escáner y libera recursos
  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    setIsScanning(false);
  };

  // Cambia entre pestañas QR y manual
  const handleTabChange = (tab: TabType) => {
    if (tab === 'qr') {
      stopScanning();
    }
    setActiveTab(tab);
    setError(null);
    setQrError(null);
    setCode(['', '', '', '', '', '', '', '', '']);
    
    if (tab === 'manual') {
      setTimeout(() => {
        const manualInput = document.querySelector('input[placeholder="Ingresa el código"]') as HTMLInputElement;
        manualInput?.focus();
      }, 100);
    }
  };

  // Maneja el pegado de código desde el portapapeles
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^A-Za-z0-9]/g, '').slice(0, 9).toUpperCase();
    const newCode = pastedData.split('').concat(Array(9 - pastedData.length).fill(''));
    setCode(newCode);
  };

  // Valida el código ingresado manualmente
  const handleValidate = () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 9) {
      setError('El código debe tener 9 caracteres');
      return;
    }

    onSuccess(fullCode);
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
      {/* Fondo oscuro con blur */}
      <div 
        className={`
          absolute inset-0 bg-black/70 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Contenedor del modal con animación de entrada */}
      <div 
        className={`
          relative w-full max-w-md z-10
          transition-all duration-500 ease-out
          ${isAnimating
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 -translate-y-12'
          }
        `}
        style={{
          transitionTimingFunction: isAnimating 
            ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
            : 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
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
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header con pestañas */}
          <div className="bg-white border-b border-gray-100">
            <div className="flex border-b border-gray-200">
              {/* Pestaña QR */}
              <button
                onClick={() => handleTabChange('qr')}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-4 px-4 font-semibold text-sm
                  transition-all duration-200 relative
                  ${activeTab === 'qr'
                    ? 'text-primary-600 bg-white'
                    : 'text-gray-500 bg-gray-50 hover:text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <QrCode className="w-5 h-5" />
                <span>Escanear QR</span>
                {activeTab === 'qr' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
              
              {/* Pestaña código manual */}
              <button
                onClick={() => handleTabChange('manual')}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-4 px-4 font-semibold text-sm
                  transition-all duration-200 relative
                  ${activeTab === 'manual'
                    ? 'text-primary-600 bg-white'
                    : 'text-gray-500 bg-gray-50 hover:text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Hash className="w-5 h-5" />
                <span>Código Manual</span>
                {activeTab === 'manual' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            </div>

            {/* Título dinámico según pestaña */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-3">
                {activeTab === 'qr' ? (
                  <QrCode className="w-8 h-8 text-primary-600" />
                ) : (
                  <Hash className="w-8 h-8 text-primary-600" />
                )}
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">
                {activeTab === 'qr' ? 'Escanea el código QR' : 'Código de validación'}
              </h3>
              <p className="text-sm text-gray-500">
                {activeTab === 'qr'
                  ? 'Coloca el código QR dentro del área indicada'
                  : 'Ingresa el código del usuario que retira el pedido'
                }
              </p>
            </div>
          </div>

          {/* Contenido según pestaña activa */}
          <div className={`relative bg-white ${activeTab === 'qr' ? 'aspect-square' : 'h-[383px]'}`}>
            {activeTab === 'qr' ? (
              // Vista del escáner QR
              <div className="relative bg-black h-full">
                {!qrError ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                    
                    {/* Overlay con marco de escaneo */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="absolute inset-0 bg-black/40" />
                      
                      <div className="relative z-10 flex flex-col items-center">
                        {/* Marco amarillo de escaneo */}
                        <div className="w-64 h-64 border-4 border-yellow-400 rounded-2xl relative bg-transparent shadow-2xl">
                          {/* Esquinas decorativas */}
                          <div className="absolute -top-1 -left-1 w-12 h-12">
                            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 rounded-tl-2xl" />
                            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 rounded-tl-2xl" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-12 h-12">
                            <div className="absolute top-0 right-0 w-full h-1 bg-yellow-400 rounded-tr-2xl" />
                            <div className="absolute top-0 right-0 w-1 h-full bg-yellow-400 rounded-tr-2xl" />
                          </div>
                          <div className="absolute -bottom-1 -left-1 w-12 h-12">
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-bl-2xl" />
                            <div className="absolute bottom-0 left-0 w-1 h-full bg-yellow-400 rounded-bl-2xl" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-12 h-12">
                            <div className="absolute bottom-0 right-0 w-full h-1 bg-yellow-400 rounded-br-2xl" />
                            <div className="absolute bottom-0 right-0 w-1 h-full bg-yellow-400 rounded-br-2xl" />
                          </div>
                          
                          {/* Línea animada de escaneo */}
                          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-lg shadow-yellow-400/50 animate-scan" />
                        </div>
                        
                        <p className="text-white text-sm font-medium bg-black/60 px-6 py-2.5 rounded-lg backdrop-blur-sm mt-6 text-center">
                          Coloca el código QR dentro del marco
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Vista de error de cámara
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                      </div>
                      <p className="text-white text-lg font-semibold mb-2">Error de cámara</p>
                      <p className="text-gray-300 text-sm mb-6 max-w-xs mx-auto">{qrError}</p>
                      <button
                        onClick={startScanning}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg"
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Vista de ingreso manual
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-[280px]">
                  <div className="text-center mb-3">
                    <p className="text-sm font-semibold text-gray-700">
                      Código de validación
                    </p>
                  </div>

                  <div className="mb-2">
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
                        w-full px-3 py-3 bg-gray-50 rounded-lg text-center text-base font-bold uppercase
                        border-2 transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                        placeholder:text-gray-400 placeholder:font-normal placeholder:normal-case placeholder:text-sm
                        ${error ? 'border-red-400 shake bg-red-50' : 'border-gray-200'}
                      `}
                      maxLength={9}
                    />
                    
                    <div className="mt-1.5 text-center">
                      <span className={`text-xs font-medium transition-colors duration-200 ${
                        isComplete ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {code.filter(d => d).length} / 9 caracteres
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-2 p-2 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                      <p className="text-xs text-red-700 font-medium text-center">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Preview de detalles cuando el código está completo */}
                  {isComplete && !error && (
                    <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 shadow-sm">
                      <p className="text-xs font-semibold text-gray-600 mb-1.5">
                        Detalles de la entrega
                      </p>
                      <div className="space-y-1 text-xs">
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
                          <span className="font-medium text-gray-900 text-right">Combo</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer con acciones */}
          <div className="p-6 bg-white border-t border-gray-100">
            {activeTab === 'manual' && (
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
            )}
            
            <p className="text-xs text-gray-400 text-center">
              {activeTab === 'qr'
                ? '¿Problemas con la cámara? Usa la pestaña de código manual'
                : 'El código se encuentra en el comprobante del pedido'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0.5; }
          50% { top: calc(100% - 4px); opacity: 1; }
        }
        .animate-scan {
          animation: scan 2.5s ease-in-out infinite;
        }
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
