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
import { ProductosList } from "@/pages/inventory-seller";
import type { Producto } from "@/pages/inventory-seller";
import { mockProductos } from "@/pages/inventory-seller/mocks/mockProductos";

// Importa componentes para qr-validation-seller
import { PedidosList } from "@/pages/qr-validation-seller";
import type { Pedido } from "@/pages/qr-validation-seller";
import { mockPedidos } from "@/pages/qr-validation-seller/mocks/mockPedidos";

// Componente contenedor para inventory-seller
function InventorySellerPage() {
  const [productos, setProductos] = useState<Producto[]>(mockProductos);

  const handleUpdateStock = (id: string, newStock: number) => {
    setProductos(productos.map(p => 
      p.id === id ? { ...p, stock: newStock } : p
    ));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Inventario del Vendedor</h1>
      <ProductosList 
        productos={productos}
        onUpdateStock={handleUpdateStock}
      />
    </div>
  );
}

// Componente contenedor para qr-validation-seller
function QRValidationSellerPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);

  const handleValidatePedido = (id: string) => {
    setPedidos(pedidos.map(p =>
      p.id === id ? { ...p, estado: "completado" } : p
    ));
  };

  const handleVerDetalles = (id: string) => {
    console.log("Ver detalles del pedido:", id);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Validación QR de Pedidos</h1>
      <PedidosList 
        pedidos={pedidos}
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

        {/* Rutas para seller - Inventario */}
        <Route path="/seller/inventory" element={<InventorySellerPage />} />
        
        {/* Rutas para seller - Validación QR */}
        <Route path="/seller/qr-validation" element={<QRValidationSellerPage />} />

        {/* Rutas placeholder para otras secciones */}
        <Route path="/orders" element={<div className="p-8 text-2xl">Pedidos - Próximamente</div>} />
        <Route path="/catalog" element={<div className="p-8 text-2xl">Catálogo - Próximamente</div>} />

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