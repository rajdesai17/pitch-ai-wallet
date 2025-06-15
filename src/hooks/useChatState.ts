import { useState } from 'react';
import { Message, PitchEvaluation, PaymentResult } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';

export type ChatState = 'initial' | 'asking' | 'evaluating' | 'wallet' | 'payment' | 'complete';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "👋 Hey there! I’m AgentVC – your playful AI venture capitalist.\n\nPitch me your startup idea, and I’ll ask a few sharp questions to see if it’s fund-worthy. If you score 4 or above, I’ll drop some TSD (test dollars) via Payman 💸.\n\nSo… what’s your startup idea?",
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
      id: uuidv4(),
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
        id: uuidv4(),
        content: "👋 Hey there! I’m AgentVC – your playful AI venture capitalist.\n\nPitch me your startup idea, and I’ll ask a few sharp questions to see if it’s fund-worthy. If you score 4 or above, I’ll drop some TSD (test dollars) via Payman 💸.\n\nSo… what’s your startup idea?",
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
