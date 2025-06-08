
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PaymentCardProps {
  amount: number;
  transactionId: string;
  walletAddress: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ amount, transactionId, walletAddress }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="glass p-6 rounded-2xl border gradient-success">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <div className="text-center text-white">
          <h3 className="text-xl font-bold mb-2">Payment Sent! 🎉</h3>
          <p className="text-lg mb-4">${amount} TSD</p>
          
          <div className="space-y-2 text-sm opacity-90">
            <div>
              <span className="font-medium">To: </span>
              <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
            </div>
            <div>
              <span className="font-medium">Tx ID: </span>
              <span className="font-mono">{transactionId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
