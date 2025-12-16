import React, { useState, useEffect, useRef } from 'react';
import { X, QrCode, MessageCircle } from 'lucide-react';

export default function OrderDetailsDrawer({ order, isOpen, onClose }: { order: any | null; isOpen: boolean; onClose: () => void }) {
  const [showQr, setShowQr] = useState(false);
  const [status, setStatus] = useState(order?.status || 'pendiente');
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // reset when opened
    if (isOpen) {
      setShowQr(false);
      setIsClosing(false);
      setStatus(order?.status || 'pendiente');
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const handleContinue = () => {
    // mark as delivered and show QR
    setStatus('entregado');
    setShowQr(true);
  };

  const handleRequestClose = () => {
    // play exit animation then call onClose
    setIsClosing(true);
    timerRef.current = window.setTimeout(() => {
      onClose();
    }, 250); // match animation duration
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <style>{`
        @keyframes slideInFromRight { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutToRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(24px); opacity: 0; } }
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOutOverlay { from { opacity: 1; } to { opacity: 0; } }
        .drawer-slide-in { animation: slideInFromRight 320ms cubic-bezier(.22,1,.36,1) forwards; }
        .drawer-slide-out { animation: slideOutToRight 220ms ease-in forwards; }
        .overlay-fade-in { animation: fadeInOverlay 200ms ease-out forwards; }
        .overlay-fade-out { animation: fadeOutOverlay 180ms ease-in forwards; }
      `}</style>

      <div className={`absolute inset-0 bg-black/30 ${isClosing ? 'overlay-fade-out' : 'overlay-fade-in'}`} onClick={handleRequestClose} />

      <aside className={`relative bg-white w-full max-w-sm h-full overflow-y-auto shadow-2xl ${isClosing ? 'drawer-slide-out' : 'drawer-slide-in'}`}>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 pt-20 pb-6 p-5 text-white relative">
          <button onClick={handleRequestClose} className="absolute left-4 top-8 text-white">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-semibold">Detalles</h2>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Codigo del pedido</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{order.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Fecha de compra</p>
            </div>
            <div className="text-right">
              <p className="text-gray-700">12 nov, 2025 11:45 am</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Fecha de entrega</p>
            </div>
            <div className="text-right">
              <p className="text-gray-700">12 nov, 2025 02:30 pm</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Metodo de pago</p>
            </div>
            <div className="text-right">
              <p className="text-gray-700">Billetera</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Estado</p>
            </div>
            <div className="text-right">
              {status === 'entregado' ? (
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Entregado</span>
              ) : (
                <span className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs">Pendiente</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 border-t border-gray-100">
            <button className="p-2 rounded-md bg-gray-100"><QrCode className="w-5 h-5 text-gray-700" /></button>
            <button className="p-2 rounded-md bg-gray-100"><MessageCircle className="w-5 h-5 text-gray-700" /></button>
          </div>

          <hr className="my-4" />

          {!showQr ? (
            <>
              <h3 className="text-lg font-semibold mb-3">Recibo</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Combo De Hamburguesa</span>
                  <span>$ 15.000</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Té Hatsu</span>
                  <span>$ 5.000</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Chicles Trident</span>
                  <span>$ 2.500</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Descuentos</span>
                  <span>-$ 0</span>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between">
                <h4 className="text-lg font-bold">Total</h4>
                <div className="text-lg font-bold text-gray-900">$ {order.total.toLocaleString()}</div>
              </div>

              <div className="mt-6">
                <button onClick={handleContinue} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-full">Continuar</button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Codigo QR</h3>
                <button onClick={() => setShowQr(false)} className="text-gray-500"><X className="w-4 h-4" /></button>
              </div>

              <div className="flex items-center justify-center py-6">
                <div className="w-56 h-56 bg-white shadow-inner flex items-center justify-center rounded-md overflow-hidden">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(order.id)}`}
                    alt="QR code"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
