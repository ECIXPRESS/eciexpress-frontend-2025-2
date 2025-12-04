/**
 * @fileoverview Tipos y definiciones compartidas entre módulos
 * Contiene interfaces y tipos base utilizados en toda la aplicación
 * 
 * @module shared/types/common
 * @requires react
 * 
 * @author Equipo de Desarrollo ECI Express
 * @version 1.0.0
 */

/**
 * Props base para todos los componentes presentacionales
 * 
 * Proporciona propiedades comunes que deben soportar
 * todos los componentes reutilizables del sistema
 * 
 * @interface BaseComponentProps
 * 
 * @property {string} [className] - Clases CSS adicionales para personalización
 * @property {React.ReactNode} [children] - Contenido hijo del componente
 * 
 * @example
 * // Uso en definición de componente
 * interface CardProps extends BaseComponentProps {
 *   title: string;
 * }
 * 
 * export const Card: React.FC<CardProps> = ({ 
 *   className, 
 *   children, 
 *   title 
 * }) => { ... };
 * 
 * @example
 * // Uso directo
 * const MyComponent: React.FC<BaseComponentProps> = ({ 
 *   className = '', 
 *   children 
 * }) => (
 *   <div className={className}>{children}</div>
 * );
 */
export interface BaseComponentProps {
  /** Clases CSS adicionales opcionales */
  className?: string;
  /** Contenido hijo a renderizar */
  children?: React.ReactNode;
}

/**
 * Estados posibles de un pedido en el sistema
 * 
 * @typedef {('preparacion' | 'completado' | 'validado')} EstadoPedido
 * 
 * Estados del ciclo de vida:
 * - preparacion: Pedido en proceso de preparación (pendiente de entrega)
 * - completado: Pedido entregado al cliente (ciclo finalizado)
 * - validado: Pedido validado pero aún no marcado como completado (estado intermedio)
 * 
 * @note Cambió de 'pendiente' a 'preparacion' para consistencia con la UI
 * 
 * @example
 * const estado: EstadoPedido = 'preparacion';
 * 
 * @example
 * // Validación de estado
 * function esEstadoValido(estado: string): estado is EstadoPedido {
 *   return ['preparacion', 'completado', 'validado'].includes(estado);
 * }
 */
export type EstadoPedido = 'preparacion' | 'completado' | 'validado';

/**
 * Respuesta estándar de la API REST
 * 
 * Estructura genérica para todas las respuestas del backend
 * Proporciona consistencia en el manejo de respuestas
 * 
 * @interface ApiResponse
 * @template T - Tipo de datos contenidos en la respuesta
 * 
 * @property {T} data - Datos de la respuesta (tipado genérico)
 * @property {string} message - Mensaje descriptivo de la operación
 * @property {boolean} success - Indicador de éxito/fallo de la operación
 * 
 * @example
 * // Respuesta exitosa con datos
 * const response: ApiResponse<Pedido[]> = {
 *   data: [pedido1, pedido2],
 *   message: 'Pedidos obtenidos exitosamente',
 *   success: true
 * };
 * 
 * @example
 * // Respuesta de error
 * const errorResponse: ApiResponse<null> = {
 *   data: null,
 *   message: 'Error al obtener pedidos',
 *   success: false
 * };
 * 
 * @example
 * // Uso con fetch
 * async function fetchPedidos(): Promise<ApiResponse<Pedido[]>> {
 *   const response = await fetch('/api/pedidos');
 *   return response.json();
 * }
 */
export interface ApiResponse<T> {
  /** Datos de la respuesta */
  data: T;
  /** Mensaje descriptivo de la operación */
  message: string;
  /** Indica si la operación fue exitosa */
  success: boolean;
}

/**
 * Criterios de filtrado y búsqueda genéricos
 * 
 * Interfaz flexible para implementar funcionalidades
 * de búsqueda y filtrado en diferentes módulos
 * 
 * @interface FiltrosBusqueda
 * 
 * @property {string} query - Texto de búsqueda libre
 * @property {EstadoPedido} [estado] - Filtro por estado específico (opcional)
 * @property {string} [fecha] - Filtro por fecha específica (opcional)
 * 
 * @example
 * // Filtro solo por texto
 * const filtros: FiltrosBusqueda = {
 *   query: 'hamburguesa',
 * };
 * 
 * @example
 * // Filtro combinado
 * const filtrosAvanzados: FiltrosBusqueda = {
 *   query: 'David',
 *   estado: 'preparacion',
 *   fecha: '2024-01-20'
 * };
 * 
 * @example
 * // Aplicar filtros a array
 * function filtrarPedidos(
 *   pedidos: Pedido[], 
 *   filtros: FiltrosBusqueda
 * ): Pedido[] {
 *   return pedidos.filter(pedido => {
 *     if (filtros.query && !pedido.nombreCliente.includes(filtros.query)) {
 *       return false;
 *     }
 *     if (filtros.estado && pedido.estado !== filtros.estado) {
 *       return false;
 *     }
 *     if (filtros.fecha && pedido.fechaCreacion !== filtros.fecha) {
 *       return false;
 *     }
 *     return true;
 *   });
 * }
 */
export interface FiltrosBusqueda {
  /** Texto de búsqueda libre (código, nombre, producto, etc.) */
  query: string;
  /** Filtro por estado específico (opcional) */
  estado?: EstadoPedido;
  /** Filtro por fecha específica en formato ISO (opcional) */
  fecha?: string;
}

/**
 * NOTAS DE IMPLEMENTACIÓN
 * =======================
 * 
 * PROPÓSITO DEL ARCHIVO:
 * - Centralizar tipos compartidos entre módulos
 * - Evitar duplicación de definiciones
 * - Mantener consistencia de tipos en toda la app
 * - Facilitar refactorización y mantenimiento
 * 
 * CONVENCIONES DE NOMENCLATURA:
 * - Interfaces: PascalCase (BaseComponentProps, ApiResponse)
 * - Tipos: PascalCase (EstadoPedido)
 * - Propiedades: camelCase (className, children)
 * 
 * EXTENSIBILIDAD:
 * 
 * Para agregar nuevos tipos compartidos:
 * 
 * 1. Evaluar si realmente es compartido (usado en 2+ módulos)
 * 2. Documentar exhaustivamente con JSDoc
 * 3. Proporcionar ejemplos de uso
 * 4. Exportar desde index.ts del módulo
 * 
 * EVOLUCIÓN DE TIPOS:
 * 
 * EstadoPedido:
 * - v1.0: 'pendiente' | 'completado'
 * - v1.1: 'preparacion' | 'completado' (renamed)
 * - v1.2: 'preparacion' | 'completado' | 'validado' (added)
 * - Futuro: Considerar 'cancelado', 'en_camino', 'devuelto'
 * 
 * SINCRONIZACIÓN CON BACKEND:
 * - Tipos deben coincidir con schemas del backend
 * - Usar generadores de tipos si es posible (OpenAPI, GraphQL)
 * - Validar respuestas con bibliotecas (Zod, Yup)
 * - Mantener documentación actualizada
 * 
 * BEST PRACTICES:
 * 
 * 1. Genéricos:
 *    - Usar genéricos para flexibilidad (ApiResponse<T>)
 *    - Proporcionar tipos concretos cuando sea posible
 * 
 * 2. Opcionales:
 *    - Marcar como opcionales solo si realmente lo son
 *    - children?: React.ReactNode es estándar
 *    - className?: string permite extensión
 * 
 * 3. Documentación:
 *    - Cada tipo debe tener JSDoc completo
 *    - Incluir ejemplos de uso
 *    - Documentar cambios de versión
 * 
 * 4. Importaciones:
 *    - Importar React types cuando sea necesario
 *    - Evitar dependencias circulares
 *    - Usar path aliases (@shared)
 * 
 * TESTING:
 * 
 * Para validar tipos en tiempo de compilación:
 * 
 * // Test de asignabilidad
 * const validEstado: EstadoPedido = 'preparacion'; // ✓
 * const invalidEstado: EstadoPedido = 'cancelado'; // ✗ Error
 * 
 * // Test de respuesta API
 * const response: ApiResponse<number> = {
 *   data: 42,
 *   message: 'Success',
 *   success: true
 * }; // ✓
 * 
 * MIGRACIÓN:
 * 
 * Si cambias un tipo existente:
 * 1. Crear versión deprecated con @deprecated tag
 * 2. Crear nueva versión con sufijo V2 si es necesario
 * 3. Proporcionar guía de migración
 * 4. Actualizar toda la codebase gradualmente
 * 5. Remover versión antigua en siguiente major version
 * 
 * @example
 * // Migración de tipo deprecated
 * // @deprecated Use EstadoPedido instead
 * export type EstadoPedidoLegacy = 'pendiente' | 'completado';
 * 
 * // Nueva versión
 * export type EstadoPedido = 'preparacion' | 'completado' | 'validado';
 * 
 * INTEGRACIÓN CON MÓDULOS:
 * 
 * Pedidos:
 * - Extiende FiltrosBusqueda en FiltrosPedidos
 * - Usa EstadoPedido en Pedido interface
 * - Implementa ApiResponse en servicios
 * 
 * Shared:
 * - Usa BaseComponentProps en Card, Badge, etc.
 * - Exporta todos los tipos base
 * - Mantiene como fuente única de verdad
 * 
 * MEJORAS FUTURAS:
 * - Agregar tipos para notificaciones
 * - Añadir tipos para autenticación
 * - Incluir tipos para paginación
 * - Definir tipos para formularios
 * - Agregar tipos para estados de carga
 */