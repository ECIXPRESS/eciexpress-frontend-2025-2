import { ConversationResponse } from '../types/chat.types';

interface Props {
  conversation: ConversationResponse;
  isActive: boolean;
  onClick: () => void;
  currentUserId: string;
  getUserName:  (userId: string) => string;  
}

const ConversationItem = ({ conversation, isActive, onClick, currentUserId, getUserName }: Props) => {
  
  // ⭐ FUNCIÓN ACTUALIZADA
  const getConversationName = () => {
    const userIds = conversation.usersIds || [];
    const otherUserId = userIds.find((id: string) => id !== currentUserId);
    
    if (otherUserId) {
      return getUserName(otherUserId);
    }
    
    return conversation.conversationId?. slice(0, 8) || 'Chat';
  };

  const getInitial = () => {
    const name = getConversationName();
    return name[0]?.toUpperCase() || 'C';
  };

  const getLastMessage = () => {
    if (conversation.messageResponses && conversation.messageResponses.length > 0) {
      const lastMsg = conversation.messageResponses[conversation.messageResponses.length - 1];
      return lastMsg. text?. slice(0, 40) || 'Sin mensajes';
    }
    return 'Sin mensajes';
  };

  const getLastMessageTime = () => {
    if (conversation.messageResponses && conversation.messageResponses.length > 0) {
      const lastMsg = conversation.messageResponses[conversation.messageResponses.length - 1];
      if (lastMsg.creationDate) {
        const date = new Date(lastMsg. creationDate);
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      }
    }
    return '';
  };

  const getUnreadCount = () => {
    if (conversation.messageResponses) {
      return conversation.messageResponses.filter(
        msg => ! msg.isRead && msg.authorId !== currentUserId
      ).length;
    }
    return 0;
  };

  const unreadCount = getUnreadCount();

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center space-x-3 p-4 cursor-pointer transition-colors border-b border-gray-100
        ${isActive ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'}
      `}
    >
      {/* Avatar */}
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0
        ${isActive ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'}
      `}>
        {getInitial()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-semibold truncate ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
            {getConversationName()}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {getLastMessageTime()}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {getLastMessage()}
        </p>
      </div>

      {/* Unread badge */}
      {unreadCount > 0 && (
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-white font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;