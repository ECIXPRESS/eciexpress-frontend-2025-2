import { useState, useEffect, useRef, useMemo } from 'react';
import ConversationList from './components/ConversationList';
import MessageList from './components/MessageList';
import TypingIndicator from './components/TypingIndicator';
import { ConversationResponse, ConversationMessageResponse } from './types/chat.types';
import { toast } from 'react-toastify';

// Respuestas automáticas del bot
const AUTO_RESPONSES = [
  "En este momento tu pedido está siendo realizado, si ocurre alguna novedad, te avisaremos 📦",
  "En este momento tenemos muchas órdenes, tu pedido puede sufrir un poco de retraso ⏰",
  "Tu pedido va en camino, llegaremos en aproximadamente 20 minutos 🚗",
  "¡Todo va perfecto! Tu pedido está siendo preparado con mucho cuidado 👨‍🍳",
  "Estamos verificando tu pedido, cualquier actualización te la haremos saber 📋",
  "Hay un poco de tráfico, pero vamos en camino.  Gracias por tu paciencia 🛵",
  "Tu pedido ha sido confirmado y está en proceso ✅",
  "El repartidor salió con tu pedido, llegará pronto 🎯",
];

const userId = 'd66d2d30-56cb-410b-a5f0-9191c38f380e';

// IDs de los usuarios (restaurantes)
const HARVIES_USER_ID = 'Harvies';
const REGIO_USER_ID = 'Regio';

// Mapeo de IDs a nombres - EXPORTADO para que ConversationList lo pueda usar
export const MOCK_USER_NAMES:  Record<string, string> = {
  [HARVIES_USER_ID]:  'Harvies',
  [REGIO_USER_ID]: 'Regio',
};

const MOCK_CONVERSATIONS: ConversationResponse[] = [
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
  const [conversations] = useState<ConversationResponse[]>(MOCK_CONVERSATIONS);
  const [currentConversation, setCurrentConversation] = useState<ConversationResponse | null>(null);
  const [allMessages, setAllMessages] = useState<Record<string, ConversationMessageResponse[]>>({});
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoResponseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const messages = currentConversation ?  (allMessages[currentConversation. conversationId] || []) : [];

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (autoResponseTimeoutRef.current) {
        clearTimeout(autoResponseTimeoutRef. current);
      }
    };
  }, []);

  const handleSelectConversation = (conversation: ConversationResponse) => {
    setCurrentConversation(conversation);
    if (! allMessages[conversation.conversationId]) {
      setAllMessages(prev => ({
        ...prev,
        [conversation.conversationId]: []
      }));
    }
  };

  const handleInputChange = (e: React. ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageText(value);

    if (! currentConversation) return;

    if (value.trim() && ! isTyping) {
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
    if (!currentConversation) return;

    const randomResponse = AUTO_RESPONSES[Math.floor(Math.random() * AUTO_RESPONSES.length)];
    const otherUserId = currentConversation.usersIds. find((id:  string) => id !== userId);
    
    if (! otherUserId) return;

    const responseMessage: ConversationMessageResponse = {
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
        ...(prev[currentConversation. conversationId] || []),
        responseMessage
      ]
    }));
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

    if (isTyping) {
      setIsTyping(false);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setSending(true);

    try {
      const newMessage: ConversationMessageResponse = {
        messageId: `msg-${Date.now()}`,
        conversationId: currentConversation.conversationId,
        authorId: userId,
        text: messageText,
        creationDate: new Date().toISOString(),
        isRead: true,
      };

      setAllMessages(prev => ({
        ... prev,
        [currentConversation.conversationId]: [
          ...(prev[currentConversation. conversationId] || []),
          newMessage
        ]
      }));
      
      setMessageText('');

      // Delay entre 3-6 segundos antes de mostrar el typing
      const delay = 3000 + Math.random() * 3000;
      
      autoResponseTimeoutRef.current = setTimeout(() => {
        setOtherUserTyping(true);
        
        // El typing dura entre 2-4 segundos
        setTimeout(() => {
          setOtherUserTyping(false);
          generateAutoResponse();
        }, 2000 + Math.random() * 2000);
      }, delay);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
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
      return MOCK_USER_NAMES[otherUserId] || 'Conversación';
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
            loading={false}
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
                  <p className="text-xs text-gray-500">En línea</p>
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
                    Pedido aceptado ✅
                  </p>
                </div>
              )}
              
              <MessageList
                messages={messages}
                currentUserId={userId}
                loading={false}
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
                  disabled={sending}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled: bg-gray-100 disabled:cursor-not-allowed text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sending || !messageText.trim()}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all transform
                    ${sending || !messageText.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-cyan-400 text-white hover:bg-cyan-500 hover:scale-105 active:scale-95'
                    }
                  `}
                >
                  {sending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12 L5 4 Q7 6. 4 8. 5 9.3 L10 12 L8.5 14.7 Q7 17.6 5 20 L22 12 Z" />
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
    </div>
  );
};

export default ChatPage;