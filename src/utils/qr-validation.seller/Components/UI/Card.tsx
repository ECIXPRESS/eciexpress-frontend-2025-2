/**
 * Componente Card para contenedores de contenido
 */
import React from 'react';
import type { BaseComponentProps } from '../../types/common';

interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      {children}
    </div>
  );
};