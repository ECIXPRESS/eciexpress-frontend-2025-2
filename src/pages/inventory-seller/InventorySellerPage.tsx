import { useState, useMemo } from 'react';
import { ProductosList, FiltrosInventario, EstadoNavigation } from './index';
import type { Producto, FiltrosInventarioType, ResumenInventario } from './index';
import { mockProductos } from './mocks/mockProductos';
import { getEstadoStock } from './types/inventario';

export default function InventorySellerPage() {
  const [productos, setProductos] = useState<Producto[]>(mockProductos);
  const [filtros, setFiltros] = useState<FiltrosInventarioType>({
    query: '',
    categoria: undefined,
    estadoStock: undefined
  });
  const [estadoActivo, setEstadoActivo] = useState('todos');

  const handleUpdateStock = (id: string, newStock: number) => {
    setProductos(productos.map(p => 
      p.id === id ? { ...p, stock: newStock } : p
    ));
  };

  // Calcular resumen de inventario
  const resumen: ResumenInventario = useMemo(() => {
    const total = productos.length;
    const stockBajo = productos.filter(p => 
      getEstadoStock(p.stock, p.stockMinimo) === 'stock-bajo'
    ).length;
    const agotados = productos.filter(p => 
      getEstadoStock(p.stock, p.stockMinimo) === 'agotado'
    ).length;
    const disponibles = productos.filter(p => 
      getEstadoStock(p.stock, p.stockMinimo) === 'disponible'
    ).length;
    
    return { total, stockBajo, disponibles, agotados };
  }, [productos]);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      // Filtro por búsqueda
      if (filtros.query && !p.nombre.toLowerCase().includes(filtros.query.toLowerCase()) &&
          !p.descripcion?.toLowerCase().includes(filtros.query.toLowerCase())) {
        return false;
      }
      
      // Filtro por categoría
      if (filtros.categoria && p.categoria !== filtros.categoria) {
        return false;
      }
      
      // Filtro por estado de stock
      const estado = getEstadoStock(p.stock, p.stockMinimo);
      if (filtros.estadoStock && estado !== filtros.estadoStock) {
        return false;
      }
      
      return true;
    });
  }, [productos, filtros]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Catálogo del Vendedor</h1>
      
      <EstadoNavigation 
        resumen={resumen}
        estadoActivo={estadoActivo}
        onEstadoChange={setEstadoActivo}
        ventasSemana={15}
      />
      
      <FiltrosInventario 
        filtros={filtros}
        onFiltrosChange={setFiltros}
      />
      
      <ProductosList 
        productos={productosFiltrados}
        onUpdateStock={handleUpdateStock}
      />
    </div>
  );
}
