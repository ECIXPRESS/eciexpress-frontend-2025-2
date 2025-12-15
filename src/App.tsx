import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {ProtectedRoute} from "./lib/navegation/ProtectedRoute";
import Layout from "./lib/navegation/Layout";
import {AuthProvider} from "@/lib/context/AuthProvider";
import Auth from "@/pages/login/Auth";
import {PasswordRecoveryContainer} from "@/pages/password-recovery/passwordRecoveryContainer";
import {AnimatePresence, motion} from "framer-motion";
import {UserSettings} from "@/pages/user-settings/UserSettings";
import Home from "@/pages/home/components/Home";

function App() {
    const location = useLocation();

    return (
        <AuthProvider>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/login" element={<Navigate to="/auth" replace/>}/>
                    <Route path="/signup" element={<Navigate to="/auth" replace/>}/>

                    <Route
                        path="/forgot-password"
                        element={
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.5}}
                            >
                                <PasswordRecoveryContainer/>
                            </motion.div>
                        }
                    />

                    <Route element={<ProtectedRoute/>}>
                        <Route element={<Layout/>}>
                            {/* Rutas comunes */}
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/user-settings" element={<UserSettings/>}/>
                            <Route path="/shoppingCart" element={"shoppingCart"}/>
                            <Route path="/orders" element={"Orders"}/>
                            <Route path="/chat" element={"Chat"}/>

                            {/* Rutas para seller */}
                            <Route path="/stats" element={"Stats"}/>

                            {/* Rutas para admin */}
                            <Route path="/sellers" element={"Sellers"}/>
                            <Route path="/promotions" element={"Promotions"}/>

                            <Route path="/" element={<Navigate to="/home" replace/>}/>
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/auth" replace/>}/>
                </Routes>
            </AnimatePresence>
        </AuthProvider>
    );
}

export default App;