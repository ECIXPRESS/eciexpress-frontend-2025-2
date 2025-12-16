import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getEstadoStock } from '../types/inventario';
import { StockBadge, CategoriaBadge } from './Badge';
import { DollarSign, Eye, Edit3, Package } from 'lucide-react';
const getImagenProducto = (producto) => {
    if (producto.imagen)
        return producto.imagen;
    const categoriaLower = producto.categoria.toLowerCase();
    if (categoriaLower.includes('almuerzo'))
        return '/src/assets/qr-validation-seller/productos/1.jpg';
    if (categoriaLower.includes('desayuno'))
        return '/src/assets/qr-validation-seller/productos/2.jpg';
    return '/src/assets/qr-validation-seller/productos/1.jpg';
};
export const ProductoListItem = ({ producto, onEditStock, onVerDetalles, }) => {
    const estadoStock = getEstadoStock(producto.stock, producto.stockMinimo);
    return (_jsx("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200", children: _jsxs("div", { className: "flex items-center p-4 gap-4", children: [_jsxs("div", { className: "relative w-24 h-24 flex-shrink-0 rounded-lg overflow-visible", children: [_jsx("img", { src: getImagenProducto(producto), alt: producto.nombre, className: "w-full h-full object-cover rounded-lg" }), _jsx("div", { className: "absolute -top-2 -left-2", children: _jsx(CategoriaBadge, { categoria: producto.categoria }) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1 min-w-0 mr-4", children: [_jsx("h3", { className: "font-bold text-gray-900 text-lg truncate", children: producto.nombre }), producto.descripcion && (_jsx("p", { className: "text-sm text-gray-500 truncate", children: producto.descripcion }))] }), _jsx("div", { className: "text-right flex-shrink-0", children: _jsxs("div", { className: "flex items-center text-xl font-bold text-yellow-500", children: [_jsx(DollarSign, { className: "w-5 h-5" }), _jsx("span", { children: producto.precio.toLocaleString() })] }) })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "text-gray-600", children: "Stock:" }), _jsx("span", { className: "font-bold text-gray-900", children: producto.stock })] }), _jsx(StockBadge, { estado: estadoStock })] })] }), _jsxs("div", { className: "flex flex-col gap-2 flex-shrink-0", children: [_jsxs("button", { onClick: () => onVerDetalles(producto.id), className: "bg-white hover:bg-gray-50 text-yellow-500 border-2 border-yellow-400 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-w-[130px]", children: [_jsx(Eye, { className: "w-4 h-4" }), "Ver Detalles"] }), _jsxs("button", { onClick: () => onEditStock(producto.id), className: "bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg min-w-[130px]", children: [_jsx(Edit3, { className: "w-4 h-4" }), "Editar Stock"] })] })] }) }));
};
export default ProductoListItem;
