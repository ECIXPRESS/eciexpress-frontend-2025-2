import { useState } from 'react';
import { 
  User, 
  Plus, 
  LayoutDashboard, 
  ShoppingCart, 
  ClipboardList, 
  MessageCircle, 
  LogOut,
  Bell,
  Menu
} from 'lucide-react';
import { useAuth } from '@/pages/login/hooks/useAuth';
import { useNavigate, NavLink } from 'react-router-dom';

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Catálogo" },
  { to: "/cart", icon: ShoppingCart, label: "Carrito" },
  { to: "/orders", icon: ClipboardList, label: "Pedidos" },
  { to: "/chat", icon: MessageCircle, label: "Chat" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userBalance = user?.balance || 0;
  const shouldShowExpanded = isMobileOpen || isExpanded;

  return (
    <>
      {/* Botón hamburguesa para mobile */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`md:hidden fixed top-4 left-4 z-[100] w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform ${isMobileOpen ? 'hidden' : ''}`}
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[90]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 bg-white shadow-lg transition-all duration-300 z-[95]
          md:w-20 ${shouldShowExpanded ? 'w-56 md:w-56' : 'w-20'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col h-full">
          {/* Header - Usuario y Notificaciones */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <button className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <User className="w-6 h-6 text-gray-600" />
            </button>
            
            {shouldShowExpanded && (
              <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Balance Card - cuando está expandido */}
          {shouldShowExpanded && (
            <div className="px-4 py-4 mb-4">
              <div className="bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] rounded-2xl p-4 shadow-lg relative overflow-hidden">
                {/* Decoraciones de triángulos */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 w-16 h-16 border-4 border-white transform rotate-45"></div>
                  <div className="absolute bottom-2 right-8 w-8 h-8 border-2 border-white transform -rotate-12"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">Balance:</span>
                    <button 
                      onClick={() => navigate('/wallet')}
                      className="w-8 h-8 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    $ {userBalance.toLocaleString('es-CO')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón de agregar cuando está colapsado */}
          {!shouldShowExpanded && (
            <div className="flex items-center justify-center py-4">
              <button 
                onClick={() => navigate('/wallet')}
                className="w-12 h-12 rounded-full bg-[#FDDF65] hover:bg-[#f5d74e] flex items-center justify-center transition-colors shadow-md"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {/* Navegación */}
          <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive ? "bg-yellow-100" : "hover:bg-gray-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-6 h-6 flex-shrink-0 ${
                        isActive ? "text-yellow-600" : "text-gray-600"
                      }`} />
                      {shouldShowExpanded && (
                        <span className={`text-sm font-medium ${
                          isActive ? "text-yellow-600" : "text-gray-700"
                        }`}>
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Botón de Salir */}
          <div className="border-t border-gray-100 p-2">
            <button 
              onClick={() => {
                logout();
                setIsMobileOpen(false);
              }}
              className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-6 h-6 text-gray-600 flex-shrink-0" />
              {shouldShowExpanded && <span className="text-sm font-medium text-gray-700">Salir</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}