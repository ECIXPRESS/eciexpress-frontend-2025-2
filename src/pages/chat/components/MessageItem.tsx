import { ConversationMessageResponse } from '@/types/chat.types';

interface Props {
  message: ConversationMessageResponse;
  isOwn: boolean;
  senderName?:  string;
}

const MessageItem = ({ message, isOwn, senderName }: Props) => {
  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute:  '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 px-4`}>
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[70%]`}>
        {/* Avatar */}
        {! isOwn && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 mb-1">
            {senderName?.[0]?.toUpperCase() || 'U'}
          </div>
        )}

        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Nombre del remitente (solo si no es propio) */}
          {!isOwn && senderName && (
            <span className="text-xs text-gray-500 mb-1 px-2">
              {senderName}
            </span>
          )}

          {/* Burbuja del mensaje */}
          <div
            className={`
              relative px-4 py-2 rounded-2xl shadow-sm
              ${isOwn 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
              }
            `}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {message. text}
            </p>

            {/* Timestamp */}
            <div className={`flex items-center space-x-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <span className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                {formatTime(message.creationDate)}
              </span>

              {/* Estado de lectura (solo mensajes propios) */}
              {isOwn && (
                <span className="text-xs">
                  {message.isRead ? (
                    <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16. 707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;