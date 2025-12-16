import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ProductosList - Lista de productos con soporte para vista cuadrícula y lista
 * Incluye paginación, animaciones de transición y modales de detalles/edición
 */
import { useState, useMemo } from 'react';
import { Package } from 'lucide-react';
import { ITEMS_PER_PAGE } from '../types/inventario';
import { ProductoCard } from './ProductoCard';
import { ProductoListItem } from './ProductoListItem';
import { ProductoModal } from './ProductoModal';
import { StockEditModal } from './StockEditModal';
import { Pagination } from './Pagination';
import { SlideNavigation } from './SlideNavigation';
import { ViewSelector } from './ViewSelector';
export const ProductosList = ({ productos, onUpdateStock, }) => {
    const [vistaActual, setVistaActual] = useState('grid');
    const [paginaActual, setPaginaActual] = useState(1);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState('right');
    const totalPaginas = Math.ceil(productos.length / ITEMS_PER_PAGE);
    // Obtiene los productos de la página actual
    const productosPaginados = useMemo(() => {
        const inicio = (paginaActual - 1) * ITEMS_PER_PAGE;
        const fin = inicio + ITEMS_PER_PAGE;
        return productos.slice(inicio, fin);
    }, [productos, paginaActual]);
    // Cambia el tipo de vista con animación
    const handleVistaChange = (vista) => {
        if (vista === vistaActual)
            return;
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
    const handlePageChange = (pagina) => {
        if (pagina === paginaActual)
            return;
        setSlideDirection(pagina > paginaActual ? 'left' : 'right');
        if (vistaActual === 'grid') {
            setIsTransitioning(true);
            setTimeout(() => {
                setPaginaActual(pagina);
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 50);
            }, 300);
        }
        else {
            setPaginaActual(pagina);
        }
    };
    // Abre el modal de detalles
    const handleVerDetalles = (id) => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            setProductoSeleccionado(producto);
            setModalDetallesAbierto(true);
        }
    };
    // Abre el modal de edición de stock
    const handleEditStock = (id) => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            setProductoSeleccionado(producto);
            setModalEditarAbierto(true);
        }
    };
    // Guarda los cambios de stock
    const handleSaveStock = (id, newStock) => {
        onUpdateStock(id, newStock);
        setModalEditarAbierto(false);
        setProductoSeleccionado(null);
    };
    const handleCloseDetalles = () => {
        setModalDetallesAbierto(false);
        setTimeout(() => setProductoSeleccionado(null), 200);
    };
    const handleCloseEditar = () => {
        setModalEditarAbierto(false);
        setTimeout(() => setProductoSeleccionado(null), 200);
    };
    // Estado vacío
    if (productos.length === 0) {
        return (_jsx("div", { className: "text-center py-12", children: _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto", children: [_jsx("div", { className: "text-gray-400 mb-4", children: _jsx(Package, { className: "w-16 h-16 mx-auto" }) }), _jsx("p", { className: "text-gray-500 text-lg font-medium", children: "No hay productos para mostrar" }), _jsx("p", { className: "text-gray-400 text-sm mt-2", children: "No se encontraron productos con los filtros aplicados" })] }) }));
    }
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-3 flex-shrink-0", children: [_jsxs("p", { className: "text-sm text-gray-500", children: ["Mostrando ", _jsx("span", { className: "font-semibold text-gray-700", children: productosPaginados.length }), " de ", _jsx("span", { className: "font-semibold text-gray-700", children: productos.length }), " productos"] }), _jsx(ViewSelector, { vistaActual: vistaActual, onVistaChange: handleVistaChange })] }), _jsx("div", { className: "flex-1 min-h-0 overflow-hidden", children: _jsx("div", { className: `
            h-full transition-all duration-300 ease-in-out
            ${isTransitioning
                        ? vistaActual === 'grid'
                            ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-8' : 'translate-x-8'}`
                            : 'opacity-0 scale-95 blur-sm'
                        : 'opacity-100 translate-x-0 scale-100 blur-0'}
          `, children: vistaActual === 'grid' ? (
                    // Vista cuadrícula
                    _jsx("div", { className: "h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 content-start", children: productosPaginados.map((producto, index) => (_jsx("div", { className: `
                    transition-all duration-300 ease-out
                    ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                  `, style: {
                                transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                            }, children: _jsx(ProductoCard, { producto: producto, onEditStock: handleEditStock, onVerDetalles: handleVerDetalles }) }, producto.id))) })) : (
                    // Vista lista
                    _jsx("div", { className: "h-full flex flex-col justify-start space-y-3 overflow-y-auto", children: productosPaginados.map((producto, index) => (_jsx("div", { className: `
                    transition-all duration-300 ease-out
                    ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
                  `, style: {
                                transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                            }, children: _jsx(ProductoListItem, { producto: producto, onEditStock: handleEditStock, onVerDetalles: handleVerDetalles }) }, producto.id))) })) }) }), totalPaginas > 1 && (_jsx("div", { className: "flex-shrink-0 mt-4", children: vistaActual === 'grid' ? (_jsx(SlideNavigation, { currentPage: paginaActual, totalPages: totalPaginas, onPageChange: handlePageChange })) : (_jsx(Pagination, { currentPage: paginaActual, totalPages: totalPaginas, onPageChange: handlePageChange })) })), _jsx(ProductoModal, { producto: productoSeleccionado, isOpen: modalDetallesAbierto, onClose: handleCloseDetalles, onEditStock: handleEditStock }), _jsx(StockEditModal, { producto: productoSeleccionado, isOpen: modalEditarAbierto, onClose: handleCloseEditar, onSave: handleSaveStock })] }));
};
