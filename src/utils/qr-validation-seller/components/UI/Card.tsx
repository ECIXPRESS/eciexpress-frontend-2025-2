/**
 * @fileoverview Componente Card para contenedores de contenido
 * Proporciona un envoltorio consistente con estilos de tarjeta
 * 
 * @module shared/components/UI/Card
 * @requires react
 * @requires ../../types/common
 * 
 * @author Equipo de Desarrollo ECI Express
 * @version 1.0.0
 */

import React from 'react';
import type { BaseComponentProps } from '../../types/common';

/**
 * Componente Card para contenedores de contenido
 * 
 * Características:
 * - Fondo blanco con bordes redondeados
 * - Sombra sutil para elevación
 * - Borde delgado para definición
 * - Padding uniforme de 24px
 * - Altamente personalizable
 * 
 * Diseño:
 * - Esquinas redondeadas (12px)
 * - Padding estándar (24px)
 * - Sombra suave (shadow-sm)
 * - Borde gris claro (gray-200)
 * 
 * @component
 * @param {BaseComponentProps} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @returns {JSX.Element} Tarjeta renderizada
 * 
 * @example
 * // Uso básico
 * <Card>
 *   <h2>Título</h2>
 *   <p>Contenido de la tarjeta</p>
 * </Card>
 * 
 * @example
 * // Con clases personalizadas
 * <Card className="hover:shadow-lg transition-shadow">
 *   <Content />
 * </Card>
 * 
 * @example
 * // Como contenedor de formulario
 * <Card className="max-w-md mx-auto">
 *   <form>
 *     <input />
 *     <button>Enviar</button>
 *   </form>
 * </Card>
 */
export const Card: React.FC<BaseComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      {children}
    </div>
  );
};

/**
 * NOTAS DE IMPLEMENTACIÓN
 * =======================
 * 
 * RESPONSABILIDADES:
 * - Proporcionar contenedor visual consistente
 * - Agrupar contenido relacionado
 * - Mantener jerarquía visual clara
 * - Ser reutilizable en múltiples contextos
 * 
 * CLASES TAILWIND APLICADAS:
 * 
 * bg-white:
 * - Fondo blanco puro (#FFFFFF)
 * - Contrasta con fondos de página coloreados
 * - Base limpia para contenido
 * 
 * rounded-xl:
 * - Border radius de 12px (0.75rem)
 * - Esquinas suavemente redondeadas
 * - Estética moderna y amigable
 * 
 * shadow-sm:
 * - Sombra pequeña y sutil
 * - box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
 * - Elevación ligera sobre el fondo
 * - No intrusiva visualmente
 * 
 * border border-gray-200:
 * - Borde sólido de 1px
 * - Color gris muy claro (#E5E7EB)
 * - Define límites de la tarjeta
 * - Agrega sutileza y definición
 * 
 * p-6:
 * - Padding uniforme de 24px (1.5rem)
 * - Espacio generoso para contenido
 * - Evita que contenido toque bordes
 * - Proporciones balanceadas
 * 
 * PATRÓN DE COMPOSICIÓN:
 * 
 * Este componente sigue el patrón "Container Component":
 * - Acepta children para máxima flexibilidad
 * - Acepta className para personalización
 * - No tiene lógica de negocio
 * - Puramente presentacional
 * - Altamente reutilizable
 * 
 * CASOS DE USO:
 * 
 * 1. Contenedor de resumen:
 *    <Card>
 *      <h3>Estadísticas</h3>
 *      <div className="grid grid-cols-3">
 *        <Stat />
 *      </div>
 *    </Card>
 * 
 * 2. Contenedor de formulario:
 *    <Card className="max-w-lg mx-auto">
 *      <h2>Registro</h2>
 *      <form>
 *        <input />
 *        <button>Enviar</button>
 *      </form>
 *    </Card>
 * 
 * 3. Tarjeta de información:
 *    <Card className="hover:shadow-md transition-shadow">
 *      <img src={image} />
 *      <h3>{title}</h3>
 *      <p>{description}</p>
 *    </Card>
 * 
 * 4. Panel de configuración:
 *    <Card>
 *      <div className="flex justify-between items-center mb-4">
 *        <h3>Ajustes</h3>
 *        <button>Guardar</button>
 *      </div>
 *      <Settings />
 *    </Card>
 * 
 * 5. Contenedor de lista:
 *    <Card>
 *      <h3 className="mb-4">Pedidos Recientes</h3>
 *      <ul>
 *        <li>Pedido 1</li>
 *        <li>Pedido 2</li>
 *      </ul>
 *    </Card>
 * 
 * CUSTOMIZACIÓN COMÚN:
 * 
 * Padding personalizado:
 * - <Card className="p-4"> // Menos padding (16px)
 * - <Card className="p-8"> // Más padding (32px)
 * - <Card className="p-0"> // Sin padding (para imágenes de borde a borde)
 * 
 * Hover effects:
 * - <Card className="hover:shadow-lg transition-shadow">
 * - <Card className="hover:scale-105 transition-transform">
 * - <Card className="cursor-pointer hover:border-primary-300">
 * 
 * Colores de fondo:
 * - <Card className="bg-gray-50"> // Fondo gris claro
 * - <Card className="bg-primary-50"> // Fondo color primario claro
 * - <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
 * 
 * Tamaños específicos:
 * - <Card className="max-w-sm"> // Ancho máximo pequeño
 * - <Card className="max-w-2xl mx-auto"> // Centrado con ancho máximo
 * - <Card className="h-full"> // Altura completa del contenedor
 * 
 * ACCESIBILIDAD:
 * - Estructura semántica con div
 * - No requiere roles ARIA (contenedor genérico)
 * - Fondo blanco con alto contraste
 * - Padding suficiente para touch targets
 * 
 * RESPONSIVE:
 * - Funciona en todos los breakpoints
 * - Adapta ancho al contenedor padre
 * - Padding proporcional en mobile
 * - Se puede combinar con grid/flex
 * 
 * VARIANTES FUTURAS:
 * 
 * Por padding:
 * - compact: p-4 (contenido denso)
 * - default: p-6 (estándar)
 * - spacious: p-8 (contenido amplio)
 * 
 * Por elevación:
 * - flat: shadow-none (sin sombra)
 * - default: shadow-sm (sombra sutil)
 * - elevated: shadow-md (sombra media)
 * - floating: shadow-lg (sombra pronunciada)
 * 
 * Por estilo:
 * - outlined: Solo borde, sin sombra
 * - filled: Fondo coloreado
 * - gradient: Fondo con gradiente
 * 
 * RENDIMIENTO:
 * - Componente puro sin estado
 * - Sin cálculos complejos
 * - Renderizado estático
 * - Optimizable con React.memo
 * 
 * COMPATIBILIDAD:
 * - Funciona en todos los navegadores modernos
 * - Compatible con CSS Grid y Flexbox
 * - No requiere JavaScript
 * - Accesible desde lectores de pantalla
 * 
 * TESTEO:
 * - Verificar renderizado de children
 * - Comprobar aplicación de clases CSS
 * - Validar personalización con className
 * - Testar con diferentes tipos de contenido
 * 
 * MEJORAS FUTURAS:
 * - Agregar prop padding para variantes de espaciado
 * - Agregar prop elevation para variantes de sombra
 * - Incluir prop variant para estilos predefinidos
 * - Soporte de prop interactive para efectos hover
 * - Agregar prop as para cambiar elemento (div, article, section)
 */