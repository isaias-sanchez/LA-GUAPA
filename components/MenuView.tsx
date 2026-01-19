
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

        <div className="grid gap-8">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id} 
              className={`bg-white dark:bg-paper-dark border-2 border-black p-4 relative flyer-shadow group ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              <div className="absolute -top-3 -right-2 w-12 h-6 tape-effect rotate-12 opacity-80"></div>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-2xl group-hover:text-primary transition-colors">{item.name}</h3>
                <span className="font-punk text-2xl text-primary bg-accent/20 px-2 border border-black/10">{item.price}</span>
              </div>
              
              <p className="font-body text-sm text-gray-700 dark:text-gray-300 leading-snug mb-3 font-medium">
                {item.description}
              </p>

              <div className="flex gap-2 flex-wrap">
                {item.tags?.map(tag => (
                  <span key={tag} className="text-[10px] font-hand px-2 py-0.5 bg-dark text-white rounded transform rotate-1">
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>

              <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-accent border-2 border-black flex items-center justify-center text-xs font-bold text-dark">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="py-12 text-center">
            <div className="inline-block bg-black text-white px-4 py-2 font-hand text-sm -rotate-2">
                "ALL BURGERS & HOTDOGS SERVED WITH PAPAS"
            </div>
        </div>
      </div>
    </div>
  );
};

export default MenuView;
