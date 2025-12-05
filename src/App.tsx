import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import Auth from "@/pages/login/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { AnimatePresence, motion } from "framer-motion";

function App() {
    const location = useLocation();

    return (
        <AuthProvider>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/login" element={<Navigate to="/auth" replace />} />
                    <Route path="/signup" element={<Navigate to="/auth" replace />} />

                    <Route
                        path="/forgot-password"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <PasswordRecoveryContainer />
                            </motion.div>
                        }
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/home" element={<div>Catalog</div>} />
                            <Route path="/shoppingCart" element={<div>Shopping Cart</div>} />
                            <Route path="/orders" element={<div>Orders</div>} />
                            <Route path="/chat" element={<div>Chat</div>} />
                            <Route path="/" element={<Navigate to="/home" replace />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AnimatePresence>
        </AuthProvider>
    );
}

export default App;
