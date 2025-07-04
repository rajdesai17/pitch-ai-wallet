
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
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <div className="text-center text-green-800">
          <h3 className="text-xl font-bold mb-2">Payment Sent! 🎉</h3>
          <p className="text-lg mb-4">${amount} USD</p>
          
          <div className="space-y-2 text-sm text-green-700">
            <div>
              <span className="font-medium">To: </span>
              <span className="font-mono">{walletAddress}</span>
            </div>
            <div>
              <span className="font-medium">Transaction ID: </span>
              <span className="font-mono text-xs break-all">{transactionId}</span>
            </div>
            <div className="text-xs text-green-600 mt-3">
              Sent via Payman AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
