import { useEffect } from 'react';
import { useConversations } from '../hooks/useConversations';
import { ConversationResponse } from '@/types/chat.types';
import ConversationItem from './ConversationItem';

interface Props {
  userId: string;
  currentConversation: ConversationResponse | null;
  onSelectConversation: (conversation: ConversationResponse) => void;
}

const ConversationList = ({ userId, currentConversation, onSelectConversation }: Props) => {
  const { conversations, loading, error, fetchConversations } = useConversations(userId);

  useEffect(() => {
    fetchConversations();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 mb-2">Error al cargar conversaciones</p>
        <button
          onClick={() => fetchConversations()}
          className="text-sm text-blue-600 hover: underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-700 mb-1">No hay conversaciones</h3>
        <p className="text-sm text-gray-500">Inicia un nuevo chat para comenzar</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.conversationId}
          conversation={conversation}
          isActive={currentConversation?.conversationId === conversation.conversationId}
          onClick={() => onSelectConversation(conversation)}
        />
      ))}
    </div>
  );
};

export default ConversationList;