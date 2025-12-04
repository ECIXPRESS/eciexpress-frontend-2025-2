/**
 * @fileoverview Componente contenedor principal para layout responsivo
 * Proporciona estructura de página consistente con márgenes y padding
 * 
 * @module shared/components/Layout/Container
 * @requires react
 * @requires ../../types/common
 * 
 * @author Equipo de Desarrollo ECI Express
 * @version 1.0.0
 */

import React from 'react';
import type { BaseComponentProps } from '../../types/common';

/**
 * Componente contenedor responsivo
 * 
 * Características:
 * - Centrado horizontal automático
 * - Ancho máximo de 1152px (max-w-6xl)
 * - Padding horizontal de 16px (px-4)
 * - Padding vertical de 24px (py-6)
 * - Responsive en todos los breakpoints
 * - Clases CSS personalizables
 * 
 * Diseño responsivo:
 * - Mobile: Padding reducido, ancho completo
 * - Tablet: Padding estándar, centrado
 * - Desktop: Ancho máximo 1152px, centrado
 * 
 * @component
 * @param {BaseComponentProps} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido a renderizar dentro del contenedor
 * @param {string} [props.className=''] - Clases CSS adicionales opcionales
 * @returns {JSX.Element} Contenedor renderizado
 * 
 * @example
 * // Uso básico
 * <Container>
 *   <h1>Contenido de la página</h1>
 * </Container>
 * 
 * @example
 * // Con clases personalizadas
 * <Container className="bg-gray-50 min-h-screen">
 *   <Content />
 * </Container>
 * 
 * @example
 * // Layout completo con flex
 * <Container className="flex flex-col h-full">
 *   <Header />
 *   <Main className="flex-1" />
 *   <Footer />
 * </Container>
 */
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

/**
 * NOTAS DE IMPLEMENTACIÓN
 * =======================
 * 
 * RESPONSABILIDADES:
 * - Proporcionar estructura de layout consistente
 * - Mantener márgenes y padding uniformes
 * - Centrar contenido horizontalmente
 * - Limitar ancho máximo para legibilidad
 * 
 * CLASES TAILWIND APLICADAS:
 * 
 * container:
 * - Clase base de Tailwind para contenedores
 * - Aplica breakpoints responsivos automáticamente
 * - Ancho 100% hasta max-width definido
 * 
 * mx-auto:
 * - Margin horizontal auto
 * - Centra el contenedor horizontalmente
 * 
 * px-4:
 * - Padding horizontal de 16px (1rem)
 * - Evita que el contenido toque los bordes en móvil
 * 
 * py-6:
 * - Padding vertical de 24px (1.5rem)
 * - Proporciona espacio superior e inferior
 * 
 * max-w-6xl:
 * - Ancho máximo de 1152px (72rem)
 * - Limita línea de lectura en pantallas grandes
 * - Mantiene diseño centrado y legible
 * 
 * BREAKPOINTS TAILWIND:
 * - sm: 640px (móvil grande)
 * - md: 768px (tablet)
 * - lg: 1024px (laptop)
 * - xl: 1280px (desktop)
 * - 2xl: 1536px (pantalla grande)
 * 
 * Container se adapta automáticamente:
 * - < 640px: ancho 100%
 * - >= 640px: max-width 640px
 * - >= 768px: max-width 768px
 * - >= 1024px: max-width 1024px
 * - >= 1152px: max-width 1152px (limitado por max-w-6xl)
 * 
 * PATRÓN DE COMPOSICIÓN:
 * 
 * Este componente sigue el patrón "Container Component":
 * - Acepta children para contenido flexible
 * - Acepta className para personalización
 * - No tiene lógica de negocio
 * - Puramente presentacional
 * 
 * ACCESIBILIDAD:
 * - Estructura semántica con div
 * - No requiere roles ARIA (contenedor genérico)
 * - Padding suficiente para touch targets
 * - Mantiene jerarquía visual clara
 * 
 * COMPATIBILIDAD:
 * - Compatible con todos los navegadores modernos
 * - Funciona con CSS Grid y Flexbox
 * - No requiere JavaScript
 * - Renderizado estático
 * 
 * CASOS DE USO:
 * 
 * 1. Layout de página principal:
 *    <Container>
 *      <Header />
 *      <Main />
 *      <Footer />
 *    </Container>
 * 
 * 2. Secciones de contenido:
 *    <Container className="bg-white">
 *      <Article />
 *    </Container>
 * 
 * 3. Dashboard con layout flex:
 *    <Container className="flex flex-col min-h-screen">
 *      <Navigation />
 *      <Content />
 *    </Container>
 * 
 * CUSTOMIZACIÓN:
 * 
 * Para modificar ancho máximo:
 * - max-w-4xl: 896px (blog, artículos)
 * - max-w-5xl: 1024px (contenido amplio)
 * - max-w-7xl: 1280px (dashboard, tablas)
 * - max-w-full: Sin límite (pantalla completa)
 * 
 * Para modificar padding:
 * - px-2: 8px (muy ajustado)
 * - px-6: 24px (espacioso)
 * - px-8: 32px (muy espacioso)
 * 
 * VENTAJAS:
 * - Reutilizable en toda la aplicación
 * - Mantiene consistencia de diseño
 * - Fácil de personalizar
 * - Sin dependencias externas
 * - Ligero y performante
 * 
 * MEJORAS FUTURAS:
 * - Agregar variantes predefinidas (narrow, wide, full)
 * - Soporte para diferentes paddings responsivos
 * - Integración con sistema de temas
 * - Variantes para diferentes contextos (dashboard, landing, etc.)
 */