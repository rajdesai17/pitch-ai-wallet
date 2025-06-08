
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import PaymentCard from './PaymentCard';
import WalletInput from './WalletInput';
import { Message, PaymentResult } from '@/types/chat';

interface ChatContentProps {
  messages: Message[];
  paymentResult: PaymentResult | null;
  walletAddress: string;
  chatState: string;
  isLoading: boolean;
  onWalletSubmit: (address: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  paymentResult,
  walletAddress,
  chatState,
  isLoading,
  onWalletSubmit
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-32">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {/* Payment Card */}
        {paymentResult && walletAddress && (
          <PaymentCard
            amount={paymentResult.amount}
            transactionId={paymentResult.transactionId}
            walletAddress={walletAddress}
          />
        )}
        
        {/* Wallet Input */}
        <WalletInput
          onWalletSubmit={onWalletSubmit}
          isVisible={chatState === 'wallet'}
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl rounded-bl-md border border-gray-100 max-w-[80%]">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-700"></div>
                <span className="text-slate-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContent;
