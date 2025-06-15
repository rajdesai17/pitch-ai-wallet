import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={cn(
      'flex w-full items-end gap-2',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {/* AI avatar left, User avatar right */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shadow-md">
            AI
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={cn(
          'max-w-[85%] p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]',
          isUser
            ? 'bg-slate-900 text-white rounded-br-md shadow-sm'
            : 'bg-white/80 backdrop-blur-sm rounded-bl-md border border-gray-100 shadow-sm'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message}</p>
        {timestamp && (
          <p className="text-xs opacity-60 mt-3 font-light">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </motion.div>
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-md">
            U
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
