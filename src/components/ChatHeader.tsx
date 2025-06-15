import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  onBackToLanding: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBackToLanding }) => {
  return (
    <div className="bg-gradient-to-b from-white/95 to-slate-50/80 backdrop-blur-lg border-b border-gray-100 p-6 shadow-sm">
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
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight drop-shadow-sm">
              💼 AgentVC
            </h1>
            <p className="text-base text-slate-600 font-medium mt-1">The Chillest VC You'll Ever Meet (Who Pays in TSD)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
