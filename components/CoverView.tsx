
import React from 'react';
import { AppView } from '../types';

interface CoverViewProps {
  onEnter: () => void;
}

const CoverView: React.FC<CoverViewProps> = ({ onEnter }) => {
  const heroAnimationUrl = "https://secaqjszqfywcoykllhx.supabase.co/storage/v1/object/sign/LA%20GUAPA/Quiero_que_hagas_1080p_202601182223-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOGI0YTY5My0xNmVkLTRhYmYtYTgyNS0wMDAxZTU3N2RlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQSBHVUFQQS9RdWllcm9fcXVlX2hhZ2FzXzEwODBwXzIwMjYwMTE4MjIyMy1lemdpZi5jb20tdmlkZW8tdG8td2VicC1jb252ZXJ0ZXIud2VicCIsImlhdCI6MTc2ODc5NTQxMiwiZXhwIjoxNzY5NDAwMjEyfQ.ZywbwEV56BEBMAAtHvhLgDQJQmEhVzak-ZK57WNueK8";

  return (
    <div className="flex-grow flex flex-col justify-center px-6 relative mb-12 animate-fade-in">
       {/* Vinyl Record Mockup Background */}
       <div className="absolute -right-24 top-1/4 w-72 h-72 rounded-full bg-black border-4 border-gray-800 animate-spin-slow opacity-80 z-0 shadow-2xl">
        <div className="absolute inset-0 m-auto w-28 h-28 rounded-full bg-primary border-4 border-white flex items-center justify-center">
          <span className="text-[10px] text-white font-bold uppercase tracking-widest font-hand">Side A</span>
        </div>
      </div>

      <div className="relative z-10 transform -rotate-1 cursor-pointer" onClick={onEnter}>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-10 tape-effect rotate-2 z-20 opacity-90"></div>
        <div className="bg-white dark:bg-paper-dark p-1 shadow-2xl ripped-edge-bottom pb-8 border-2 border-black overflow-hidden">
          <div className="relative h-[400px] overflow-hidden border-b-2 border-black group">
            <img 
              alt="La Guapa Hero Animation" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
              src={heroAnimationUrl}
            />
            {/* Branding Overlay on Image */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
            
            <div className="absolute bottom-6 left-6 bg-primary px-4 py-2 transform rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-display text-white text-2xl tracking-tighter">EL MANIFIESTO</p>
            </div>
            
            <div className="absolute top-6 right-6 bg-accent text-black font-punk px-3 py-1 transform -rotate-12 border-2 border-black shadow-lg">
               LATE NIGHT SPECIAL
            </div>
          </div>

          <div className="p-6 bg-paper-light dark:bg-[#1e1e1e] relative">
             <div className="absolute -right-6 -top-12 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12 shadow-xl z-20 border-2 border-black animate-pulse">
                <span className="font-hand text-black text-sm text-center font-bold leading-none">VIBRA<br/>AHORA</span>
             </div>
             <h2 className="font-display text-4xl mb-3 text-dark dark:text-white leading-none tracking-tighter uppercase italic">
                Sabor que <br/><span className="font-hand text-primary not-italic">rompe esquemas.</span>
             </h2>
             <div className="h-1 w-20 bg-primary mb-4"></div>
             <p className="font-body text-sm leading-relaxed text-gray-800 dark:text-gray-300 font-medium italic">
                "No servimos comida, servimos rebelión. En el corazón de Madrid, donde el humo se mezcla con el arte y el hambre se sacia con alma."
             </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center transform rotate-1 relative py-4">
        <div className="absolute -top-2 left-1/3 w-20 h-6 tape-effect -rotate-12 opacity-50"></div>
        <p className="font-script text-3xl text-gray-900 dark:text-gray-200 drop-shadow-sm">
          "Alimenta tu espíritu,<br/>crea el caos."
        </p>
        <div className="mt-6 flex justify-center items-center gap-6">
           <span className="font-punk text-xs tracking-widest text-primary border-b border-primary">2024</span>
           <div className="flex gap-2">
             <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
             <span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.2s]"></span>
             <span className="w-2 h-2 rounded-full bg-dark animate-bounce [animation-delay:0.4s]"></span>
           </div>
           <span className="font-punk text-xs tracking-widest text-primary border-b border-primary">MADRID</span>
        </div>
      </div>
    </div>
  );
};

export default CoverView;
