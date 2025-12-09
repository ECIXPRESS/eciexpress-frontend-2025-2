import { ConversationResponse } from '@/types/chat.types';

interface Props {
  conversation: ConversationResponse;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conversation, isActive, onClick }: Props) => {
  const lastMessage = conversation.messageResponses?.[conversation.messageResponses.length - 1];
  const unreadCount = conversation.messageResponses?.filter(m => !m.isRead).length || 0;

  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('es-ES', { day: '2-digit', month:  '2-digit' });
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 border-b border-gray-100 cursor-pointer transition-colors
        ${isActive ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'}
      `}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
            {conversation.conversationId?.[0]?.toUpperCase() || 'C'}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold truncate ${isActive ? 'text-blue-600' : 'text-gray-800'}`}>
              {conversation.conversationId || 'Conversación'}
            </h3>
            {lastMessage && (
              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                {formatTime(lastMessage.creationDate)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 truncate">
              {lastMessage?.text || 'No hay mensajes'}
            </p>
            {unreadCount > 0 && (
              <span className="ml-2 flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;