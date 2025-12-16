import { ConversationMessageResponse } from '../types/chat.types';
import MessageItem from './MessageItem';
import SystemMessage from './SystemMessage';
import { useEffect, useRef } from 'react';

interface Props {
  messages: ConversationMessageResponse[];
  currentUserId: string;
  loading?:  boolean;
}

const MessageList = ({ messages, currentUserId, loading }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return null;
  }

  // Agrupar mensajes por fecha
  const groupedMessages:  { [key: string]: ConversationMessageResponse[] } = {};
  messages.forEach(msg => {
    const date = new Date(msg.creationDate || '').toLocaleDateString('es-ES', {
      day: '2-digit',
      month:  '2-digit',
      year: 'numeric'
    });
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(msg);
  });

  return (
    <div className="py-4">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          {/* Fecha */}
          <SystemMessage text={date} type="date" />
          
          {/* Mensajes de ese día */}
          {msgs. map((message) => (
            <MessageItem
              key={message.messageId}
              message={message}
              isOwn={message.authorId === currentUserId}
              senderName={message.authorId. slice(0, 8)}
            />
          ))}
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;