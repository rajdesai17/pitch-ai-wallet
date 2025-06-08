
import { PitchEvaluation, PaymentResult } from '@/types/chat';

// Mock follow-up questions
const mockQuestions = [
  "What's your target market size and how did you validate this problem exists?",
  "Who are your main competitors and what's your unique competitive advantage?",
  "What's your revenue model and how do you plan to scale?",
  "What's your team's background and why are you the right people to solve this?",
  "How much funding are you seeking and what will you use it for?"
];

// Mock API responses
export const mockAskApi = async (pitch: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return mockQuestions.slice(0, Math.floor(Math.random() * 2) + 4); // 4-5 questions
};

export const mockEvaluateApi = async (answers: string[]): Promise<PitchEvaluation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock scoring logic - random but weighted towards higher scores for demo
  const score = Math.floor(Math.random() * 3) + 7.5; // 7.5-10.5, then clamped
  const finalScore = Math.min(10, Math.max(1, score));
  
  const feedbacks = [
    "Strong market opportunity with clear differentiation. The team has relevant experience.",
    "Innovative solution but needs clearer monetization strategy. Market validation looks promising.",
    "Excellent product-market fit demonstrated. Impressive early traction and growth metrics.",
    "Solid execution plan with realistic milestones. Strong competitive positioning.",
    "Compelling vision with strong technical moats. Team expertise aligns well with the challenge."
  ];
  
  return {
    score: finalScore,
    feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)]
  };
};

export const mockPayApi = async (walletAddress: string): Promise<PaymentResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const amount = Math.floor(Math.random() * 51) + 50; // $50-$100
  const transactionId = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 6)}`;
  
  return {
    amount,
    transactionId,
    success: true
  };
};
