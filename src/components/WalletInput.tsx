
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WalletInputProps {
  onWalletSubmit: (address: string) => void;
  isVisible: boolean;
}

const WalletInput: React.FC<WalletInputProps> = ({ onWalletSubmit, isVisible }) => {
  const [walletAddress, setWalletAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      onWalletSubmit(walletAddress.trim());
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-center text-slate-900">
          🎯 Great pitch! Enter your wallet address to receive funding:
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="0x1234567890abcdef..."
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="border-gray-200 focus:border-slate-400"
          />
          
          <Button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium"
            disabled={!walletAddress.trim()}
          >
            Submit Wallet Address
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WalletInput;
