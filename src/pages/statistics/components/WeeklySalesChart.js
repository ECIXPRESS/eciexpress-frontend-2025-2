import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export default function WeeklySalesChart({ data }) {
    const chartData = data.map(item => ({
        name: item.label,
        value: item.value
    }));
    return (_jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", children: [_jsx("h3", { className: "text-lg font-bold text-[#262626] mb-6", children: "Ventas Semanales" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }), _jsx(XAxis, { dataKey: "name", stroke: "#999", style: { fontSize: '12px' } }), _jsx(YAxis, { stroke: "#999", style: { fontSize: '12px' } }), _jsx(Tooltip, { contentStyle: {
                                backgroundColor: 'white',
                                border: '1px solid #e5e5e5',
                                borderRadius: '8px',
                                fontSize: '12px'
                            } }), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#5AC7E1", strokeWidth: 3, dot: { fill: '#5AC7E1', r: 5 } })] }) })] }));
}
