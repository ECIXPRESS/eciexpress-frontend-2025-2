import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import Auth from "@/pages/login/hooks/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "@/pages/login/hooks/useAuth";

import Home from "@/pages/home/components/Home";

function HomeWithMockUser() {
  const { login, user } = useAuth();

  useEffect(() => {
    if (!user) {
      login(
        "mock-token-12345", 
        {
          userId: "1",
          email: "usuario@eci.edu.co",
          role: "user", 
          pfpURL: "",
          balance: 1200
        }
      );
    }
  }, [user, login]);

  return <Home />;
}

function App() {
  return (
    <AuthProvider>
      <HomeWithMockUser />
    </AuthProvider>
  );
}

export default App;