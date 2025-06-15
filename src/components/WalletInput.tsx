
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WalletInputProps {
  onWalletSubmit: (payeeId: string) => void;
  isVisible: boolean;
}

const WalletInput: React.FC<WalletInputProps> = ({ onWalletSubmit, isVisible }) => {
  const [payeeId, setPayeeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payeeId.trim()) {
      onWalletSubmit(payeeId.trim());
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-center text-gray-900">
          🎯 Congratulations! Enter your Payman Payee ID to receive funding:
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="payeeId" className="block text-sm font-medium text-gray-700 mb-2">
              Payman Payee ID
            </label>
            <Input
              id="payeeId"
              type="text"
              placeholder="e.g., user@example.com or @username"
              value={payeeId}
              onChange={(e) => setPayeeId(e.target.value)}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your Payman username, email, or Paytag
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={!payeeId.trim()}
          >
            Submit Payee ID
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WalletInput;
