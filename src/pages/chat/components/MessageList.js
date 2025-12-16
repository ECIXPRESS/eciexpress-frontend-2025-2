import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MessageItem from './MessageItem';
import SystemMessage from './SystemMessage';
import { useEffect, useRef } from 'react';
const MessageList = ({ messages, currentUserId, loading }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" }) }));
    }
    if (messages.length === 0) {
        return null;
    }
    // Agrupar mensajes por fecha
    const groupedMessages = {};
    messages.forEach(msg => {
        const date = new Date(msg.creationDate || '').toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        if (!groupedMessages[date]) {
            groupedMessages[date] = [];
        }
        groupedMessages[date].push(msg);
    });
    return (_jsxs("div", { className: "py-4", children: [Object.entries(groupedMessages).map(([date, msgs]) => (_jsxs("div", { children: [_jsx(SystemMessage, { text: date, type: "date" }), msgs.map((message) => (_jsx(MessageItem, { message: message, isOwn: message.authorId === currentUserId, senderName: message.authorId.slice(0, 8) }, message.messageId)))] }, date))), _jsx("div", { ref: messagesEndRef })] }));
};
export default MessageList;
