
import React from 'react';

const FanzineHeader: React.FC = () => {
  return (
    <header className="relative z-40 px-6 pt-8 pb-4 flex justify-between items-start">
      <div>
        <h1 className="font-display text-5xl text-primary transform -rotate-2 drop-shadow-md tracking-tighter">La Guapa</h1>
        <div className="inline-block bg-black text-white font-hand text-xs px-2 py-0.5 mt-1 transform rotate-1">ISSUE #01</div>
      </div>
      <button className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-accent transform rotate-6 hover:-rotate-12 transition-transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <span className="material-symbols-outlined text-black font-bold">menu</span>
      </button>
    </header>
  );
};

export default FanzineHeader;
