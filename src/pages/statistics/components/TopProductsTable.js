import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, Star } from 'lucide-react';
export default function TopProductsTable({ products }) {
    const getRating = (quantitySold) => {
        if (quantitySold > 300)
            return 4.8;
        if (quantitySold > 250)
            return 4.5;
        if (quantitySold > 200)
            return 4.3;
        if (quantitySold > 150)
            return 4.1;
        return 3.9;
    };
    const getGrowth = (quantitySold) => {
        if (quantitySold > 300)
            return 12;
        if (quantitySold > 250)
            return 10;
        if (quantitySold > 200)
            return 8;
        if (quantitySold > 150)
            return 6;
        return 4;
    };
    return (_jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", children: [_jsx("h3", { className: "text-lg font-bold text-[#262626] mb-6", children: "Top 10 Productos" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200", children: [_jsx("th", { className: "text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase", children: "#" }), _jsx("th", { className: "text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase", children: "Producto" }), _jsx("th", { className: "text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase", children: "Ingresos" }), _jsx("th", { className: "text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase", children: "Ventas" }), _jsx("th", { className: "text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase", children: "Crecimiento" }), _jsx("th", { className: "text-right py-3 px-2 text-xs font-semibold text-gray-600 uppercase", children: "Calificaci\u00F3n" })] }) }), _jsx("tbody", { children: products.map((product, index) => {
                                const rating = getRating(product.quantitySold);
                                const growth = getGrowth(product.quantitySold);
                                return (_jsxs("tr", { className: "border-b border-gray-100 hover:bg-gray-50 transition-colors", children: [_jsx("td", { className: "py-4 px-2", children: _jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-400 text-[#FFFFFF]' : 'bg-gray-100 text-gray-600'}`, children: index + 1 }) }), _jsx("td", { className: "py-4 px-2 font-medium text-[#262626]", children: product.productName }), _jsxs("td", { className: "py-4 px-2 text-right font-semibold text-[#262626]", children: ["$", product.totalRevenue.toLocaleString('es-CO')] }), _jsx("td", { className: "py-4 px-2 text-right text-gray-600", children: product.quantitySold }), _jsx("td", { className: "py-4 px-2 text-right", children: _jsxs("span", { className: "inline-flex items-center gap-1 text-green-600 font-medium", children: [_jsx(TrendingUp, { className: "w-4 h-4" }), "+", growth, "%"] }) }), _jsx("td", { className: "py-4 px-2 text-right", children: _jsxs("span", { className: "inline-flex items-center gap-1 text-yellow-400 font-medium", children: [_jsx(Star, { className: "w-4 h-4 fill-current" }), rating] }) })] }, product.productId));
                            }) })] }) })] }));
}
