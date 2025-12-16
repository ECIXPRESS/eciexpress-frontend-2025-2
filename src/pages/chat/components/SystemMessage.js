import { jsx as _jsx } from "react/jsx-runtime";
const SystemMessage = ({ text, type = 'info' }) => {
    return (_jsx("div", { className: "flex justify-center my-4 px-6", children: _jsx("div", { className: "text-center", children: _jsx("p", { className: `text-sm ${type === 'date' ? 'text-gray-400 font-medium' : 'text-gray-500'}`, children: text }) }) }));
};
export default SystemMessage;
