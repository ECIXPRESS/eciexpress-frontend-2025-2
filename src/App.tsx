import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import Auth from "@/pages/login/hooks/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { useEffect } from "react";
import { useAuth } from "@/pages/login/hooks/useAuth";

import Home from "@/pages/home/components/Home";
import StatisticsPage from "@/pages/statistics/StatisticsPage";

function HomeWithMockUser() {
  const { login, user } = useAuth();

  useEffect(() => {
    if (!user) {
      login(
        "mock-token-12345", 
        {
          userId: "1",
          email: "usuario@eci.edu.co",
          role: "admin",  // user, seller, admin
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
      <HomeWithMockUser />
    </AuthProvider>
  );
}

export default App;