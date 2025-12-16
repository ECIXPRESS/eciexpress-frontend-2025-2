import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import { WalletProvider } from "@/utils/context/WalletProvider";
import { CartProvider } from "@/pages/cart/context/CartContext";
import { useAuth } from "@/pages/login/hooks/useAuth";

// Lazy imports para code splitting
const Auth = lazy(() => import("@/pages/login/hooks/Auth"));
const PasswordRecoveryContainer = lazy(() => import("@/pages/password-recovery/passwordRecoveryContainer").then(m => ({ default: m.PasswordRecoveryContainer })));
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

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

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
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Ruta de estadísticas */}
          <Route path="/statistics" element={<StatisticsPage />} />
          
          {/* Ruta de billetera */}
          <Route path="/wallet" element={<WalletPage />} />
          
          {/* Ruta de detalle de producto */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
          
          {/* Ruta de tienda */}
          <Route path="/store/:storeId" element={<StorePage />} />
          
          {/* Ruta de carrito */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersUserPage />} />
          {/* Ruta de chat */}
          <Route path="/chat" element={<ChatPage />} />

          {/* Rutas para seller - Inventario/Catálogo */}
          <Route path="/catalog" element={<InventorySellerPage />} />
          
          {/* Rutas para seller - Pedidos */}
          <Route path="/orders-seller" element={<QRValidationSellerPage />} />

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
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <CartProvider>
          <HomeWithMockUser />
        </CartProvider>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;