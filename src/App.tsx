import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Layout from "./utils/Layout";
import { AuthProvider } from "@/utils/context/AuthProvider";
import { WalletProvider } from "@/utils/context/WalletProvider";
import Auth from "@/pages/login/hooks/Auth";
import { PasswordRecoveryContainer } from "@/pages/password-recovery/passwordRecoveryContainer";
import { useEffect, useState } from "react";
import { useAuth } from "@/pages/login/hooks/useAuth";
import { useWallet } from "@/utils/context/WalletProvider";
import { toast } from 'react-toastify';

import Home from "@/pages/home/components/Home";
import StatisticsPage from "@/pages/statistics/StatisticsPage";
import ProductDetailPage from "@/pages/product-detail/components/ProductDetailPage";
import CartPage from "@/pages/cart/CartPage";
import ChatPage from "@/pages/chat/ChatPage";

// Importa componentes para inventory-seller
import { ProductosList } from "@/pages/inventory-seller";
import type { Producto } from "@/pages/inventory-seller";
import { mockProductos } from "@/pages/inventory-seller/mocks/mockProductos";

// Importa componentes para qr-validation-seller
import { PedidosList } from "@/pages/qr-validation-seller";
import type { Pedido } from "@/pages/qr-validation-seller";
import { mockPedidos } from "@/pages/qr-validation-seller/mocks/mockPedidos";

// Importa componentes para wallet
import { WalletCard, MovementsList, RechargeModal, ProximosPedidos, SettingsPanel } from "@/pages/wallet";
import type { WalletData } from "@/pages/wallet";
import { mockWalletData, mockProximosPedidos } from "@/pages/wallet/mocks/mockWalletData";

// Componente contenedor para inventory-seller
function InventorySellerPage() {
  const [productos, setProductos] = useState<Producto[]>(mockProductos);

  const handleUpdateStock = (id: string, newStock: number) => {
    setProductos(productos.map(p => 
      p.id === id ? { ...p, stock: newStock } : p
    ));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Inventario del Vendedor</h1>
      <ProductosList 
        productos={productos}
        onUpdateStock={handleUpdateStock}
      />
    </div>
  );
}

// Componente contenedor para qr-validation-seller
function QRValidationSellerPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);

  const handleValidatePedido = (id: string) => {
    setPedidos(pedidos.map(p =>
      p.id === id ? { ...p, estado: "completado" } : p
    ));
  };

  const handleVerDetalles = (id: string) => {
    console.log("Ver detalles del pedido:", id);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Validación QR de Pedidos</h1>
      <PedidosList 
        pedidos={pedidos}
        onValidarPedido={handleValidatePedido}
        onVerDetalles={handleVerDetalles}
      />
    </div>
  );
}

// Componente contenedor para wallet
function WalletPage() {
  const { walletData, updateBalance, addMovement, profileImage, updateProfileImage } = useWallet();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleRecargar = () => {
    setIsRechargeModalOpen(true);
  };

  const handleConfirmRecharge = (amount: number) => {
    try {
      // Actualizar el balance
      updateBalance(amount);
      
      // Agregar el movimiento de recarga
      addMovement({
        tipo: 'recarga',
        descripcion: 'Recarga',
        monto: amount,
        fecha: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit' })
      });

      setIsRechargeModalOpen(false);
    } catch (error) {
      toast.error('Error al procesar la recarga. Por favor intenta nuevamente', {
        position: 'bottom-right',
      });
    }
  };

  const handleVerDetallePedido = (pedidoId: string) => {
    console.log('Ver detalle del pedido:', pedidoId);
    toast.info('Cargando detalles del pedido...', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <div className="md:ml-20 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto mt-16 md:mt-0">
          {/* Sección de información del usuario - Fondo blanco */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-300"></div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#FDDF65]">Hola,</h1>
                  <p className="text-lg sm:text-xl text-[#262626] font-semibold">{walletData.nombreUsuario}</p>
                  <p className="text-sm text-gray-500">Estudiante</p>
                </div>
              </div>
              
              {/* Botón de configuración */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Configuración"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid de billetera y movimientos */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
            {/* Sección de billetera - Fondo blanco */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-[#262626] mb-6">Billetera</h2>
              <WalletCard
                saldo={walletData.saldo}
                nombreUsuario={walletData.nombreUsuario}
                numeroTarjeta={walletData.numeroTarjeta}
                onRecargar={handleRecargar}
              />
            </div>

            <MovementsList movimientos={walletData.movimientos} />
          </div>

          <ProximosPedidos 
            pedidos={mockProximosPedidos}
            onVerDetalle={handleVerDetallePedido}
          />

          <RechargeModal
            isOpen={isRechargeModalOpen}
            onClose={() => setIsRechargeModalOpen(false)}
            onConfirm={handleConfirmRecharge}
          />

          <SettingsPanel
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            userName={walletData.nombreUsuario}
            userRole="Estudiante"
            userAvatar={profileImage}
            onProfileImageChange={updateProfileImage}
          />
        </div>
      </div>
    </div>
  );
}

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
        
        {/* Ruta de carrito */}
        <Route path="/cart" element={<CartPage />} />
        
        {/* Ruta de chat */}
        <Route path="/chat" element={<ChatPage />} />

        {/* Rutas para seller - Inventario */}
        <Route path="/seller/inventory" element={<InventorySellerPage />} />
        
        {/* Rutas para seller - Validación QR */}
        <Route path="/seller/qr-validation" element={<QRValidationSellerPage />} />

        {/* Rutas placeholder para otras secciones */}
        <Route path="/orders" element={<div className="p-8 text-2xl">Pedidos - Próximamente</div>} />
        <Route path="/catalog" element={<div className="p-8 text-2xl">Catálogo - Próximamente</div>} />

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
      <WalletProvider>
        <HomeWithMockUser />
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;