import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import Sidebar from '@/utils/Sidebar';
import StoreHeader from './components/StoreHeader';
import StoreSchedules from './components/StoreSchedules';
import StoreLocationInfo from './components/StoreLocationInfo';
import ProductCard from './components/ProductCard';
import { storesMockData } from './mock/storeMocks';
import { mockProductIds } from '@/pages/home/mock/homeMocks';
export default function StorePage() {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const store = storeId ? storesMockData[parseInt(storeId)] : null;
    if (!store) {
        return (_jsxs("div", { className: "flex min-h-screen bg-[#F6F6F6]", children: [_jsx(Sidebar, {}), _jsx("div", { className: "flex-1 md:ml-20 p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), _jsx("span", { children: "Volver" })] }), _jsx("div", { className: "text-center py-20", children: _jsx("h2", { className: "text-2xl font-bold text-gray-600", children: "Tienda no encontrada" }) })] }) })] }));
    }
    const handleProductClick = (productId) => {
        const productSlug = mockProductIds[productId] || 'combo-hamburguesa-deluxe';
        navigate(`/product/${productSlug}`);
    };
    return (_jsxs("div", { className: "flex min-h-screen bg-[#F6F6F6]", children: [_jsx(Sidebar, {}), _jsx("div", { className: "flex-1 md:ml-20 p-4 sm:p-6 md:p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto mt-16 md:mt-0", children: [_jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), _jsx("span", { className: "font-semibold", children: "Volver" })] }), _jsx(StoreHeader, { name: store.name, rating: store.rating, image: store.image }), _jsx(StoreSchedules, { schedules: store.schedules }), _jsx(StoreLocationInfo, { location: store.location }), _jsxs("div", { className: "mt-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-[#262626]", children: "Productos" }), _jsxs("button", { className: "flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors", children: [_jsx("span", { className: "text-sm font-medium", children: "Filtrar" }), _jsx(Filter, { className: "w-5 h-5" })] })] }), store.products.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: store.products.map((product) => (_jsx(ProductCard, { product: product, onProductClick: handleProductClick }, product.id))) })) : (_jsx("div", { className: "text-center py-12 bg-white rounded-2xl shadow-sm", children: _jsx("p", { className: "text-gray-500", children: "No hay productos disponibles en esta tienda" }) }))] })] }) })] }));
}
