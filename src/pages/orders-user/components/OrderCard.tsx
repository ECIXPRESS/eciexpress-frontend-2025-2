import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export const OrderCard: React.FC<{ order: any; onDetails?: () => void }> = ({ order, onDetails }) => {
  const statusBadge = () => {
    switch (order.status) {
      case 'entregado':
        return <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Entregado</div>;
      case 'preparacion':
        return <div className="absolute top-3 right-3 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2"><Clock className="w-4 h-4"/> En proceso</div>;
      case 'cancelado':
        return <div className="absolute top-3 right-3 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2"><XCircle className="w-4 h-4"/> Cancelado</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
      <div className="h-44 w-full overflow-hidden rounded-t-2xl">
        <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
      </div>

      {statusBadge()}

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900">{order.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 my-2">
          <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>{order.store}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{order.desc}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-xl font-bold text-yellow-400">${order.total.ToString ? order.total.ToString() : order.total.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-2xl bg-red-300 hover:bg-red-400 text-red-700 flex items-center justify-center shadow-md transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="7" strokeWidth="2" />
                <line x1="5" y1="19" x2="19" y2="5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button onClick={onDetails} className="px-4 py-2 rounded-lg bg-[#5AC7E1] hover:bg-[#4ab5cf] text-white">Detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
