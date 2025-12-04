/**
 * Container - Contenedor responsivo para layout de página
 * Proporciona centrado horizontal, ancho máximo y padding uniforme
 */
import React from 'react';
import type { BaseComponentProps } from '../../types/common';

export const Container: React.FC<BaseComponentProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`container mx-auto px-4 py-6 max-w-6xl ${className}`}>
      {children}
    </div>
  );
};