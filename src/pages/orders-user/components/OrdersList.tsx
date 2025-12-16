import React, { useState } from 'react';
import { OrderCard } from './OrderCard';
import OrderDetailsDrawer from './OrderDetailsDrawer';

const mockOrders = [
  { id: '1', title: 'Combo Hamburguesa Clásica', store: "Harvie's", desc: 'Combo hamburguesa, Té Hatsu, chicles trident', total: 22500, status: 'entregado', image: '/src/assets/qr-validation-seller/productos/1.jpg' },
  { id: '2', title: 'Combo Lasagna Especial', store: 'Reggio', desc: 'Lasagna, RedBull y paquete Trululu', total: 22400, status: 'preparacion', image: '/src/assets/qr-validation-seller/productos/5.png' },
  { id: '3', title: 'Merienda Dulce', store: 'Café Leyenda', desc: 'Galletas de chocolate y café americano', total: 12400, status: 'cancelado', image: '/src/assets/qr-validation-seller/productos/3.jpg' },
  { id: '4', title: 'Pizza Familiar', store: 'Pizzería Mía', desc: 'Pizza cuatro quesos', total: 32000, status: 'preparacion', image: '/src/assets/qr-validation-seller/productos/2.jpg' },
  { id: '5', title: 'Ensalada Fresca', store: 'Green Bites', desc: 'Lechuga, tomate, aderezo', total: 9800, status: 'entregado', image: '/src/assets/qr-validation-seller/productos/4.png' },
  { id: '6', title: 'Wrap Pollo BBQ', store: 'Harvie\'s', desc: 'Wrap de pollo con salsa BBQ', total: 14200, status: 'preparacion', image: '/src/assets/qr-validation-seller/productos/6.png' },
  { id: '7', title: 'Café Americano', store: 'Café Leyenda', desc: 'Café americano grande', total: 4200, status: 'entregado', image: '/src/assets/qr-validation-seller/productos/7.png' },
  { id: '8', title: 'Brownie con Helado', store: 'Postres & Co', desc: 'Brownie de chocolate con helado', total: 7600, status: 'cancelado', image: '/src/assets/qr-validation-seller/productos/8.png' },
  { id: '9', title: 'Sánduche Especial', store: 'Reggio', desc: 'Pan artesanal, carne, queso', total: 15800, status: 'preparacion', image: '/src/assets/qr-validation-seller/productos/9.png' },
  { id: '10', title: 'Jugo Natural', store: 'Green Bites', desc: 'Jugo de naranja natural', total: 5200, status: 'entregado', image: '/src/assets/qr-validation-seller/productos/10.png' }
];

export const OrdersList: React.FC<{ query?: string; status?: string | undefined }> = ({ query = '', status }) => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const filtered = mockOrders.filter(o => {
    const q = query.trim().toLowerCase();
    if (q) {
      const inTitle = o.title.toLowerCase().includes(q);
      const inStore = o.store.toLowerCase().includes(q);
      if (!inTitle && !inStore) return false;
    }
    if (status && o.status !== status) return false;
    return true;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(o => (
          <OrderCard key={o.id} order={o} onDetails={() => setSelectedOrder(o)} />
        ))}
      </div>

      <OrderDetailsDrawer order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
};

export default OrdersList;
