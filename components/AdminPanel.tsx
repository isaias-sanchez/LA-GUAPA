import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';
import {
  Home, BookOpen, Clock, Star, Book,
  Type, Palette, Maximize, Save, ArrowLeft, PlusCircle, Trash2, Image as ImageIcon, Film, Upload
} from 'lucide-react';
import { AnimatedGroup } from './ui/AnimatedGroup';
import CoverView from './CoverView';
import { useConfig } from '../contexts/ConfigContext';
import { HistoryPost } from '../types';

// Tipos para la configuración (Extensible)
type SectionConfig = {
  id: string;
  title: string;
  icon: React.ReactNode;
  settings: {
    [key: string]: { label: string; type: 'text' | 'textarea' | 'color' | 'number' | 'boolean' | 'select'; value: any; options?: string[] }
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
    title: 'HISTORIA VIVA',
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
      coverTitle: {
        label: 'Título Portada',
        type: 'textarea',
        value: ''
      },
      stickerText: {
        label: 'Texto Sticker',
        type: 'text',
        value: ''
      },
      ownerText: {
        label: 'Texto Propietario',
        type: 'textarea',
        value: ''
      },
      manifestoText: {
        label: 'Manifiesto',
        type: 'textarea',
        value: ''
      },
      primaryColor: { label: 'Color Primario', type: 'color', value: '' },
      secondaryColor: { label: 'Color Secundario', type: 'color', value: '' },
      isPublic: { label: 'Público', type: 'boolean', value: true },
    }
  },
];

const AdminPanel: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string>("Sistema listo. Selecciona un módulo para configurar.");

  // Local state for new post creation
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMediaUrl, setNewPostMediaUrl] = useState('');
  const [newPostMediaType, setNewPostMediaType] = useState<'image' | 'video'>('image');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setNewPostMediaUrl(publicUrl);

      // Auto-detect type
      if (file.type.startsWith('video/')) {
        setNewPostMediaType('video');
      } else {
        setNewPostMediaType('image');
      }

      setLog("✅ Archivo subido correctamente.");
    } catch (error) {
      console.error('Error uploading:', error);
      setLog("❌ Error al subir archivo. Verifica que el bucket 'media' sea público.");
    } finally {
      setIsUploading(false);
    }
  };

  // Sync Global Config to Local Admin State
  useEffect(() => {
    setSections(prev => prev.map(sec => {
      if (sec.id === 'cover') {
        return {
          ...sec,
          settings: {
            ...sec.settings,
            coverTitle: { ...sec.settings.coverTitle, value: config.coverTitle },
            stickerText: { ...sec.settings.stickerText, value: config.stickerText },
            ownerText: { ...sec.settings.ownerText, value: config.ownerText },
            manifestoText: { ...sec.settings.manifestoText, value: config.manifestoText },
            primaryColor: { ...sec.settings.primaryColor, value: config.primaryColor },
            secondaryColor: { ...sec.settings.secondaryColor, value: config.secondaryColor },
            isPublic: { ...sec.settings.isPublic, value: config.isPublic },
          }
        };
      }
      return sec;
    }));
  }, [config]);

  // Guardar Cambios
  const handleSave = async (sectionId: string) => {
    setLoading(true);
    setLog(`Analizando cambios en módulo ${sectionId.toUpperCase()}...`);

    // Simular delay
    await new Promise(r => setTimeout(r, 800));

    if (sectionId === 'cover') {
      const coverSettings = sections.find(s => s.id === 'cover')?.settings;
      if (coverSettings) {
        updateConfig({
          coverTitle: coverSettings.coverTitle.value,
          stickerText: coverSettings.stickerText.value,
          ownerText: coverSettings.ownerText.value,
          manifestoText: coverSettings.manifestoText.value,
          primaryColor: coverSettings.primaryColor.value,
          secondaryColor: coverSettings.secondaryColor.value,
          isPublic: coverSettings.isPublic.value,
        });
      }
    } else if (sectionId === 'story') {
      // For story, only introText and lineColor are standard settings
      const storySettings = sections.find(s => s.id === 'story')?.settings;
      if (storySettings) {
        updateConfig({
          introText: storySettings.introText.value,
          lineColor: storySettings.lineColor.value,
        });
      }
    }

    setLog("✅ Configuración aplicada y sincronizada globalmente.");
    setLoading(false);
    // setActiveSection(null); // Optional: keep open to keep editing
  };

  const handlePublishPost = () => {
    if (!newPostTitle || !newPostContent) {
      setLog("⚠️ Título y contenido de la publicación no pueden estar vacíos.");
      return;
    }

    const newPost: HistoryPost = {
      id: Date.now().toString(),
      date: new Date().getFullYear().toString(),
      title: newPostTitle,
      content: newPostContent,
      imageUrl: newPostMediaUrl || undefined,
      mediaType: newPostMediaUrl ? newPostMediaType : undefined,
      reactions: { likes: 0, dislikes: 0 },
      isNews: true
    };

    updateConfig({
      historyPosts: [newPost, ...config.historyPosts]
    });

    setNewPostTitle('');
    setNewPostContent('');
    setNewPostMediaUrl('');
    setLog(`✅ Publicación "${newPostTitle}" añadida a la bitácora.`);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('¿Seguro que quieres eliminar esta publicación de la historia?')) {
      const filteredPosts = config.historyPosts.filter(p => p.id !== id);
      updateConfig({ historyPosts: filteredPosts });
      setLog("🗑️ Publicación eliminada.");
    }
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
        return <input type="text" value={config.value} onChange={(e) => updateSetting(sectionId, key, e.target.value)} className="w-full p-2 border-2 border-black font-hand text-black bg-white" />;
      case 'textarea':
        return <textarea rows={4} value={config.value} onChange={(e) => updateSetting(sectionId, key, e.target.value)} className="w-full p-2 border-2 border-black font-hand text-sm text-black bg-white" />;
      case 'color':
        return <div className="flex gap-2"><input type="color" value={config.value} onChange={(e) => updateSetting(sectionId, key, e.target.value)} className="h-10 w-10 border-2 border-black cursor-pointer" /><span className="self-center font-mono text-black">{config.value}</span></div>;
      case 'boolean':
        return <button onClick={() => updateSetting(sectionId, key, !config.value)} className={`w-12 h-6 border-2 border-black ${config.value ? 'bg-green-500' : 'bg-gray-300'}`} />;
      case 'select':
        return (
          <select value={config.value} onChange={(e) => updateSetting(sectionId, key, e.target.value)} className="w-full p-2 border-2 border-black font-hand text-black bg-white">
            {config.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        );
      default: return null;
    }
  };

  const renderStoryManager = () => (
    <div className="space-y-6">
      <div className="border-4 border-black p-4 bg-accent/30">
        <h3 className="font-punk text-xl mb-4 italic text-black">NUEVA PUBLICACIÓN</h3>
        <input
          type="text"
          placeholder="Título (ej: Nueva Receta en Pruebas)"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="w-full p-2 mb-2 border-2 border-black font-hand text-black"
        />
        <textarea
          placeholder="Cuéntanos la historia..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-2 mb-2 border-2 border-black font-hand h-24 text-black text-sm"
        />

        <div className="flex flex-col gap-2 mb-4 bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-lg relative hover:bg-gray-100 transition-colors">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
            {isUploading ? (
              <span className="animate-pulse font-punk text-black">SUBIENDO ARCHIVO...</span>
            ) : newPostMediaUrl ? (
              <div className="flex items-center gap-2 text-primary font-bold">
                {newPostMediaType === 'image' ? <ImageIcon size={20} /> : <Film size={20} />}
                <span>¡ARCHIVO CARGADO!</span>
                <span className="text-xs text-gray-400 font-mono overflow-hidden max-w-[150px] truncate">{newPostMediaUrl}</span>
              </div>
            ) : (
              <>
                <Upload size={24} />
                <span className="font-hand text-sm text-center">Click para subir foto/video <br /> (o arrastra aquí)</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {/* Fallback URL Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="O pega una URL externa aquí..."
              value={newPostMediaUrl}
              onChange={(e) => setNewPostMediaUrl(e.target.value)}
              className="w-full p-2 border-2 border-black font-hand text-black text-xs"
            />
          </div>
          <div className="flex gap-0">
            <button
              onClick={() => setNewPostMediaType('image')}
              className={`p-2 border-2 border-black border-r-0 ${newPostMediaType === 'image' ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}
              title="Imagen"
            >
              <ImageIcon size={20} />
            </button>
            <button
              onClick={() => setNewPostMediaType('video')}
              className={`p-2 border-2 border-black ${newPostMediaType === 'video' ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}
              title="Video"
            >
              <Film size={20} />
            </button>
          </div>
        </div>

        <button
          onClick={handlePublishPost}
          className="w-full py-3 bg-primary text-white hover:text-black font-punk border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} /> PUBLICAR EN LA BITÁCORA
        </button>
      </div>

      <div className="mt-8">
        <h3 className="font-punk text-lg underline mb-4 text-black">FEEDBACK DE LA COMUNIDAD</h3>
        {/* Listado de posts con sus contadores de Likes/Dislikes */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {config.historyPosts.map(post => (
            <div key={post.id} className="flex justify-between items-center p-3 border-2 border-black bg-white hover:bg-gray-50 transition-colors">
              <span className="font-hand font-bold uppercase truncate max-w-[40%] text-black">{post.title}</span>
              <div className="flex items-center gap-4">
                <div className="flex gap-3 font-mono text-sm">
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    👍 {post.reactions.likes}
                  </span>
                  <span className="text-red-600 font-bold flex items-center gap-1">
                    👎 {post.reactions.dislikes}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Eliminar Publicación"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-grow px-4 pb-28 flex flex-col pt-8 max-w-6xl mx-auto w-full animate-fade-in">

      {/* HEADER TIPO DASHBOARD */}
      <div className="flex justify-between items-center mb-8 border-b-4 border-primary pb-4">
        <h1 className="font-display text-4xl text-primary tracking-wider uppercase">
          {activeSection ? `EDITANDO: ${INITIAL_SECTIONS.find(s => s.id === activeSection)?.title} ` : 'PANEL MAESTRO'}
        </h1>
        {activeSection && (
          <button onClick={() => setActiveSection(null)} className="flex items-center gap-2 font-punk text-sm hover:text-primary text-black dark:text-gray-300">
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
              <span className="font-punk text-xl uppercase text-black">{section.title}</span>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-black">
                <Maximize size={16} />
              </div>
            </button>
          ))}
        </AnimatedGroup>
      ) : (
        // VISTA EDITOR PROFUNDO
        <div className="flex flex-col lg:flex-row gap-6 animate-fade-in-up h-full">

          {/* COLUMNA CONTROLES */}
          <div className="flex-1 bg-white border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] order-2 lg:order-1">
            {activeSection === 'story' ? (
              renderStoryManager()
            ) : (
              <>
                <h3 className="font-punk text-xl mb-6 border-b-2 border-black pb-2 text-black">Parámetros</h3>
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(sections.find(s => s.id === activeSection)!.settings).map(([key, config]: [string, any]) => (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 text-black">
                        {key.includes('Color') ? <Palette size={12} /> : <Type size={12} />}
                        {config.label}
                      </label>
                      {renderField(activeSection!, key, config)}
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex gap-4 border-t-2 border-dashed border-gray-300 pt-6">
                  <button
                    onClick={() => setActiveSection(null)}
                    className="flex-1 py-4 font-punk border-2 border-black hover:bg-gray-200 transition-colors text-black"
                    disabled={loading}
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={() => handleSave(activeSection!)}
                    disabled={loading}
                    className="flex-1 py-4 bg-primary text-black font-punk border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex justify-center items-center gap-2"
                  >
                    <Save size={18} />
                    {loading ? 'OPTIMIZANDO...' : 'GUARDAR'}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* COLUMNA LIVE PREVIEW (SOLO PARA DIARIO POR AHORA) */}
          {activeSection === 'cover' && (
            <div className="flex-1 order-1 lg:order-2">
              <div className="sticky top-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 tracking-widest animate-pulse">Live Preview</span>
                  <span className="text-[10px] font-mono text-gray-500">Renderizando: CoverView.tsx</span>
                </div>

                {/* PREVIEW CONTAINER */}
                <div className="border-4 border-dashed border-gray-400 p-2 bg-gray-100 rounded-lg overflow-hidden h-[600px] relative">
                  <div className="w-full h-full overflow-hidden relative bg-background-light dark:bg-background-dark scale-[0.8] origin-top transform-gpu">
                    <CoverView
                      isPreview={true} // Force open state for preview
                      manifestoText={sections.find(s => s.id === 'cover')?.settings.manifestoText.value}
                      primaryColor={sections.find(s => s.id === 'cover')?.settings.primaryColor.value}
                      secondaryColor={sections.find(s => s.id === 'cover')?.settings.secondaryColor.value}
                      coverTitle={sections.find(s => s.id === 'cover')?.settings.coverTitle.value}
                      stickerText={sections.find(s => s.id === 'cover')?.settings.stickerText.value}
                      ownerText={sections.find(s => s.id === 'cover')?.settings.ownerText.value}
                      onEnter={() => console.log('Preview interaction')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
