
import React, { useState } from 'react';
import ChatInput from '@/components/ChatInput';
import Landing from '@/components/Landing';
import ChatHeader from '@/components/ChatHeader';
import ChatContent from '@/components/ChatContent';
import { useChatState } from '@/hooks/useChatState';
import { handleInitialPitch, handleQuestionAnswer, handlePayment } from '@/utils/chatHandlers';
import { getChatPlaceholder, shouldDisableChatInput } from '@/utils/chatPlaceholders';

type AppState = 'landing' | 'chat';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const {
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
  } = useChatState();

  const handleStartPitching = () => {
    setAppState('chat');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    resetChatState();
  };

  const handleSendMessage = async (message: string) => {
    addMessage(message, true);
    setIsLoading(true);

    try {
      if (chatState === 'initial') {
        await handleInitialPitch(
          message,
          setChatState,
          setQuestions,
          setCurrentQuestionIndex,
          addMessage
        );
      } else if (chatState === 'asking') {
        await handleQuestionAnswer(
          message,
          answers,
          currentQuestionIndex,
          questions,
          setAnswers,
          setCurrentQuestionIndex,
          setChatState,
          setEvaluation,
          addMessage
        );
      }
    } catch (error) {
      console.error('Error handling message:', error);
      addMessage("Sorry, something went wrong. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletSubmit = async (address: string) => {
    setIsLoading(true);
    
    try {
      await handlePayment(
        address,
        setWalletAddress,
        setChatState,
        setPaymentResult,
        addMessage
      );
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
    <div className="min-h-screen flex flex-col bg-white">
      <ChatHeader onBackToLanding={handleBackToLanding} />
      
      <ChatContent
        messages={messages}
        paymentResult={paymentResult}
        walletAddress={walletAddress}
        chatState={chatState}
        isLoading={isLoading}
        onWalletSubmit={handleWalletSubmit}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={shouldDisableChatInput(chatState, isLoading)}
        placeholder={getChatPlaceholder(chatState)}
      />

      {/* Footer */}
      <div className="bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-slate-500">
            Built with Gemini Pro + Payman SDK
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
