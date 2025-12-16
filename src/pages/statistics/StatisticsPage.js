import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from '@/pages/login/hooks/useAuth';
import SellerStats from './components/SellerStats';
import AdminStats from './components/AdminStats';
export default function StatisticsPage() {
    const { user } = useAuth();
    // Determinar qué vista mostrar según el rol del usuario
    if (user?.role === 'admin') {
        return _jsx(AdminStats, {});
    }
    if (user?.role === 'seller') {
        return _jsx(SellerStats, {});
    }
    // Fallback: si no es admin ni seller, mostrar vista de seller por defecto
    return _jsx(SellerStats, {});
}
