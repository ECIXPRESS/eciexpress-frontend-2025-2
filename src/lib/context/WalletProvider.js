import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { mockWalletData } from '@/pages/wallet/mock/mockWalletData';
const WalletContext = createContext(undefined);
export function WalletProvider({ children }) {
    const [walletData, setWalletData] = useState(mockWalletData);
    const [profileImage, setProfileImage] = useState('');
    const updateBalance = (amount) => {
        setWalletData(prev => ({
            ...prev,
            saldo: prev.saldo + amount
        }));
    };
    const addMovement = (movement) => {
        const newMovement = {
            ...movement,
            id: Date.now().toString()
        };
        setWalletData(prev => ({
            ...prev,
            movimientos: [newMovement, ...prev.movimientos]
        }));
    };
    const updateProfileImage = (imageUrl) => {
        setProfileImage(imageUrl);
    };
    return (_jsx(WalletContext.Provider, { value: {
            walletData,
            updateBalance,
            addMovement,
            updateProfileImage,
            profileImage
        }, children: children }));
}
export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}
