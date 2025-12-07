/**
 * App.tsx - Componente principal de la aplicación ECI Express
 * Gestiona navegación entre módulos: QR Validation e Inventario
 */
import { useState, useMemo, useEffect } from 'react';
import { Package, QrCode } from 'lucide-react';
import { Header, Container } from './utils/qr-validation-seller';
import { 
  PedidosList, 
  EstadoNavigation, 
  FiltrosPedidos,
  ValidationModal,
  SuccessModal,
  ErrorModal,
  type Pedido,
  type ResumenPedidosType,
  type FiltrosPedidosType 
} from './pages/qr-validation-seller';

// Importaciones del módulo de inventario
import {
  ProductosList,
  EstadoNavigation as EstadoNavigationInventario,
  FiltrosInventario,
  type Producto,
  type ResumenInventario,
  type FiltrosInventarioType,
  getEstadoStock,
} from './pages/inventory-seller';
import { SuccessToast } from './pages/inventory-seller/components/SuccessToast';

// Tipos para navegación
type ModuloActivo = 'qr-validation' | 'inventory';

function App() {
  // ============================================
  // ESTADO DE NAVEGACIÓN ENTRE MÓDULOS
  // ============================================
  const [moduloActivo, setModuloActivo] = useState<ModuloActivo>('inventory');

  // ============================================
  // ESTADOS DEL MÓDULO QR VALIDATION
  // ============================================
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: '1',
      codigo: 'A182C3D4E',
      nombreCliente: 'David Salamanca',
      telefonoCliente: '+57 300 123 4567',
      horaEntrega: '3:30 PM',
      estado: 'preparacion',
      productos: [
        { id: '1', nombre: 'Hamburguesa Clásica', cantidad: 2, precioUnitario: 15000 },
        { id: '2', nombre: 'Papas Fritas Grandes', cantidad: 1, precioUnitario: 8000 },
        { id: '3', nombre: 'Gaseosa Personal', cantidad: 2, precioUnitario: 4000 },
      ],
      total: 46000,
      metodoPago: 'digital',
      pagado: true,
      fechaCreacion: '2024-01-20',
    },
    {
      id: '2', 
      codigo: 'E1F2G3H4I',
      nombreCliente: 'Tomas Ramirez',
      telefonoCliente: '+57 301 234 5678',
      horaEntrega: '4:30 PM',
      estado: 'preparacion',
      productos: [
        { id: '4', nombre: 'Pizza Mediana', cantidad: 1, precioUnitario: 25000 },
        { id: '5', nombre: 'Alitas BBQ Picantes', cantidad: 1, precioUnitario: 18000 },
      ],
      total: 43000,
      metodoPago: 'efectivo',
      pagado: false,
      fechaCreacion: '2024-01-20',
      observaciones: 'Sin picante en las alitas, por favor',
    },
    {
      id: '3',
      codigo: 'B2C3D4E5F',
      nombreCliente: 'Carmen Aguilar',
      telefonoCliente: '+57 302 345 6789',
      horaEntrega: '5:30 PM',
      estado: 'completado',
      productos: [
        { id: '6', nombre: 'Ensalada César', cantidad: 1, precioUnitario: 12000 },
        { id: '7', nombre: 'Jugo Natural', cantidad: 1, precioUnitario: 6000 },
      ],
      total: 18000,
      metodoPago: 'tarjeta',
      pagado: true,
      fechaCreacion: '2024-01-20',
    },
    {
      id: '4',
      codigo: 'C3D4E5F6G',
      nombreCliente: 'David Salamanca',
      telefonoCliente: '+57 300 123 4567',
      horaEntrega: '6:00 PM',
      estado: 'preparacion',
      productos: [
        { id: '8', nombre: 'Pizza Mediana', cantidad: 2, precioUnitario: 25000 },
        { id: '9', nombre: 'Gaseosa Personal', cantidad: 2, precioUnitario: 4000 },
      ],
      total: 58000,
      metodoPago: 'tarjeta',
      pagado: true,
      fechaCreacion: '2024-01-20',
      observaciones: 'Entregar en recepción',
    },
    {
      id: '5',
      codigo: 'D4E5F6G7H',
      nombreCliente: 'Tomas Ramirez',
      telefonoCliente: '+57 301 234 5678',
      horaEntrega: '6:30 PM',
      estado: 'completado',
      productos: [
        { id: '10', nombre: 'Hamburguesa Clásica', cantidad: 1, precioUnitario: 15000 },
        { id: '11', nombre: 'Papas Fritas Grandes', cantidad: 1, precioUnitario: 8000 },
      ],
      total: 23000,
      metodoPago: 'efectivo',
      pagado: true,
      fechaCreacion: '2024-01-20',
    },
    {
      id: '6',
      codigo: 'E5F6G7H8I',
      nombreCliente: 'Carmen Aguilar',
      telefonoCliente: '+57 302 345 6789',
      horaEntrega: '7:00 PM',
      estado: 'preparacion',
      productos: [
        { id: '12', nombre: 'Ensalada César', cantidad: 2, precioUnitario: 12000 },
        { id: '13', nombre: 'Jugo Natural', cantidad: 2, precioUnitario: 6000 },
        { id: '14', nombre: 'Papas Fritas Grandes', cantidad: 1, precioUnitario: 8000 },
      ],
      total: 44000,
      metodoPago: 'digital',
      pagado: false,
      fechaCreacion: '2024-01-20',
    },
    {
      id: '7',
      codigo: 'F6G7H8I9J',
      nombreCliente: 'David Salamanca',
      telefonoCliente: '+57 300 123 4567',
      horaEntrega: '7:30 PM',
      estado: 'completado',
      productos: [
        { id: '15', nombre: 'Pizza Mediana', cantidad: 1, precioUnitario: 25000 },
        { id: '16', nombre: 'Alitas BBQ Picantes', cantidad: 1, precioUnitario: 18000 },
      ],
      total: 43000,
      metodoPago: 'tarjeta',
      pagado: true,
      fechaCreacion: '2024-01-20',
    },
    {
      id: '8',
      codigo: 'G7H8I9J0K',
      nombreCliente: 'Tomas Ramirez',
      telefonoCliente: '+57 301 234 5678',
      horaEntrega: '8:00 PM',
      estado: 'preparacion',
      productos: [
        { id: '17', nombre: 'Hamburguesa Clásica', cantidad: 3, precioUnitario: 15000 },
        { id: '18', nombre: 'Papas Fritas Grandes', cantidad: 2, precioUnitario: 8000 },
        { id: '19', nombre: 'Gaseosa Personal', cantidad: 3, precioUnitario: 4000 },
      ],
      total: 73000,
      metodoPago: 'digital',
      pagado: true,
      fechaCreacion: '2024-01-20',
      observaciones: 'Favor tocar el timbre',
    },
    {
      id: '9',
      codigo: 'H8I9J0K1L',
      nombreCliente: 'Carmen Aguilar',
      telefonoCliente: '+57 302 345 6789',
      horaEntrega: '8:30 PM',
      estado: 'completado',
      productos: [
        { id: '20', nombre: 'Ensalada César', cantidad: 1, precioUnitario: 12000 },
      ],
      total: 12000,
      metodoPago: 'efectivo',
      pagado: true,
      fechaCreacion: '2024-01-20',
    },
  ]);

  const [filtros, setFiltros] = useState<FiltrosPedidosType>({
    query: '',
    estado: undefined
  });

  const [estadoActivo, setEstadoActivo] = useState<string>('total');

  // Estados para modales de QR Validation
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorType, setErrorType] = useState<'qr-invalid' | 'order-not-found' | 'camera-unavailable'>('qr-invalid');
  const [errorCode, setErrorCode] = useState<string>('');
  const [currentPedidoId, setCurrentPedidoId] = useState<string | null>(null);
  const [validatedCode, setValidatedCode] = useState<string>('');
  const [initialTab, setInitialTab] = useState<'qr' | 'manual'>('qr');

  // ============================================
  // ESTADOS DEL MÓDULO INVENTARIO
  // ============================================
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: '1',
      nombre: 'Hamburguesa Clásica',
      descripcion: 'Deliciosa hamburguesa con carne de res, lechuga, tomate y salsa especial',
      precio: 15000,
      stock: 25,
      stockMinimo: 10,
      categoria: 'Almuerzo',
      disponible: true,
      fechaActualizacion: '2025-01-15T10:30:00Z',
      unidadMedida: 'unidades'
    },
    {
      id: '2',
      nombre: 'Arepa con Huevo',
      descripcion: 'Arepa tradicional rellena de huevo frito',
      precio: 5500,
      stock: 8,
      stockMinimo: 15,
      categoria: 'Desayuno',
      disponible: true,
      fechaActualizacion: '2025-01-15T08:00:00Z',
      unidadMedida: 'unidades'
    },
    {
      id: '3',
      nombre: 'Jugo Natural de Naranja',
      descripcion: 'Jugo 100% natural de naranja recién exprimido',
      precio: 4000,
      stock: 0,
      stockMinimo: 20,
      categoria: 'Bebidas',
      disponible: false,
      fechaActualizacion: '2025-01-14T16:45:00Z',
      unidadMedida: 'vasos'
    },
    {
      id: '4',
      nombre: 'Empanada de Carne',
      descripcion: 'Empanada crujiente rellena de carne molida sazonada',
      precio: 3500,
      stock: 45,
      stockMinimo: 20,
      categoria: 'Snacks',
      disponible: true,
      fechaActualizacion: '2025-01-15T09:15:00Z',
      unidadMedida: 'unidades'
    },
    {
      id: '5',
      nombre: 'Brownie de Chocolate',
      descripcion: 'Brownie casero con trozos de chocolate y nueces',
      precio: 4500,
      stock: 12,
      stockMinimo: 10,
      categoria: 'Postres',
      disponible: true,
      fechaActualizacion: '2025-01-15T07:30:00Z',
      unidadMedida: 'porciones'
    },
    {
      id: '6',
      nombre: 'Combo Ejecutivo',
      descripcion: 'Plato del día + bebida + postre a precio especial',
      precio: 18500,
      stock: 5,
      stockMinimo: 10,
      categoria: 'Combos',
      disponible: true,
      fechaActualizacion: '2025-01-15T11:00:00Z',
      unidadMedida: 'combos'
    },
    {
      id: '7',
      nombre: 'Sándwich de Pollo',
      descripcion: 'Sándwich con pechuga de pollo, queso, lechuga y mayonesa',
      precio: 12000,
      stock: 18,
      stockMinimo: 15,
      categoria: 'Almuerzo',
      disponible: true,
      fechaActualizacion: '2025-01-15T10:00:00Z',
      unidadMedida: 'unidades'
    },
    {
      id: '8',
      nombre: 'Café Americano',
      descripcion: 'Café negro preparado con granos seleccionados',
      precio: 2500,
      stock: 100,
      stockMinimo: 30,
      categoria: 'Bebidas',
      disponible: true,
      fechaActualizacion: '2025-01-15T06:00:00Z',
      unidadMedida: 'tazas'
    },
    {
      id: '9',
      nombre: 'Papas Fritas',
      descripcion: 'Porción de papas fritas crujientes con sal',
      precio: 5000,
      stock: 3,
      stockMinimo: 25,
      categoria: 'Snacks',
      disponible: true,
      fechaActualizacion: '2025-01-15T12:30:00Z',
      unidadMedida: 'porciones'
    },
    {
      id: '10',
      nombre: 'Torta de Zanahoria',
      descripcion: 'Torta húmeda de zanahoria con frosting de queso crema',
      precio: 5500,
      stock: 0,
      stockMinimo: 8,
      categoria: 'Postres',
      disponible: false,
      fechaActualizacion: '2025-01-14T18:00:00Z',
      unidadMedida: 'porciones'
    },
    {
      id: '11',
      nombre: 'Huevos Pericos',
      descripcion: 'Huevos revueltos con tomate y cebolla, estilo colombiano',
      precio: 6000,
      stock: 30,
      stockMinimo: 15,
      categoria: 'Desayuno',
      disponible: true,
      fechaActualizacion: '2025-01-15T07:00:00Z',
      unidadMedida: 'porciones'
    },
    {
      id: '12',
      nombre: 'Combo Estudiante',
      descripcion: 'Hamburguesa + papas + gaseosa a precio especial',
      precio: 16000,
      stock: 20,
      stockMinimo: 10,
      categoria: 'Combos',
      disponible: true,
      fechaActualizacion: '2025-01-15T11:30:00Z',
      unidadMedida: 'combos'
    },
  ]);

  const [filtrosInventario, setFiltrosInventario] = useState<FiltrosInventarioType>({
    query: '',
    categoria: undefined,
    estadoStock: undefined
  });

  const [estadoActivoInventario, setEstadoActivoInventario] = useState<string>('total');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // ============================================
  // EFECTOS Y CÁLCULOS
  // ============================================

  // Listener para eventos de error de QR Validation
  useEffect(() => {
    const handleShowError = (event: any) => {
      const { type, code } = event.detail;
      setErrorType(type);
      setErrorCode(code || '');
      setErrorModalOpen(true);
    };

    window.addEventListener('show-error', handleShowError);
    return () => window.removeEventListener('show-error', handleShowError);
  }, []);

  // Resumen de pedidos
  const resumenPedidos: ResumenPedidosType = {
    completados: pedidos.filter(p => p.estado === 'completado').length,
    pendientes: pedidos.filter(p => p.estado === 'preparacion').length,
    total: pedidos.length,
  };

  // Resumen de inventario
  const resumenInventario: ResumenInventario = useMemo(() => ({
    total: productos.length,
    stockBajo: productos.filter(p => {
      const estado = getEstadoStock(p.stock, p.stockMinimo);
      return estado === 'stock-bajo';
    }).length,
    disponibles: productos.filter(p => {
      const estado = getEstadoStock(p.stock, p.stockMinimo);
      return estado === 'disponible';
    }).length,
    agotados: productos.filter(p => p.stock === 0).length,
  }), [productos]);

  // Filtrado de pedidos
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(pedido => {
      let pasaFiltroNavegacion = true;
      if (estadoActivo === 'completados') {
        pasaFiltroNavegacion = pedido.estado === 'completado';
      } else if (estadoActivo === 'pendientes') {
        pasaFiltroNavegacion = pedido.estado === 'preparacion';
      }

      let pasaBusqueda = true;
      if (filtros.query.trim()) {
        pasaBusqueda = 
          pedido.codigo.toLowerCase().includes(filtros.query.toLowerCase()) ||
          pedido.nombreCliente.toLowerCase().includes(filtros.query.toLowerCase()) ||
          pedido.productos.some(p => 
            p.nombre.toLowerCase().includes(filtros.query.toLowerCase())
          );
      }

      let pasaFiltroEstado = true;
      if (filtros.estado && estadoActivo === 'total') {
        pasaFiltroEstado = pedido.estado === filtros.estado;
      }

      return pasaFiltroNavegacion && pasaBusqueda && pasaFiltroEstado;
    });
  }, [pedidos, filtros, estadoActivo]);

  // Filtrado de productos
  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      // Filtro por navegación de estado
      let pasaFiltroNavegacion = true;
      if (estadoActivoInventario === 'stockBajo') {
        const estado = getEstadoStock(producto.stock, producto.stockMinimo);
        pasaFiltroNavegacion = estado === 'stock-bajo';
      }

      // Filtro por búsqueda
      let pasaBusqueda = true;
      if (filtrosInventario.query.trim()) {
        pasaBusqueda = 
          producto.nombre.toLowerCase().includes(filtrosInventario.query.toLowerCase()) ||
          (producto.descripcion?.toLowerCase().includes(filtrosInventario.query.toLowerCase()) ?? false);
      }

      // Filtro por categoría
      let pasaCategoria = true;
      if (filtrosInventario.categoria) {
        pasaCategoria = producto.categoria === filtrosInventario.categoria;
      }

      // Filtro por estado de stock
      let pasaEstadoStock = true;
      if (filtrosInventario.estadoStock) {
        const estado = getEstadoStock(producto.stock, producto.stockMinimo);
        pasaEstadoStock = estado === filtrosInventario.estadoStock;
      }

      return pasaFiltroNavegacion && pasaBusqueda && pasaCategoria && pasaEstadoStock;
    });
  }, [productos, filtrosInventario, estadoActivoInventario]);

  // ============================================
  // HANDLERS QR VALIDATION
  // ============================================

  const handleValidarPedido = (id: string) => {
    setCurrentPedidoId(id);
    setInitialTab('qr');
    setValidationModalOpen(true);
  };

  const handleValidationSuccess = (code: string) => {
    if (currentPedidoId) {
      setPedidos(pedidos.map(pedido => 
        pedido.id === currentPedidoId ? { ...pedido, estado: 'completado' } : pedido
      ));
    }
    setValidatedCode(code);
    setValidationModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleCloseValidation = () => {
    setValidationModalOpen(false);
    setCurrentPedidoId(null);
    setInitialTab('qr');
  };

  const handleCloseSuccess = () => {
    setSuccessModalOpen(false);
    setCurrentPedidoId(null);
    setValidatedCode('');
  };

  const handleCloseError = () => {
    setErrorModalOpen(false);
    setErrorCode('');
  };

  const handleErrorManualEntry = () => {
    setErrorModalOpen(false);
    setInitialTab('manual');
    setTimeout(() => {
      setValidationModalOpen(true);
    }, 300);
  };

  const handleErrorRetry = () => {
    setErrorModalOpen(false);
    setInitialTab('qr');
    setTimeout(() => {
      setValidationModalOpen(true);
    }, 300);
  };

  const handleVerDetalles = (id: string) => {
    console.log('Ver detalles del pedido:', id);
  };

  // ============================================
  // HANDLERS INVENTARIO
  // ============================================

  const handleUpdateStock = (id: string, newStock: number) => {
    setProductos(productos.map(producto => 
      producto.id === id 
        ? { 
            ...producto, 
            stock: newStock, 
            disponible: newStock > 0,
            fechaActualizacion: new Date().toISOString()
          } 
        : producto
    ));
    
    const producto = productos.find(p => p.id === id);
    setToastMessage(`Stock de "${producto?.nombre}" actualizado a ${newStock} unidades`);
    setToastVisible(true);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Header nombreTienda="ECI Express" />
      
      <Container className="flex-1 flex flex-col overflow-hidden py-5">
        {moduloActivo === 'qr-validation' ? (
          // ============================================
          // VISTA QR VALIDATION
          // ============================================
          <>
            <EstadoNavigation 
              resumen={resumenPedidos}
              estadoActivo={estadoActivo}
              onEstadoChange={setEstadoActivo}
            />
            
            <FiltrosPedidos 
              filtros={filtros} 
              onFiltrosChange={setFiltros} 
            />
            
            <div className="flex-1 overflow-y-auto -mx-1 px-1">
              <PedidosList
                pedidos={pedidosFiltrados}
                onValidarPedido={handleValidarPedido}
                onVerDetalles={handleVerDetalles}
              />
            </div>
          </>
        ) : (
          // ============================================
          // VISTA INVENTARIO
          // ============================================
          <>
            <EstadoNavigationInventario 
              resumen={resumenInventario}
              estadoActivo={estadoActivoInventario}
              onEstadoChange={setEstadoActivoInventario}
            />
            
            <FiltrosInventario 
              filtros={filtrosInventario} 
              onFiltrosChange={setFiltrosInventario} 
            />
            
            <div className="flex-1 overflow-y-auto -mx-1 px-1">
              <ProductosList
                productos={productosFiltrados}
                onUpdateStock={handleUpdateStock}
              />
            </div>
          </>
        )}
      </Container>

      {/* Navegación flotante en esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex gap-2 bg-white rounded-full shadow-lg border border-gray-200 p-1.5">
          <button
            onClick={() => setModuloActivo('qr-validation')}
            className={`
              p-3 rounded-full transition-all duration-200
              ${moduloActivo === 'qr-validation'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
            title="Validación QR"
          >
            <QrCode className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setModuloActivo('inventory')}
            className={`
              p-3 rounded-full transition-all duration-200
              ${moduloActivo === 'inventory'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
            title="Inventario"
          >
            <Package className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modales de QR Validation */}
      <ValidationModal
        isOpen={validationModalOpen}
        onClose={handleCloseValidation}
        onSuccess={handleValidationSuccess}
        pedidoId={currentPedidoId || ''}
        initialTab={initialTab}
      />

      <SuccessModal
        isOpen={successModalOpen}
        onClose={handleCloseSuccess}
        code={validatedCode}
      />

      <ErrorModal
        isOpen={errorModalOpen}
        onClose={handleCloseError}
        errorType={errorType}
        code={errorCode}
        onManualEntry={handleErrorManualEntry}
        onRetry={handleErrorRetry}
      />

      {/* Toast de éxito para inventario */}
      <SuccessToast
        isVisible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default App;