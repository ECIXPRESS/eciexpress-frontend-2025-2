import { useState, useMemo } from 'react';
import { PedidosList, FiltrosPedidos, EstadoNavigation as EstadoNavigationPedidos } from './index';
import type { Pedido, FiltrosPedidosType, ResumenPedidosType } from './index';
import { mockPedidos } from './mocks/mockPedidos';

export default function QRValidationSellerPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [filtros, setFiltros] = useState<FiltrosPedidosType>({
    query: '',
    estado: undefined
  });
  const [estadoActivo, setEstadoActivo] = useState('todos');

  const handleValidatePedido = (id: string) => {
    setPedidos(pedidos.map(p =>
      p.id === id ? { ...p, estado: "completado" } : p
    ));
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
    </div>
  );
}
