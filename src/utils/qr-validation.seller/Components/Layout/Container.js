import { jsx as _jsx } from "react/jsx-runtime";
export const Container = ({ children, className = '' }) => {
    return (_jsx("div", { className: `container mx-auto px-4 py-6 max-w-6xl ${className}`, children: children }));
};
