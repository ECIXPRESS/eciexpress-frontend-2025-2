import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ConversationItem = ({ conversation, isActive, onClick, currentUserId, getUserName }) => {
    // ⭐ FUNCIÓN ACTUALIZADA
    const getConversationName = () => {
        const userIds = conversation.usersIds || [];
        const otherUserId = userIds.find((id) => id !== currentUserId);
        if (otherUserId) {
            return getUserName(otherUserId);
        }
        return conversation.conversationId?.slice(0, 8) || 'Chat';
    };
    const getInitial = () => {
        const name = getConversationName();
        return name[0]?.toUpperCase() || 'C';
    };
    const getLastMessage = () => {
        if (conversation.messageResponses && conversation.messageResponses.length > 0) {
            const lastMsg = conversation.messageResponses[conversation.messageResponses.length - 1];
            return lastMsg.text?.slice(0, 40) || 'Sin mensajes';
        }
        return 'Sin mensajes';
    };
    const getLastMessageTime = () => {
        if (conversation.messageResponses && conversation.messageResponses.length > 0) {
            const lastMsg = conversation.messageResponses[conversation.messageResponses.length - 1];
            if (lastMsg.creationDate) {
                const date = new Date(lastMsg.creationDate);
                return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            }
        }
        return '';
    };
    const getUnreadCount = () => {
        if (conversation.messageResponses) {
            return conversation.messageResponses.filter(msg => !msg.isRead && msg.authorId !== currentUserId).length;
        }
        return 0;
    };
    const unreadCount = getUnreadCount();
    return (_jsxs("div", { onClick: onClick, className: `
        flex items-center space-x-3 p-4 cursor-pointer transition-colors border-b border-gray-100
        ${isActive ? 'bg-amber-50 border-l-4 border-l-amber-600' : 'hover:bg-gray-50'}
      `, children: [_jsx("div", { className: `
        w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0
        ${isActive ? 'bg-amber-600' : 'bg-gradient-to-br from-amber-400 to-amber-600'}
      `, children: getInitial() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h3", { className: `font-semibold truncate ${isActive ? 'text-amber-900' : 'text-gray-900'}`, children: getConversationName() }), _jsx("span", { className: "text-xs text-gray-500 flex-shrink-0 ml-2", children: getLastMessageTime() })] }), _jsx("p", { className: "text-sm text-gray-600 truncate", children: getLastMessage() })] }), unreadCount > 0 && (_jsx("div", { className: "w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-xs text-white font-bold", children: unreadCount > 9 ? '9+' : unreadCount }) }))] }));
};
export default ConversationItem;
