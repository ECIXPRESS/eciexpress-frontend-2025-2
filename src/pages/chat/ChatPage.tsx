import { useState, useEffect, useRef, useMemo } from 'react';
import ConversationList from './components/ConversationList';
import MessageList from './components/MessageList';
import TypingIndicator from './components/TypingIndicator';
import { ConversationResponse } from '@/types/chat.types';
import { useAuth } from '@/pages/login/hooks/useAuth';
import { useConversations } from './hooks/useConversations';
import { useWebSocket } from './hooks/useWebSocket';
import { useUsers } from './hooks/useUsers';
import { toast } from 'react-toastify';

const ChatPage = () => {
  const { user } = useAuth();
  const [currentConversation, setCurrentConversation] = useState<ConversationResponse | null>(null);
  const [showContacts, setShowContacts] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userId = user?.userId || 'd66d2d30-56cb-410b-a5f0-9191c38f380e';
  
  const { 
    conversations,
    messages, 
    loading, 
    selectConversation, 
    addMessage,
    markMessageAsRead:  markLocalAsRead
  } = useConversations(userId);

  const allUserIds = useMemo(() => {
    const ids = new Set<string>();
    conversations.forEach(conv => {
      const userIds = conv.usersIds || [];
      userIds.forEach((id: string) => {
        if (id !== userId) ids.add(id);
      });
    });
    return Array.from(ids);
  }, [conversations, userId]);

  const { getUserName } = useUsers(allUserIds);

  const { 
    connected, 
    error:  wsError, 
    sendMessage:  sendWebSocketMessage,
    sendTyping,
    markAsRead,
    subscribeToConversation,
    unsubscribeFromConversation
  } = useWebSocket({
    userId,
    onMessageReceived: (message) => {
      console.log('📩 [ChatPage] Mensaje recibido:', message);
      addMessage(message);
      
      if (currentConversation?.conversationId === message.conversationId && message.authorId !== userId) {
        setTimeout(() => {
          markAsRead(message.messageId, message.conversationId);
        }, 500);
      }
    },
    onTyping: (data) => {
      console.log('⌨️ [ChatPage] Typing recibido:', data);
      if (data.userId !== userId && data.conversationId === currentConversation?.conversationId) {
        setOtherUserTyping(data.isTyping);
        
        if (data.isTyping) {
          setTimeout(() => setOtherUserTyping(false), 3000);
        }
      }
    },
    onMessageRead: (data) => {
      console.log('✅ [ChatPage] Message read:', data);
      if (data.conversationId === currentConversation?. conversationId) {
        markLocalAsRead(data.messageId);
      }
    }
  });

  useEffect(() => {
    if (currentConversation && connected) {
      console.log('📡 [ChatPage] Suscribiéndose a conversación:', currentConversation.conversationId);
      subscribeToConversation(currentConversation.conversationId);
      
      return () => {
        console.log('📡 [ChatPage] Desuscribiéndose de conversación:', currentConversation.conversationId);
        unsubscribeFromConversation(currentConversation. conversationId);
      };
    }
  }, [currentConversation, connected]);

  useEffect(() => {
    if (connected) {
      console.log('✅ [ChatPage] WebSocket conectado');
    } else {
      console.log('⚠️ [ChatPage] WebSocket desconectado');
    }
  }, [connected]);

  useEffect(() => {
    if (wsError) {
      toast.error(`Error WebSocket: ${wsError}`);
    }
  }, [wsError]);

  const handleSelectConversation = async (conversation: ConversationResponse) => {
    setCurrentConversation(conversation);
    await selectConversation(conversation);
  };

  const handleInputChange = (e: React. ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageText(value);

    if (! currentConversation || ! connected) return;

    if (value.trim() && !isTyping) {
      setIsTyping(true);
      sendTyping(currentConversation.conversationId, true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef. current = setTimeout(() => {
      setIsTyping(false);
      sendTyping(currentConversation.conversationId, false);
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (!currentConversation) {
      toast.error('Selecciona una conversación primero');
      return;
    }

    if (! messageText.trim()) {
      toast.warning('Escribe un mensaje');
      return;
    }

    if (! connected) {
      toast.error('WebSocket no conectado.  Reconectando...');
      return;
    }

    if (isTyping) {
      setIsTyping(false);
      sendTyping(currentConversation. conversationId, false);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setSending(true);
    try {
      sendWebSocketMessage(currentConversation. conversationId, messageText);
      setMessageText('');
      console.log('✅ [ChatPage] Mensaje enviado por WebSocket');
    } catch (error) {
      console.error('❌ [ChatPage] Error al enviar mensaje:', error);
      toast.error('Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConversationName = (conversation: ConversationResponse) => {
    const userIds = conversation.usersIds || [];
    const otherUserId = userIds.find((id: string) => id !== userId);
    
    if (otherUserId) {
      return getUserName(otherUserId);
    }
    
    return 'Conversación';
  };

  return (
    <div className="absolute inset-0 md:left-20 flex overflow-hidden bg-gray-50">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">Chats</h1>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Ordenar">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Filtrar">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Calendario">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ConversationList
            userId={userId}
            currentConversation={currentConversation}
            onSelectConversation={handleSelectConversation}
            conversations={conversations}
            loading={loading}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {currentConversation ?  (
          <div className="flex-1 flex flex-col h-full">
            <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <span className="text-white font-bold text-sm">
                    {getConversationName(currentConversation)[0]?.toUpperCase() || 'C'}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {getConversationName(currentConversation)}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full px-6 space-y-3">
                  <p className="text-sm text-gray-400 font-medium">
                    {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Te has unido a una conversación con {getConversationName(currentConversation)}
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Pedido aceptado
                  </p>
                </div>
              )}
              
              <MessageList
                messages={messages}
                currentUserId={userId}
                loading={loading}
              />
              
              <TypingIndicator show={otherUserTyping} />
            </div>

            <div className="p-4 bg-white flex-shrink-0">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={messageText}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={sending || ! connected}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sending || !connected || !messageText.trim()}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all transform
                    ${sending || !connected || !messageText.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-cyan-400 text-white hover:bg-cyan-500 hover:scale-105 active:scale-95'
                    }
                  `}
                >
                  {sending ?  (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1. 6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12 L5 4 Q7 6. 4 8. 5 9. 3 L10 12 L8.5 14. 7 Q7 17. 6 5 20 L22 12 Z" />
                      <path d="M22 12 L10 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4 max-w-md">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                💬
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Selecciona un chat
              </h3>
              <p className="text-gray-500 text-sm">
                Elige una conversación para empezar a chatear
              </p>
            </div>
          </div>
        )}
      </div>

      {showContacts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Contactos</h3>
                <button
                  onClick={() => setShowContacts(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-2xl"
                >
                  ✖️
                </button>
              </div>
            </div>
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
                👥
              </div>
              <p className="text-gray-600">
                Lista de contactos próximamente
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;