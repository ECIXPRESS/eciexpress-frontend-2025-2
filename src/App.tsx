import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import Auth from "@/pages/login/hooks/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { useEffect } from "react";
import { useAuth } from "@/pages/login/hooks/useAuth";
import TestConnection from "@/pages/chat/TestConnection";
import ChatPage from "@/pages/chat/ChatPage";

import Home from "@/pages/home/components/Home";
import StatisticsPage from "@/pages/statistics/StatisticsPage";
import ProductDetailPage from "@/pages/product-detail/components/ProductDetailPage";
import CartPage from "@/pages/cart/CartPage";

function HomeWithMockUser() {
  const { login, user } = useAuth();

  useEffect(() => {
    if (!user) {
      login(
        "mock-token-12345", 
        {
          userId: "d66d2d30-56cb-410b-a5f0-9191c38f380e",
          email: "Pepitotolitis@gmail.com",
          role: "user", 
          pfpURL: "",
          balance: 512000
        }
      );
    }
  }, [user, login]);

  ;
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
        
        {/* Rutas placeholder para otras secciones */}
        <Route path="/orders" element={<div className="p-8 text-2xl">Pedidos - Próximamente</div>} />
        <Route path="/catalog" element={<div className="p-8 text-2xl">Catálogo - Próximamente</div>} />
        <Route path="/chat" element={<div className="p-8 text-2xl">Chat - Próximamente</div>} />
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
 <Routes>
        {/* Rutas sin Layout */}
        <Route path="/test-connection" element={<TestConnection />} />
        
        {/* Rutas con Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomeWithMockUser />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;