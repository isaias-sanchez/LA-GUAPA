import React from 'react';
import ScrollExpandMedia from './ui/ScrollExpandMedia';
import { MenuItem } from '../types';
import { DEFAULT_PUNK_IMAGE } from '../constants';

interface ProductDetailViewProps {
  item: MenuItem;
  onBack: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ item, onBack }) => {
  return (
    <div className="min-h-screen bg-dark relative z-[60]">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-[70] bg-primary text-white px-4 py-2 border-2 border-black font-punk text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          VOLVER AL DIARIO
        </div>
      </button>

      <ScrollExpandMedia
        mediaSrc={item.image || DEFAULT_PUNK_IMAGE}
        title={item.name}
        date={`Capítulo ${item.chapter}`}
      >
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-display text-3xl sm:text-4xl text-secondary border-b-4 border-primary inline-block">LA MEMORIA</h3>
          <p className="font-hand text-xl sm:text-2xl text-dark leading-tight italic">
            "{item.history}"
          </p>
          <div className="h-px w-full bg-secondary/20"></div>
          <p className="font-body text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
            {item.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-6">
            <div className="flex gap-2 flex-wrap">
              {item.tags?.map(t => (
                <span key={t} className="bg-secondary text-accent text-[8px] sm:text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider">#{t}</span>
              ))}
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto pt-2 border-t border-dashed border-gray-300 sm:border-none">
              <p className="font-hand text-xs opacity-50 italic">Valor de la memoria</p>
              <p className="font-display text-3xl sm:text-4xl text-primary leading-none">{item.price}</p>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
};

export default ProductDetailView;
