
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface PitchEvaluation {
  score: number;
  feedback: string;
  questions?: string[];
}

export interface PaymentResult {
  amount: number;
  transactionId: string;
  success: boolean;
}
