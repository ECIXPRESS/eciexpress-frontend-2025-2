/**
 * EstadoNavigation - Navegación principal por estados de inventario
 * Muestra tarjetas con contadores animados para cada estado
 * Estados: Total, Stock Bajo, Ventas vs Semana
 */
import React, { useEffect, useState } from 'react';
import type { ResumenInventario } from '../types/inventario';

interface EstadoNavigationProps {
  resumen: ResumenInventario;
  estadoActivo: string;
  onEstadoChange: (estado: string) => void;
  ventasSemana?: number;
}

/**
 * AnimatedCounter - Contador con animación de incremento
 */
const AnimatedCounter: React.FC<{ value: number; isActive: boolean }> = ({ value, isActive }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
      {count}
    </span>
  );
};

export const EstadoNavigation: React.FC<EstadoNavigationProps> = ({
  resumen,
  estadoActivo,
  onEstadoChange,
  ventasSemana = 24,
}) => {
  const items = [
    { 
      key: 'total',
      label: 'Productos Totales', 
      value: resumen.total,
      color: 'text-primary-600',
      activeColor: 'text-white',
      bgColor: 'bg-white',
      activeBg: 'bg-gradient-to-br from-primary-500 to-primary-600',
      borderColor: 'border-gray-200',
      activeBorder: 'border-primary-500',
    },
    { 
      key: 'stockBajo',
      label: 'Stock Bajo', 
      value: resumen.stockBajo,
      color: 'text-red-700',
      activeColor: 'text-white',
      bgColor: 'bg-white',
      activeBg: 'bg-gradient-to-br from-red-600 to-red-700',
      borderColor: 'border-gray-200',
      activeBorder: 'border-red-600',
    },
    { 
      key: 'ventas',
      label: 'Ventas vs Semana', 
      value: ventasSemana,
      isPercentage: true,
      color: 'text-green-600',
      activeColor: 'text-white',
      bgColor: 'bg-white',
      activeBg: 'bg-gradient-to-br from-green-500 to-green-600',
      borderColor: 'border-gray-200',
      activeBorder: 'border-green-500',
    },
  ];

  return (
    <div className="mb-5 flex-shrink-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          const isActive = estadoActivo === item.key;
          
          return (
            <button
              key={item.key}
              onClick={() => onEstadoChange(item.key)}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-200
                ${isActive ? 
                  `${item.activeBg} ${item.activeBorder} shadow-lg` : 
                  `${item.bgColor} ${item.borderColor} hover:border-gray-300 hover:shadow-md`
                }
              `}
            >
              <div className="flex flex-col space-y-4">
                {/* Título de la tarjeta */}
                <div>
                  <h3 className={`
                    text-lg font-bold transition-colors duration-200 text-left
                    ${isActive ? 'text-white' : 'text-gray-900'}
                  `}>
                    {item.label}
                  </h3>
                </div>
                
                {/* Contador animado */}
                <div className="flex items-baseline space-x-2">
                  <div className={`
                    text-5xl font-black transition-colors duration-200 tabular-nums
                    ${isActive ? item.activeColor : item.color}
                  `}>
                    {item.isPercentage ? '+' : ''}
                    <AnimatedCounter value={item.value} isActive={isActive} />
                    {item.isPercentage ? '%' : ''}
                  </div>
                  <span className={`
                    text-lg font-semibold transition-colors duration-200
                    ${isActive ? 'text-white/80' : 'text-gray-500'}
                  `}>
                    {item.isPercentage 
                      ? '' 
                      : item.value === 1 ? 'producto' : 'productos'
                    }
                  </span>
                </div>
              </div>
              
              {/* Indicador inferior para estado activo */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/40 rounded-b-lg" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
