import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { User, Plus, LayoutDashboard, ShoppingCart, ClipboardList, MessageCircle, LogOut, Bell, BarChart3, Users, Tag, Menu } from 'lucide-react';
import { useAuth } from '@/pages/login/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/lib/context/WalletProvider";
export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const { walletData, profileImage } = useWallet();
    const navigate = useNavigate();
    const menuConfig = {
        user: [
            { icon: LayoutDashboard, label: 'Catálogo', path: '/' },
            { icon: ShoppingCart, label: 'Carrito', path: '/cart' },
            { icon: ClipboardList, label: 'Pedidos', path: '/orders' },
            { icon: MessageCircle, label: 'Chat', path: '/chat' },
        ],
        seller: [
            { icon: ClipboardList, label: 'Pedidos', path: '/orders-seller' },
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
    const userBalance = walletData.saldo;
    const shouldShowExpanded = isMobileOpen || isExpanded;
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsMobileOpen(!isMobileOpen), className: `md:hidden fixed top-4 left-4 z-[100] w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform ${isMobileOpen ? 'hidden' : ''}`, children: _jsx(Menu, { className: "w-6 h-6 text-gray-600" }) }), isMobileOpen && (_jsx("div", { className: "md:hidden fixed inset-0 bg-black/50 z-[90]", onClick: () => setIsMobileOpen(false) })), _jsx("div", { className: `
          fixed inset-y-0 left-0 bg-white shadow-lg transition-all duration-300 z-[95]
          md:w-20 ${shouldShowExpanded ? 'w-56 md:w-56' : 'w-20'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `, onMouseEnter: () => setIsExpanded(true), onMouseLeave: () => setIsExpanded(false), children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-100", children: [_jsx("button", { onClick: () => navigate('/wallet'), className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center hover:bg-gray-300 transition-colors", children: profileImage ? (_jsx("img", { src: profileImage, alt: "Perfil", className: "w-full h-full object-cover" })) : (_jsx(User, { className: "w-6 h-6 text-gray-600" })) }), shouldShowExpanded && (_jsx("button", { className: "w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors", children: _jsx(Bell, { className: "w-5 h-5 text-gray-600" }) }))] }), !shouldShowExpanded && showBalance && (_jsx("div", { className: "flex items-center justify-center py-4", children: _jsx("button", { onClick: () => navigate('/wallet'), className: "w-12 h-12 rounded-full bg-[#FDDF65] hover:bg-[#f5d74e] flex items-center justify-center transition-colors shadow-md", children: _jsx(Plus, { className: "w-6 h-6 text-white" }) }) })), shouldShowExpanded && showBalance && (_jsx("div", { className: "px-4 py-4 mb-4", children: _jsxs("div", { className: "bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] rounded-2xl p-4 shadow-lg relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 opacity-10", children: [_jsx("div", { className: "absolute top-2 right-2 w-16 h-16 border-4 border-white transform rotate-45" }), _jsx("div", { className: "absolute bottom-2 right-8 w-8 h-8 border-2 border-white transform -rotate-12" })] }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm text-white font-medium", children: "Balance:" }), _jsx("button", { onClick: () => {
                                                            navigate('/wallet');
                                                            setIsMobileOpen(false);
                                                        }, className: "w-8 h-8 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors", children: _jsx(Plus, { className: "w-4 h-4 text-white" }) })] }), _jsxs("div", { className: "text-2xl font-bold text-white", children: ["$ ", userBalance.toLocaleString('es-CO')] })] })] }) })), shouldShowExpanded && !showBalance && (_jsx("div", { className: "py-4" })), _jsx("nav", { className: "flex-1 px-2 overflow-y-auto", children: menuItems.map((item, index) => {
                                const Icon = item.icon;
                                return (_jsxs("button", { className: "w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors mb-1", onClick: () => {
                                        if (item.path) {
                                            navigate(item.path);
                                        }
                                        setIsMobileOpen(false);
                                    }, children: [_jsx(Icon, { className: "w-6 h-6 text-gray-600 flex-shrink-0" }), shouldShowExpanded &&
                                            _jsx("span", { className: "text-sm font-medium text-gray-700", children: item.label })] }, index));
                            }) }), _jsx("div", { className: "border-t border-gray-100 p-2", children: _jsxs("button", { onClick: () => {
                                    logout();
                                    setIsMobileOpen(false);
                                }, className: "w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors", children: [_jsx(LogOut, { className: "w-6 h-6 text-gray-600 flex-shrink-0" }), shouldShowExpanded && _jsx("span", { className: "text-sm font-medium text-gray-700", children: "Salir" })] }) })] }) })] }));
}
