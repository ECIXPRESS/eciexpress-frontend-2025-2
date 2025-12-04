/**
 * PedidoModal - Modal de detalles completos del pedido
 * Muestra información de contacto, entrega, pago y lista de productos
 */
import React, { useEffect, useState } from 'react';
import { X, User, Phone, Clock, CreditCard, ChefHat, DollarSign } from 'lucide-react';
import type { Pedido } from '../types/pedidos';

interface PedidoModalProps {
  pedido: Pedido | null;
  isOpen: boolean;
  onClose: () => void;
  onValidar: (id: string) => void;
}

export const PedidoModal: React.FC<PedidoModalProps> = ({
  pedido,
  isOpen,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Gestiona el ciclo de vida del modal y tecla Escape para cerrar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!pedido) return null;

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
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Contenedor del modal con animación bounce */}
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
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="h-full flex flex-col max-h-[85vh]">
            {/* Header con gradiente y total del pedido */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex-shrink-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">Pedido #{pedido.codigo}</h3>
                  <p className="text-sm text-primary-100">{pedido.nombreCliente}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                <span className="text-sm text-primary-100">Total del Pedido</span>
                <div className="flex items-center text-2xl font-bold">
                  <DollarSign className="w-6 h-6" />
                  <span>{pedido.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-grow overflow-y-auto p-4">
              {/* Sección: Información de contacto */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                  Información de Contacto
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{pedido.nombreCliente}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">{pedido.telefonoCliente}</span>
                  </div>
                </div>
              </div>

              {/* Sección: Detalles de entrega y pago */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 text-sm mb-2">Detalles de Entrega</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2.5">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-3.5 h-3.5 mr-2" />
                      <span>Hora de entrega</span>
                    </div>
                    <span className="font-semibold text-gray-900">{pedido.horaEntrega}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2.5">
                    <div className="flex items-center text-gray-600">
                      <CreditCard className="w-3.5 h-3.5 mr-2" />
                      <span>Método de pago</span>
                    </div>
                    <span className={`font-semibold ${
                      pedido.pagado ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {pedido.pagado ? 'Pagado' : 'Pendiente'} • {pedido.metodoPago}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sección: Lista de productos */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                  <ChefHat className="w-4 h-4 mr-1.5 text-primary-600" />
                  Productos Ordenados
                </h4>
                <div className="space-y-2">
                  {pedido.productos.map((producto, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-2.5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900">
                            <span className="text-primary-600">{producto.cantidad}x</span> {producto.nombre}
                          </p>
                          {producto.observaciones && (
                            <p className="text-xs text-gray-500 mt-1">
                              {producto.observaciones}
                            </p>
                          )}
                        </div>
                        <span className="font-bold text-sm text-primary-600 ml-2 flex-shrink-0">
                          ${(producto.cantidad * producto.precioUnitario).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observaciones del pedido (si existen) */}
              {pedido.observaciones && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-yellow-800 mb-1">
                    Observaciones del Pedido
                  </p>
                  <p className="text-sm text-yellow-900">{pedido.observaciones}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
