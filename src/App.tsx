import React, { useState, useMemo, useEffect } from 'react';
import { Header, Container } from '@shared';
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
} from '@pages/qr-validation-seller';

function App() {
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

  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorType, setErrorType] = useState<'qr-invalid' | 'order-not-found' | 'camera-unavailable'>('qr-invalid');
  const [errorCode, setErrorCode] = useState<string>('');
  const [currentPedidoId, setCurrentPedidoId] = useState<string | null>(null);
  const [validatedCode, setValidatedCode] = useState<string>('');
  const [initialTab, setInitialTab] = useState<'qr' | 'manual'>('qr');

  // Escuchar eventos de error personalizados
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

  // Calcular resumen
  const resumen: ResumenPedidosType = {
    completados: pedidos.filter(p => p.estado === 'completado').length,
    pendientes: pedidos.filter(p => p.estado === 'preparacion').length,
    total: pedidos.length,
  };

  // Filtrar pedidos según estado activo y filtros
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(pedido => {
      // 1. Filtrar por estado activo en la navegación (tiene prioridad si está activo)
      let pasaFiltroNavegacion = true;
      if (estadoActivo === 'completados') {
        pasaFiltroNavegacion = pedido.estado === 'completado';
      } else if (estadoActivo === 'pendientes') {
        pasaFiltroNavegacion = pedido.estado === 'preparacion';
      }
      // Si estadoActivo es 'total', no se filtra por estado

      // 2. Filtrar por búsqueda de texto
      let pasaBusqueda = true;
      if (filtros.query.trim()) {
        pasaBusqueda = 
          pedido.codigo.toLowerCase().includes(filtros.query.toLowerCase()) ||
          pedido.nombreCliente.toLowerCase().includes(filtros.query.toLowerCase()) ||
          pedido.productos.some(p => 
            p.nombre.toLowerCase().includes(filtros.query.toLowerCase())
          );
      }

      // 3. Filtrar por estado del componente FiltrosPedidos (solo si no hay estado activo en navegación)
      let pasaFiltroEstado = true;
      if (filtros.estado && estadoActivo === 'total') {
        pasaFiltroEstado = pedido.estado === filtros.estado;
      }

      return pasaFiltroNavegacion && pasaBusqueda && pasaFiltroEstado;
    });
  }, [pedidos, filtros, estadoActivo]);

  const handleValidarPedido = (id: string) => {
    setCurrentPedidoId(id);
    setInitialTab('qr'); // Siempre inicia en QR cuando validan desde un pedido
    setValidationModalOpen(true);
  };

  const handleValidationSuccess = (code: string) => {
    console.log('Código validado:', code);
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
    setInitialTab('qr'); // Reset a pestaña QR
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
    setInitialTab('manual'); // Abre en pestaña manual
    setTimeout(() => {
      setValidationModalOpen(true);
    }, 300); // Pequeño delay para transición suave
  };

  const handleErrorRetry = () => {
    setErrorModalOpen(false);
    setInitialTab('qr'); // Vuelve a intentar con QR
    setTimeout(() => {
      setValidationModalOpen(true);
    }, 300);
  };

  const handleVerDetalles = (id: string) => {
    console.log('Ver detalles del pedido:', id);
  };

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Header nombreTienda="ECI Express" />
      
      <Container className="flex-1 flex flex-col overflow-hidden py-5">
        <EstadoNavigation 
          resumen={resumen}
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
      </Container>

      {/* Modal de validación con pestañas */}
      <ValidationModal
        isOpen={validationModalOpen}
        onClose={handleCloseValidation}
        onSuccess={handleValidationSuccess}
        pedidoId={currentPedidoId || ''}
        initialTab={initialTab}
      />

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={successModalOpen}
        onClose={handleCloseSuccess}
        code={validatedCode}
      />

      {/* Modal de errores */}
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={handleCloseError}
        errorType={errorType}
        code={errorCode}
        onManualEntry={handleErrorManualEntry}
        onRetry={handleErrorRetry}
      />
    </div>
  );
}

export default App;