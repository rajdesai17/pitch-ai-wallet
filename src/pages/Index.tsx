import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import WalletInput from '@/components/WalletInput';
import PaymentCard from '@/components/PaymentCard';
import Landing from '@/components/Landing';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Message, PitchEvaluation, PaymentResult } from '@/types/chat';
import { mockAskApi, mockEvaluateApi, mockPayApi } from '@/utils/mockApi';

type ChatState = 'initial' | 'asking' | 'evaluating' | 'wallet' | 'payment' | 'complete';
type AppState = 'landing' | 'chat';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartPitching = () => {
    setAppState('chat');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    // Reset chat state
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

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (message: string) => {
    addMessage(message, true);
    setIsLoading(true);

    try {
      if (chatState === 'initial') {
        // Initial pitch received, ask follow-up questions
        setChatState('asking');
        const followUpQuestions = await mockAskApi(message);
        setQuestions(followUpQuestions);
        setCurrentQuestionIndex(0);
        
        const questionsText = `Great pitch! I have some follow-up questions:\n\n1. ${followUpQuestions[0]}`;
        addMessage(questionsText, false);
      } else if (chatState === 'asking') {
        // Store answer and ask next question or evaluate
        const newAnswers = [...answers, message];
        setAnswers(newAnswers);
        
        if (currentQuestionIndex < questions.length - 1) {
          // Ask next question
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          const nextQuestion = `${nextIndex + 1}. ${questions[nextIndex]}`;
          addMessage(nextQuestion, false);
        } else {
          // All questions answered, evaluate
          setChatState('evaluating');
          const pitchEvaluation = await mockEvaluateApi(newAnswers);
          setEvaluation(pitchEvaluation);
          
          const evaluationText = `## Evaluation Complete! 📊\n\n**Score: ${pitchEvaluation.score}/10**\n\n${pitchEvaluation.feedback}`;
          addMessage(evaluationText, false);
          
          if (pitchEvaluation.score >= 7.5) {
            setChatState('wallet');
          } else {
            setChatState('complete');
            addMessage("Thanks for pitching! While this idea didn't qualify for funding this time, keep iterating and come back with your next idea! 🚀", false);
          }
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
      addMessage("Sorry, something went wrong. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletSubmit = async (address: string) => {
    setWalletAddress(address);
    setChatState('payment');
    setIsLoading(true);
    
    addMessage(`Wallet address received: ${address}`, true);
    addMessage("Processing payment... 💳", false);

    try {
      const payment = await mockPayApi(address);
      setPaymentResult(payment);
      setChatState('complete');
      
      if (payment.success) {
        addMessage("🎉 Congratulations! Your funding has been sent successfully. Check your wallet and good luck with your startup journey!", false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      addMessage("Payment failed. Please try again or contact support.", false);
    } finally {
      setIsLoading(false);
    }
  };

  if (appState === 'landing') {
    return <Landing onStartPitching={handleStartPitching} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="glass border-b border-white/10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToLanding}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                💼 InvestorBot
              </h1>
              <p className="text-sm text-muted-foreground">AI-Powered Startup Pitch Evaluator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
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
            onWalletSubmit={handleWalletSubmit}
            isVisible={chatState === 'wallet'}
          />
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="glass p-6 rounded-2xl rounded-bl-md border max-w-[80%]">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  <span className="text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading || chatState === 'wallet' || chatState === 'payment'}
        placeholder={
          chatState === 'initial' 
            ? "Describe your startup idea..." 
            : chatState === 'asking'
            ? "Answer the question above..."
            : chatState === 'wallet'
            ? "Please enter your wallet address above"
            : "Chat completed!"
        }
      />

      {/* Footer */}
      <div className="glass border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Built with Gemini Pro + Payman SDK
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
