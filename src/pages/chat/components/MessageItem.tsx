import { ConversationMessageResponse } from '../types/chat.types';

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
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 px-6`}>
      <div className={`max-w-[70%]`}>
        <div
          className={`
            px-5 py-3 rounded-2xl
            ${isOwn 
              ? 'bg-white text-gray-900 rounded-br-md shadow-sm' 
              : 'bg-gray-300 text-gray-900 rounded-bl-md'
            }
          `}
        >
          <p className="text-[15px] leading-relaxed">
            {message.text}
          </p>
        </div>
        
        {/* Timestamp debajo del mensaje */}
        <div className={`flex items-center mt-1 px-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">
            {formatTime(message.creationDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;