import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import { getProductById, getRelatedProducts } from '../mock/productMock';

/**
 * Página principal de detalle de producto
 * Layout responsive con imagen a la izquierda e info a la derecha en desktop
 * Stack vertical en mobile
 */
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Obtener producto desde mock data
  const product = id ? getProductById(id) : undefined;
  const relatedProducts = id ? getRelatedProducts(id) : [];

  // Si no existe el producto, mostrar mensaje
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#262626] mb-4">
            Producto no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            El producto que buscas no existe o ha sido removido.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#5AC7E1] text-white rounded-xl font-medium hover:bg-[#4ab5cf] transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (quantity: number, selectedOptions: Record<string, string>) => {
    console.log('Agregado al carrito:', {
      productId: product.id,
      quantity,
      selectedOptions,
      totalPrice: product.price * quantity
    });
    
    // Aquí se integraría con el sistema de carrito real
    // Por ahora solo mostramos la confirmación
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

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[#5AC7E1] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#5AC7E1] transition-colors rounded-lg hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Compartir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid principal: Imagen + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Columna izquierda: Imagen */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <ProductImage
              imageUrl={product.imageUrl}
              productName={product.name}
            />
          </div>

          {/* Columna derecha: Información */}
          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}