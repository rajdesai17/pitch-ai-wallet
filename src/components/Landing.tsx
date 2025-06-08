
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

interface LandingProps {
  onStartPitching: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStartPitching }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white shadow-lg p-6 rounded-3xl border border-gray-100 animate-pulse-glow">
            <Sparkles className="w-16 h-16 text-slate-700" />
          </div>
        </div>

        {/* Hero Text */}
        <h1 className="text-hero text-slate-900 mb-6 leading-tight">
          InvestorBot
        </h1>
        
        <p className="text-subtitle text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Pitch your startup idea to our AI investor. Get smart feedback, 
          detailed evaluation, and if your idea scores high enough — 
          <span className="text-slate-800 font-medium"> receive test funding instantly</span>.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center group hover:scale-105 transition-transform duration-300 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">Smart Analysis</h3>
            <p className="text-slate-600 leading-relaxed">
              AI-powered evaluation with targeted follow-up questions to assess your startup potential
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center group hover:scale-105 transition-transform duration-300 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">Instant Feedback</h3>
            <p className="text-slate-600 leading-relaxed">
              Get detailed scores and actionable insights to improve your pitch and business model
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center group hover:scale-105 transition-transform duration-300 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">Test Funding</h3>
            <p className="text-slate-600 leading-relaxed">
              High-scoring ideas (7.5+/10) receive test dollars via Payman to get you started
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onStartPitching}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xl px-12 py-6 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Pitch Your Idea
        </Button>

        {/* Subtitle */}
        <p className="text-sm text-slate-500 mt-8">
          Built with Gemini Pro + Payman SDK
        </p>
      </div>
    </div>
  );
};

export default Landing;
