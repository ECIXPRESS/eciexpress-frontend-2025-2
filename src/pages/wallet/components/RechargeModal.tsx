import { useState } from 'react';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export function RechargeModal({ isOpen, onClose, onConfirm }: RechargeModalProps) {
  const [amount, setAmount] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onConfirm(numAmount);
      setAmount('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6">Recargar Billetera</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Monto a recargar</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500 text-xl">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-xl"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 bg-yellow-400 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
