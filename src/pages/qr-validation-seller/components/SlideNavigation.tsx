/**
 * SlideNavigation - Navegación tipo carrusel con flechas e indicadores de página
 * Usado en la vista de cuadrícula para navegar entre páginas de pedidos
 */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Botón página anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group p-3 rounded-full bg-white border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        title="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-colors duration-200" />
      </button>

      {/* Indicadores de página (dots) */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${page === currentPage
                ? 'w-8 bg-primary-500'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
              }
            `}
            title={`Página ${page}`}
          />
        ))}
      </div>

      {/* Botón página siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group p-3 rounded-full bg-white border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        title="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-colors duration-200" />
      </button>
    </div>
  );
};
