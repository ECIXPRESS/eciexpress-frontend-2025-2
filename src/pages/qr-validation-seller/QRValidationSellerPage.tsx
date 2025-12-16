import { useState, useMemo } from 'react';
import { PedidosList, FiltrosPedidos, EstadoNavigation as EstadoNavigationPedidos, ValidationModal } from './index';
import type { Pedido, FiltrosPedidosType, ResumenPedidosType } from './index';
import { mockPedidos } from './mocks/mockPedidos';

export default function QRValidationSellerPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [filtros, setFiltros] = useState<FiltrosPedidosType>({
    query: '',
    estado: undefined
  });
  const [estadoActivo, setEstadoActivo] = useState('todos');
  const [modalValidacionAbierto, setModalValidacionAbierto] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<string | null>(null);

  const handleValidatePedido = (id: string) => {
    // Abrir el modal de validación en lugar de completar directamente
    setPedidoSeleccionado(id);
    setModalValidacionAbierto(true);
  };

  const handleValidacionExitosa = (codigo: string) => {
    console.log("Código validado:", codigo);
    // Marcar el pedido como completado
    if (pedidoSeleccionado) {
      setPedidos(pedidos.map(p =>
        p.id === pedidoSeleccionado ? { ...p, estado: "completado" } : p
      ));
    }
    setModalValidacionAbierto(false);
    setPedidoSeleccionado(null);
  };

  const handleCerrarModal = () => {
    setModalValidacionAbierto(false);
    setPedidoSeleccionado(null);
  };

  const handleVerDetalles = (id: string) => {
    console.log("Ver detalles del pedido:", id);
  };

  // Calcular resumen de pedidos
  const resumen: ResumenPedidosType = useMemo(() => {
    const total = pedidos.length;
    const pendientes = pedidos.filter(p => p.estado === 'preparacion').length;
    const completados = pedidos.filter(p => p.estado === 'completado').length;
    
    return { total, pendientes, completados };
  }, [pedidos]);

  // Filtrar pedidos
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(p => {
      // Filtro por búsqueda
      if (filtros.query && !p.nombreCliente.toLowerCase().includes(filtros.query.toLowerCase()) &&
          !p.codigo.toLowerCase().includes(filtros.query.toLowerCase())) {
        return false;
      }
      
      // Filtro por estado
      if (filtros.estado && p.estado !== filtros.estado) {
        return false;
      }
      
      return true;
    });
  }, [pedidos, filtros]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Pedidos</h1>
      
      <EstadoNavigationPedidos 
        resumen={resumen}
        estadoActivo={estadoActivo}
        onEstadoChange={setEstadoActivo}
      />
      
      <FiltrosPedidos 
        filtros={filtros}
        onFiltrosChange={setFiltros}
      />
      
      <PedidosList 
        pedidos={pedidosFiltrados}
        onValidarPedido={handleValidatePedido}
        onVerDetalles={handleVerDetalles}
      />

      {/* Modal de validación */}
      <ValidationModal
        isOpen={modalValidacionAbierto}
        onClose={handleCerrarModal}
        onSuccess={handleValidacionExitosa}
        pedidoId={pedidoSeleccionado || ''}
      />
    </div>
  );
}
