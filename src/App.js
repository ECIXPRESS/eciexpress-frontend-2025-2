import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartProvider } from "@/pages/cart/context/CartContext";
import { AuthProvider } from "@/lib/context/AuthProvider";
import { WalletProvider } from "@/lib/context/WalletProvider";
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
const PasswordRecoveryContainer = lazy(() => import("@/pages/password-recovery/passwordRecoveryContainer").then(module => ({ default: module.PasswordRecoveryContainer })));
const LoadingFallback = () => (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }) }));
function App() {
    return (_jsx(AuthProvider, { children: _jsx(WalletProvider, { children: _jsx(CartProvider, { children: _jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/Auth", element: _jsx(Auth, {}) }), _jsx(Route, { path: "/login", element: _jsx(Navigate, { to: "/Auth", replace: true }) }), _jsx(Route, { path: "/signup", element: _jsx(Navigate, { to: "/Auth", replace: true }) }), _jsx(Route, { path: "/forgot-password", element: _jsx(PasswordRecoveryContainer, {}) }), _jsx(Route, { path: "/password-recovery", element: _jsx(PasswordRecoveryContainer, {}) }), _jsx(Route, { element: _jsx(ProtectedRoute, {}), children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/statistics", element: _jsx(StatisticsPage, {}) }), _jsx(Route, { path: "/wallet", element: _jsx(WalletPage, {}) }), _jsx(Route, { path: "/product/:id", element: _jsx(ProductDetailPage, {}) }), _jsx(Route, { path: "/store/:storeId", element: _jsx(StorePage, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/orders", element: _jsx(OrdersUserPage, {}) }), _jsx(Route, { path: "/chat", element: _jsx(ChatPage, {}) }), _jsx(Route, { path: "/catalog", element: _jsx(InventorySellerPage, {}) }), _jsx(Route, { path: "/orders-seller", element: _jsx(QRValidationSellerPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx("div", { className: "p-8 text-2xl", children: "Dashboard - Pr\u00F3ximamente" }) }), _jsx(Route, { path: "/sellers", element: _jsx("div", { className: "p-8 text-2xl", children: "Vendedores - Pr\u00F3ximamente" }) }), _jsx(Route, { path: "/promotions", element: _jsx("div", { className: "p-8 text-2xl", children: "Promociones - Pr\u00F3ximamente" }) })] }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/Auth", replace: true }) })] }) }) }) }) }));
}
export default App;
