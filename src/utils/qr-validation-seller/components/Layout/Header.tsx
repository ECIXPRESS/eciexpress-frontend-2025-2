/**
 * Componente de encabezado principal de la aplicación
 */
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  nombreTienda: string;
  fecha?: string;
  nombreAdmin?: string;
  rol?: string;
}

const getSaludo = (): string => {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return 'Buenos días';
  if (hora >= 12 && hora < 19) return 'Buenas tardes';
  return 'Buenas noches';
};

export const Header: React.FC<HeaderProps> = ({ 
  fecha,
  nombreAdmin = 'Cafe Leyenda',
  rol = 'Cafetería'
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const fechaActual = fecha || currentTime.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const horaActual = currentTime.toLocaleTimeString('es-ES', { 
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="bg-primary-500 text-white shadow-lg rounded-b-2xl">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-primary-500 shadow-md">
                <img 
                  src="/src/assets/qr-validation-seller/cafeterias/eci.png" 
                  alt="ECI Express"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center bg-white">
                  <span className="text-primary-600 text-xl font-bold">EC</span>
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-primary-500 shadow-sm" />
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-bold text-white">
                  {getSaludo()},
                </h1>
                <span className="text-2xl font-bold text-white">
                  {nombreAdmin}
                </span>
              </div>
              <p className="text-sm text-primary-100 font-medium">
                {rol}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 shadow-lg">
              <div className="text-right">
                <div className="text-sm font-bold text-white capitalize leading-tight">
                  {fechaActual.split(',')[0]}
                </div>
                <div className="text-xs text-primary-100 font-medium">
                  {fechaActual.split(',').slice(1).join(',').trim()}
                </div>
              </div>
              <div className="h-8 w-px bg-white/30" />
              <div className="text-left">
                <div className="text-xl font-bold text-white tabular-nums leading-tight">
                  {horaActual}
                </div>
                <div className="text-xs text-primary-100 font-medium">
                  hora actual
                </div>
              </div>
            </div>

            <div className="flex sm:hidden items-center bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
              <div className="text-lg font-bold text-white tabular-nums">
                {horaActual}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};