import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { 
  ConversationMessageRequest, 
  ConversationMessageResponse,
  TypingRequest,
  ReadRequest 
} from '@/types/chat.types';

export const useWebSocket = (userId: string) => {
  const [connected, setConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<{[conversationId: string]: string[]}>({});
  const clientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<{[key: string]: any}>({});

  const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8081/ws';

  // Conectar al WebSocket
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        userId: userId
      },
      debug: (str) => {
        console.log('🔌 WebSocket:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('✅ WebSocket conectado para usuario:', userId);
        setConnected(true);
      },
      onDisconnect: () => {
        console.log('❌ WebSocket desconectado');
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error('❌ Error STOMP:', frame);
      }
    });

    client.activate();
    clientRef.current = client;

    return () => {
      // Limpiar subscripciones
      Object.values(subscriptionsRef.current).forEach(sub => sub.unsubscribe());
      subscriptionsRef.current = {};
      client.deactivate();
    };
  }, [userId]);

  // Suscribirse a mensajes de una conversación
  const subscribeToConversation = useCallback((
    conversationId: string,
    onMessage: (message: ConversationMessageResponse) => void
  ) => {
    if (! clientRef.current || !connected) {
      console.warn('⚠️ WebSocket no conectado');
      return;
    }

    const topic = `/topic/conversations/${conversationId}`;
    
    // Si ya existe una suscripción, no crear otra
    if (subscriptionsRef.current[topic]) {
      console.log(`ℹ️ Ya estás suscrito a ${topic}`);
      return;
    }

    const subscription = clientRef.current.subscribe(topic, (message: IMessage) => {
      const data: ConversationMessageResponse = JSON.parse(message.body);
      console.log('📩 Nuevo mensaje recibido:', data);
      onMessage(data);
    });

    subscriptionsRef. current[topic] = subscription;
    console.log(`✅ Suscrito a mensajes: ${topic}`);
  }, [connected]);

  // Desuscribirse de una conversación
  const unsubscribeFromConversation = useCallback((conversationId: string) => {
    const topic = `/topic/conversations/${conversationId}`;
    
    if (subscriptionsRef. current[topic]) {
      subscriptionsRef.current[topic]. unsubscribe();
      delete subscriptionsRef.current[topic];
      console.log(`❌ Desuscrito de ${topic}`);
    }
  }, []);

  // Suscribirse a eventos de "escribiendo"
  const subscribeToTyping = useCallback((
    conversationId: string,
    onTyping: (data: TypingRequest) => void
  ) => {
    if (!clientRef.current || !connected) return;

    const topic = `/topic/conversations/${conversationId}/typing`;
    
    if (subscriptionsRef.current[topic]) return;

    const subscription = clientRef.current.subscribe(topic, (message: IMessage) => {
      const data: TypingRequest = JSON.parse(message.body);
      console.log('✍️ Usuario escribiendo:', data);
      
      // Actualizar estado de usuarios escribiendo
      setTypingUsers(prev => {
        const current = prev[conversationId] || [];
        if (data.isTyping && data.userId) {
          // Agregar usuario si está escribiendo
          return {
            ...prev,
            [conversationId]: current.includes(data.userId) 
              ? current 
              : [...current, data. userId]
          };
        } else if (data.userId) {
          // Remover usuario si dejó de escribir
          return {
            ...prev,
            [conversationId]: current.filter(id => id !== data.userId)
          };
        }
        return prev;
      });
      
      onTyping(data);
    });

    subscriptionsRef.current[topic] = subscription;
    console.log(`✅ Suscrito a typing: ${topic}`);
  }, [connected]);

  // Suscribirse a confirmaciones de lectura
  const subscribeToReadReceipts = useCallback((
    conversationId: string,
    onRead: (data: ReadRequest) => void
  ) => {
    if (!clientRef.current || ! connected) return;

    const topic = `/topic/conversations/${conversationId}/receipts`;
    
    if (subscriptionsRef.current[topic]) return;

    const subscription = clientRef.current.subscribe(topic, (message: IMessage) => {
      const data: ReadRequest = JSON.parse(message.body);
      console.log('✅ Mensaje leído:', data);
      onRead(data);
    });

    subscriptionsRef.current[topic] = subscription;
    console. log(`✅ Suscrito a receipts: ${topic}`);
  }, [connected]);

  // Enviar un mensaje
  const sendMessage = useCallback((conversationId: string, text: string) => {
    if (!clientRef.current || !connected) {
      console.error('❌ No se puede enviar mensaje: WebSocket no conectado');
      return;
    }

    const message: ConversationMessageRequest = {
      conversationId,
      text
      // authorId se establece automáticamente en el backend desde el header
    };

    clientRef. current.publish({
      destination: '/app/sendMessage',
      body: JSON. stringify(message),
      headers: {
        userId: userId
      }
    });

    console.log('📤 Mensaje enviado:', message);
  }, [connected, userId]);

  // Enviar evento de "escribiendo"
  const sendTyping = useCallback((conversationId: string, isTyping: boolean) => {
    if (!clientRef.current || !connected) return;

    const typingData: TypingRequest = {
      conversationId,
      isTyping
      // userId se establece automáticamente en el backend
    };

    clientRef.current.publish({
      destination: '/app/typing',
      body: JSON.stringify(typingData),
      headers: {
        userId: userId
      }
    });

    console.log(`✍️ Estado typing enviado: ${isTyping ? 'escribiendo' : 'detenido'}`);
  }, [connected, userId]);

  // Marcar mensaje como leído
  const markAsRead = useCallback((conversationId: string, messageId: string) => {
    if (!clientRef.current || !connected) return;

    const readData: ReadRequest = {
      conversationId,
      messageId
      // userId se establece automáticamente en el backend
    };

    clientRef.current.publish({
      destination: '/app/markAsRead',
      body: JSON. stringify(readData),
      headers: {
        userId: userId
      }
    });

    console.log('✅ Marcando mensaje como leído:', messageId);
  }, [connected, userId]);

  return {
    connected,
    typingUsers,
    subscribeToConversation,
    unsubscribeFromConversation,
    subscribeToTyping,
    subscribeToReadReceipts,
    sendMessage,
    sendTyping,
    markAsRead
  };
};