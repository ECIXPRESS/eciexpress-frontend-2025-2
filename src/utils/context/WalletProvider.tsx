import { createContext, useContext, useState, ReactNode } from 'react';
import type { WalletData, Movement } from '@/pages/wallet/types';
import { mockWalletData } from '@/pages/wallet/mock/mockWalletData';

interface WalletContextType {
  walletData: WalletData;
  updateBalance: (amount: number) => void;
  addMovement: (movement: Omit<Movement, 'id'>) => void;
  updateProfileImage: (imageUrl: string) => void;
  profileImage: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletData, setWalletData] = useState<WalletData>(mockWalletData);
  const [profileImage, setProfileImage] = useState<string>('');

  const updateBalance = (amount: number) => {
    setWalletData(prev => ({
      ...prev,
      saldo: prev.saldo + amount
    }));
  };

  const addMovement = (movement: Omit<Movement, 'id'>) => {
    const newMovement: Movement = {
      ...movement,
      id: Date.now().toString()
    };

    setWalletData(prev => ({
      ...prev,
      movimientos: [newMovement, ...prev.movimientos]
    }));
  };

  const updateProfileImage = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  return (
    <WalletContext.Provider value={{
      walletData,
      updateBalance,
      addMovement,
      updateProfileImage,
      profileImage
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}