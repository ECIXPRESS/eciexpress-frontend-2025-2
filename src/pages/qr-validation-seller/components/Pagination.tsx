/**
 * Pagination - Componente de paginación numérica
 * Muestra números de página con elipsis para listas largas
 * Usado en la vista de lista de pedidos
 */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  /**
   * Calcula qué páginas mostrar con elipsis para listas largas
   * Ejemplo: [1, '...', 4, 5, 6, '...', 10]
   */
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return [...pages.slice(0, 4), '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', ...pages.slice(-4)];
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Botón anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Números de página */}
      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`
            min-w-[40px] h-10 px-3 rounded-lg font-semibold transition-all duration-200
            ${page === currentPage
              ? 'bg-primary-500 text-white shadow-md'
              : page === '...'
              ? 'cursor-default'
              : 'border border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Botón siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
