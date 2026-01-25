
import React, { useState, useMemo, useEffect } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { DIARIO_NOTES, SCRAPBOOK_ELEMENTS, DEFAULT_PUNK_IMAGE } from '../constants';
import { menuRepository } from '../services/MenuManager';
import { AnimatedGroup } from './ui/AnimatedGroup';

const categoryNames: Record<MenuCategory, string> = {
  [MenuCategory.BURGERS]: "Consuelo en Pan",
  [MenuCategory.COCKTAILS]: "Olvidar el Frío",
  [MenuCategory.PASTAS]: "Noches de Distancia",
  [MenuCategory.CAFE]: "Despertar del Viajero",
  [MenuCategory.LIMONADAS]: "Refugios de Sol",
  [MenuCategory.RESTOBAR]: "Memorias de Barra"
};

import { useConfig } from '../contexts/ConfigContext';

interface MenuViewProps {
  onSelectItem?: (item: MenuItem) => void;
}

const MenuView: React.FC<MenuViewProps> = ({ onSelectItem }) => {
  const { config } = useConfig();
  const fontClass = config.menuFontFamily === 'Sans' ? 'font-sans' : config.menuFontFamily === 'Serif' ? 'font-serif' : 'font-display';

  const categories = Object.keys(categoryNames) as MenuCategory[];
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.BURGERS);
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await menuRepository.getAll();
      setItems(data);
    };
    loadItems();
  }, []);

  const filteredItems = items.filter(item => item.category === activeCategory && item.isVisible !== false);

  const memoizedNotes = useMemo(() => {
    return DIARIO_NOTES.map(note => ({
      text: note,
      style: {
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 60 + 10}%`,
        transform: `rotate(${Math.random() * 20 - 10}deg)`
      }
    }));
  }, []);

  return (
    <div className="flex-grow flex flex-col px-4 pb-28 animate-fade-in relative min-h-full">
      {/* Background Handwritten Notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 z-0">
        {memoizedNotes.map((note, i) => (
          <div
            key={i}
            className="absolute font-hand text-secondary text-lg whitespace-nowrap"
            style={note.style}
          >
            {note.text}
          </div>
        ))}
      </div>

      <div className="relative z-10 mb-6 flex overflow-x-auto py-4 no-scrollbar gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 font-punk text-xl whitespace-nowrap transform transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${activeCategory === cat ? 'bg-primary text-white -rotate-2 scale-105' : 'bg-white text-secondary rotate-1'
              }`}
          >
            {categoryNames[cat]}
          </button>
        ))}
      </div>

      <div className="relative z-10 space-y-10">
        <div className="relative">
          <h2 className="font-display text-5xl text-secondary dark:text-white uppercase tracking-tighter transform -rotate-1 inline-block border-b-8 border-primary leading-none mb-4">
            {categoryNames[activeCategory]}
          </h2>
          <div className="absolute -top-6 -right-2 w-24 h-6 tape-effect rotate-12 opacity-40 pointer-events-none"></div>
        </div>

        <AnimatedGroup className="grid gap-16" key={activeCategory}>
          {filteredItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              {/* Interleave scrapbook elements logic */}
              {idx === 1 && SCRAPBOOK_ELEMENTS[idx % SCRAPBOOK_ELEMENTS.length] && (
                <div className={`relative w-48 mx-auto my-4 transform ${SCRAPBOOK_ELEMENTS[idx % SCRAPBOOK_ELEMENTS.length].rotation} z-20`}>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-4 tape-effect rotate-2 z-30 opacity-60"></div>
                  <div className="bg-white p-2 border border-black shadow-md">
                    <img
                      src={SCRAPBOOK_ELEMENTS[idx % SCRAPBOOK_ELEMENTS.length].imageUrl}
                      alt="Memory"
                      onError={(e) => { e.currentTarget.src = DEFAULT_PUNK_IMAGE; }}
                      className="w-full h-32 object-cover grayscale"
                    />
                    <p className="font-hand text-[10px] mt-2 text-center opacity-70 leading-tight">
                      {SCRAPBOOK_ELEMENTS[idx % SCRAPBOOK_ELEMENTS.length].caption}
                    </p>
                  </div>
                </div>
              )}

              <div
                onClick={() => onSelectItem?.(item)}
                className={`bg-white dark:bg-paper-dark border-2 border-black p-5 relative flyer-shadow group transition-all hover:rotate-0 flex flex-col cursor-pointer ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 tape-effect rotate-2 z-20"></div>

                <div className="relative mb-6 -mx-2 -mt-2 overflow-hidden border-2 border-black shadow-inner transform group-hover:rotate-0 transition-transform rotate-1">
                  <img
                    src={item.image || DEFAULT_PUNK_IMAGE}
                    alt={item.name}
                    onError={(e) => { e.currentTarget.src = DEFAULT_PUNK_IMAGE; }}
                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-primary text-white font-punk text-xl px-4 py-2 border-2 border-black transform -rotate-12">EXPLORAR MEMORIA</span>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-4 pt-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-punk text-[10px] bg-secondary text-white px-2 py-0.5 uppercase tracking-widest">
                        CAPÍTULO {item.chapter}
                      </span>
                    </div>
                    <h3 className={`${fontClass} text-3xl group-hover:text-primary transition-colors leading-tight text-dark`}>
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className="font-hand text-lg opacity-70 rotate-3 transition-opacity group-hover:opacity-100"
                      style={{ color: config.menuPriceColor }}
                    >
                      {item.price}
                    </span>
                    <span className="text-[8px] font-punk text-gray-300 uppercase tracking-tighter">Anotación del autor</span>
                  </div>
                </div>

                <div className="relative mb-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  <p className="font-hand text-sm text-gray-600 dark:text-gray-400 italic pl-4 leading-tight">
                    "{item.history.substring(0, 100)}..."
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap mt-auto">
                  {item.tags?.map(tag => (
                    <span key={tag} className="text-[10px] font-hand px-2 py-0.5 bg-secondary text-white rounded transform rotate-1">
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </AnimatedGroup>

        <div className="py-12 text-center">
          <div className="relative inline-block bg-secondary text-accent px-6 py-3 font-hand text-lg -rotate-2 border-2 border-primary group">
            "CADA PLATO ES UN MAPA DE DONDE VINIMOS"
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full border border-white animate-ping opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuView;
