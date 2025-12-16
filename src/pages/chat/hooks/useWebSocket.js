import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
export const useWebSocket = ({ userId, onMessageReceived, onTyping, onMessageRead }) => {
    const clientRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);
    const subscriptionsRef = useRef(new Map());
    const typingTimeoutRef = useRef(null);
    useEffect(() => {
        if (!userId)
            return;
        console.log('🔌 [WebSocket] Conectando... ', userId);
        const socket = new SockJS('http://localhost:8081/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                userId: userId
            },
            debug: (str) => {
                console.log('🔍 [STOMP Debug]:', str);
            },
            onConnect: () => {
                console.log('✅ [WebSocket] Conectado');
                setConnected(true);
                setError(null);
            },
            onStompError: (frame) => {
                console.error('❌ [WebSocket] Error STOMP:', frame);
                setError(frame.headers['message'] || 'Error de WebSocket');
                setConnected(false);
            },
            onWebSocketClose: () => {
                console.warn('⚠️ [WebSocket] Desconectado');
                setConnected(false);
            }
        });
        stompClient.activate();
        clientRef.current = stompClient;
        return () => {
            console.log('🔌 [WebSocket] Desconectando.. .');
            subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
            subscriptionsRef.current.clear();
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            stompClient.deactivate();
        };
    }, [userId]);
    const subscribeToConversation = (conversationId) => {
        if (!clientRef.current || !connected) {
            console.warn('⚠️ [WebSocket] No conectado, no se puede suscribir');
            return;
        }
        // Evitar suscripciones duplicadas
        const messageKey = `messages-${conversationId}`;
        const typingKey = `typing-${conversationId}`;
        const receiptsKey = `receipts-${conversationId}`;
        // Suscribirse a mensajes
        if (!subscriptionsRef.current.has(messageKey)) {
            const messageDest = `/topic/conversations/${conversationId}`;
            console.log('📡 [WebSocket] Suscribiéndose a mensajes:', messageDest);
            const messageSub = clientRef.current.subscribe(messageDest, (message) => {
                console.log('📩 [WebSocket] Mensaje recibido:', message.body);
                try {
                    const data = JSON.parse(message.body);
                    onMessageReceived?.(data);
                }
                catch (err) {
                    console.error('❌ [WebSocket] Error al parsear mensaje:', err);
                }
            });
            subscriptionsRef.current.set(messageKey, messageSub);
        }
        // Suscribirse a "escribiendo..."
        if (!subscriptionsRef.current.has(typingKey)) {
            const typingDest = `/topic/conversations/${conversationId}/typing`;
            console.log('📡 [WebSocket] Suscribiéndose a typing:', typingDest);
            const typingSub = clientRef.current.subscribe(typingDest, (message) => {
                console.log('⌨️ [WebSocket] Typing recibido:', message.body);
                try {
                    const data = JSON.parse(message.body);
                    onTyping?.(data);
                }
                catch (err) {
                    console.error('❌ [WebSocket] Error al parsear typing:', err);
                }
            });
            subscriptionsRef.current.set(typingKey, typingSub);
        }
        // Suscribirse a recibos de lectura
        if (!subscriptionsRef.current.has(receiptsKey)) {
            const receiptsDest = `/topic/conversations/${conversationId}/receipts`;
            console.log('📡 [WebSocket] Suscribiéndose a receipts:', receiptsDest);
            const receiptsSub = clientRef.current.subscribe(receiptsDest, (message) => {
                console.log('✅ [WebSocket] Receipt recibido:', message.body);
                try {
                    const data = JSON.parse(message.body);
                    onMessageRead?.(data);
                }
                catch (err) {
                    console.error('❌ [WebSocket] Error al parsear receipt:', err);
                }
            });
            subscriptionsRef.current.set(receiptsKey, receiptsSub);
        }
    };
    const unsubscribeFromConversation = (conversationId) => {
        const keys = [
            `messages-${conversationId}`,
            `typing-${conversationId}`,
            `receipts-${conversationId}`
        ];
        keys.forEach(key => {
            const subscription = subscriptionsRef.current.get(key);
            if (subscription) {
                console.log('📡 [WebSocket] Desuscribiéndose de:', key);
                subscription.unsubscribe();
                subscriptionsRef.current.delete(key);
            }
        });
    };
    const sendMessage = (conversationId, text) => {
        if (!clientRef.current || !connected) {
            console.error('❌ [WebSocket] No conectado');
            throw new Error('WebSocket no conectado');
        }
        const message = {
            authorId: userId,
            conversationId: conversationId,
            text: text.trim()
        };
        console.log('📤 [WebSocket] Enviando mensaje:', message);
        clientRef.current.publish({
            destination: '/app/sendMessage',
            headers: {
                userId: userId
            },
            body: JSON.stringify(message)
        });
    };
    // ⭐ Enviar evento "escribiendo..."
    const sendTyping = (conversationId, isTyping) => {
        if (!clientRef.current || !connected)
            return;
        const typingData = {
            userId: userId,
            conversationId: conversationId,
            isTyping: isTyping
        };
        console.log('⌨️ [WebSocket] Enviando typing:', typingData);
        clientRef.current.publish({
            destination: '/app/typing',
            headers: {
                userId: userId
            },
            body: JSON.stringify(typingData)
        });
    };
    // ⭐ Marcar mensaje como leído
    const markAsRead = (messageId, conversationId) => {
        if (!clientRef.current || !connected)
            return;
        const readData = {
            userId: userId,
            messageId: messageId,
            conversationId: conversationId
        };
        console.log(' Marcando como leído:', readData);
        clientRef.current.publish({
            destination: '/app/markAsRead',
            headers: {
                userId: userId
            },
            body: JSON.stringify(readData)
        });
    };
    return {
        connected,
        error,
        sendMessage,
        sendTyping,
        markAsRead,
        subscribeToConversation,
        unsubscribeFromConversation
    };
};
