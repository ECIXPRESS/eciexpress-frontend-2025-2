import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { ConversationMessageResponse } from '@/types/chat.types';

interface UseWebSocketProps {
  userId: string;
  onMessageReceived?:  (message: ConversationMessageResponse) => void;
}

export const useWebSocket = ({ userId, onMessageReceived }:  UseWebSocketProps) => {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subscriptionsRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (!userId) return;

    console.log('🔌 [WebSocket] Conectando... ', userId);

    const socket = new SockJS('http://localhost:8081/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
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
      console.log('🔌 [WebSocket] Desconectando...');
      subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
      subscriptionsRef.current.clear();
      stompClient.deactivate();
    };
  }, [userId]);

  const subscribeToConversation = (conversationId: string) => {
    if (!clientRef.current || !connected) {
      console.warn('⚠️ [WebSocket] No conectado, no se puede suscribir');
      return;
    }

    // Desuscribirse si ya estaba suscrito
    if (subscriptionsRef.current.has(conversationId)) {
      console.log('⚠️ [WebSocket] Ya suscrito a:', conversationId);
      return;
    }

    const destination = `/topic/conversations/${conversationId}`;
    console.log('📡 [WebSocket] Suscribiéndose a:', destination);

    const subscription = clientRef.current.subscribe(destination, (message:  IMessage) => {
      console.log('📩 [WebSocket] Mensaje recibido:', message.body);
      try {
        const data:  ConversationMessageResponse = JSON. parse(message.body);
        onMessageReceived?.(data);
      } catch (err) {
        console.error('❌ [WebSocket] Error al parsear mensaje:', err);
      }
    });

    subscriptionsRef.current.set(conversationId, subscription);
  };

  const unsubscribeFromConversation = (conversationId: string) => {
    const subscription = subscriptionsRef.current.get(conversationId);
    if (subscription) {
      console.log('📡 [WebSocket] Desuscribiéndose de:', conversationId);
      subscription.unsubscribe();
      subscriptionsRef.current.delete(conversationId);
    }
  };

  const sendMessage = (conversationId:  string, text: string) => {
    if (!clientRef.current || !connected) {
      console.error('❌ [WebSocket] No conectado');
      throw new Error('WebSocket no conectado');
    }

    const message = {
      authorId: userId,
      conversationId: conversationId,
      text: text. trim()
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

  return {
    connected,
    error,
    sendMessage,
    subscribeToConversation,
    unsubscribeFromConversation
  };
};