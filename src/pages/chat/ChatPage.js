import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import ConversationList from './components/ConversationList';
import MessageList from './components/MessageList';
import { toast } from 'react-toastify';
// Respuestas automáticas del bot
const AUTO_RESPONSES = [
    "Ya estamos revisando tu pedido y en un momento te damos más info.",
    "Estamos con tu pedido en este momento, apenas tengamos algo te avisamos.",
    "Tenemos más pedidos de lo normal, paciencia por favor",
    "Seguimos con tu pedido, cualquier cambio te avisamos.",
    "Tu pedido sigue en proceso, te avisamos ante cualquier novedad."
];
const userId = 'd66d2d30-56cb-410b-a5f0-9191c38f380e';
// IDs de los usuarios (restaurantes)
const HARVIES_USER_ID = 'Harvies';
const REGIO_USER_ID = 'Regio';
// Mapeo de IDs a nombres - EXPORTADO para que ConversationList lo pueda usar
export const MOCK_USER_NAMES = {
    [HARVIES_USER_ID]: 'Harvies',
    [REGIO_USER_ID]: 'Regio',
};
const MOCK_CONVERSATIONS = [
    {
        conversationId: 'conv-harvies-001',
        creationDate: new Date().toISOString(),
        usersIds: [userId, HARVIES_USER_ID],
        messageResponses: [],
        orderId: 'order-001',
    },
    {
        conversationId: 'conv-regio-001',
        creationDate: new Date().toISOString(),
        usersIds: [userId, REGIO_USER_ID],
        messageResponses: [],
        orderId: 'order-002',
    },
];
const ChatPage = () => {
    const [conversations] = useState(MOCK_CONVERSATIONS);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [allMessages, setAllMessages] = useState({});
    const [messageText, setMessageText] = useState('');
    const [sending, setSending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const [showMobileList, setShowMobileList] = useState(true);
    const typingTimeoutRef = useRef(null);
    const autoResponseTimeoutRef = useRef(null);
    const messages = currentConversation ? (allMessages[currentConversation.conversationId] || []) : [];
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            if (autoResponseTimeoutRef.current) {
                clearTimeout(autoResponseTimeoutRef.current);
            }
        };
    }, []);
    const handleSelectConversation = (conversation) => {
        setCurrentConversation(conversation);
        setShowMobileList(false);
        if (!allMessages[conversation.conversationId]) {
            setAllMessages(prev => ({
                ...prev,
                [conversation.conversationId]: []
            }));
        }
    };
    const handleBackToList = () => {
        setShowMobileList(true);
        setCurrentConversation(null);
    };
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMessageText(value);
        if (!currentConversation)
            return;
        if (value.trim() && !isTyping) {
            setIsTyping(true);
        }
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    };
    const generateAutoResponse = () => {
        if (!currentConversation)
            return;
        const randomResponse = AUTO_RESPONSES[Math.floor(Math.random() * AUTO_RESPONSES.length)];
        const otherUserId = currentConversation.usersIds.find((id) => id !== userId);
        if (!otherUserId)
            return;
        const responseMessage = {
            messageId: `msg-${Date.now()}-${Math.random()}`,
            conversationId: currentConversation.conversationId,
            authorId: otherUserId,
            text: randomResponse,
            creationDate: new Date().toISOString(),
            isRead: false,
        };
        setAllMessages(prev => ({
            ...prev,
            [currentConversation.conversationId]: [
                ...(prev[currentConversation.conversationId] || []),
                responseMessage
            ]
        }));
    };
    const handleSendMessage = async () => {
        if (!currentConversation) {
            toast.error('Selecciona una conversación primero');
            return;
        }
        if (!messageText.trim()) {
            toast.warning('Escribe un mensaje');
            return;
        }
        if (isTyping) {
            setIsTyping(false);
        }
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        setSending(true);
        try {
            const newMessage = {
                messageId: `msg-${Date.now()}`,
                conversationId: currentConversation.conversationId,
                authorId: userId,
                text: messageText,
                creationDate: new Date().toISOString(),
                isRead: true,
            };
            setAllMessages(prev => ({
                ...prev,
                [currentConversation.conversationId]: [
                    ...(prev[currentConversation.conversationId] || []),
                    newMessage
                ]
            }));
            setMessageText('');
            const delay = 3000 + Math.random() * 3000;
            autoResponseTimeoutRef.current = setTimeout(() => {
                setOtherUserTyping(true);
                setTimeout(() => {
                    setOtherUserTyping(false);
                    generateAutoResponse();
                }, 2000 + Math.random() * 2000);
            }, delay);
        }
        catch (error) {
            console.error('Error al enviar mensaje:', error);
            toast.error('Error al enviar mensaje');
        }
        finally {
            setSending(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const getConversationName = (conversation) => {
        const userIds = conversation.usersIds || [];
        const otherUserId = userIds.find((id) => id !== userId);
        if (otherUserId) {
            return MOCK_USER_NAMES[otherUserId] || 'Conversación';
        }
        return 'Conversación';
    };
    // Obtener el ID del otro usuario para el TypingIndicator
    const getOtherUserId = () => {
        if (!currentConversation)
            return null;
        return currentConversation.usersIds.find((id) => id !== userId) || null;
    };
    // Obtener el nombre del otro usuario para el TypingIndicator
    const getOtherUserName = () => {
        const otherUserId = getOtherUserId();
        if (!otherUserId)
            return '';
        return MOCK_USER_NAMES[otherUserId] || '';
    };
    return (_jsxs("div", { className: "fixed inset-0 md:left-20 flex overflow-hidden bg-gray-50", children: [_jsxs("div", { className: `
          ${showMobileList ? 'flex' : 'hidden'} 
          md:flex
          w-full md:w-80 lg:w-96
          bg-white 
          border-r border-gray-200 
          flex-col 
          flex-shrink-0
        `, children: [_jsx("div", { className: "p-3 sm:p-4 bg-white border-b border-gray-200 flex-shrink-0", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-lg sm:text-xl font-semibold text-gray-700", children: "Chats" }), _jsxs("div", { className: "flex items-center space-x-1 sm:space-x-2", children: [_jsx("button", { className: "p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors", title: "Ordenar", children: _jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" }) }) }), _jsx("button", { className: "p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors", title: "Filtrar", children: _jsx("svg", { className: "w-4 h-4 sm:w-5 sm: h-5 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 4h18M3 12h18M3 20h18" }) }) }), _jsx("button", { className: "p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors", title: "Calendario", children: _jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) })] })] }) }), _jsx("div", { className: "flex-1 overflow-hidden", children: _jsx(ConversationList, { userId: userId, currentConversation: currentConversation, onSelectConversation: handleSelectConversation, conversations: conversations, loading: false }) })] }), _jsx("div", { className: `
          ${showMobileList ? 'hidden' : 'flex'}
          md:flex
          flex-1 
          flex-col 
          bg-white
          min-w-0
        `, children: currentConversation ? (_jsxs("div", { className: "flex-1 flex flex-col h-full", children: [_jsx("div", { className: "p-3 sm:p-4 bg-white border-b border-gray-200 flex-shrink-0", children: _jsxs("div", { className: "flex items-center space-x-2 sm:space-x-3", children: [_jsx("button", { onClick: handleBackToList, className: "md:hidden p-2 hover: bg-gray-100 rounded-lg transition-colors", children: _jsx("svg", { className: "w-5 h-5 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }), _jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0", children: _jsx("span", { className: "text-white font-bold text-xs sm:text-sm", children: getConversationName(currentConversation)[0]?.toUpperCase() || 'C' }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h2", { className: "font-semibold text-sm sm:text-base text-gray-800 truncate", children: getConversationName(currentConversation) }), _jsx("p", { className: "text-xs text-gray-500", children: "En l\u00EDnea" })] })] }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [messages.length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center h-full px-4 sm:px-6 space-y-3", children: [_jsx("p", { className: "text-xs sm:text-sm text-gray-400 font-medium", children: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) }), _jsxs("p", { className: "text-xs sm:text-sm text-gray-500 text-center", children: ["Te has unido a una conversaci\u00F3n con ", getConversationName(currentConversation)] }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 text-center", children: "Pedido aceptado \u2705" })] })), _jsx(MessageList, { messages: messages, currentUserId: userId, loading: false }), otherUserTyping && (_jsx("div", { className: "px-4 py-2", children: _jsxs("div", { className: "flex items-end space-x-2", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-white font-bold text-xs", children: getOtherUserName()[0]?.toUpperCase() || '? ' }) }), _jsx("div", { className: "bg-gray-200 rounded-2xl px-4 py-2", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), _jsx("div", { className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce", style: { animationDelay: '150ms' } }), _jsx("div", { className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce", style: { animationDelay: '300ms' } })] }) })] }) }))] }), _jsx("div", { className: "p-3 sm:p-4 bg-white flex-shrink-0 border-t border-gray-100", children: _jsxs("div", { className: "flex items-center space-x-2 sm:space-x-3", children: [_jsx("input", { type: "text", placeholder: "Escribe un mensaje...", value: messageText, onChange: handleInputChange, onKeyPress: handleKeyPress, disabled: sending, className: "flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled: bg-gray-100 disabled:cursor-not-allowed" }), _jsx("button", { onClick: handleSendMessage, disabled: sending || !messageText.trim(), className: `
                    w-10 h-10 sm:w-12 sm:h-12
                    rounded-full 
                    flex items-center justify-center 
                    transition-all transform
                    flex-shrink-0
                    ${sending || !messageText.trim()
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-cyan-400 text-white hover:bg-cyan-500 hover:scale-105 active:scale-95'}
                  `, children: sending ? (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" })) : (_jsxs("svg", { className: "w-5 h-5 sm:w-6 sm:h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1. 6", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M22 12 L5 4 Q7 6.4 8.5 9.3 L10 12 L8.5 14.7 Q7 17.6 5 20 L22 12 Z" }), _jsx("path", { d: "M22 12 L10 12" })] })) })] }) })] })) : (_jsx("div", { className: "flex-1 flex items-center justify-center p-4", children: _jsxs("div", { className: "text-center px-4 max-w-md", children: [_jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-3xl sm:text-4xl", children: "\uD83D\uDCAC" }), _jsx("h3", { className: "text-lg sm: text-xl font-semibold text-gray-700 mb-2", children: "Selecciona un chat" }), _jsx("p", { className: "text-sm text-gray-500", children: "Elige una conversaci\u00F3n para empezar a chatear" })] }) })) })] }));
};
export default ChatPage;
