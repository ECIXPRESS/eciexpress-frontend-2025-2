/**
 * ProductoModal - Modal de detalles completos del producto
 */
import React, { useEffect, useState } from 'react';
import { X, DollarSign, Package, Calendar, Tag } from 'lucide-react';
import type { Producto } from '../types/inventario';
import { getEstadoStock } from '../types/inventario';
import { StockBadge, CategoriaBadge } from './Badge';

interface ProductoModalProps {
  producto: Producto | null;
  isOpen: boolean;
  onClose: () => void;
  onEditStock: (id: string) => void;
}

export const ProductoModal: React.FC<ProductoModalProps> = ({
  producto,
  isOpen,
  onClose,
  onEditStock,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

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
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleEditStockClick = () => {
    if (!producto) return;
    // Inicia la animación de cierre
    setIsAnimating(false);
    // Espera a que termine la animación antes de abrir el otro modal
    setTimeout(() => {
      onEditStock(producto.id);
    }, 300);
  };

  if (!producto) return null;

  const estadoStock = getEstadoStock(producto.stock, producto.stockMinimo);

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={handleClose}
    >
      <div 
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
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
        <button
          onClick={handleClose}
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
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex-shrink-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{producto.nombre}</h3>
                  <div className="mt-1">
                    <CategoriaBadge categoria={producto.categoria} />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                <span className="text-sm text-primary-100">Precio de venta</span>
                <div className="flex items-center text-2xl font-bold">
                  <DollarSign className="w-6 h-6" />
                  <span>{producto.precio.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="flex-grow overflow-y-auto p-4">
              {/* Estado del stock */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                  <Package className="w-4 h-4 mr-1.5 text-primary-600" />
                  Información de Stock
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estado</span>
                    <StockBadge estado={estadoStock} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cantidad disponible</span>
                    <span className="font-bold text-gray-900">{producto.stock} unidades</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stock mínimo</span>
                    <span className="font-semibold text-gray-700">{producto.stockMinimo} unidades</span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              {producto.descripcion && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-1.5 text-primary-600" />
                    Descripción
                  </h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    {producto.descripcion}
                  </p>
                </div>
              )}

              {/* Última actualización */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-xs font-semibold text-blue-800">Última actualización</p>
                </div>
                <p className="text-sm text-blue-900">
                  {new Date(producto.fechaActualizacion).toLocaleDateString('es-CO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={handleEditStockClick}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Editar Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
