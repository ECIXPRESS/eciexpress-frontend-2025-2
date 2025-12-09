import { useAuth } from '@/pages/login/hooks/useAuth';
import SellerStats from './components/SellerStats';
import AdminStats from './components/AdminStats';

export default function StatisticsPage() {
  const { user } = useAuth();

  // Determinar qué vista mostrar según el rol del usuario
  if (user?.role === 'admin') {
    return <AdminStats />;
  }

  if (user?.role === 'seller') {
    return <SellerStats />;
  }

  // Fallback: si no es admin ni seller, mostrar vista de seller por defecto
  return <SellerStats />;
}