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
  BarChart3,
  Users,
  Tag,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/pages/login/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  icon: typeof LayoutDashboard;
  label: string;
  path?: string;
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuConfig: Record<string, MenuItem[]> = {
    user: [
      { icon: LayoutDashboard, label: 'Catálogo', path: '/' },
      { icon: ShoppingCart, label: 'Carrito' },
      { icon: ClipboardList, label: 'Pedidos' },
      { icon: MessageCircle, label: 'Chat' },
    ],
    seller: [
      { icon: ClipboardList, label: 'Pedidos', path: '/orders' },
      { icon: LayoutDashboard, label: 'Catálogo', path: '/catalog' },
      { icon: BarChart3, label: 'Estadísticas', path: '/statistics' },
      { icon: MessageCircle, label: 'Chat', path: '/chat' },
    ],
    admin: [
      { icon: LayoutDashboard, label: 'Tablero', path: '/dashboard' },
      { icon: Users, label: 'Vendedores', path: '/sellers' },
      { icon: MessageCircle, label: 'Chat', path: '/chat' },
      { icon: Tag, label: 'Promociones', path: '/promotions' },
      { icon: BarChart3, label: 'Estadísticas', path: '/statistics' },
    ],
  };

  const userRole = user?.role || 'user';
  const menuItems = menuConfig[userRole] || menuConfig.user;
  const showBalance = userRole === 'user';
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

          {/* Botón de agregar (solo cuando está colapsado EN DESKTOP) */}
          {!shouldShowExpanded && (
            <div className="flex items-center justify-center py-4">
              <button className="w-12 h-12 rounded-full bg-[#FDDF65] hover:bg-[#f5d74e] flex items-center justify-center transition-colors shadow-md">
                <Plus className="w-6 h-6 text-[#262626]" />
              </button>
            </div>
          )}

          {/* Balance Card - Solo para usuarios cuando está expandido */}
          {shouldShowExpanded && showBalance && (
            <div className="px-4 py-4 mb-4">
              <div className="bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-medium">Balance:</span>
                  <button className="w-8 h-8 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4 text-gray-800" />
                  </button>
                </div>
                <div className="text-2xl font-bold text-[#262626]">
                  $ {userBalance.toLocaleString('es-CO')}
                </div>
              </div>
            </div>
          )}

          {shouldShowExpanded && !showBalance && (
            <div className="py-4"></div>
          )}

          {/* Navegación dinámica según rol */}
          <nav className="flex-1 px-2 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button 
                  key={index}
                  className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors mb-1"
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    }
                    setIsMobileOpen(false);
                  }}
                >
                  <Icon className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  {shouldShowExpanded && <span className="text-sm font-medium text-gray-700">{item.label}</span>}
                </button>
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