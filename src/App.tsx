import {Routes, Route, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import {CartProvider} from "@/pages/cart/context/CartContext";
import {AuthProvider} from "@/lib/context/AuthProvider";
import {WalletProvider} from "@/lib/context/WalletProvider";
import Layout from "@/lib/navegation/Layout";
import { ProtectedRoute } from "@/lib/navegation/ProtectedRoute";

const Auth = lazy(() => import("@/pages/login/Auth"));
const Home = lazy(() => import("@/pages/home/components/Home"));
const StatisticsPage = lazy(() => import("@/pages/statistics/StatisticsPage"));
const ProductDetailPage = lazy(() => import("@/pages/product-detail/components/ProductDetailPage"));
const CartPage = lazy(() => import("@/pages/cart/CartPage"));
const ChatPage = lazy(() => import("@/pages/chat/ChatPage"));
const StorePage = lazy(() => import("@/pages/store/StorePage"));
const WalletPage = lazy(() => import("@/pages/wallet/WalletPage"));
const InventorySellerPage = lazy(() => import("@/pages/inventory-seller/InventorySellerPage"));
const QRValidationSellerPage = lazy(() => import("@/pages/qr-validation-seller/QRValidationSellerPage"));
const OrdersUserPage = lazy(() => import("@/pages/orders-user/OrdersUserPage"));
const PasswordRecoveryContainer = lazy(() => import("@/pages/password-recovery/passwordRecoveryContainer").then(module => ({default: module.PasswordRecoveryContainer})));

const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <WalletProvider>
                <CartProvider>
                    <Suspense fallback={<LoadingFallback/>}>
                        <Routes>
                            {/* Rutas públicas */}
                            <Route path="/Auth" element={<Auth/>}/>
                            <Route path="/login" element={<Navigate to="/Auth" replace/>}/>
                            <Route path="/signup" element={<Navigate to="/Auth" replace/>}/>
                            <Route path="/forgot-password" element={<PasswordRecoveryContainer/>}/>
                            <Route path="/password-recovery" element={<PasswordRecoveryContainer/>}/>

                            {/* Rutas protegidas */}
                            <Route element={<ProtectedRoute />}>
                                <Route element={<Layout />}>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/statistics" element={<StatisticsPage/>}/>
                                    <Route path="/wallet" element={<WalletPage/>}/>
                                    <Route path="/product/:id" element={<ProductDetailPage/>}/>
                                    <Route path="/store/:storeId" element={<StorePage/>}/>
                                    <Route path="/cart" element={<CartPage/>}/>
                                    <Route path="/orders" element={<OrdersUserPage/>}/>
                                    <Route path="/chat" element={<ChatPage/>}/>
                                    <Route path="/catalog" element={<InventorySellerPage/>}/>
                                    <Route path="/orders-seller" element={<QRValidationSellerPage/>}/>
                                    <Route path="/dashboard" element={<div className="p-8 text-2xl">Dashboard - Próximamente</div>}/>
                                    <Route path="/sellers" element={<div className="p-8 text-2xl">Vendedores - Próximamente</div>}/>
                                    <Route path="/promotions" element={<div className="p-8 text-2xl">Promociones - Próximamente</div>}/>
                                </Route>
                            </Route>

                            {/* Redirigir cualquier otra ruta a Auth */}
                            <Route path="*" element={<Navigate to="/Auth" replace/>}/>
                        </Routes>
                    </Suspense>
                </CartProvider>
            </WalletProvider>
        </AuthProvider>
    );
}

export default App;