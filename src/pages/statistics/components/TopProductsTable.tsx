import { TrendingUp, Star } from 'lucide-react';
import { ProductSalesReport } from '../types/statistics.types';

interface TopProductsTableProps {
  products: ProductSalesReport[];
}

export default function TopProductsTable({ products }: TopProductsTableProps) {
  const getRating = (quantitySold: number): number => {
    if (quantitySold > 300) return 4.8;
    if (quantitySold > 250) return 4.5;
    if (quantitySold > 200) return 4.3;
    if (quantitySold > 150) return 4.1;
    return 3.9;
  };

  const getGrowth = (quantitySold: number): number => {
    if (quantitySold > 300) return 12;
    if (quantitySold > 250) return 10;
    if (quantitySold > 200) return 8;
    if (quantitySold > 150) return 6;
    return 4;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#262626] mb-6">Top 10 Productos</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">#</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Producto</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Ingresos</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Ventas</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Crecimiento</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase">Calificación</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const rating = getRating(product.quantitySold);
              const growth = getGrowth(product.quantitySold);
              
              return (
                <tr key={product.productId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-400 text-[#FFFFFF]' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-2 font-medium text-[#262626]">{product.productName}</td>
                  <td className="py-4 px-2 text-right font-semibold text-[#262626]">
                    ${product.totalRevenue.toLocaleString('es-CO')}
                  </td>
                  <td className="py-4 px-2 text-right text-gray-600">{product.quantitySold}</td>
                  <td className="py-4 px-2 text-right">
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      +{growth}%
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="inline-flex items-center gap-1 text-yellow-400 font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      {rating}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}