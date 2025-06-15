
import { askGeminiApi, evaluateGeminiApi, payWithPayman } from './mockApi';
import type { PitchEvaluation, PaymentResult } from '../types/chat';

export const handleInitialPitch = async (
  message: string,
  setChatState: (state: string) => void,
  setQuestions: (questions: string[]) => void,
  setCurrentQuestionIndex: (index: number) => void,
  addMessage: (content: string, isUser: boolean) => void
) => {
  setChatState('asking');
  const followUpQuestions = await askGeminiApi(message);
  setQuestions(followUpQuestions);
  setCurrentQuestionIndex(0);
  
  const questionsText = `Great pitch! I have some follow-up questions:\n\n1. ${followUpQuestions[0]}`;
  addMessage(questionsText, false);
};

export const handleQuestionAnswer = async (
  message: string,
  answers: string[],
  currentQuestionIndex: number,
  questions: string[],
  setAnswers: (answers: string[]) => void,
  setCurrentQuestionIndex: (index: number) => void,
  setChatState: (state: string) => void,
  setEvaluation: (evaluation: PitchEvaluation) => void,
  addMessage: (content: string, isUser: boolean) => void
) => {
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
    const pitchEvaluation = await evaluateGeminiApi(newAnswers);
    setEvaluation(pitchEvaluation);
    
    const evaluationText = `Score: ${pitchEvaluation.score}/10\n${pitchEvaluation.feedback}`;
    addMessage(evaluationText, false);
    
    if (pitchEvaluation.score >= 4) {
      setChatState('wallet');
    } else {
      setChatState('complete');
      addMessage("Thanks for pitching! While this idea didn't qualify for funding this time, keep iterating and come back with your next idea! 🚀", false);
    }
  }
};

export const handlePayment = async (
  payeeId: string,
  setWalletAddress: (address: string) => void,
  setChatState: (state: string) => void,
  setPaymentResult: (result: PaymentResult) => void,
  addMessage: (content: string, isUser: boolean) => void
) => {
  setWalletAddress(payeeId);
  setChatState('payment');
  
  addMessage(`Payee ID received: ${payeeId}`, true);
  addMessage("Processing payment via Payman AI... 💳", false);

  const payment = await payWithPayman(payeeId);
  setPaymentResult(payment);
  setChatState('complete');
  
  if (payment.success) {
    addMessage("🎉 Congratulations! Your funding has been sent successfully via Payman AI. Check your account and good luck with your startup journey!", false);
  } else {
    addMessage("Payment failed. Please try again or contact support.", false);
  }
};
