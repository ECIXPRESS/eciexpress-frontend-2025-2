import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import Auth from "@/pages/login/hooks/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { useEffect, useState } from "react";
import { useAuth } from "@/pages/login/hooks/useAuth";

import Home from "@/pages/home/components/Home";
import StatisticsPage from "@/pages/statistics/StatisticsPage";
import ProductDetailPage from "@/pages/product-detail/components/ProductDetailPage";
import CartPage from "@/pages/cart/CartPage";
import ChatPage from "@/pages/chat/ChatPage";

// Importa componentes para inventory-seller
import { ProductosList, FiltrosInventario, EstadoNavigation } from "@/pages/inventory-seller";
import type { Producto, FiltrosInventarioType, ResumenInventario } from "@/pages/inventory-seller";
import { mockProductos } from "@/pages/inventory-seller/mocks/mockProductos";
import { getEstadoStock } from "@/pages/inventory-seller/types/inventario";

// Importa componentes para qr-validation-seller
import { PedidosList, FiltrosPedidos, EstadoNavigation as EstadoNavigationPedidos } from "@/pages/qr-validation-seller";
import type { Pedido, FiltrosPedidosType, ResumenPedidosType } from "@/pages/qr-validation-seller";
import { mockPedidos } from "@/pages/qr-validation-seller/mocks/mockPedidos";
import { useMemo } from "react";

// Componente contenedor para inventory-seller
function InventorySellerPage() {
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
      <h1 className="text-3xl font-bold">Inventario del Vendedor</h1>
      
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

// Componente contenedor para qr-validation-seller
function QRValidationSellerPage() {
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
      <h1 className="text-3xl font-bold">Validación QR de Pedidos</h1>
      
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

function HomeWithMockUser() {
  const { login, user } = useAuth();

  useEffect(() => {
    if (!user) {
      login(
        "mock-token-12345", 
        {
          userId: "d66d2d30-56cb-410b-a5f0-9191c38f380e",
          email: "pepitotolitis@gmail.com",
          role: "seller",
          pfpURL: "",
          balance: 512000
        }
      );
    }
  }, [user, login]);

  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* Ruta de estadísticas */}
        <Route path="/statistics" element={<StatisticsPage />} />
        
        {/* Ruta de detalle de producto */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        
        {/* Ruta de carrito */}
        <Route path="/cart" element={<CartPage />} />
        
        {/* Ruta de chat */}
        <Route path="/chat" element={<ChatPage />} />

        {/* Rutas para seller - Inventario/Catálogo */}
        <Route path="/catalog" element={<InventorySellerPage />} />
        
        {/* Rutas para seller - Validación QR */}
        <Route path="/orders-seller" element={<QRValidationSellerPage />} />

        <Route path="/dashboard" element={<div className="p-8 text-2xl">Dashboard - Próximamente</div>} />
        <Route path="/sellers" element={<div className="p-8 text-2xl">Vendedores - Próximamente</div>} />
        <Route path="/promotions" element={<div className="p-8 text-2xl">Promociones - Próximamente</div>} />
      </Route>

      {/* Ruta de autenticación */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/password-recovery" element={<PasswordRecoveryContainer />} />
      
      {/* Redirigir cualquier otra ruta al home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <HomeWithMockUser />
    </AuthProvider>
  );
}

export default App;