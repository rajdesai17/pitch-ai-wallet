
import { useState } from 'react';
import { Message, PitchEvaluation, PaymentResult } from '@/types/chat';

type ChatState = 'initial' | 'asking' | 'evaluating' | 'wallet' | 'payment' | 'complete';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hi! I'm InvestorBot, your AI startup evaluator.\n\nPitch me your startup idea and I'll ask follow-up questions to evaluate if it's investment-worthy. Strong ideas (7.5+/10) receive test funding via Payman!\n\nWhat's your startup idea?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [chatState, setChatState] = useState<ChatState>('initial');
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [evaluation, setEvaluation] = useState<PitchEvaluation | null>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const resetChatState = () => {
    setChatState('initial');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setEvaluation(null);
    setPaymentResult(null);
    setWalletAddress('');
    setMessages([
      {
        id: '1',
        content: "👋 Hi! I'm InvestorBot, your AI startup evaluator.\n\nPitch me your startup idea and I'll ask follow-up questions to evaluate if it's investment-worthy. Strong ideas (7.5+/10) receive test funding via Payman!\n\nWhat's your startup idea?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return {
    messages,
    chatState,
    setChatState,
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    evaluation,
    setEvaluation,
    paymentResult,
    setPaymentResult,
    walletAddress,
    setWalletAddress,
    isLoading,
    setIsLoading,
    addMessage,
    resetChatState
  };
};
