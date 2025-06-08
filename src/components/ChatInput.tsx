
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
    <div className="sticky bottom-0 w-full bg-background/80 backdrop-blur-lg border-t border-white/10 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
        <Input
          type="text"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          className="flex-1 glass border-white/20 text-white placeholder:text-white/60 rounded-full px-6"
        />
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="gradient-primary rounded-full w-12 h-12 p-0"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
