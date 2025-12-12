import { useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import ConversationItem from './ConversationItem';
import { ConversationResponse } from '@/types/chat.types';

interface Props {
  userId: string;
  currentConversation: ConversationResponse | null;
  onSelectConversation: (conversation:  ConversationResponse) => void;
  conversations: ConversationResponse[];
  loading?:  boolean;
}

const ConversationList = ({ 
  userId, 
  currentConversation, 
  onSelectConversation,
  conversations,
  loading = false
}: Props) => {

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="text-6xl mb-4">💬</div>
        <p className="text-gray-500 text-center">
          No tienes conversaciones aún
        </p>
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
          currentUserId={userId}
          getUserName={getUserName}
        />
      ))}
    </div>
  );
};

export default ConversationList;