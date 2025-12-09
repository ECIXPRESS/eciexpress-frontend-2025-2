import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import Auth from "@/pages/login/hooks/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "@/pages/login/hooks/useAuth";
import TestConnection from "@/pages/chat/TestConnection";
import ChatPage from "@/pages/chat/ChatPage";

import Home from "@/pages/home/components/Home";

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
          balance: 1200
        }
      );
    }
  }, [user, login]);

  return <Home />
  ;
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