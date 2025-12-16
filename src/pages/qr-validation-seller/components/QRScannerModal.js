import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * QRScannerModal - Modal dedicado para escaneo de códigos QR
 * Utiliza la cámara del dispositivo para detectar y decodificar códigos QR
 */
import { useEffect, useRef, useState } from 'react';
import { X, AlertCircle, Keyboard, QrCode } from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/library';
export const QRScannerModal = ({ isOpen, onClose, onSuccess, onManualEntry, }) => {
    const videoRef = useRef(null);
    const [, setIsScanning] = useState(false);
    const [error, setError] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const codeReaderRef = useRef(null);
    // Gestiona apertura/cierre del modal y control de la cámara
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
            startScanning();
        }
        else {
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
            const selectedDevice = videoInputDevices.find(device => device.label.toLowerCase().includes('back') ||
                device.label.toLowerCase().includes('trasera')) || videoInputDevices[0];
            codeReader.decodeFromVideoDevice(selectedDevice.deviceId, videoRef.current, (result) => {
                if (result) {
                    const code = result.getText();
                    onSuccess(code);
                    stopScanning();
                }
            });
        }
        catch (err) {
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
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: `
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `, onClick: handleClose, children: [_jsx("div", { className: `
          absolute inset-0 bg-black/70 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        ` }), _jsxs("div", { className: `
          relative w-full max-w-md z-10
          transition-all duration-500 ease-out
          ${isAnimating
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-75 -translate-y-12'}
          ${isTransitioning ? 'opacity-0 scale-95' : ''}
        `, style: {
                    transitionTimingFunction: isAnimating
                        ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'cubic-bezier(0.4, 0, 0.2, 1)'
                }, onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: handleClose, className: `
            absolute -top-12 right-0 bg-white hover:bg-gray-100 text-gray-700 
            p-2.5 rounded-lg shadow-lg hover:shadow-xl z-20 group
            transition-all duration-300
            ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `, style: { transitionDelay: isAnimating ? '200ms' : '0ms' }, "aria-label": "Cerrar", children: _jsx(X, { className: "w-5 h-5 group-hover:rotate-90 transition-transform duration-300" }) }), _jsxs("div", { className: "bg-white rounded-2xl shadow-2xl overflow-hidden", children: [_jsx("div", { className: "bg-white p-6 border-b border-gray-100", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-3", children: _jsx(QrCode, { className: "w-8 h-8 text-primary-600" }) }), _jsx("h3", { className: "font-bold text-xl text-gray-900 mb-1", children: "Escanea el c\u00F3digo QR" }), _jsx("p", { className: "text-sm text-gray-500", children: "Usa el c\u00F3digo QR dentro del \u00E1rea indicada y ser\u00E1 escaneado autom\u00E1ticamente" })] }) }), _jsx("div", { className: "relative bg-black aspect-square", children: !error ? (_jsxs(_Fragment, { children: [_jsx("video", { ref: videoRef, className: "w-full h-full object-cover", autoPlay: true, playsInline: true, muted: true }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center p-8", children: [_jsx("div", { className: "absolute inset-0 bg-black/40" }), _jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [_jsxs("div", { className: "w-64 h-64 border-4 border-yellow-400 rounded-2xl relative bg-transparent shadow-2xl", children: [_jsxs("div", { className: "absolute -top-1 -left-1 w-12 h-12", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-yellow-400 rounded-tl-2xl" }), _jsx("div", { className: "absolute top-0 left-0 w-1 h-full bg-yellow-400 rounded-tl-2xl" })] }), _jsxs("div", { className: "absolute -top-1 -right-1 w-12 h-12", children: [_jsx("div", { className: "absolute top-0 right-0 w-full h-1 bg-yellow-400 rounded-tr-2xl" }), _jsx("div", { className: "absolute top-0 right-0 w-1 h-full bg-yellow-400 rounded-tr-2xl" })] }), _jsxs("div", { className: "absolute -bottom-1 -left-1 w-12 h-12", children: [_jsx("div", { className: "absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-bl-2xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-1 h-full bg-yellow-400 rounded-bl-2xl" })] }), _jsxs("div", { className: "absolute -bottom-1 -right-1 w-12 h-12", children: [_jsx("div", { className: "absolute bottom-0 right-0 w-full h-1 bg-yellow-400 rounded-br-2xl" }), _jsx("div", { className: "absolute bottom-0 right-0 w-1 h-full bg-yellow-400 rounded-br-2xl" })] }), _jsx("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-lg shadow-yellow-400/50 animate-scan" })] }), _jsx("p", { className: "text-white text-sm font-medium bg-black/60 px-6 py-2.5 rounded-lg backdrop-blur-sm mt-6 text-center", children: "Coloca el c\u00F3digo QR dentro del marco" })] })] })] })) : (
                                // Vista de error cuando la cámara no está disponible
                                _jsx("div", { className: "flex items-center justify-center aspect-square p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4", children: _jsx(AlertCircle, { className: "w-10 h-10 text-red-600" }) }), _jsx("p", { className: "text-white text-lg font-semibold mb-2", children: "Error de c\u00E1mara" }), _jsx("p", { className: "text-gray-300 text-sm mb-6 max-w-xs mx-auto", children: error }), _jsx("button", { onClick: startScanning, className: "bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg", children: "Reintentar" })] }) })) }), _jsxs("div", { className: "p-6 bg-white", children: [_jsxs("button", { onClick: handleManualEntry, className: "w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:border-gray-300", children: [_jsx(Keyboard, { className: "w-5 h-5" }), "\u00BFNo funciona? Ingresar c\u00F3digo manualmente"] }), _jsx("p", { className: "text-xs text-gray-400 text-center mt-3", children: "\u00BFProblemas con la c\u00E1mara? Usa la entrada manual" })] })] })] }), _jsx("style", { children: `
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0.5; }
          50% { top: calc(100% - 4px); opacity: 1; }
        }
        .animate-scan {
          animation: scan 2.5s ease-in-out infinite;
        }
      ` })] }));
};
