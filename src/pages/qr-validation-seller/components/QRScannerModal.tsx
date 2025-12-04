/**
 * QRScannerModal - Modal dedicado para escaneo de códigos QR
 * Utiliza la cámara del dispositivo para detectar y decodificar códigos QR
 */
import React, { useEffect, useRef, useState } from 'react';
import { X, AlertCircle, Keyboard, QrCode } from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/library';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
  onManualEntry: () => void;
  pedidoId: string;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onManualEntry,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);

  // Gestiona apertura/cierre del modal y control de la cámara
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      startScanning();
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      stopScanning();
    }

    return () => {
      document.body.style.overflow = 'unset';
      stopScanning();
    };
  }, [isOpen]);

  // Inicializa el escáner QR y configura la cámara
  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      const videoInputDevices = await codeReader.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        throw new Error('No se encontró ninguna cámara en tu dispositivo');
      }

      // Prioriza cámara trasera para mejor experiencia en móviles
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
      setError(err.message || 'No se pudo acceder a la cámara');
      setIsScanning(false);
    }
  };

  // Libera recursos de la cámara
  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    setIsScanning(false);
  };

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  // Transición suave hacia el modal de ingreso manual
  const handleManualEntry = () => {
    setIsTransitioning(true);
    stopScanning();
    setTimeout(() => {
      onManualEntry();
      setIsTransitioning(false);
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
      {/* Backdrop con blur */}
      <div 
        className={`
          absolute inset-0 bg-black/70 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Contenedor del modal */}
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
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
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
          {/* Header */}
          <div className="bg-white p-6 border-b border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-3">
                <QrCode className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">
                Escanea el código QR
              </h3>
              <p className="text-sm text-gray-500">
                Usa el código QR dentro del área indicada y será escaneado automáticamente
              </p>
            </div>
          </div>

          {/* Área de video con marco de escaneo */}
          <div className="relative bg-black aspect-square">
            {!error ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                
                {/* Overlay con marco amarillo de escaneo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="absolute inset-0 bg-black/40" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Marco de escaneo con esquinas decorativas */}
                    <div className="w-64 h-64 border-4 border-yellow-400 rounded-2xl relative bg-transparent shadow-2xl">
                      {/* Esquina superior izquierda */}
                      <div className="absolute -top-1 -left-1 w-12 h-12">
                        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 rounded-tl-2xl" />
                        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 rounded-tl-2xl" />
                      </div>
                      {/* Esquina superior derecha */}
                      <div className="absolute -top-1 -right-1 w-12 h-12">
                        <div className="absolute top-0 right-0 w-full h-1 bg-yellow-400 rounded-tr-2xl" />
                        <div className="absolute top-0 right-0 w-1 h-full bg-yellow-400 rounded-tr-2xl" />
                      </div>
                      {/* Esquina inferior izquierda */}
                      <div className="absolute -bottom-1 -left-1 w-12 h-12">
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-bl-2xl" />
                        <div className="absolute bottom-0 left-0 w-1 h-full bg-yellow-400 rounded-bl-2xl" />
                      </div>
                      {/* Esquina inferior derecha */}
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
              // Vista de error cuando la cámara no está disponible
              <div className="flex items-center justify-center aspect-square p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                    <AlertCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">Error de cámara</p>
                  <p className="text-gray-300 text-sm mb-6 max-w-xs mx-auto">{error}</p>
                  <button
                    onClick={startScanning}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer con opción de ingreso manual */}
          <div className="p-6 bg-white">
            <button
              onClick={handleManualEntry}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:border-gray-300"
            >
              <Keyboard className="w-5 h-5" />
              ¿No funciona? Ingresar código manualmente
            </button>
            
            <p className="text-xs text-gray-400 text-center mt-3">
              ¿Problemas con la cámara? Usa la entrada manual
            </p>
          </div>
        </div>
      </div>

      {/* Animación de línea de escaneo */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0.5; }
          50% { top: calc(100% - 4px); opacity: 1; }
        }
        .animate-scan {
          animation: scan 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
