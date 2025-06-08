
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[85%] p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]",
        isUser 
          ? "bg-slate-900 text-white rounded-br-md shadow-sm" 
          : "bg-white/80 backdrop-blur-sm rounded-bl-md border border-gray-100 shadow-sm"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message}</p>
        {timestamp && (
          <p className="text-xs opacity-60 mt-3 font-light">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
