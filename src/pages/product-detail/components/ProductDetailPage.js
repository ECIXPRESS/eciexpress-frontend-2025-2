import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import { getProductById, getRelatedProducts } from '../mock/productMock';
import { useCart } from '../../cart/context/CartContext';
/**
 * Página principal de detalle de producto
 * Layout responsive con imagen a la izquierda e info a la derecha en desktop
 * Stack vertical en mobile
 */
export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    // Obtener producto desde mock data
    const product = id ? getProductById(id) : undefined;
    const relatedProducts = id ? getRelatedProducts(id) : [];
    // Si no existe el producto, mostrar mensaje
    if (!product) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[#262626] mb-4", children: "Producto no encontrado" }), _jsx("p", { className: "text-gray-600 mb-6", children: "El producto que buscas no existe o ha sido removido." }), _jsx("button", { onClick: () => navigate('/'), className: "px-6 py-3 bg-[#5AC7E1] text-white rounded-xl font-medium hover:bg-[#4ab5cf] transition-colors", children: "Volver al inicio" })] }) }));
    }
    const handleAddToCart = (quantity, selectedOptions) => {
        addToCart({
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            maxQuantity: product.stock
        }, quantity);
    };
    const handleShare = () => {
        // Copiar URL al portapapeles
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast.success('Enlace copiado al portapapeles', {
            position: 'bottom-right',
            autoClose: 2000
        });
    };
    const handleGoBack = () => {
        navigate(-1);
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#F6F6F6]", children: [_jsx("div", { className: "bg-white shadow-sm sticky top-0 z-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs("button", { onClick: handleGoBack, className: "flex items-center gap-2 text-gray-600 hover:text-[#5AC7E1] transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: "Volver" })] }), _jsxs("button", { onClick: handleShare, className: "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#5AC7E1] transition-colors rounded-lg hover:bg-gray-50", children: [_jsx(Share2, { className: "w-5 h-5" }), _jsx("span", { className: "hidden sm:inline font-medium", children: "Compartir" })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [_jsx("div", { className: "bg-white rounded-3xl shadow-sm overflow-hidden", children: _jsx(ProductImage, { imageUrl: product.imageUrl, productName: product.name }) }), _jsx("div", { className: "bg-white rounded-3xl shadow-sm p-6 md:p-8", children: _jsx(ProductInfo, { product: product, onAddToCart: handleAddToCart }) })] }), _jsx("div", { className: "bg-white rounded-3xl shadow-sm p-6 md:p-8", children: _jsx(RelatedProducts, { products: relatedProducts }) })] })] }));
}
