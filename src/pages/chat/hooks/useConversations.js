import { useState, useEffect } from 'react';
import { useApi } from './useApi';
export const useConversations = (userId) => {
    const { get, post, del, loading, error } = useApi();
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    // ⭐ AGREGAR /api/chat/ antes de todos los endpoints
    const fetchConversations = async () => {
        try {
            const data = await get(`/api/chat/eciexpress/chatuser/${userId}/conversations`);
            setConversations(data);
            return data;
        }
        catch (err) {
            console.error('Error al obtener conversaciones:', err);
            return [];
        }
    };
    const createConversation = async (usersIds, orderId) => {
        try {
            const request = {
                usersIds,
                orderId
            };
            const data = await post('/api/chat/eciexpress/conversations', request);
            setConversations(prev => [data, ...prev]);
            setCurrentConversation(data);
            return data;
        }
        catch (err) {
            console.error('Error al crear conversación:', err);
            throw err;
        }
    };
    const deleteConversation = async (conversationId) => {
        try {
            const request = {
                userId,
                conversationId
            };
            await del('/api/chat/eciexpress/conversations', request);
            setConversations(prev => prev.filter(c => c.conversationId !== conversationId));
            if (currentConversation?.conversationId === conversationId) {
                setCurrentConversation(null);
                setMessages([]);
            }
        }
        catch (err) {
            console.error('Error al eliminar conversación:', err);
            throw err;
        }
    };
    const fetchMessages = async (conversationId, filterWord) => {
        try {
            const url = filterWord
                ? `/api/chat/eciexpress/conversations/${conversationId}/messages?filterWord=${encodeURIComponent(filterWord)}`
                : `/api/chat/eciexpress/conversations/${conversationId}/messages`;
            const data = await get(url);
            setMessages(data);
            return data;
        }
        catch (err) {
            console.error('Error al obtener mensajes:', err);
            return [];
        }
    };
    const fetchUserMessages = async (conversationId) => {
        try {
            const data = await get(`/api/chat/eciexpress/chatuser/${userId}/messages?conversationId=${conversationId}`);
            setMessages(data);
            return data;
        }
        catch (err) {
            console.error('Error al obtener mensajes del usuario:', err);
            return [];
        }
    };
    const fetchConversationByOrderId = async (orderId) => {
        try {
            const data = await get(`/api/chat/eciexpress/conversations/order/${orderId}`);
            setCurrentConversation(data);
            if (data.messageResponses && data.messageResponses.length > 0) {
                setMessages(data.messageResponses);
            }
            return data;
        }
        catch (err) {
            console.error('Error al obtener conversación por orderId:', err);
            throw err;
        }
    };
    const selectConversation = async (conversation) => {
        setCurrentConversation(conversation);
        if (conversation.messageResponses && conversation.messageResponses.length > 0) {
            setMessages(conversation.messageResponses);
        }
        else {
            await fetchMessages(conversation.conversationId);
        }
    };
    const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
    };
    const markMessageAsRead = (messageId) => {
        setMessages(prev => prev.map(msg => msg.messageId === messageId
            ? { ...msg, isRead: true }
            : msg));
    };
    useEffect(() => {
        if (userId) {
            fetchConversations();
        }
    }, [userId]);
    return {
        conversations,
        currentConversation,
        messages,
        loading,
        error,
        fetchConversations,
        createConversation,
        deleteConversation,
        fetchMessages,
        fetchUserMessages,
        fetchConversationByOrderId,
        selectConversation,
        addMessage,
        markMessageAsRead,
        setMessages,
    };
};
