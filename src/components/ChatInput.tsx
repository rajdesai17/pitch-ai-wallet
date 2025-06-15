import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Describe your startup idea..."
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4 shadow-[0_-2px_16px_0_rgba(30,41,59,0.06)] z-10">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
        <Input
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          className="flex-1 border-gray-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-300 rounded-full px-6 py-3 bg-white/80 transition-all duration-200 shadow-sm"
        />
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="bg-slate-900 hover:bg-slate-800 rounded-full w-12 h-12 p-0 shadow-md focus:ring-2 focus:ring-slate-400 focus:outline-none transition-all duration-200"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
