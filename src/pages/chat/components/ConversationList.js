import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import ConversationItem from './ConversationItem';
const ConversationList = ({ userId, currentConversation, onSelectConversation, conversations, loading = false }) => {
    const allUserIds = useMemo(() => {
        const ids = new Set();
        conversations.forEach(conv => {
            const userIds = conv.usersIds || [];
            userIds.forEach((id) => {
                if (id !== userId)
                    ids.add(id);
            });
        });
        return Array.from(ids);
    }, [conversations, userId]);
    const { getUserName } = useUsers(allUserIds);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600" }) }));
    }
    if (conversations.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center h-full px-4", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDCAC" }), _jsx("p", { className: "text-gray-500 text-center", children: "No tienes conversaciones a\u00FAn" })] }));
    }
    return (_jsx("div", { className: "overflow-y-auto h-full", children: conversations.map((conversation) => (_jsx(ConversationItem, { conversation: conversation, isActive: currentConversation?.conversationId === conversation.conversationId, onClick: () => onSelectConversation(conversation), currentUserId: userId, getUserName: getUserName }, conversation.conversationId))) }));
};
export default ConversationList;
