
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
    <div className="sticky bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
        <Input
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          className="flex-1 border-gray-200 focus:border-slate-400 rounded-full px-6"
        />
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="bg-slate-900 hover:bg-slate-800 rounded-full w-12 h-12 p-0"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
