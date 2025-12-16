import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { ProductosList, FiltrosInventario, EstadoNavigation } from './index';
import { mockProductos } from './mocks/mockProductos';
import { getEstadoStock } from './types/inventario';
export default function InventorySellerPage() {
    const [productos, setProductos] = useState(mockProductos);
    const [filtros, setFiltros] = useState({
        query: '',
        categoria: undefined,
        estadoStock: undefined
    });
    const [estadoActivo, setEstadoActivo] = useState('todos');
    const handleUpdateStock = (id, newStock) => {
        setProductos(productos.map(p => p.id === id ? { ...p, stock: newStock } : p));
    };
    // Calcular resumen de inventario
    const resumen = useMemo(() => {
        const total = productos.length;
        const stockBajo = productos.filter(p => getEstadoStock(p.stock, p.stockMinimo) === 'stock-bajo').length;
        const agotados = productos.filter(p => getEstadoStock(p.stock, p.stockMinimo) === 'agotado').length;
        const disponibles = productos.filter(p => getEstadoStock(p.stock, p.stockMinimo) === 'disponible').length;
        return { total, stockBajo, disponibles, agotados };
    }, [productos]);
    // Filtrar productos
    const productosFiltrados = useMemo(() => {
        return productos.filter(p => {
            // Filtro por búsqueda
            if (filtros.query && !p.nombre.toLowerCase().includes(filtros.query.toLowerCase()) &&
                !p.descripcion?.toLowerCase().includes(filtros.query.toLowerCase())) {
                return false;
            }
            // Filtro por categoría
            if (filtros.categoria && p.categoria !== filtros.categoria) {
                return false;
            }
            // Filtro por estado de stock
            const estado = getEstadoStock(p.stock, p.stockMinimo);
            if (filtros.estadoStock && estado !== filtros.estadoStock) {
                return false;
            }
            return true;
        });
    }, [productos, filtros]);
    return (_jsxs("div", { className: "p-8 space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-yellow-400", children: "Cat\u00E1logo del Vendedor" }), _jsx(EstadoNavigation, { resumen: resumen, estadoActivo: estadoActivo, onEstadoChange: setEstadoActivo, ventasSemana: 15 }), _jsx(FiltrosInventario, { filtros: filtros, onFiltrosChange: setFiltros }), _jsx(ProductosList, { productos: productosFiltrados, onUpdateStock: handleUpdateStock })] }));
}
