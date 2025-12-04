/**
 * @fileoverview Punto de exportación central del módulo shared
 * Reexporta componentes, tipos y utilidades compartidas
 * 
 * @module shared
 * 
 * Patrón de diseño: Barrel Export
 * Facilita las importaciones y mantiene una API limpia del módulo
 * 
 * @author Equipo de Desarrollo ECI Express
 * @version 1.0.0
 */

// ==================== COMPONENTES UI ====================

/**
 * Componente Card para contenedores de contenido
 * Proporciona envoltorio consistente con estilos de tarjeta
 * @see {@link Card}
 */
export { Card } from './components/UI/Card';

/**
 * Componente Badge para indicadores de estado
 * Muestra etiquetas visuales con colores semánticos
 * @see {@link Badge}
 */
export { Badge } from './components/UI/Badge';

// ==================== COMPONENTES LAYOUT ====================

/**
 * Componente Header principal de la aplicación
 * Muestra información de la tienda, fecha y hora
 * @see {@link Header}
 */
export { Header } from './components/Layout/Header';

/**
 * Componente Container para layout responsivo
 * Proporciona estructura de página consistente
 * @see {@link Container}
 */
export { Container } from './components/Layout/Container';

// ==================== TIPOS Y DEFINICIONES ====================

/**
 * Tipos exportados del módulo
 * Disponibles para uso en toda la aplicación
 * 
 * @example
 * import type { BaseComponentProps, EstadoPedido } from '@shared';
 * 
 * interface MyComponentProps extends BaseComponentProps {
 *   estado: EstadoPedido;
 * }
 */
export type { 
  BaseComponentProps, 
  EstadoPedido, 
  ApiResponse, 
  FiltrosBusqueda 
} from './types/common';

/**
 * NOTAS DE IMPLEMENTACIÓN
 * =======================
 * 
 * PATRÓN BARREL EXPORT:
 * - Centraliza todas las exportaciones del módulo
 * - Simplifica las importaciones en otros módulos
 * - Oculta la estructura interna de carpetas
 * - Facilita refactorización sin afectar consumers
 * 
 * VENTAJAS:
 * - Imports limpios: import { Card, Badge } from '@shared'
 * - Un solo punto de entrada al módulo
 * - Fácil mantenimiento de API pública
 * - Evita imports profundos (../../components/UI/Card)
 * 
 * ESTRUCTURA DEL MÓDULO:
 * 
 * shared/
 * ├── components/
 * │   ├── UI/
 * │   │   ├── Card.tsx        ✓ Exportado
 * │   │   └── Badge.tsx       ✓ Exportado
 * │   └── Layout/
 * │       ├── Header.tsx      ✓ Exportado
 * │       └── Container.tsx   ✓ Exportado
 * ├── types/
 * │   └── common.ts           ✓ Exportado (tipos)
 * └── index.ts                ← Este archivo
 * 
 * CONVENCIONES DE IMPORTACIÓN:
 * 
 * Correcto:
 * import { Card, Badge, type EstadoPedido } from '@shared';
 * 
 * Evitar:
 * import { Card } from '@shared/components/UI/Card';
 * import Card from '@shared/components/UI/Card';
 * 
 * AGRUPACIÓN DE EXPORTACIONES:
 * 
 * 1. Componentes UI
 *    - Componentes de interfaz reutilizables
 *    - Badge, Card, Button, Input, etc.
 * 
 * 2. Componentes Layout
 *    - Componentes de estructura de página
 *    - Header, Container, Footer, Sidebar, etc.
 * 
 * 3. Tipos y Definiciones
 *    - Interfaces y tipos compartidos
 *    - BaseComponentProps, ApiResponse, etc.
 * 
 * USO EN OTROS MÓDULOS:
 * 
 * Módulo Pedidos:
 * import { Card, Badge, type EstadoPedido } from '@shared';
 * 
 * Módulo Usuarios (futuro):
 * import { Card, Container, type ApiResponse } from '@shared';
 * 
 * COMPONENTES DISPONIBLES (4 totales):
 * 
 * UI Components (2):
 * ✓ Card - Contenedor de contenido con estilos
 * ✓ Badge - Indicador de estado visual
 * 
 * Layout Components (2):
 * ✓ Header - Encabezado principal
 * ✓ Container - Contenedor responsivo
 * 
 * TIPOS DISPONIBLES (4 totales):
 * ✓ BaseComponentProps - Props base de componentes
 * ✓ EstadoPedido - Estados de pedidos
 * ✓ ApiResponse<T> - Respuesta genérica de API
 * ✓ FiltrosBusqueda - Criterios de filtrado
 * 
 * TREE SHAKING:
 * - Exportaciones named facilitan tree shaking
 * - Bundlers modernos (Vite, Webpack 5) eliminan código no usado
 * - Import solo lo necesario para optimizar bundle
 * 
 * @example
 * // Tree shaking: solo Card se incluye en bundle final
 * import { Card } from '@shared';
 * // Badge NO se incluye automáticamente
 * 
 * CONFIGURACIÓN DE PATH ALIASES:
 * 
 * En tsconfig.json:
 * {
 *   "compilerOptions": {
 *     "paths": {
 *       "@shared": ["./src/modules/shared"],
 *       "@shared/*": ["./src/modules/shared/*"]
 *     }
 *   }
 * }
 * 
 * En vite.config.ts:
 * {
 *   resolve: {
 *     alias: {
 *       '@shared': resolve(__dirname, './src/modules/shared')
 *     }
 *   }
 * }
 * 
 * EXTENSIBILIDAD:
 * 
 * Para agregar nuevo componente:
 * 1. Crear componente en carpeta apropiada
 * 2. Documentar con JSDoc
 * 3. Agregar export en este archivo
 * 4. Agrupar en sección correcta
 * 5. Actualizar documentación
 * 
 * @example
 * // Agregar nuevo componente Button
 * export { Button } from './components/UI/Button';
 * 
 * TESTING:
 * - Verificar que todos los exports son válidos
 * - Comprobar imports desde otros módulos
 * - Validar que path aliases funcionan
 * 
 * MIGRACIÓN DE COMPONENTES:
 * 
 * Si un componente ya no es compartido:
 * 1. Marcar como @deprecated en este archivo
 * 2. Mantener por una versión
 * 3. Remover en siguiente major version
 * 4. Actualizar documentación de cambios
 * 
 * VERSIONADO:
 * - v1.0.0: 4 componentes, 4 tipos
 * - v1.1.0: Agregar Button, Input (futuro)
 * - v1.2.0: Agregar hooks compartidos (futuro)
 * - v2.0.0: Breaking changes permitidos
 * 
 * MEJORAS FUTURAS:
 * - Agregar componentes de formulario (Input, Select, etc.)
 * - Incluir hooks compartidos (useDebounce, useLocalStorage)
 * - Añadir utilidades (formatters, validators)
 * - Exportar constantes de configuración
 * - Agregar componentes de feedback (Toast, Alert)
 */