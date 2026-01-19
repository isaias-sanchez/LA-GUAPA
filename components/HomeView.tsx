
import React from 'react';
import { AppView, MenuCategory } from '../types';

interface HomeViewProps {
  onSelectCategory: (cat: MenuCategory) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSelectCategory }) => {
  return (
    <main className="flex-grow px-4 pb-24 space-y-12 mt-4 animate-fade-in-up">
      {/* Manifesto Section */}
      <section className="relative transform -rotate-1 z-10 max-w-[90%] mx-auto">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 tape-effect rotate-2 z-20"></div>
        <div className="bg-white dark:bg-paper-dark p-2 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] ripped-edge-bottom pb-6">
          <div className="relative h-48 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-black">
            <img alt="Atmospheric scene" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop"/>
            <div className="absolute top-4 left-4 bg-yellow-400 text-black font-punk px-3 py-1 text-2xl -rotate-6 border-2 border-black">
                NOW OPEN
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-display text-3xl mb-1 text-dark dark:text-white leading-none tracking-tight">THE DAILY MANIFESTO</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] flex-grow bg-black dark:bg-gray-600"></span>
              <span className="font-hand text-primary text-xs uppercase">Read All About It</span>
              <span className="h-[2px] flex-grow bg-black dark:bg-gray-600"></span>
            </div>
            <p className="font-body text-xs leading-snug text-gray-800 dark:text-gray-300 italic font-medium">
                "Where the grit of the street meets the soul of the kitchen. We don't just serve food; we curate moments of pure, unadulterated chaos."
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="space-y-6">
        {/* Restobar Supplement */}
        <div className="relative transform rotate-3 z-20 left-2">
          <div className="absolute -top-3 -right-2 w-16 h-6 tape-effect rotate-45 z-30 opacity-80"></div>
          <button 
            onClick={() => onSelectCategory(MenuCategory.RESTOBAR)}
            className="w-full text-left bg-primary text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] relative group"
          >
            <div className="absolute -top-8 -right-4 w-20 h-20 bg-accent rounded-full border-2 border-black flex items-center justify-center text-black font-punk text-xs transform -rotate-12 group-hover:scale-110 transition-transform">
              <span className="text-center leading-tight">LATE NIGHT<br/>VIBES</span>
            </div>
            <div className="border-2 border-white/30 p-4">
              <span className="font-punk text-xl tracking-widest text-accent">SUPPLEMENT 01</span>
              <h3 className="font-display text-5xl my-2 tracking-tighter uppercase leading-none">Restobar</h3>
              <div className="flex justify-between items-end mt-4">
                <p className="font-hand text-lg">Drinks • Beats • Bites</p>
                <span className="material-symbols-outlined text-4xl">local_bar</span>
              </div>
            </div>
          </button>
        </div>

        {/* Cafe Supplement */}
        <div className="relative transform -rotate-3 z-30 right-2 max-w-[85%] ml-auto">
          <div className="absolute -top-4 -left-2 w-20 h-7 tape-effect -rotate-12 z-40"></div>
          <button 
             onClick={() => onSelectCategory(MenuCategory.CAFE)}
             className="w-full text-left bg-secondary dark:bg-[#2c2b28] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] border-2 border-black group"
          >
            <div className="flex flex-col gap-4">
              <div className="bg-dark text-white p-2 text-center transform -rotate-1 group-hover:rotate-1 transition-transform">
                <h3 className="font-punk text-3xl tracking-wide">EL CAFÉ</h3>
              </div>
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-primary/20 border-2 border-dashed border-dark/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-dark dark:text-white">coffee_maker</span>
                </div>
                <div className="flex-grow">
                  <p className="font-hand text-dark dark:text-gray-200 leading-tight">Artisan roasts & rebellion. Open early, stays late.</p>
                  <div className="mt-2 font-body text-[10px] uppercase font-bold tracking-tighter opacity-70">Supplement 02 / Volume 1</div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-8 text-center flex flex-col items-center">
        <div className="relative transform rotate-1 bg-white dark:bg-zinc-800 px-6 py-4 border border-black shadow-sm inline-block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 tape-effect rotate-1"></div>
          <p className="font-raw text-sm text-primary leading-tight">
              "Feed your soul, start a revolution."
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-mono tracking-widest opacity-40">
            <span>MADRID 2024</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeView;
