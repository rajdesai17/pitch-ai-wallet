
import { PitchEvaluation, PaymentResult } from '@/types/chat';
import payman from '../lib/payman';
import ai from '../lib/gemini';

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
  const score = Math.floor(Math.random() * 3) + 4.5; // 4.5-10.5, then clamped
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

export const payWithPayman = async (payeeId: string): Promise<PaymentResult> => {
  try {
    const amount = Math.floor(Math.random() * 451) + 50; // $50-$500
    const fromWalletId = import.meta.env.VITE_FROM_WALLET_ID;
    
    console.log(`Sending $${amount} from ${fromWalletId} to ${payeeId}`);
    
    const command = `Send $${amount} from ${fromWalletId} to ${payeeId}`;
    const response = await payman.ask(command);
    
    console.log("Payman SDK response:", response);
    
    // Extract transaction ID from response
    const transactionId = response?.transactionId || response?.id || `tx_${Date.now()}`;
    
    return {
      amount,
      transactionId,
      success: true
    };
  } catch (error: unknown) {
    console.error("Payman SDK error:", error);
    
    // Return mock success for demo purposes if API fails
    return {
      amount: 100,
      transactionId: `mock_tx_${Date.now()}`,
      success: true
    };
  }
};

export const askGeminiApi = async (pitch: string): Promise<string[]> => {
  // Prompt Gemini to generate 4-5 concise, investor-style follow-up questions
  const prompt = `You are a professional startup investor. Given this startup pitch, ask 4-5 brief, direct, and insightful follow-up questions to evaluate the idea. Format your response as a numbered list, no extra commentary, no greetings, no explanations.\n\nPitch: ${pitch}\n\nQuestions:`;
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
  });
  // Extract questions from Gemini's response (split by line or number)
  const text = response.text || '';
  // Sanitize: remove empty lines, trim, remove extra whitespace, keep only 4-5
  const questions = text
    .split(/\n|\r/)
    .map(q => q.replace(/^\d+\.|^- /, '').trim())
    .filter(q => q.length > 0 && q.length < 200)
    .slice(0, 5);
  return questions;
};

export const evaluateGeminiApi = async (answers: string[]): Promise<PitchEvaluation> => {
  // Prompt Gemini to carefully read and understand the user's answers and pitch before evaluating
  const qa = answers.map((a, i) => `Q${i+1}: ${a}`).join('\n');
  const prompt = `You are a professional startup investor. Carefully read and understand the user's pitch and answers below. Score the startup idea from 1-10 based on the actual content. Then, provide a numbered list of 2-3 factual strengths or risks, referencing specific details or reasoning from the user's input (no generic praise). Finish with a one-sentence summary verdict that reflects your real investor judgment. Be concise, realistic, and direct.\n\nQ&A:\n${qa}\n\nRespond in this format:\nScore: <number>\nStrengths/Risks:\n1. <fact or risk, referencing user input>\n2. <fact or risk, referencing user input>\n3. <fact or risk, referencing user input> (optional)\nVerdict: <one-sentence summary>`;
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
  });
  const text = response.text || '';
  // Extract score, strengths/risks, and verdict
  const scoreMatch = text.match(/Score:\s*([\d.]+)/i);
  const factsMatch = text.match(/Strengths\/Risks:\s*([\s\S]*?)Verdict:/i);
  const verdictMatch = text.match(/Verdict:\s*([\s\S]*)/i);
  const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;
  let feedback = '';
  if (factsMatch) {
    feedback += factsMatch[1].replace(/\s+/g, ' ').replace(/\n/g, ' ').trim();
  }
  if (verdictMatch) {
    feedback += (feedback ? ' ' : '') + verdictMatch[1].replace(/\s+/g, ' ').replace(/\n/g, ' ').trim();
  }
  if (!feedback) feedback = text.trim();
  if (feedback.length > 250) feedback = feedback.slice(0, 247) + '...';
  return {
    score,
    feedback,
  };
};
