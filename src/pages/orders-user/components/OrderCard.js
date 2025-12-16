import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, Clock, XCircle } from 'lucide-react';
export const OrderCard = ({ order, onDetails }) => {
    const statusBadge = () => {
        switch (order.status) {
            case 'entregado':
                return _jsxs("div", { className: "absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), " Entregado"] });
            case 'preparacion':
                return _jsxs("div", { className: "absolute top-3 right-3 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4" }), " En proceso"] });
            case 'cancelado':
                return _jsxs("div", { className: "absolute top-3 right-3 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2", children: [_jsx(XCircle, { className: "w-4 h-4" }), " Cancelado"] });
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden relative", children: [_jsx("div", { className: "h-44 w-full overflow-hidden rounded-t-2xl", children: _jsx("img", { src: order.image, alt: order.title, className: "w-full h-full object-cover" }) }), statusBadge(), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-bold text-lg text-gray-900", children: order.title }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 my-2", children: [_jsx("svg", { className: "w-4 h-4 text-yellow-400", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: _jsx("path", { d: "M12 2v4", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), _jsx("span", { children: order.store })] }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: order.desc }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Total" }), _jsxs("p", { className: "text-xl font-bold text-yellow-400", children: ["$", order.total.ToString ? order.total.ToString() : order.total.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { className: "w-12 h-12 rounded-2xl bg-red-300 hover:bg-red-400 text-red-700 flex items-center justify-center shadow-md transition-colors", children: _jsxs("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [_jsx("circle", { cx: "12", cy: "12", r: "7", strokeWidth: "2" }), _jsx("line", { x1: "5", y1: "19", x2: "19", y2: "5", strokeWidth: "2", strokeLinecap: "round" })] }) }), _jsx("button", { onClick: onDetails, className: "px-4 py-2 rounded-lg bg-[#5AC7E1] hover:bg-[#4ab5cf] text-white", children: "Detalles" })] })] })] })] }));
};
export default OrderCard;
