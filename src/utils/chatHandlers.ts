
import { mockAskApi, mockEvaluateApi, mockPayApi } from './mockApi';

export const handleInitialPitch = async (
  message: string,
  setChatState: (state: any) => void,
  setQuestions: (questions: string[]) => void,
  setCurrentQuestionIndex: (index: number) => void,
  addMessage: (content: string, isUser: boolean) => void
) => {
  setChatState('asking');
  const followUpQuestions = await mockAskApi(message);
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
  setChatState: (state: any) => void,
  setEvaluation: (evaluation: any) => void,
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
};

export const handlePayment = async (
  address: string,
  setWalletAddress: (address: string) => void,
  setChatState: (state: any) => void,
  setPaymentResult: (result: any) => void,
  addMessage: (content: string, isUser: boolean) => void
) => {
  setWalletAddress(address);
  setChatState('payment');
  
  addMessage(`Wallet address received: ${address}`, true);
  addMessage("Processing payment... 💳", false);

  const payment = await mockPayApi(address);
  setPaymentResult(payment);
  setChatState('complete');
  
  if (payment.success) {
    addMessage("🎉 Congratulations! Your funding has been sent successfully. Check your wallet and good luck with your startup journey!", false);
  }
};
