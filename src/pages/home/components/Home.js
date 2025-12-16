import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Heart, Star, Clock, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bannerImage from '@/assets/home/advertisement.png';
import Sidebar from '@/utils/Sidebar';
import { storesByCategoryData, productsByCategoryData, mockProductIds } from '../mock/homeMocks';
import { useCart } from '@/pages/cart/context/CartContext';
export default function Home() {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('cafeteria');
    const [activeTab, setActiveTab] = useState('populares');
    const [favorites, setFavorites] = useState(new Set([1])); // Inicialmente el producto 1 es favorito
    const stores = storesByCategoryData[activeCategory];
    const allProducts = productsByCategoryData[activeCategory];
    // Filtrar productos según la pestaña activa
    const products = activeTab === 'favoritos'
        ? allProducts.filter(product => favorites.has(product.id))
        : allProducts;
    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
                toast.info('Producto eliminado de favoritos', {
                    position: 'bottom-right',
                    autoClose: 2000
                });
            }
            else {
                newFavorites.add(productId);
                toast.success('Producto agregado a favoritos', {
                    position: 'bottom-right',
                    autoClose: 2000
                });
            }
            return newFavorites;
        });
    };
    const handleAddToCart = (productId, productName, price, image) => {
        addToCart({
            productId: productId.toString(),
            name: productName,
            description: '',
            price: price,
            imageUrl: image,
            maxQuantity: 99
        }, 1);
        toast.success(`${productName} agregado al carrito`, {
            position: 'bottom-right',
            autoClose: 2000
        });
    };
    const handleProductClick = (productId) => {
        // Navegar al detalle del producto
        const productSlug = mockProductIds[productId] || 'combo-hamburguesa-deluxe';
        navigate(`/product/${productSlug}`);
    };
    const handleStoreClick = (storeId) => {
        navigate(`/store/${storeId}`);
    };
    return (_jsxs("div", { className: "flex min-h-screen bg-[#F6F6F6]", children: [_jsx(Sidebar, {}), _jsx("div", { className: "flex-1 md:ml-20 p-4 sm:p-6 md:p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 mt-16 md:mt-0", children: [_jsx("button", { onClick: () => setActiveCategory('cafeteria'), className: `px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md transition-colors ${activeCategory === 'cafeteria'
                                        ? 'bg-[#FDDF65] text-[#262626]'
                                        : 'bg-white text-gray-600'}`, children: "Cafeter\u00EDa" }), _jsx("button", { onClick: () => setActiveCategory('papeleria'), className: `px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md transition-colors ${activeCategory === 'papeleria'
                                        ? 'bg-[#FDDF65] text-[#262626]'
                                        : 'bg-white text-gray-600'}`, children: "Papeler\u00EDa" })] }), _jsx("div", { className: "rounded-2xl sm:rounded-3xl md:rounded-[32px] mb-6 sm:mb-8 relative overflow-hidden shadow-lg", children: _jsx("img", { src: bannerImage, alt: "Banner ECIEXPRESS", className: "w-full h-auto object-cover" }) }), _jsxs("div", { className: "mb-8 sm:mb-10", children: [_jsx("h3", { className: "text-sm text-gray-500 mb-4 sm:mb-6 font-medium", children: "Tiendas" }), _jsx("div", { className: "hidden md:flex justify-center gap-8 lg:gap-12 overflow-x-auto pb-4 -mx-4 px-4", children: stores.map((store) => (_jsxs("button", { onClick: () => handleStoreClick(store.id), className: "flex flex-col items-center gap-3 group flex-shrink-0", children: [_jsx("div", { className: "w-20 h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full shadow-md group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center", children: store.logo && (_jsx("img", { src: store.logo, alt: store.name, className: "w-full h-full object-cover" })) }), _jsx("span", { className: "text-sm text-[#262626] font-semibold", children: store.name })] }, store.id))) }), _jsx("div", { className: "md:hidden overflow-x-auto pb-4 -mx-4 px-4", children: _jsx("div", { className: "flex gap-6 sm:gap-8 min-w-max", children: stores.map((store) => (_jsxs("button", { onClick: () => handleStoreClick(store.id), className: "flex flex-col items-center gap-2 group", children: [_jsx("div", { className: "w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full shadow-md group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center", children: store.logo && (_jsx("img", { src: store.logo, alt: store.name, className: "w-full h-full object-cover" })) }), _jsx("span", { className: "text-sm text-[#262626] font-semibold whitespace-nowrap", children: store.name })] }, store.id))) }) })] }), _jsx("div", { className: "mb-6 sm:mb-8", children: _jsxs("div", { className: "flex gap-6 sm:gap-8 border-b-2 border-gray-200", children: [_jsxs("button", { onClick: () => setActiveTab('populares'), className: `pb-2 sm:pb-3 px-1 font-bold text-sm sm:text-base relative transition-colors ${activeTab === 'populares' ? 'text-[#FDDF65]' : 'text-gray-400'}`, children: ["Populares", activeTab === 'populares' && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-[#FDDF65]" }))] }), _jsxs("button", { onClick: () => setActiveTab('favoritos'), className: `pb-2 sm:pb-3 px-1 font-bold text-sm sm:text-base relative transition-colors ${activeTab === 'favoritos' ? 'text-[#FDDF65]' : 'text-gray-400'}`, children: ["Favoritos", activeTab === 'favoritos' && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-[#FDDF65]" }))] })] }) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", children: products.map((product) => (_jsxs("div", { className: "bg-white rounded-[20px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer", onClick: () => handleProductClick(product.id), children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-full h-48 sm:h-56 bg-gray-300", children: product.image && (_jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover" })) }), _jsx("button", { onClick: (e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(product.id);
                                                }, className: "absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform", children: _jsx(Heart, { className: `w-5 h-5 sm:w-6 sm:h-6 ${favorites.has(product.id)
                                                        ? 'fill-[#FDDF65] text-[#FDDF65]'
                                                        : 'text-gray-400'}` }) })] }), _jsxs("div", { className: "p-4 sm:p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-3 sm:mb-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-bold text-[#262626] text-base sm:text-lg mb-1 sm:mb-2", children: product.name }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 leading-relaxed", children: product.description })] }), _jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 bg-gray-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl ml-3 sm:ml-4 flex-shrink-0", children: [_jsx(Star, { className: "w-4 h-4 sm:w-5 sm:h-5 fill-[#FDDF65] text-[#FDDF65]" }), _jsx("span", { className: "text-sm sm:text-base font-bold text-[#262626]", children: product.rating })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-xl sm:text-2xl font-bold text-[#262626] mb-1 sm:mb-2", children: ["$ ", product.price.toLocaleString('es-CO')] }), product.time && (_jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500", children: [_jsx(Clock, { className: "w-4 h-4 sm:w-5 sm:h-5 text-[#5AC7E1]" }), _jsxs("span", { className: "font-semibold", children: [product.time, " min"] })] }))] }), _jsx("button", { onClick: (e) => {
                                                            e.stopPropagation();
                                                            handleAddToCart(product.id, product.name, product.price, product.image);
                                                        }, className: "w-12 h-12 sm:w-14 sm:h-14 bg-[#5AC7E1] hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-colors shadow-md", children: _jsx(Plus, { className: "w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3]" }) })] })] })] }, product.id))) })] }) })] }));
}
