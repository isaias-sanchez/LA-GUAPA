
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    setRecommendation(null);
    const result = await getChefRecommendation({ mood, hungerLevel: hunger });
    setRecommendation(result);
    setLoading(false);
  };

  const handleShare = () => {
    // Mock sharing feature
    alert("¡Captura de pantalla lista para tus historias! #LaGuapa #DestinoCulinario");
  };

  return (
    <div className="flex-grow px-6 pb-28 animate-fade-in flex flex-col">
      <div className="relative mb-8 transform -rotate-1">
        <div className="bg-secondary text-accent p-6 border-4 border-black flyer-shadow">
          <h2 className="font-punk text-4xl mb-2 tracking-widest uppercase underline decoration-primary decoration-4">El Oráculo</h2>
          <p className="font-hand text-lg text-primary">Deja que el Chef decida tu destino...</p>
        </div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary rounded-full border-2 border-black flex items-center justify-center text-white font-raw text-[10px] transform -rotate-12 animate-pulse z-20">
          GEMINI AI
        </div>
      </div>

      <div className="bg-white dark:bg-paper-dark border-2 border-black p-6 space-y-6 relative">
        <div className="space-y-2">
          <label className="font-display text-xl block text-secondary">¿Cómo está el alma hoy?</label>
          <input 
            type="text" 
            placeholder="ej: Caótico, nostálgico, con sed..."
            className="w-full border-2 border-black bg-accent/30 p-3 font-hand text-lg focus:ring-primary focus:border-primary outline-none"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="font-display text-xl block text-secondary">Intensidad del Hambre</label>
          <div className="flex gap-2">
            {[
              { id: 'snack', label: 'Picoteo' },
              { id: 'meal', label: 'Comida' },
              { id: 'feast', label: 'Banquete' }
            ].map(h => (
              <button
                key={h.id}
                onClick={() => setHunger(h.id as any)}
                className={`flex-grow py-2 font-punk border-2 border-black uppercase transition-all ${hunger === h.id ? 'bg-primary text-white scale-105 shadow-md' : 'bg-white text-secondary/40'}`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleRecommend}
          disabled={loading || !mood}
          className="w-full bg-secondary text-accent font-punk text-2xl py-4 hover:bg-primary hover:text-white transition-colors disabled:opacity-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(230,57,70,1)]"
        >
          {loading ? 'CONSULTANDO VIBRAS...' : 'OBTENER PROFECÍA'}
        </button>

        {recommendation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            className="mt-8 relative transform animate-fade-in"
          >
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 tape-effect rotate-1 z-20"></div>
             <div className="bg-primary/5 border-2 border-dashed border-secondary p-6">
                <p className="font-script text-2xl leading-tight text-secondary dark:text-white mb-6">
                  "{recommendation}"
                </p>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <span className="material-icons-round text-primary text-sm">auto_awesome</span>
                      <span className="font-punk text-xs text-primary uppercase tracking-widest">Profecía del Chef</span>
                   </div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-10">
                  <button 
                    onClick={handleShare}
                    className="bg-primary text-white font-punk text-xl px-8 py-3 shadow-heavy hover:scale-105 transition-transform flex items-center gap-2 border-2 border-black"
                  >
                    <span className="material-symbols-outlined text-lg">share</span>
                    COMPARTIR MI DESTINO
                  </button>
                  <p className="font-hand text-sm text-gray-500 italic">
                    "Tu suerte ha sido echada... hazla eterna."
                  </p>
                </div>
             </div>
          </motion.div>
        )}
      </div>

      <div className="mt-auto pt-8 text-center opacity-40">
        <p className="font-mono text-[10px] uppercase tracking-widest italic text-secondary">
          Descargo de responsabilidad: Recomendaciones impulsadas por la locura de la cocina profunda y redes neuronales avanzadas.
        </p>
      </div>
    </div>
  );
};

export default RecommendView;
