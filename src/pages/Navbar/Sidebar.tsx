import {useState, useEffect} from 'react';
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
    Tag, CirclePlus,
} from 'lucide-react';
import { BalanceCard } from "./components/BalanceCard";

const useAuth = () => ({
    user: {
        role: 'user',
        balance: 150000
    },
    logout: () => console.log('Logout')
});

interface MenuItem {
    icon: typeof LayoutDashboard;
    label: string;
    path?: string;
}

interface SidebarProps {
    isExpanded: boolean;
    onToggleExpand: (isExpanded: boolean) => void;
}

export default function Sidebar({isExpanded, onToggleExpand}: SidebarProps) {
    const {user, logout} = useAuth();
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const menuConfig: Record<string, MenuItem[]> = {
        user: [
            {icon: LayoutDashboard, label: 'Catálogo'},
            {icon: ShoppingCart, label: 'Carrito'},
            {icon: ClipboardList, label: 'Pedidos'},
            {icon: MessageCircle, label: 'Chat'},
        ],
        seller: [
            {icon: ClipboardList, label: 'Pedidos'},
            {icon: LayoutDashboard, label: 'Catálogo'},
            {icon: BarChart3, label: 'Estadísticas'},
            {icon: MessageCircle, label: 'Chat'},
        ],
        admin: [
            {icon: LayoutDashboard, label: 'Tablero'},
            {icon: Users, label: 'Vendedores'},
            {icon: MessageCircle, label: 'Chat'},
            {icon: Tag, label: 'Promociones'},
            {icon: BarChart3, label: 'Estadísticas'},
        ],
    };

    const userRole = user?.role || 'user';
    const menuItems = menuConfig[userRole] || menuConfig.user;
    const showBalance = userRole === 'user';
    const userBalance = user?.balance || 0;

    const handleMenuItemClick = (index: number) => {
        setSelectedItem(index);
    };

    return (
        <>
            <div
                className={`
                    hidden md:block h-full
                    inset-y-0 left-0 bg-gradient-to-b from-white to-gray-50 shadow-xl transition-all duration-300 z-40
                    border-r border-gray-200
                    ${isExpanded ? 'w-72' : 'w-20'} /* Aumenté el ancho a w-72 para mejor ajuste */
                `}
                onMouseEnter={() => onToggleExpand(true)}
                onMouseLeave={() => onToggleExpand(false)}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <button
                            className={`
                                flex items-center justify-center transition-all duration-300
                                ${isExpanded ? 'w-12 h-12' : 'w-12 h-12'}
                                rounded-full bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] hover:from-[#f5d74e] hover:to-[#FDDF65] 
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
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center">
                                    3
                                </span>
                            </button>
                        )}
                    </div>

                    {!isExpanded && (
                        <div className="flex items-center justify-center py-4">
                            <button
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffcc4d] to-[#fddf65] hover:from-[#f5d74e] hover:to-[#FDDF65] flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                <CirclePlus className="w-6 h-6 text-white"/>
                            </button>
                        </div>
                    )}

                    {/* Sección del balance con el nuevo componente */}
                    {isExpanded && showBalance && (
                        <div className="px-4 py-4 mb-4">
                            <BalanceCard />
                        </div>
                    )}

                    {isExpanded && !showBalance && (
                        <div className="py-4"></div>
                    )}

                    <nav className="flex-1 px-3 overflow-y-auto">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            const isSelected = selectedItem === index;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleMenuItemClick(index)}
                                    className={`
                                        w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200 mb-2
                                        ${isSelected && isMobile
                                        ? 'bg-gradient-to-r from-[#ffcc4d] to-[#fddf65] text-white shadow-md rounded-full'
                                        : 'hover:bg-gray-100 hover:shadow-sm'
                                    }
                                    `}
                                >
                                    <Icon
                                        className={`w-6 h-6 flex-shrink-0 ${isSelected ? 'text-neutral-800' : 'text-gray-500'}`}/>
                                    {isExpanded && (
                                        <span
                                            className={`text-md font-medium ${isSelected ? 'text-neutral-800 font-semibold' : 'text-gray-500'}`}>
                                            {item.label}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="border-t border-gray-100 p-3">
                        <button
                            onClick={logout}
                            className="w-full p-3 flex items-center gap-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-sm"
                        >
                            <LogOut className="w-6 h-6 text-gray-600 flex-shrink-0"/>
                            {isExpanded && <span className="text-sm font-medium text-gray-700">Salir</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Versión móvil - sin cambios */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
                <div className="flex items-center justify-around px-2 py-2">
                    <button
                        onClick={() => handleMenuItemClick(-1)}
                        className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[60px]"
                    >
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${selectedItem === -1
                            ? 'bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] shadow-md rounded-full'
                            : 'bg-gray-100'
                        }
                        `}>
                            <User className={`w-5 h-5 ${selectedItem === -1 ? 'text-gray-800' : 'text-gray-600'}`}/>
                        </div>
                        <span
                            className={`text-xs font-medium ${selectedItem === -1 ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                            Perfil
                        </span>
                    </button>

                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isSelected = selectedItem === index;

                        return (
                            <button
                                key={index}
                                onClick={() => handleMenuItemClick(index)}
                                className={`
                                    flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[60px]
                                    ${isSelected ? 'transform -translate-y-1 rounded-full' : ''}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center
                                    ${isSelected
                                    ? 'bg-gradient-to-r from-[#fddf65] to-[#ffcc4d] shadow-md rounded-full'
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