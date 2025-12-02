import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import Auth from "@/pages/login/hooks/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { AnimatePresence, motion } from "framer-motion";

import Home from "@/pages/home/components/Home";
function App() {
  return <Home />;
}


export default App;
