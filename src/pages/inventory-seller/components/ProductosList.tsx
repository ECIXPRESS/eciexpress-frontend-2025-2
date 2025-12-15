/**
 * ProductosList - Lista de productos con soporte para vista cuadrícula y lista
 * Incluye paginación, animaciones de transición y modales de detalles/edición
 */
import React, { useState, useMemo } from 'react';
import { Package } from 'lucide-react';
import type { Producto, VistaType } from '../types/inventario';
import { ITEMS_PER_PAGE } from '../types/inventario';
import { ProductoCard } from './ProductoCard';
import { ProductoListItem } from './ProductoListItem';
import { ProductoModal } from './ProductoModal';
import { StockEditModal } from './StockEditModal';
import { Pagination } from './Pagination';
import { SlideNavigation } from './SlideNavigation';
import { ViewSelector } from './ViewSelector';

interface ProductosListProps {
  productos: Producto[];
  onUpdateStock: (id: string, newStock: number) => void;
}

export const ProductosList: React.FC<ProductosListProps> = ({
  productos,
  onUpdateStock,
}) => {
  const [vistaActual, setVistaActual] = useState<VistaType>('grid');
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const totalPaginas = Math.ceil(productos.length / ITEMS_PER_PAGE);
  
  // Obtiene los productos de la página actual
  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * ITEMS_PER_PAGE;
    const fin = inicio + ITEMS_PER_PAGE;
    return productos.slice(inicio, fin);
  }, [productos, paginaActual]);

  // Cambia el tipo de vista con animación
  const handleVistaChange = (vista: VistaType) => {
    if (vista === vistaActual) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setVistaActual(vista);
      setPaginaActual(1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  // Cambia de página con animación de slide
  const handlePageChange = (pagina: number) => {
    if (pagina === paginaActual) return;
    
    setSlideDirection(pagina > paginaActual ? 'left' : 'right');
    
    if (vistaActual === 'grid') {
      setIsTransitioning(true);
      setTimeout(() => {
        setPaginaActual(pagina);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    } else {
      setPaginaActual(pagina);
    }
  };

  // Abre el modal de detalles
  const handleVerDetalles = (id: string) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      setProductoSeleccionado(producto);
      setModalDetallesAbierto(true);
    }
  };

  // Abre el modal de edición de stock
  const handleEditStock = (id: string) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      setProductoSeleccionado(producto);
      // Cierra el modal de detalles si está abierto
      if (modalDetallesAbierto) {
        setModalDetallesAbierto(false);
        // Espera a que se complete la animación de cierre antes de abrir el de edición
        setTimeout(() => {
          setModalEditarAbierto(true);
        }, 300);
      } else {
        setModalEditarAbierto(true);
      }
    }
  };

  // Guarda los cambios de stock
  const handleSaveStock = (id: string, newStock: number) => {
    onUpdateStock(id, newStock);
    setModalEditarAbierto(false);
    // Mantiene el producto seleccionado para evitar parpadeo
    setTimeout(() => {
      setProductoSeleccionado(null);
    }, 300);
  };

  const handleCloseDetalles = () => {
    setModalDetallesAbierto(false);
    // Solo limpia el producto si no se va a abrir el modal de edición
    setTimeout(() => {
      if (!modalEditarAbierto) {
        setProductoSeleccionado(null);
      }
    }, 300);
  };

  const handleCloseEditar = () => {
    setModalEditarAbierto(false);
    setTimeout(() => {
      setProductoSeleccionado(null);
    }, 300);
  };

  // Estado vacío
  if (productos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <Package className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-500 text-lg font-medium">
            No hay productos para mostrar
          </p>
          <p className="text-gray-400 text-sm mt-2">
            No se encontraron productos con los filtros aplicados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Selector de vista */}
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <p className="text-sm text-gray-500">
          Mostrando <span className="font-semibold text-gray-700">{productosPaginados.length}</span> de <span className="font-semibold text-gray-700">{productos.length}</span> productos
        </p>
        <ViewSelector vistaActual={vistaActual} onVistaChange={handleVistaChange} />
      </div>

      {/* Contenido con animaciones de transición */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div
          className={`
            h-full transition-all duration-300 ease-in-out
            ${isTransitioning 
              ? vistaActual === 'grid'
                ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-8' : 'translate-x-8'}`
                : 'opacity-0 scale-95 blur-sm'
              : 'opacity-100 translate-x-0 scale-100 blur-0'
            }
          `}
        >
          {vistaActual === 'grid' ? (
            // Vista cuadrícula
            <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 content-start">
              {productosPaginados.map((producto, index) => (
                <div
                  key={producto.id}
                  className={`
                    transition-all duration-300 ease-out
                    ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                  `}
                  style={{
                    transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                  }}
                >
                  <ProductoCard
                    producto={producto}
                    onEditStock={handleEditStock}
                    onVerDetalles={handleVerDetalles}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Vista lista
            <div className="h-full flex flex-col justify-start space-y-3 overflow-y-auto">
              {productosPaginados.map((producto, index) => (
                <div
                  key={producto.id}
                  className={`
                    transition-all duration-300 ease-out
                    ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
                  `}
                  style={{
                    transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                  }}
                >
                  <ProductoListItem
                    producto={producto}
                    onEditStock={handleEditStock}
                    onVerDetalles={handleVerDetalles}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navegación/Paginación según tipo de vista */}
      {totalPaginas > 1 && (
        <div className="flex-shrink-0 mt-4">
          {vistaActual === 'grid' ? (
            <SlideNavigation
              currentPage={paginaActual}
              totalPages={totalPaginas}
              onPageChange={handlePageChange}
            />
          ) : (
            <Pagination
              currentPage={paginaActual}
              totalPages={totalPaginas}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}

      {/* Modal de detalles */}
      <ProductoModal
        producto={productoSeleccionado}
        isOpen={modalDetallesAbierto}
        onClose={handleCloseDetalles}
        onEditStock={handleEditStock}
      />

      {/* Modal de edición de stock */}
      <StockEditModal
        producto={productoSeleccionado}
        isOpen={modalEditarAbierto}
        onClose={handleCloseEditar}
        onSave={handleSaveStock}
      />
    </div>
  );
};
