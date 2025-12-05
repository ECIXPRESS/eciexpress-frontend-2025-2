/**
 * StockEditModal - Modal para editar la cantidad de stock de un producto
 */
import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Package, AlertTriangle } from 'lucide-react';
import type { Producto } from '../types/inventario';

interface StockEditModalProps {
  producto: Producto | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, newStock: number) => void;
}

export const StockEditModal: React.FC<StockEditModalProps> = ({
  producto,
  isOpen,
  onClose,
  onSave,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [newStock, setNewStock] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && producto) {
      document.body.style.overflow = 'hidden';
      setNewStock(producto.stock);
      setError(null);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, producto]);

  const handleIncrement = () => {
    setNewStock(prev => prev + 1);
    setError(null);
  };

  const handleDecrement = () => {
    if (newStock > 0) {
      setNewStock(prev => prev - 1);
      setError(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0) {
      setNewStock(value);
      setError(null);
    }
  };

  const handleSave = () => {
    if (!producto) return;
    
    if (newStock < 0) {
      setError('El stock no puede ser negativo');
      return;
    }
    
    onSave(producto.id, newStock);
    onClose();
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  if (!producto) return null;

  const isLowStock = newStock <= producto.stockMinimo && newStock > 0;
  const isOutOfStock = newStock === 0;
  const hasChanged = newStock !== producto.stock;

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
          relative w-full max-w-sm z-10
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
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-1">Editar Stock</h3>
            <p className="text-primary-100 text-sm">{producto.nombre}</p>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Stock actual */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1">Stock actual</p>
              <p className="text-2xl font-bold text-gray-900">{producto.stock} unidades</p>
            </div>

            {/* Selector de cantidad */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Nuevo stock
              </label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleDecrement}
                  disabled={newStock === 0}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                
                <input
                  type="number"
                  value={newStock}
                  onChange={handleInputChange}
                  className="w-24 text-center text-3xl font-bold border-2 border-gray-200 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="0"
                />
                
                <button
                  onClick={handleIncrement}
                  className="w-12 h-12 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors duration-200 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-primary-700" />
                </button>
              </div>
            </div>

            {/* Alertas de stock */}
            {isLowStock && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-orange-800">Stock bajo</p>
                  <p className="text-xs text-orange-600">
                    El stock está por debajo del mínimo ({producto.stockMinimo} unidades)
                  </p>
                </div>
              </div>
            )}

            {isOutOfStock && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Producto agotado</p>
                  <p className="text-xs text-red-600">
                    El producto no estará disponible para la venta
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Botones */}
            <div className="space-y-3">
              <button
                onClick={handleSave}
                disabled={!hasChanged}
                className={`
                  w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-200
                  ${hasChanged
                    ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Guardar Cambios
              </button>
              
              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl font-semibold bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
