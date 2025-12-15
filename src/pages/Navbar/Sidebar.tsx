import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {
    User,
    LayoutDashboard,
    ShoppingCart,
    ClipboardList,
    MessageCircle,
    LogOut,
    Bell,
    BarChart3,
    Users,
    Tag,
    CirclePlus,
} from 'lucide-react';
import {BalanceCard} from "./components/BalanceCard";
import { useAuth } from '@/lib/context/AuthProvider';

interface MenuItem {
    icon: typeof LayoutDashboard;
    label: string;
    path: string;
}

interface SidebarProps {
    isExpanded: boolean;
    onToggleExpand: (isExpanded: boolean) => void;
}

export default function Sidebar({isExpanded, onToggleExpand}: SidebarProps) {
    const { user, logout } = useAuth(); // Usa tu hook real de autenticación
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const routeConfig: Record<string, MenuItem[]> = {
        user: [
            {icon: LayoutDashboard, label: 'Catálogo', path: '/home'},
            {icon: ShoppingCart, label: 'Carrito', path: '/shoppingCart'},
            {icon: ClipboardList, label: 'Pedidos', path: '/orders'},
            {icon: MessageCircle, label: 'Chat', path: '/chat'},
        ],
        seller: [
            {icon: ClipboardList, label: 'Pedidos', path: '/orders'},
            {icon: LayoutDashboard, label: 'Catálogo', path: '/home'},
            {icon: BarChart3, label: 'Estadísticas', path: '/stats'},
            {icon: MessageCircle, label: 'Chat', path: '/chat'},
        ],
        admin: [
            {icon: LayoutDashboard, label: 'Tablero', path: '/home'},
            {icon: Users, label: 'Vendedores', path: '/sellers'},
            {icon: MessageCircle, label: 'Chat', path: '/chat'},
            {icon: Tag, label: 'Promociones', path: '/promotions'},
            {icon: BarChart3, label: 'Estadísticas', path: '/stats'},
        ],
    };

    const userRole = user?.role || 'user';
    const menuItems = routeConfig[userRole] || routeConfig.user;
    const showBalance = userRole === 'user';
    const userBalance = user?.balance || 0;

    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const handleProfileClick = () => {
        navigate('/user-settings');
    };

    const handleAddBalance = () => {
        // Navegar o abrir modal para agregar saldo
        navigate('/add-balance'); // O implementa un modal
    };

    return (
        <>
            {/* Sidebar desktop */}
            <div
                className={`
                    hidden md:block h-full
                    inset-y-0 left-0 bg-gradient-to-b from-white to-gray-50 shadow-xl transition-all duration-300 z-40
                    border-r border-gray-200
                    ${isExpanded ? 'w-72' : 'w-20'}
                `}
                onMouseEnter={() => onToggleExpand(true)}
                onMouseLeave={() => onToggleExpand(false)}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <button
                            onClick={handleProfileClick}
                            className={`
                                flex items-center justify-center transition-all duration-300
                                ${isExpanded ? 'w-12 h-12' : 'w-12 h-12'}
                                rounded-full bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] 
                                hover:from-[#f5d74e] hover:to-[#FDDF65] 
                                shadow-md hover:shadow-lg
                            `}
                        >
                            <User className="w-6 h-6 text-gray-800"/>
                        </button>

                        {isExpanded && (
                            <button
                                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors relative">
                                <Bell className="w-5 h-5 text-gray-600"/>
                                <span
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                                    3
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Balance Card solo cuando está expandido y es usuario */}
                    {isExpanded && showBalance && (
                        <div className="p-4">
                            <BalanceCard />
                        </div>
                    )}

                    {/* Espaciador si no hay balance card */}
                    {isExpanded && !showBalance && (
                        <div className="py-4"></div>
                    )}

                    {/* Botón de acción rápido cuando está colapsado (solo para usuarios) */}
                    {!isExpanded && showBalance && (
                        <div className="flex items-center justify-center py-4">
                            <button
                                onClick={handleAddBalance}
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffcc4d] to-[#fddf65] hover:from-[#f5d74e] hover:to-[#FDDF65] flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <CirclePlus className="w-6 h-6 text-white"/>
                            </button>
                        </div>
                    )}

                    {/* Menú de navegación */}
                    <nav className="flex-1 px-3 overflow-y-auto">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            const isSelected = location.pathname.startsWith(item.path);

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleMenuItemClick(item.path)}
                                    className={`
                                        w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200 mb-2
                                        ${isSelected
                                        ? 'bg-gradient-to-r from-[#ffcc4d] to-[#fddf65] text-gray-800 shadow-md'
                                        : 'hover:bg-gray-100 hover:shadow-sm'
                                    }
                                    `}
                                >
                                    <Icon
                                        className={`w-6 h-6 flex-shrink-0 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}/>
                                    {isExpanded && (
                                        <span
                                            className={`text-md font-medium ${isSelected ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
                                            {item.label}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="border-t border-gray-100 p-3">
                        <button
                            onClick={handleLogout}
                            className="w-full p-3 flex items-center gap-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-sm"
                        >
                            <LogOut className="w-6 h-6 text-gray-600 flex-shrink-0"/>
                            {isExpanded && <span className="text-sm font-medium text-gray-700">Salir</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar móvil */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
                <div className="flex items-center justify-around px-2 py-2">
                    {/* Botón de perfil */}
                    <button
                        onClick={handleProfileClick}
                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                            location.pathname === '/user-settings' ? 'transform -translate-y-1' : ''
                        }`}
                    >
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${location.pathname === '/user-settings'
                            ? 'bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] shadow-md'
                            : 'bg-gray-100'
                        }
                        `}>
                            <User className={`w-5 h-5 ${location.pathname === '/user-settings' ? 'text-gray-800' : 'text-gray-600'}`}/>
                        </div>
                        <span
                            className={`text-xs font-medium ${location.pathname === '/user-settings' ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                            Perfil
                        </span>
                    </button>

                    {/* Items del menú */}
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isSelected = location.pathname.startsWith(item.path);

                        return (
                            <button
                                key={index}
                                onClick={() => handleMenuItemClick(item.path)}
                                className={`
                                    flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[60px]
                                    ${isSelected ? 'transform -translate-y-1' : ''}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center
                                    ${isSelected
                                    ? 'bg-gradient-to-r from-[#fddf65] to-[#ffcc4d] shadow-md'
                                    : 'hover:bg-gray-100'
                                }
                                `}>
                                    <Icon className={`w-5 h-5 ${isSelected ? 'text-gray-800' : 'text-gray-600'}`}/>
                                </div>
                                <span
                                    className={`text-xs font-medium ${isSelected ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
