
import React, { useState } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS } from '../constants';

const MenuView: React.FC = () => {
  const categories = [MenuCategory.BURGERS, MenuCategory.PASTAS, MenuCategory.COCKTAILS, MenuCategory.CAFE];
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.BURGERS);

  const filteredItems = MENU_ITEMS.filter(item => 
    activeCategory === MenuCategory.RESTOBAR 
    ? (item.category === MenuCategory.BURGERS || item.category === MenuCategory.PASTAS || item.category === MenuCategory.COCKTAILS)
    : item.category === activeCategory
  );

  return (
    <div className="flex-grow flex flex-col px-4 pb-28 animate-fade-in">
      <div className="mb-6 flex overflow-x-auto py-4 no-scrollbar gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 font-punk text-xl whitespace-nowrap transform transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              activeCategory === cat ? 'bg-primary text-white -rotate-2 scale-105' : 'bg-white text-dark rotate-1'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        <h2 className="font-display text-5xl text-dark dark:text-white uppercase tracking-tighter transform -rotate-1 inline-block border-b-8 border-accent leading-none mb-4">
          {activeCategory}
        </h2>

        <div className="grid gap-12">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id} 
              className={`bg-white dark:bg-paper-dark border-2 border-black p-5 relative flyer-shadow group transition-all hover:rotate-0 ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              {/* Enhanced Tape Effect */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-primary/10 border border-black/5 tape-effect rotate-2 z-10"></div>
              
              <div className="flex justify-between items-start mb-4 pt-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-punk text-[10px] bg-black text-white px-2 py-0.5 uppercase tracking-widest">
                      CAPÍTULO {item.chapter}
                    </span>
                    <span className="h-[1px] w-8 bg-black/20"></span>
                  </div>
                  <h3 className="font-display text-3xl group-hover:text-primary transition-colors leading-tight">
                    {item.name}
                  </h3>
                </div>
                <span className="font-punk text-3xl text-primary bg-accent/10 px-2 border border-black/5">
                  {item.price}
                </span>
              </div>
              
              {/* Exile Narrative History */}
              <div className="relative mb-4">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                <p className="font-hand text-sm text-gray-600 dark:text-gray-400 italic pl-4 leading-tight">
                  "{item.history}"
                </p>
              </div>

              {/* Standard Description */}
              <p className="font-body text-sm text-gray-800 dark:text-gray-300 leading-snug mb-4 font-medium">
                {item.description}
              </p>

              <div className="flex gap-2 flex-wrap">
                {item.tags?.map(tag => (
                  <span key={tag} className="text-[10px] font-hand px-2 py-0.5 bg-dark text-white rounded transform rotate-1">
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>

              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-accent border-2 border-black flex items-center justify-center text-xs font-bold text-dark shadow-md z-20 transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">auto_stories</span>
              </div>
            </div>
          ))}
        </div>

        <div className="py-12 text-center">
            <div className="inline-block bg-black text-white px-6 py-3 font-hand text-lg -rotate-2 border-2 border-accent">
                "CADA PLATO ES UN MAPA DE DONDE VINIMOS"
            </div>
        </div>
      </div>
    </div>
  );
};

export default MenuView;
