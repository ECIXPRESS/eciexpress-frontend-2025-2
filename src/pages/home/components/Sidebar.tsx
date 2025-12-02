import { useState } from 'react';
import { 
  User, 
  Plus, 
  LayoutDashboard, 
  ShoppingCart, 
  ClipboardList, 
  MessageCircle, 
  LogOut,
  Bell
} from 'lucide-react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 z-50 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header - Usuario y Notificaciones */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
            <User className="w-6 h-6 text-gray-600" />
          </button>
          
          {isExpanded && (
            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Botón de agregar */}
        <div className="flex items-center justify-center py-4">
          <button className="w-12 h-12 rounded-full bg-[#FDDF65] hover:bg-[#f5d74e] flex items-center justify-center transition-colors shadow-md">
            <Plus className="w-6 h-6 text-[#262626]" />
          </button>
        </div>

        {/* Balance Card - Solo cuando está expandido */}
        {isExpanded && (
          <div className="px-4 mb-4">
            <div className="bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700 font-medium">Balance:</span>
                <button className="w-8 h-8 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4 text-gray-800" />
                </button>
              </div>
              <div className="text-2xl font-bold text-[#262626]">$ 1.200</div>
            </div>
          </div>
        )}

        {/* Navegación */}
        <nav className="flex-1 px-2">
          <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors mb-1">
            <LayoutDashboard className="w-6 h-6 text-gray-600 flex-shrink-0" />
            {isExpanded && <span className="text-sm font-medium text-gray-700">Catálogo</span>}
          </button>

          <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors mb-1">
            <ShoppingCart className="w-6 h-6 text-gray-600 flex-shrink-0" />
            {isExpanded && <span className="text-sm font-medium text-gray-700">Carrito</span>}
          </button>

          <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors mb-1">
            <ClipboardList className="w-6 h-6 text-gray-600 flex-shrink-0" />
            {isExpanded && <span className="text-sm font-medium text-gray-700">Pedidos</span>}
          </button>

          <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors mb-1">
            <MessageCircle className="w-6 h-6 text-gray-600 flex-shrink-0" />
            {isExpanded && <span className="text-sm font-medium text-gray-700">Chat</span>}
          </button>
        </nav>

        {/* Botón de Salir */}
        <div className="border-t border-gray-100 p-2">
          <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors">
            <LogOut className="w-6 h-6 text-gray-600 flex-shrink-0" />
            {isExpanded && <span className="text-sm font-medium text-gray-700">Salir</span>}
          </button>
        </div>
      </div>
    </div>
  );
}