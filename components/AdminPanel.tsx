
import React from 'react';

const AdminPanel: React.FC = () => {
  return (
    <div className="flex-grow px-6 pb-28 animate-fade-in flex flex-col pt-4">
      <div className="relative mb-10 transform -rotate-1">
        <div className="bg-secondary text-accent p-6 border-4 border-black flyer-shadow">
          <h1 className="font-punk text-4xl tracking-widest uppercase underline decoration-primary decoration-4">
            The Curator's Desk
          </h1>
          <p className="font-hand text-lg text-primary mt-2">Panel de Control del Diario</p>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full border-2 border-black flex items-center justify-center text-white font-punk text-xs transform rotate-12">
          ADMIN
        </div>
      </div>
      
      <div className="grid gap-8">
        <section className="bg-white dark:bg-paper-dark border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative rotate-1">
          <div className="absolute -top-3 left-10 w-20 h-6 tape-effect rotate-1 z-10"></div>
          <h2 className="font-display text-2xl mb-4 border-b-2 border-secondary pb-2 text-secondary">Editar Narrativas</h2>
          <p className="font-body text-sm italic text-gray-600 dark:text-gray-400 mb-6">
            Ajusta los relatos del "Exilio Culinario" que aparecen en el menú principal.
          </p>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-secondary/20 p-4">
              <span className="font-punk text-xs text-primary">SELECT CHAPTER</span>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <button key={n} className="w-10 h-10 border-2 border-black font-punk flex-shrink-0 hover:bg-primary hover:text-white transition-colors">
                    {n}
                  </button>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-secondary text-accent font-punk py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(230,57,70,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              ABRIR EDITOR DE TEXTO
            </button>
          </div>
        </section>

        <section className="bg-white dark:bg-paper-dark border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(230,57,70,1)] relative -rotate-1">
          <h2 className="font-display text-2xl mb-4 border-b-2 border-primary pb-2 text-secondary">Ajustes del Oráculo</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-punk uppercase tracking-widest text-secondary/50 mb-1">
                Personalidad de la IA (Gemini)
              </label>
              <select className="w-full border-2 border-black p-3 font-hand text-lg bg-accent/20 focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Chef Caótico y Místico</option>
                <option>Nostálgico del Exilio</option>
                <option>Crítico Punk Urbano</option>
                <option>Abuela Sabia del Caribe</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4 bg-primary/5 p-3 border border-dashed border-secondary/20">
               <span className="material-symbols-outlined text-primary">psychology</span>
               <p className="font-body text-[10px] leading-tight font-bold text-secondary">
                 EL MODELO ACTUAL ESTÁ CONFIGURADO PARA GENERAR RESPUESTAS DE MÁXIMO 60 PALABRAS EN ESPAÑOL.
               </p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-12 text-center opacity-30 font-mono text-[10px] uppercase tracking-tighter text-secondary">
        Terminal Access v1.0.4 // Unauthorized access is strictly encouraged for art purposes.
      </div>
    </div>
  );
};

export default AdminPanel;
