import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export default function OrdersChart({ data }) {
    const chartData = data.map(item => ({
        name: item.label,
        'Total pedidos': item.value,
        'Completados': item.secondary
    }));
    return (_jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-lg font-bold text-[#262626]", children: "Pedidos" }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-[#5AC7E1]" }), _jsx("span", { className: "text-gray-600", children: "Total pedidos" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-400" }), _jsx("span", { className: "text-gray-600", children: "Completados" })] })] })] }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }), _jsx(XAxis, { dataKey: "name", stroke: "#999", style: { fontSize: '12px' } }), _jsx(YAxis, { stroke: "#999", style: { fontSize: '12px' } }), _jsx(Tooltip, { contentStyle: {
                                backgroundColor: 'white',
                                border: '1px solid #e5e5e5',
                                borderRadius: '8px',
                                fontSize: '12px'
                            } }), _jsx(Line, { type: "monotone", dataKey: "Total pedidos", stroke: "#5AC7E1", strokeWidth: 2, dot: { fill: '#5AC7E1', r: 4 } }), _jsx(Line, { type: "monotone", dataKey: "Completados", stroke: "#FBBF24", strokeWidth: 2, dot: { fill: '#FBBF24', r: 4 } })] }) })] }));
}
