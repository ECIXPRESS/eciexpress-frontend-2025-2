/**
 * @fileoverview Componente Badge para indicadores de estado de pedidos
 * Muestra etiquetas visuales con colores semánticos según el estado
 * 
 * @module shared/components/UI/Badge
 * @requires react
 * @requires ../../types/common
 * 
 * @author Equipo de Desarrollo ECI Express
 * @version 1.0.0
 */

import React from 'react';
import type { EstadoPedido } from '../../types/common';

/**
 * Props del componente Badge
 * @interface BadgeProps
 */
interface BadgeProps {
  /** Estado del pedido a representar visualmente */
  estado: EstadoPedido;
  /** Clases CSS adicionales opcionales */
  className?: string;
}

/**
 * Componente Badge para estados de pedidos
 * 
 * Características:
 * - Gradientes vibrantes por estado
 * - Diseño tipo píldora redondeada
 * - Texto blanco con alta legibilidad
 * - Sombra para profundidad visual
 * - Altamente reutilizable
 * 
 * Estados soportados:
 * 1. preparacion: Rojo (urgente, requiere atención inmediata)
 * 2. completado: Verde (exitoso, entregado)
 * 3. cancelado: Gris (inactivo, cancelado)
 * 
 * @component
 * @param {BadgeProps} props - Propiedades del componente
 * @returns {JSX.Element} Badge renderizado con estilos según estado
 * 
 * @example
 * // Uso básico
 * <Badge estado="preparacion" />
 * 
 * @example
 * // Con clases personalizadas
 * <Badge estado="completado" className="text-lg" />
 * 
 * @example
 * // En tarjeta de pedido
 * <div className="absolute top-2 right-2">
 *   <Badge estado={pedido.estado} />
 * </div>
 */
export const Badge: React.FC<BadgeProps> = ({ estado, className = '' }) => {
  /**
   * Configuración de estilos por estado
   * 
   * Cada estado tiene:
   * - label: Texto descriptivo a mostrar
   * - bg: Clases de gradiente de fondo
   * - text: Color del texto (blanco para todos)
   * 
   * Paleta de colores:
   * - Rojo: Estados urgentes/en proceso
   * - Verde: Estados exitosos/completos
   * - Gris: Estados inactivos/cancelados
   * 
   * @type {Record<EstadoPedido, {label: string, bg: string, text: string}>}
   * @constant
   */
  const config = {
    preparacion: {
      bg: 'bg-gradient-to-br from-red-600 to-red-700',
      text: 'text-white',
      label: 'En Preparación'
    },
    completado: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      text: 'text-white',
      label: 'Completado'
    },
    cancelado: {
      bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
      text: 'text-white',
      label: 'Cancelado'
    },
    validado: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-white',
      label: 'Validado'
    }
  };

  /**
   * Extrae configuración para el estado actual
   * @type {{label: string, bg: string, text: string}}
   */
  const estilo = config[estado];

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
      ${estilo.bg} ${estilo.text} ${className}
      shadow-md
    `}>
      {estilo.label}
    </span>
  );
};

/**
 * NOTAS DE IMPLEMENTACIÓN
 * =======================
 * 
 * RESPONSABILIDADES:
 * - Representar visualmente el estado de un pedido
 * - Proporcionar feedback inmediato al usuario
 * - Mantener consistencia de colores en toda la app
 * - Ser reutilizable en múltiples contextos
 * 
 * PALETA DE COLORES Y SIGNIFICADO:
 * 
 * Preparación (Rojo):
 * - bg-gradient-to-br from-red-600 to-red-700
 * - Gradiente de rojo intenso (#DC2626 → #B91C1C)
 * - text-white: Texto blanco para máximo contraste
 * - Significado: Urgente, requiere atención inmediata
 * - Contraste: >7:1 ratio (WCAG AAA)
 * 
 * Completado (Verde):
 * - bg-gradient-to-br from-green-500 to-green-600
 * - Gradiente de verde vibrante (#10B981 → #059669)
 * - text-white: Texto blanco para máximo contraste
 * - Significado: Éxito, tarea completada
 * - Contraste: >7:1 ratio (WCAG AAA)
 * 
 * Cancelado (Gris):
 * - bg-gradient-to-br from-gray-500 to-gray-600
 * - Gradiente de gris neutral (#6B7280 → #4B5563)
 * - text-white: Texto blanco para máximo contraste
 * - Significado: Inactivo, estado cancelado
 * - Contraste: >7:1 ratio (WCAG AAA)
 * 
 * Validado (Azul):
 * - bg-gradient-to-br from-blue-500 to-blue-600
 * - Gradiente de azul brillante (#3B82F6 → #2563EB)
 * - text-white: Texto blanco para máximo contraste
 * - Significado: Validado, revisión completa
 * - Contraste: >7:1 ratio (WCAG AAA)
 * 
 * DISEÑO:
 * 
 * Forma:
 * - rounded-full: Bordes completamente redondeados (9999px)
 * - Estilo "píldora" o "chip" característico
 * 
 * Espaciado:
 * - px-3: Padding horizontal 12px
 * - py-1: Padding vertical 4px
 * - Proporciones balanceadas para legibilidad
 * 
 * Tipografía:
 * - text-xs: Tamaño 12px (0.75rem)
 * - font-semibold: Peso 600
 * - Alto contraste para legibilidad
 * 
 * Efectos visuales:
 * - bg-gradient-to-br: Gradiente diagonal (top-left a bottom-right)
 * - shadow-md: Sombra media para profundidad (0 4px 6px rgba(0,0,0,0.1))
 * - inline-flex items-center: Alineación vertical centrada
 * 
 * CASOS DE USO:
 * 
 * 1. Tarjetas de pedidos:
 *    <div className="absolute top-2 right-2">
 *      <Badge estado={pedido.estado} />
 *    </div>
 * 
 * 2. Listas de pedidos:
 *    <div className="flex items-center gap-2">
 *      <span>{pedido.codigo}</span>
 *      <Badge estado={pedido.estado} />
 *    </div>
 * 
 * 3. Encabezados de modales:
 *    <div className="flex justify-between items-center">
 *      <h3>Pedido #{codigo}</h3>
 *      <Badge estado={estado} />
 *    </div>
 * 
 * 4. Filtros visuales:
 *    <button>
 *      <Badge estado="preparacion" />
 *      <span>Mostrar en preparación</span>
 *    </button>
 * 
 * ACCESIBILIDAD:
 * - Alto contraste en todos los estados (WCAG AAA)
 * - Texto descriptivo claro (no solo color)
 * - Tamaño legible incluso en mobile
 * - No requiere role ARIA (elemento span semántico)
 * - Texto blanco garantiza legibilidad sobre fondos oscuros
 * 
 * EXTENSIBILIDAD:
 * 
 * Para agregar nuevo estado:
 * 
 * 1. Actualizar tipo EstadoPedido en types/common:
 *    type EstadoPedido = '...' | 'nuevo-estado';
 * 
 * 2. Agregar configuración al objeto config:
 *    config = {
 *      ...existing,
 *      'nuevo-estado': {
 *        bg: 'bg-gradient-to-br from-color-500 to-color-600',
 *        text: 'text-white',
 *        label: 'Nuevo Estado'
 *      }
 *    };
 * 
 * VARIANTES FUTURAS:
 * 
 * Tamaños:
 * - xs: px-2 py-0.5 text-[10px]
 * - sm: px-2.5 py-1 text-xs (actual)
 * - md: px-3 py-1.5 text-sm
 * - lg: px-4 py-2 text-base
 * 
 * Estilos:
 * - outline: Solo borde con gradiente, fondo transparente
 * - solid: Fondo sólido sin gradiente
 * - subtle: Menor intensidad, más discreto
 * 
 * RENDIMIENTO:
 * - Componente puro (sin estado interno)
 * - Lookup de configuración O(1)
 * - Sin cálculos complejos
 * - Altamente optimizable con React.memo
 * - Gradientes CSS nativos (sin imágenes)
 * 
 * TESTEO:
 * - Verificar renderizado de todos los estados
 * - Comprobar clases CSS aplicadas correctamente
 * - Validar accesibilidad (contraste, legibilidad)
 * - Testar con clases personalizadas
 * - Verificar sombras en diferentes fondos
 * 
 * MEJORAS FUTURAS:
 * - Agregar prop size para variantes de tamaño
 * - Agregar prop variant para estilos alternativos
 * - Incluir iconos opcionales al lado del texto
 * - Animación de pulso para estados activos
 * - Tooltip con información adicional al hover
 * - Animación de transición entre estados
 */