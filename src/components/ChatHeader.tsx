
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  onBackToLanding: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBackToLanding }) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg border-b border-gray-100 p-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBackToLanding}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              💼 InvestorBot
            </h1>
            <p className="text-sm text-slate-600">AI-Powered Startup Pitch Evaluator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
