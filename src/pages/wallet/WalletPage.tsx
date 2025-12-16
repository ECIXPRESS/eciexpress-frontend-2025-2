import { useState } from 'react';
import { useWallet } from '@/lib/context/WalletProvider';
import { toast } from 'react-toastify';
import { WalletCard, MovementsList, RechargeModal, ProximosPedidos, SettingsPanel } from './index';
import { mockProximosPedidos } from './mock/mockWalletData';

export default function WalletPage() {
  const { walletData, updateBalance, addMovement, profileImage, updateProfileImage } = useWallet();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleRecargar = () => {
    setIsRechargeModalOpen(true);
  };

  const handleConfirmRecharge = (amount: number) => {
    try {
      updateBalance(amount);
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

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
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
