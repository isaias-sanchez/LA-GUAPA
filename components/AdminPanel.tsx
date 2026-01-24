import React, { useState } from 'react';
import {
  Home, BookOpen, Clock, Star, Book,
  Type, Palette, Maximize, Save, ArrowLeft
} from 'lucide-react';
import { AnimatedGroup } from './ui/AnimatedGroup';

// Tipos para la configuración (Extensible)
type SectionConfig = {
  id: string;
  title: string;
  icon: React.ReactNode;
  settings: {
    [key: string]: { label: string; type: 'text' | 'color' | 'number' | 'boolean' | 'select'; value: any; options?: string[] }
  };
};

const INITIAL_SECTIONS: SectionConfig[] = [
  {
    id: 'home',
    title: 'PORTADA',
    icon: <Home size={32} />,
    settings: {
      headline: { label: 'Título Principal', type: 'text', value: 'LA GUAPA' },
      subheadline: { label: 'Subtítulo', type: 'text', value: 'Fanzine & Food' },
      primaryColor: { label: 'Color Acento', type: 'color', value: '#D4AF37' },
    }
  },
  {
    id: 'menu',
    title: 'MENÚ',
    icon: <BookOpen size={32} />,
    settings: {
      fontFamily: { label: 'Tipografía Carta', type: 'select', value: 'Punk', options: ['Punk', 'Sans', 'Serif'] },
      priceColor: { label: 'Color Precios', type: 'color', value: '#000000' },
    }
  },
  {
    id: 'recommend',
    title: 'ORÁCULO',
    icon: <Star size={32} />,
    settings: {
      recommendationText: { label: 'Texto Sugerencia', type: 'text', value: 'Hoy te recomendamos...' },
      animationSpeed: { label: 'Velocidad Animación', type: 'number', value: 1.5 },
    }
  },
  {
    id: 'story',
    title: 'HISTORIA',
    icon: <Clock size={32} />,
    settings: {
      introText: { label: 'Texto Intro', type: 'text', value: 'Todo comenzó con...' },
      lineColor: { label: 'Color Línea Tiempo', type: 'color', value: '#D4AF37' },
    }
  },
  {
    id: 'cover',
    title: 'DIARIO',
    icon: <Book size={32} />,
    settings: {
      coverTitle: { label: 'Título Diario', type: 'text', value: 'Diario de Viaje' },
      isPublic: { label: 'Público', type: 'boolean', value: true },
    }
  },
];

const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string>("Sistema listo. Selecciona un módulo para configurar.");

  // Simulación de carga/guardado
  const handleSave = async (sectionId: string) => {
    setLoading(true);
    setLog(`Analizando cambios en módulo ${sectionId.toUpperCase()}...`);

    // Aquí conectaríamos con menuManager.autonomousUpdate en el futuro
    await new Promise(r => setTimeout(r, 1000));

    setLog("✅ Configuración aplicada y optimizada por ATEC.");
    setLoading(false);
    setActiveSection(null);
  };

  const updateSetting = (sectionId: string, key: string, value: any) => {
    setSections(prev => prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        settings: {
          ...sec.settings,
          [key]: { ...sec.settings[key], value }
        }
      };
    }));
  };

  const renderField = (sectionId: string, key: string, config: any) => {
    switch (config.type) {
      case 'text':
        return <input type="text" value={config.value} onChange={(e) => updateSetting(sectionId, key, e.target.value)} className="w-full p-2 border-2 border-black font-hand" />;
      case 'color':
        return <div className="flex gap-2"><input type="color" value={config.value} onChange={(e) => updateSetting(sectionId, key, e.target.value)} className="h-10 w-10 border-2 border-black" /><span className="self-center font-mono">{config.value}</span></div>;
      case 'boolean':
        return <button onClick={() => updateSetting(sectionId, key, !config.value)} className={`w-12 h-6 border-2 border-black ${config.value ? 'bg-green-500' : 'bg-gray-300'}`} />;
      case 'select':
        return (
          <select value={config.value} onChange={(e) => updateSetting(sectionId, key, e.target.value)} className="w-full p-2 border-2 border-black font-hand">
            {config.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        );
      default: return null;
    }
  };

  return (
    <div className="flex-grow px-4 pb-28 flex flex-col pt-8 max-w-4xl mx-auto w-full animate-fade-in">

      {/* HEADER TIPO DASHBOARD */}
      <div className="flex justify-between items-center mb-8 border-b-4 border-primary pb-4">
        <h1 className="font-display text-4xl text-primary tracking-wider uppercase">
          {activeSection ? `EDITANDO: ${INITIAL_SECTIONS.find(s => s.id === activeSection)?.title}` : 'PANEL MAESTRO'}
        </h1>
        {activeSection && (
          <button onClick={() => setActiveSection(null)} className="flex items-center gap-2 font-punk text-sm hover:text-primary">
            <ArrowLeft size={16} /> VOLVER
          </button>
        )}
      </div>

      {/* TERMINAL DE ESTADO */}
      <div className="mb-6 bg-black text-green-400 p-3 font-mono text-xs border-2 border-gray-800 shadow-lg">
        &gt; {loading ? <span className="animate-pulse">PROCESANDO...</span> : log}
      </div>

      {!activeSection ? (
        // VISTA DASHBOARD (Grid de Secciones)
        <AnimatedGroup
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-4"
          preset="scale"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="group relative bg-paper border-4 border-black p-8 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(212,175,55,1)] transition-all duration-200 h-full w-full"
            >
              <div className="text-black group-hover:text-primary transition-colors duration-200">
                {section.icon}
              </div>
              <span className="font-punk text-xl uppercase">{section.title}</span>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize size={16} />
              </div>
            </button>
          ))}
        </AnimatedGroup>
      ) : (
        // VISTA EDITOR PROFUNDO
        <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {Object.entries(sections.find(s => s.id === activeSection)!.settings).map(([key, config]: [string, any]) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  {key === 'primaryColor' ? <Palette size={12} /> : <Type size={12} />}
                  {config.label}
                </label>
                {renderField(activeSection!, key, config)}
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 border-t-2 border-dashed border-gray-300 pt-6">
            <button
              onClick={() => setActiveSection(null)}
              className="flex-1 py-4 font-punk border-2 border-black hover:bg-gray-200 transition-colors"
            >
              CANCELAR
            </button>
            <button
              onClick={() => handleSave(activeSection!)}
              disabled={loading}
              className="flex-1 py-4 bg-primary text-black font-punk border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex justify-center items-center gap-2"
            >
              <Save size={18} />
              {loading ? 'OPTIMIZANDO...' : 'GUARDAR CAMBIOS'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
