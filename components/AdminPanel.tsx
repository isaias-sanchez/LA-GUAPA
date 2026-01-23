import React from 'react';
import { AnimatedGroup } from './ui/AnimatedGroup';
import { DEFAULT_PUNK_IMAGE } from '../constants';

const AdminPanel: React.FC = () => {
  const adminOptions = [
    { title: 'INICIO', image: 'https://images.beta.cosmos.so/fc6fdd93-552c-47e6-98aa-b8fb3ba070a2?format=jpeg' }, // Placeholder or use DEFAULT
    { title: 'MENÚ', image: 'https://images.beta.cosmos.so/cb674d14-ebd1-4408-bab1-79df895017b6?format=jpeg' },
    { title: 'ORÁCULO', image: 'https://images.beta.cosmos.so/e5a6c3ed-82ad-4084-9a11-1eccd7bc91aa?format=jpeg' },
    { title: 'HISTORIA', image: 'https://images.beta.cosmos.so/4d02a1e7-d1f2-4575-86a9-bed243e59132?format=jpeg' },
    { title: 'DIARIO', image: DEFAULT_PUNK_IMAGE }
  ];

  return (
    <div className="flex-grow px-4 pb-28 flex flex-col pt-8 max-w-6xl mx-auto w-full animate-fade-in">
      <h1 className="font-display text-4xl text-primary mb-12 text-center border-b-4 border-primary pb-4 tracking-wider uppercase">
        Panel de Control
      </h1>

      <AnimatedGroup
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        preset="scale"
      >
        {adminOptions.map((opt, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 tape-effect rotate-1 z-20 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative border-4 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <img
                src={opt.image}
                alt={opt.title}
                onError={(e) => { e.currentTarget.src = DEFAULT_PUNK_IMAGE; }}
                className="h-64 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/80 p-4 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="font-display text-2xl text-primary uppercase tracking-widest">{opt.title}</h3>
                <p className="font-mono text-xs text-white/70 mt-1">EDITAR SECCIÓN</p>
              </div>
            </div>
          </div>
        ))}
      </AnimatedGroup>
    </div>
  );
};

export default AdminPanel;
