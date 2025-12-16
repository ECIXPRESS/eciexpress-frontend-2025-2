/**
 * EstadoNavigation - Navegación principal por estados de inventario
 * Muestra tarjetas con contadores animados para cada estado
 * Estados: Total, Stock Bajo, Ventas vs Semana
 */
import React, { useEffect, useState } from 'react';
import { Package, AlertTriangle, TrendingUp } from 'lucide-react';
import type { ResumenInventario } from '../types/inventario';

interface EstadoNavigationProps {
  resumen: ResumenInventario;
  estadoActivo: string;
  onEstadoChange: (estado: string) => void;
  ventasSemana?: number; // Porcentaje de cambio vs semana anterior
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
      icon: Package,
      color: 'text-yellow-500',
      activeColor: 'text-white',
      bgColor: 'bg-white',
      activeBg: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
      borderColor: 'border-gray-200',
      activeBorder: 'border-yellow-400',
      iconBg: 'bg-yellow-50',
      activeIconBg: 'bg-white/20',
    },
    { 
      key: 'stockBajo',
      label: 'Stock Bajo', 
      value: resumen.stockBajo,
      icon: AlertTriangle,
      color: 'text-orange-600',
      activeColor: 'text-white',
      bgColor: 'bg-white',
      activeBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      borderColor: 'border-gray-200',
      activeBorder: 'border-orange-500',
      iconBg: 'bg-orange-100',
      activeIconBg: 'bg-white/20',
    },
    { 
      key: 'ventas',
      label: 'Ventas vs Semana', 
      value: ventasSemana,
      icon: TrendingUp,
      isPercentage: true,
      color: 'text-green-600',
      activeColor: 'text-white',
      bgColor: 'bg-white',
      activeBg: 'bg-gradient-to-br from-green-500 to-green-600',
      borderColor: 'border-gray-200',
      activeBorder: 'border-green-500',
      iconBg: 'bg-green-100',
      activeIconBg: 'bg-white/20',
    },
  ];

  return (
    <div className="mb-5 flex-shrink-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          const isActive = estadoActivo === item.key;
          const Icon = item.icon;
          
          return (
            <button
              key={item.key}
              onClick={() => onEstadoChange(item.key)}
              className={`
                relative p-5 rounded-xl border-2 transition-all duration-200
                ${isActive ? 
                  `${item.activeBg} ${item.activeBorder} shadow-lg` : 
                  `${item.bgColor} ${item.borderColor} hover:border-gray-300 hover:shadow-md`
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Icono */}
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200
                  ${isActive ? item.activeIconBg : item.iconBg}
                `}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : item.color}`} />
                </div>
                
                {/* Contenido */}
                <div className="flex-1 text-left">
                  <div className={`
                    text-3xl font-black transition-colors duration-200 tabular-nums
                    ${isActive ? item.activeColor : item.color}
                  `}>
                    {item.isPercentage ? '+' : ''}
                    <AnimatedCounter value={item.value} isActive={isActive} />
                    {item.isPercentage ? '%' : ''}
                  </div>
                  <p className={`
                    text-sm font-medium transition-colors duration-200
                    ${isActive ? 'text-white/80' : 'text-gray-500'}
                  `}>
                    {item.label}
                  </p>
                </div>
              </div>
              
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