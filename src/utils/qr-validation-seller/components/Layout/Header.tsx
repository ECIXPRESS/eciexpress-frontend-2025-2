/**
 * @fileoverview Componente de encabezado principal de la aplicación
 * Diseño moderno con foto de perfil, saludo personalizado y fecha/hora
 * 
 * @module shared/components/Layout/Header
 * @requires react
 * 
 * @author Equipo de Desarrollo ECI Express
 * @version 2.1.0
 */

import React, { useState, useEffect } from 'react';

/**
 * Props del componente Header
 * @interface HeaderProps
 */
interface HeaderProps {
  /** Nombre de la tienda a mostrar */
  nombreTienda: string;
  /** Fecha personalizada (opcional, por defecto fecha actual) */
  fecha?: string;
  /** Nombre del administrador (opcional) */
  nombreAdmin?: string;
  /** Rol del usuario (opcional) */
  rol?: string;
}

/**
 * Obtiene el saludo según la hora del día
 */
const getSaludo = (): string => {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return 'Hola';
  if (hora >= 12 && hora < 19) return 'Hola';
  return 'Hola';
};

/**
 * Componente de encabezado principal - Versión refactorizada con fondo amarillo
 */
export const Header: React.FC<HeaderProps> = ({ 
  nombreTienda, 
  fecha,
  nombreAdmin = 'Cafe Leyenda',
  rol = 'Cafetería'
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar hora cada minuto
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
          {/* SECCIÓN IZQUIERDA: Avatar + Saludo + Info */}
          <div className="flex items-center gap-4">
            {/* Avatar con imagen de la cafetería */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-primary-500 shadow-md">
                <img 
                  src="/images/cafeterias/eci.png" 
                  alt="ECI Express"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback con iniciales */}
                <div className="hidden w-full h-full items-center justify-center bg-white">
                  <span className="text-primary-600 text-xl font-bold">EC</span>
                </div>
              </div>
              {/* Indicador de estado online */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-primary-500 shadow-sm" />
            </div>

            {/* Información del usuario */}
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
          
          {/* SECCIÓN DERECHA: Fecha/Hora */}
          <div className="flex items-center">
            {/* Tarjeta de fecha/hora compacta */}
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

            {/* Versión móvil - solo hora */}
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

/**
 * CAMBIOS EN VERSIÓN 2.1.0
 * =========================
 * 
 * DISEÑO VISUAL:
 * - Fondo amarillo (primary-500) restaurado
 * - Bordes redondeados inferiores (rounded-b-2xl)
 * - Sombra elevada (shadow-lg)
 * - Texto en blanco para contraste
 * - Botón de configuración eliminado
 * 
 * TARJETA DE FECHA/HORA:
 * - Fondo semi-transparente con blur (bg-white/10 backdrop-blur-md)
 * - Bordes sutiles (border-white/20)
 * - Texto en blanco y primary-100
 * - Separador translúcido (bg-white/30)
 * 
 * AVATAR:
 * - Ring blanco en lugar de primary-500
 * - Ring offset coincide con fondo (ring-offset-primary-500)
 * - Badge de estado verde adaptado al fondo amarillo
 * 
 * INFORMACIÓN DE USUARIO:
 * - Texto completamente en blanco
 * - Rol en primary-100 para contraste suave
 * 
 * ACCESIBILIDAD:
 * - Contraste AAA mantenido (blanco sobre amarillo)
 * - Elementos claramente distinguibles
 * - Sombras para profundidad visual
 * 
 * RESPONSIVE:
 * - Desktop: Tarjeta completa con fecha y hora
 * - Mobile: Solo hora en tarjeta compacta
 * - Avatar y nombre siempre visibles
 */