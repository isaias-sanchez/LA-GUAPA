
import React, { useState } from 'react';
import { getChefRecommendation } from '../services/geminiService';
import { RecommendationRequest } from '../types';

const RecommendView: React.FC = () => {
  const [mood, setMood] = useState('');
  const [hunger, setHunger] = useState<RecommendationRequest['hungerLevel']>('meal');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleRecommend = async () => {
    if (!mood) return;
    setLoading(true);
    const result = await getChefRecommendation({ mood, hungerLevel: hunger });
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="flex-grow px-6 pb-28 animate-fade-in flex flex-col">
      <div className="relative mb-8 transform -rotate-1">
        <div className="bg-primary text-white p-6 border-4 border-black flyer-shadow">
          <h2 className="font-punk text-4xl mb-2 tracking-widest uppercase">The Oracle</h2>
          <p className="font-hand text-lg text-accent">Let the Chef decide your fate...</p>
        </div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full border-2 border-black flex items-center justify-center text-black font-raw text-[10px] transform -rotate-12 animate-pulse">
          GEMINI AI
        </div>
      </div>

      <div className="bg-white dark:bg-paper-dark border-2 border-black p-6 space-y-6 relative">
        <div className="space-y-2">
          <label className="font-display text-xl block">How's the soul today?</label>
          <input 
            type="text" 
            placeholder="e.g. Chaotic, nostalgic, thirsty..."
            className="w-full border-2 border-black bg-secondary/30 p-3 font-hand text-lg focus:ring-primary focus:border-primary"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="font-display text-xl block">Hunger Intensity</label>
          <div className="flex gap-2">
            {(['snack', 'meal', 'feast'] as const).map(h => (
              <button
                key={h}
                onClick={() => setHunger(h)}
                className={`flex-grow py-2 font-punk border-2 border-black uppercase transition-all ${hunger === h ? 'bg-accent text-dark scale-105 shadow-md' : 'bg-white text-gray-400'}`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleRecommend}
          disabled={loading || !mood}
          className="w-full bg-dark text-white font-punk text-2xl py-4 hover:bg-primary transition-colors disabled:opacity-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(217,54,54,1)]"
        >
          {loading ? 'CONSULTING VIBES...' : 'GET PROPHECY'}
        </button>

        {recommendation && (
          <div className="mt-8 relative transform rotate-1 animate-fade-in">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 tape-effect rotate-1 z-20"></div>
             <div className="bg-accent/10 border-2 border-dashed border-primary p-4">
                <p className="font-script text-2xl leading-tight text-dark dark:text-white">
                  "{recommendation}"
                </p>
                <div className="mt-4 flex items-center justify-end gap-2">
                   <span className="font-punk text-xs text-primary">CHEF'S SIGNATURE</span>
                   <span className="material-icons-round text-primary">auto_awesome</span>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-8 text-center opacity-40">
        <p className="font-mono text-[10px] uppercase tracking-widest italic">
          Disclaimer: Recommendations powered by deep kitchen madness and advanced neural networks.
        </p>
      </div>
    </div>
  );
};

export default RecommendView;
