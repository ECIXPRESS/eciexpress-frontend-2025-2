/**
 * ViewSelector - Selector de tipo de vista (cuadrícula o lista)
 */
import React from 'react';
import { Grid3x3, List } from 'lucide-react';
import type { VistaType } from '../types/inventario';

interface ViewSelectorProps {
  vistaActual: VistaType;
  onVistaChange: (vista: VistaType) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  vistaActual,
  onVistaChange,
}) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
      <button
        onClick={() => onVistaChange('grid')}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
          ${vistaActual === 'grid'
            ? 'bg-primary-500 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
        title="Vista de cuadrícula"
      >
        <Grid3x3 className="w-4 h-4" />
        <span>Cuadrícula</span>
      </button>
      
      <button
        onClick={() => onVistaChange('list')}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
          ${vistaActual === 'list'
            ? 'bg-primary-500 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
        title="Vista de lista"
      >
        <List className="w-4 h-4" />
        <span>Lista</span>
      </button>
    </div>
  );
};
