/**
 * PedidosList - Lista de pedidos con soporte para vista cuadrícula y lista
 * Incluye paginación, animaciones de transición y modal de detalles
 */
import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import type { Pedido, VistaType } from '../types/pedidos';
import { ITEMS_PER_PAGE } from '../types/pedidos';
import { PedidoCard } from './PedidoCard';
import { PedidoListItem } from './PedidoListItem';
import { PedidoModal } from './PedidoModal';
import { Pagination } from './Pagination';
import { SlideNavigation } from './SlideNavigation';
import { ViewSelector } from './ViewSelector';

interface PedidosListProps {
  pedidos: Pedido[];
  onValidarPedido: (id: string) => void;
  onVerDetalles: (id: string) => void;
}

export const PedidosList: React.FC<PedidosListProps> = ({
  pedidos,
  onValidarPedido,
  onVerDetalles,
}) => {
  const [vistaActual, setVistaActual] = useState<VistaType>('grid');
  const [paginaActual, setPaginaActual] = useState(1);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const totalPaginas = Math.ceil(pedidos.length / ITEMS_PER_PAGE);
  
  // Obtiene los pedidos de la página actual
  const pedidosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * ITEMS_PER_PAGE;
    const fin = inicio + ITEMS_PER_PAGE;
    return pedidos.slice(inicio, fin);
  }, [pedidos, paginaActual]);

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

  // Abre el modal de detalles (solo en vista lista)
  const handleVerDetalles = (pedido: Pedido) => {
    if (vistaActual === 'list') {
      setPedidoSeleccionado(pedido);
      setModalAbierto(true);
    }
    onVerDetalles(pedido.id);
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
    setTimeout(() => setPedidoSeleccionado(null), 200);
  };

  // Estado vacío
  if (pedidos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-500 text-lg font-medium">
            No hay pedidos para presentar
          </p>
          <p className="text-gray-400 text-sm mt-2">
            No se encontraron pedidos con los filtros aplicados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Selector de vista */}
      <div className="flex justify-end mb-3 flex-shrink-0">
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
              {pedidosPaginados.map((pedido, index) => (
                <div
                  key={pedido.id}
                  className={`
                    transition-all duration-300 ease-out
                    ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                  `}
                  style={{
                    transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                  }}
                >
                  <PedidoCard
                    pedido={pedido}
                    onValidar={onValidarPedido}
                    onVerDetalles={() => handleVerDetalles(pedido)}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Vista lista
            <div className="h-full flex flex-col justify-start space-y-3">
              {pedidosPaginados.map((pedido, index) => (
                <div
                  key={pedido.id}
                  className={`
                    transition-all duration-300 ease-out
                    ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
                  `}
                  style={{
                    transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                  }}
                >
                  <PedidoListItem
                    pedido={pedido}
                    onValidar={onValidarPedido}
                    onVerDetalles={() => handleVerDetalles(pedido)}
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

      {/* Modal de detalles (solo para vista lista) */}
      <PedidoModal
        pedido={pedidoSeleccionado}
        isOpen={modalAbierto}
        onClose={handleCloseModal}
        onValidar={onValidarPedido}
      />
    </div>
  );
};