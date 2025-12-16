import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Minus, Plus } from 'lucide-react';
/**
 * Selector de cantidad con botones +/- y validación de stock
 */
export default function QuantitySelector({ quantity, onQuantityChange, maxQuantity, minQuantity = 1 }) {
    const handleDecrease = () => {
        if (quantity > minQuantity) {
            onQuantityChange(quantity - 1);
        }
    };
    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(quantity + 1);
        }
    };
    const canDecrease = quantity > minQuantity;
    const canIncrease = quantity < maxQuantity;
    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: handleDecrease, disabled: !canDecrease, className: `
          w-12 h-12 rounded-full flex items-center justify-center 
          transition-all duration-200
          ${canDecrease
                    ? 'bg-[#FDDF65] hover:bg-[#f5d74e] active:scale-95'
                    : 'bg-gray-200 cursor-not-allowed opacity-50'}
        `, "aria-label": "Disminuir cantidad", children: _jsx(Minus, { className: "w-5 h-5 text-[#262626]" }) }), _jsx("div", { className: "min-w-[3rem] text-center", children: _jsx("span", { className: "text-2xl font-bold text-[#262626]", children: quantity }) }), _jsx("button", { onClick: handleIncrease, disabled: !canIncrease, className: `
          w-12 h-12 rounded-full flex items-center justify-center 
          transition-all duration-200
          ${canIncrease
                    ? 'bg-[#FDDF65] hover:bg-[#f5d74e] active:scale-95'
                    : 'bg-gray-200 cursor-not-allowed opacity-50'}
        `, "aria-label": "Aumentar cantidad", children: _jsx(Plus, { className: "w-5 h-5 text-[#262626]" }) })] }));
}
