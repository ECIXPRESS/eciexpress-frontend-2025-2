import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MessageItem = ({ message, isOwn, senderName }) => {
    const formatTime = (timestamp) => {
        if (!timestamp)
            return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    };
    return (_jsx("div", { className: `flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 px-6`, children: _jsxs("div", { className: `max-w-[70%]`, children: [_jsx("div", { className: `
            px-5 py-3 rounded-2xl
            ${isOwn
                        ? 'bg-white text-gray-900 rounded-br-md shadow-sm'
                        : 'bg-gray-300 text-gray-900 rounded-bl-md'}
          `, children: _jsx("p", { className: "text-[15px] leading-relaxed", children: message.text }) }), _jsx("div", { className: `flex items-center mt-1 px-2 ${isOwn ? 'justify-end' : 'justify-start'}`, children: _jsx("span", { className: "text-xs text-gray-500", children: formatTime(message.creationDate) }) })] }) }));
};
export default MessageItem;
