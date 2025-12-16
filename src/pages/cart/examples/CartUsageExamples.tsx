/**
 * Ejemplo de uso del carrito desde cualquier componente
 * Copia este código en tus componentes Home, Store, ProductDetail, etc.
 */

import { useCart } from '@/pages/cart/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

// ============================================
// EJEMPLO 1: Botón simple para agregar al carrito
// ============================================

export function EjemploBotonSimple() {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: 'producto-123',           // ID único del producto
      name: 'Hamburguesa Clásica',
      description: 'Hamburguesa con queso y papas',
      price: 15000,
      imageUrl: 'url-de-la-imagen.jpg',
      maxQuantity: 10
    }, 1); // Cantidad (opcional, default es 1)

    toast.success('Producto agregado al carrito');
  };

  return (
    <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">
      <ShoppingCart className="w-5 h-5" />
      Agregar al carrito
    </button>
  );
}

// ============================================
// EJEMPLO 2: Card de producto con botón
// ============================================

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

export function ProductCardExample({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      maxQuantity: 99
    });
    
    toast.success(`${product.name} agregado al carrito`, {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  return (
    <div className="border rounded-lg p-4">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-bold">${product.price.toLocaleString()}</span>
        <button 
          onClick={handleAdd}
          className="bg-[#5AC7E1] text-white px-4 py-2 rounded-lg hover:bg-[#4ab5cf]"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

// ============================================
// EJEMPLO 3: Página completa con productos
// ============================================

export function ExampleProductPage() {
  const { addToCart, cart } = useCart();

  const productos = [
    { id: '1', name: 'Pizza', description: 'Pizza de queso', price: 25000, imageUrl: '/pizza.jpg' },
    { id: '2', name: 'Hamburguesa', description: 'Hamburguesa clásica', price: 15000, imageUrl: '/burger.jpg' },
  ];

  const handleAddProduct = (product: typeof productos[0]) => {
    addToCart({
      productId: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      maxQuantity: 20
    });
    
    toast.success('Agregado al carrito');
  };

  return (
    <div>
      <h1>Productos disponibles</h1>
      <p>Items en carrito: {cart.items.length}</p>
      
      <div className="grid grid-cols-3 gap-4">
        {productos.map(producto => (
          <div key={producto.id}>
            <img src={producto.imageUrl} alt={producto.name} />
            <h3>{producto.name}</h3>
            <button onClick={() => handleAddProduct(producto)}>
              Agregar ${producto.price.toLocaleString()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// EJEMPLO 4: Integración en componentes existentes
// ============================================

/*
Para usar en tus componentes existentes (Home.tsx, StorePage.tsx, ProductDetailPage.tsx):

1. Importa el hook:
   import { useCart } from '@/pages/cart/context/CartContext';

2. Usa el hook en tu componente:
   const { addToCart } = useCart();

3. Cuando el usuario haga clic en un botón, llama a addToCart:
   
   const handleAddToCart = () => {
     addToCart({
       productId: producto.id,
       name: producto.nombre,
       description: producto.descripcion,
       price: producto.precio,
       imageUrl: producto.imagen,
       maxQuantity: producto.stock
     });
     
     toast.success('Producto agregado al carrito');
   };

4. Agrega el botón en tu JSX:
   <button onClick={handleAddToCart}>
     Agregar al carrito
   </button>
*/
