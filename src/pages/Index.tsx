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

  const handleConnectPayman = () => {
    const clientId = import.meta.env.VITE_PAYMAN_CLIENT_ID;
    const redirectUri = encodeURIComponent(window.location.origin + '/oauth-callback');
    const oauthUrl = `https://app.paymanai.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=payments`;
    window.location.href = oauthUrl;
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
    return <Landing onStartPitching={handleStartPitching} onConnectPayman={handleConnectPayman} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-4xl flex flex-col flex-1 bg-white/95 rounded-2xl border border-gray-200 shadow-xl overflow-hidden min-h-[80vh]">
        <ChatHeader onBackToLanding={handleBackToLanding} />
        <ChatContent
          messages={messages}
          paymentResult={paymentResult}
          walletAddress={walletAddress}
          chatState={chatState}
          isLoading={isLoading}
          onWalletSubmit={handleWalletSubmit}
        />
        {chatState === 'complete' ? (
          <div className="flex justify-center mt-6 mb-4">
            <button
              onClick={handleBackToLanding}
              className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        ) : (
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={shouldDisableChatInput(chatState, isLoading)}
            placeholder={getChatPlaceholder(chatState)}
          />
        )}
      </div>
      {/* Footer */}
      <div className="bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-slate-500">
            Built with Payman SDK
            by @rajoninternet

          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
