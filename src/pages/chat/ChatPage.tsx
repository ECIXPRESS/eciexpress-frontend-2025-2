import { useState } from 'react';
import ConversationList from './components/ConversationList';
import { ConversationResponse } from '@/types/chat.types';
import { useAuth } from '@/pages/login/hooks/useAuth';

const ChatPage = () => {
  const { user } = useAuth();
  const [currentConversation, setCurrentConversation] = useState<ConversationResponse | null>(null);
  const [showContacts, setShowContacts] = useState(false);

  const userId = user?.userId || 'd66d2d30-56cb-410b-a5f0-9191c38f380e';

  const getConversationName = (conversation: ConversationResponse) => {
    const id = conversation.conversationId || 'unknown';
    return `Conversación ${id. slice(0, 8)}`;
  };

  const getParticipantsCount = (conversation: ConversationResponse) => {
    if (Array.isArray((conversation as any).usersIds)) {
      return (conversation as any).usersIds.length;
    }
    if (Array.isArray((conversation as any).userIds)) {
      return (conversation as any).userIds.length;
    }
    if (Array.isArray((conversation as any).participants)) {
      return (conversation as any).participants.length;
    }
    return 2;
  };

  return (
    // ⭐ Contenedor absoluto que ocupa todo
    <div className="absolute inset-0 md:left-20 flex overflow-hidden bg-gray-50">
      {/* Sidebar de conversaciones - FIJO */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h. 01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold">Mensajes</h1>
                <p className="text-xs text-blue-100">Chat en tiempo real</p>
              </div>
            </div>
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Nuevo chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Lista de conversaciones */}
        <div className="flex-1 overflow-hidden">
          <ConversationList
            userId={userId}
            currentConversation={currentConversation}
            onSelectConversation={setCurrentConversation}
          />
        </div>
      </div>

      {/* ⭐ Área principal del chat - FLEX-1 ocupa todo el resto */}
      <div className="flex-1 flex flex-col bg-white">
        {currentConversation ? (
          <div className="flex-1 flex flex-col h-full">
            {/* Header de conversación */}
            <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {getConversationName(currentConversation)[0]}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {getConversationName(currentConversation)}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {getParticipantsCount(currentConversation)} participantes
                  </p>
                </div>
              </div>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h. 01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Cargando mensajes...
                </p>
                <p className="text-sm text-gray-500">
                  ID: {currentConversation.conversationId}
                </p>
              </div>
            </div>

            {/* Input de mensaje */}
            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
                <button
                  className="px-6 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed"
                  disabled
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-2">
                Funcionalidad de envío en desarrollo
              </p>
            </div>
          </div>
        ) : (
          // Estado vacío
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="text-center px-4 max-w-md">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h. 01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                ¡Bienvenido al Chat!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Selecciona una conversación de la lista para ver tus mensajes o inicia un nuevo chat
              </p>
              <button
                onClick={() => setShowContacts(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Nuevo Chat</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de contactos */}
      {showContacts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Contactos</h3>
                <button
                  onClick={() => setShowContacts(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
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