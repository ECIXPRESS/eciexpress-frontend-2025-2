import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ErrorModal - Modal para mostrar diferentes tipos de errores
 * Tipos soportados:
 * - qr-invalid: Código QR inválido o expirado
 * - order-not-found: Pedido no encontrado en el sistema
 * - camera-unavailable: No se pudo acceder a la cámara (auto-redirige a manual)
 */
import { useEffect, useState } from 'react';
import { AlertCircle, XCircle, CameraOff, RefreshCw, Keyboard } from 'lucide-react';
export const ErrorModal = ({ isOpen, onClose, errorType, onManualEntry, onRetry, code, }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    // Auto-redirige a validación manual si la cámara no está disponible
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            if (errorType === 'camera-unavailable') {
                const timer = setTimeout(() => {
                    if (onManualEntry) {
                        onManualEntry();
                    }
                }, 3000);
                return () => clearTimeout(timer);
            }
        }
        else {
            setIsAnimating(false);
        }
    }, [isOpen, errorType, onManualEntry]);
    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };
    /** Ejecuta la acción principal según el tipo de error */
    const handlePrimaryAction = () => {
        const config = getErrorConfig();
        if (config?.primaryAction?.onClick) {
            setIsAnimating(false);
            setTimeout(() => {
                config.primaryAction.onClick();
            }, 300);
        }
    };
    /** Ejecuta la acción secundaria según el tipo de error */
    const handleSecondaryAction = () => {
        const config = getErrorConfig();
        if (config?.secondaryAction?.onClick) {
            setIsAnimating(false);
            setTimeout(() => {
                config.secondaryAction.onClick();
            }, 300);
        }
    };
    /**
     * Retorna la configuración del modal según el tipo de error
     * Incluye: icono, colores, título, mensaje y acciones
     */
    const getErrorConfig = () => {
        switch (errorType) {
            case 'qr-invalid':
                return {
                    icon: XCircle,
                    iconBg: 'bg-orange-100',
                    iconColor: 'text-orange-600',
                    title: 'Código QR Inválido',
                    message: 'El código QR escaneado no es válido o ha expirado',
                    details: code ? `Código: ${code}` : null,
                    primaryAction: {
                        label: 'Ingresar Manualmente',
                        icon: Keyboard,
                        onClick: () => {
                            if (onManualEntry)
                                onManualEntry();
                        },
                        color: 'bg-orange-500 hover:bg-orange-600',
                    },
                    secondaryAction: {
                        label: 'Reintentar',
                        icon: RefreshCw,
                        onClick: () => {
                            if (onRetry)
                                onRetry();
                        },
                    },
                };
            case 'order-not-found':
                return {
                    icon: AlertCircle,
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    title: 'Pedido No Encontrado',
                    message: 'No se encontró ningún pedido asociado con este código',
                    details: code ? `Código buscado: ${code}` : null,
                    primaryAction: {
                        label: 'Recargar Lista',
                        icon: RefreshCw,
                        onClick: () => {
                            if (onRetry)
                                onRetry();
                        },
                        color: 'bg-red-500 hover:bg-red-600',
                    },
                    secondaryAction: {
                        label: 'Intentar Otro Código',
                        icon: Keyboard,
                        onClick: handleClose,
                    },
                };
            case 'camera-unavailable':
                return {
                    icon: CameraOff,
                    iconBg: 'bg-yellow-50',
                    iconColor: 'text-yellow-500',
                    title: 'Cámara No Disponible',
                    message: 'No se pudo acceder a la cámara del dispositivo',
                    details: 'Redirigiendo a validación manual...',
                    primaryAction: {
                        label: 'Ir a Validación Manual',
                        icon: Keyboard,
                        onClick: () => {
                            if (onManualEntry)
                                onManualEntry();
                        },
                        color: 'bg-yellow-400 hover:bg-yellow-500',
                    },
                    secondaryAction: null,
                };
            default:
                return null;
        }
    };
    const config = getErrorConfig();
    if (!isOpen || !config)
        return null;
    const Icon = config.icon;
    return (_jsxs("div", { className: `
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `, onClick: handleClose, children: [_jsx("div", { className: `
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        ` }), _jsx("div", { className: `
          relative w-full max-w-md z-10
          transition-all duration-500 ease-out
          ${isAnimating
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 translate-y-8'}
        `, style: {
                    transitionTimingFunction: isAnimating
                        ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'cubic-bezier(0.4, 0, 0.2, 1)'
                }, onClick: (e) => e.stopPropagation(), children: _jsx("div", { className: "bg-white rounded-2xl shadow-2xl overflow-hidden", children: _jsxs("div", { className: "p-8 text-center", children: [_jsx("div", { className: `inline-flex items-center justify-center w-20 h-20 ${config.iconBg} rounded-full mb-4 animate-shake-scale`, children: _jsx(Icon, { className: `w-12 h-12 ${config.iconColor}` }) }), _jsx("h3", { className: "font-bold text-2xl text-gray-900 mb-2", children: config.title }), _jsx("p", { className: "text-gray-600 mb-3", children: config.message }), config.details && (_jsx("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6", children: _jsx("p", { className: "text-sm text-gray-700 font-medium", children: config.details }) })), _jsxs("div", { className: "space-y-3", children: [config.primaryAction && (_jsxs("button", { onClick: handlePrimaryAction, className: `
                    w-full ${config.primaryAction.color} text-white py-3.5 px-4 rounded-xl 
                    font-bold transition-all duration-200 shadow-lg hover:shadow-xl 
                    flex items-center justify-center gap-2 transform hover:scale-[1.02]
                  `, children: [config.primaryAction.icon && _jsx(config.primaryAction.icon, { className: "w-5 h-5" }), config.primaryAction.label] })), config.secondaryAction && (_jsxs("button", { onClick: handleSecondaryAction, className: "w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:border-gray-300", children: [config.secondaryAction.icon && _jsx(config.secondaryAction.icon, { className: "w-5 h-5" }), config.secondaryAction.label] }))] }), errorType === 'camera-unavailable' && (_jsx("p", { className: "text-xs text-gray-400 mt-4 animate-pulse", children: "Redirigiendo autom\u00E1ticamente en 3 segundos..." }))] }) }) }), _jsx("style", { children: `
        @keyframes shake-scale {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          50% { transform: scale(1.1) rotate(5deg); }
          75% { transform: scale(1.1) rotate(-5deg); }
        }
        .animate-shake-scale {
          animation: shake-scale 0.6s ease-out;
        }
      ` })] }));
};
