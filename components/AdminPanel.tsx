import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';
import {
  Home, BookOpen, Clock, Star, Book,
  Type, Palette, Maximize, Save, ArrowLeft, PlusCircle, Trash2, Image as ImageIcon, Film, Upload,
  Sparkles, Brain, List, ToggleLeft, ToggleRight, X, User, ShoppingBag, Eye, EyeOff, Lock
} from 'lucide-react';
import { menuRepository } from '../services/MenuManager'; // Import repository
import { MenuItem, MenuCategory } from '../types';
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
    id: 'products',
    title: 'PRODUCTOS',
    icon: <ShoppingBag size={32} />,
    settings: {}
  },
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
    icon: <Sparkles size={32} />,
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

  // Local State for Oracle Config (to edit arrays easily)
  const [tempOracleConfig, setTempOracleConfig] = useState({
    systemPrompt: '',
    slang: [] as string[],
    moods: [] as string[],
    mysticism: 50,
    syncInventory: true,
    secrets: [] as string[],
    auraColor: ''
  });

  // Products State
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [isProductLoading, setIsProductLoading] = useState(false);

  // Load products when section is active
  useEffect(() => {
    if (activeSection === 'products') {
      loadProducts();
    }
  }, [activeSection]);

  const loadProducts = async () => {
    setIsProductLoading(true);
    const data = await menuRepository.getAll();
    setProducts(data);
    setIsProductLoading(false);
  };

  // Generic Upload for Products (different bucket or same?) Same 'media' bucket is fine.
  const uploadProductImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `product-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
      return publicUrl;
    } catch (e) {
      console.error(e);
      alert("Error subiendo imagen");
      return null;
    }
  };

  // Sync Global to Local (Oracle)
  useEffect(() => {
    setTempOracleConfig({
      systemPrompt: config.oracleSystemPrompt || '',
      slang: config.oracleSlang || [],
      moods: config.oracleMoods || [],
      mysticism: config.oracleMysticism || 50,
      syncInventory: config.oracleSyncInventory ?? true,
      secrets: config.oracleSecrets || [],
      auraColor: config.oracleAuraColor || '#8A2BE2'
    });
  }, [config]);

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
    } else if (sectionId === 'recommend') {
      // Oracle Settings
      updateConfig({
        oracleSystemPrompt: tempOracleConfig.systemPrompt,
        oracleSlang: tempOracleConfig.slang,
        oracleMoods: tempOracleConfig.moods,
        oracleMysticism: tempOracleConfig.mysticism,
        oracleSyncInventory: tempOracleConfig.syncInventory,
        oracleSecrets: tempOracleConfig.secrets,
        oracleAuraColor: tempOracleConfig.auraColor
      });
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

  const renderOracleManager = () => {
    const addToList = (key: 'slang' | 'moods' | 'secrets', value: string) => {
      if (!value) return;
      setTempOracleConfig(prev => ({ ...prev, [key]: [...prev[key], value] }));
    };

    const removeFromList = (key: 'slang' | 'moods' | 'secrets', index: number) => {
      setTempOracleConfig(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
    };

    return (
      <div className="space-y-8 animate-fade-in text-black">
        {/* 1. PERSONALIDAD */}
        <section className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-punk text-xl mb-4 flex items-center gap-2 text-primary">
            <Brain size={24} /> PERSONALIDAD
          </h3>
          <div className="space-y-4">
            <div>
              <label className="font-bold text-xs uppercase text-gray-600 mb-1 block">Voz del Oráculo (System Prompt)</label>
              <textarea
                value={tempOracleConfig.systemPrompt}
                onChange={(e) => setTempOracleConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                className="w-full p-2 border-2 border-black font-hand text-sm h-24 text-black bg-white"
                placeholder="Define cómo debe hablar la IA..."
              />
            </div>
            <div>
              <label className="font-bold text-xs uppercase text-gray-600 mb-1 block">Diccionario de Jerga</label>
              <div className="flex gap-2 mb-2">
                <input id="newSlang" type="text" className="flex-1 p-1 border-2 border-black font-hand text-sm text-black bg-white" placeholder="Nueva palabra..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addToList('slang', (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button className="bg-black text-white px-3 font-bold" onClick={() => {
                  const el = document.getElementById('newSlang') as HTMLInputElement;
                  addToList('slang', el.value);
                  el.value = '';
                }}>+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tempOracleConfig.slang.map((word, i) => (
                  <span key={i} className="bg-yellow-200 text-black border-2 border-black px-2 py-1 font-hand text-xs flex items-center gap-1">
                    {word}
                    <button onClick={() => removeFromList('slang', i)}><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. EXPERIENCIA */}
        <section className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-punk text-xl mb-4 flex items-center gap-2 text-primary">
            <Sparkles size={24} /> EXPERIENCIA
          </h3>
          <div className="space-y-4">
            <div>
              <label className="font-bold text-xs uppercase text-gray-600 mb-1 block">Estados de Ánimo (Botones)</label>
              <div className="flex gap-2 mb-2">
                <input id="newMood" type="text" className="flex-1 p-1 border-2 border-black font-hand text-sm text-black bg-white" placeholder="Ej: Con Sed..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addToList('moods', (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button className="bg-black text-white px-3 font-bold" onClick={() => {
                  const el = document.getElementById('newMood') as HTMLInputElement;
                  addToList('moods', el.value);
                  el.value = '';
                }}>+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tempOracleConfig.moods.map((mood, i) => (
                  <span key={i} className="bg-purple-200 text-black border-2 border-black px-2 py-1 font-hand text-xs flex items-center gap-1">
                    {mood}
                    <button onClick={() => removeFromList('moods', i)}><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="font-bold text-xs uppercase text-gray-600 mb-1 block flex justify-between">
                <span>Nivel de Misticismo</span>
                <span className="text-black">{tempOracleConfig.mysticism}%</span>
              </label>
              <input
                type="range"
                min="0" max="100"
                value={tempOracleConfig.mysticism}
                onChange={(e) => setTempOracleConfig(prev => ({ ...prev, mysticism: parseInt(e.target.value) }))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black"
              />
              <div className="flex justify-between text-xs font-mono text-gray-400 mt-1">
                <span>DIRECTO</span>
                <span>MUY MÍSTICO</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LÓGICA & SECRETOS */}
        <section className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-punk text-xl mb-4 flex items-center gap-2 text-primary">
            <List size={24} /> LÓGICA
          </h3>
          <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 pb-4">
            <label className="font-bold text-sm uppercase text-black">Sincronizar Inventario</label>
            <button
              onClick={() => setTempOracleConfig(prev => ({ ...prev, syncInventory: !prev.syncInventory }))}
              className={`flex items-center gap-2 px-3 py-1 border-2 border-black transition-colors ${tempOracleConfig.syncInventory ? 'bg-green-400' : 'bg-gray-200'}`}
            >
              {tempOracleConfig.syncInventory ? <ToggleRight size={24} className="text-black" /> : <ToggleLeft size={24} className="text-gray-500" />}
              <span className="font-mono text-xs text-black">{tempOracleConfig.syncInventory ? 'ON' : 'OFF'}</span>
            </button>
          </div>
          <div>
            <label className="font-bold text-xs uppercase text-gray-600 mb-1 block">Secretos del Chef</label>
            <div className="flex gap-2 mb-2">
              <input id="newSecret" type="text" className="flex-1 p-1 border-2 border-black font-hand text-sm text-black bg-white" placeholder="Ej: La salsa tiene ron..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addToList('secrets', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button className="bg-black text-white px-3 font-bold" onClick={() => {
                const el = document.getElementById('newSecret') as HTMLInputElement;
                addToList('secrets', el.value);
                el.value = '';
              }}>+</button>
            </div>
            <div className="space-y-1">
              {tempOracleConfig.secrets.map((secret, i) => (
                <div key={i} className="bg-gray-100 border-b border-black/10 p-2 font-hand text-xs flex justify-between items-center text-black">
                  <span>"{secret}"</span>
                  <button onClick={() => removeFromList('secrets', i)} className="text-red-500 hover:text-red-700"><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. AURA */}
        <section className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-punk text-xl mb-4 flex items-center gap-2 text-primary">
            <Palette size={24} /> VISUAL
          </h3>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full border-4 border-black shadow-lg transition-colors duration-500"
              style={{ backgroundColor: tempOracleConfig.auraColor, boxShadow: `0 0 20px ${tempOracleConfig.auraColor}` }}
            />
            <div className="flex-1">
              <label className="font-bold text-xs uppercase text-gray-600 mb-1 block">Color del Aura</label>
              <input
                type="color"
                value={tempOracleConfig.auraColor}
                onChange={(e) => setTempOracleConfig(prev => ({ ...prev, auraColor: e.target.value }))}
                className="w-full h-10 border-2 border-black cursor-pointer bg-white"
              />
              <span className="font-mono text-xs text-black">{tempOracleConfig.auraColor}</span>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderProductManager = () => {
    if (editingProduct) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setEditingProduct(null)} className="flex items-center gap-2 font-punk text-lg hover:underline"><ArrowLeft /> VOLVER LISTA</button>
            <h3 className="font-punk text-xl uppercase bg-black text-white px-2">{editingProduct.id ? 'EDITAR' : 'NUEVO'} PLATO</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IZQUIERDA: DATOS BÁSICOS */}
            {/* IZQUIERDA: DATOS BÁSICOS & NARRATIVA */}
            <div className="space-y-6">
              {/* BLOQUE IDENTIDAD */}
              <div className="space-y-4 border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-punk text-lg border-b-2 border-black mb-2">IDENTIDAD</h4>
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <label className="font-bold text-xs uppercase text-gray-400">SKU / ID</label>
                    <input className="w-full border-b-2 border-black font-mono text-lg p-1 bg-transparent"
                      placeholder="BURG-01"
                      value={editingProduct.sku || ''} onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })} />
                  </div>
                  <div className="flex-1">
                    <label className="font-bold text-xs uppercase text-gray-400">Nombre</label>
                    <input className="w-full border-b-2 border-black font-display text-2xl p-1 bg-transparent placeholder-gray-300"
                      placeholder="Nombre del Plato"
                      value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* BLOQUE COMERCIAL */}
              <div className="space-y-4 border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-punk text-lg border-b-2 border-black mb-2">COMERCIAL</h4>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-bold text-xs uppercase text-gray-400">Precio</label>
                    <input className="w-full border-b-2 border-black font-hand text-xl p-1 bg-transparent"
                      placeholder="34K"
                      value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} />
                  </div>
                  <div className="flex-1">
                    <label className="font-bold text-xs uppercase text-gray-400">Categoría</label>
                    <select className="w-full border-b-2 border-black font-hand text-lg p-1 bg-transparent"
                      value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as any })}>
                      {Object.values(MenuCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* BLOQUE DETALLES */}
              <div className="space-y-4 border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-punk text-lg border-b-2 border-black mb-2">DETALLES</h4>
                <div>
                  <label className="font-bold text-xs uppercase text-gray-400">Descripción (Ingredientes)</label>
                  <textarea className="w-full border-2 border-black font-hand text-sm p-2 h-20"
                    value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/4">
                    <label className="font-bold text-xs uppercase text-gray-400">Capítulo</label>
                    <input type="number" className="w-full border-b-2 border-black font-mono text-lg p-1"
                      value={editingProduct.chapter} onChange={e => setEditingProduct({ ...editingProduct, chapter: parseInt(e.target.value) || 1 })} />
                  </div>
                  <div className="flex-1">
                    <label className="font-bold text-xs uppercase text-gray-400">Etiquetas (Separadas por comas)</label>
                    <input className="w-full border-b-2 border-black font-hand text-sm p-1"
                      placeholder="Picante, Veggie..."
                      value={editingProduct.tags?.join(', ') || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, tags: e.target.value.split(',').map(t => t.trim()) })} />
                  </div>
                </div>
              </div>
            </div>

            {/* DERECHA: MULTIMEDIA & MAGIA */}
            <div className="space-y-6">
              {/* IMAGEN */}
              <div className="relative h-48 bg-gray-100 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center overflow-hidden cursor-pointer group hover:bg-gray-50 transition-colors">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const url = await uploadProductImage(f);
                    if (url) setEditingProduct({ ...editingProduct, image: url });
                  }
                }} />
                {editingProduct.image ? (
                  <div className="w-full h-full relative">
                    <img src={editingProduct.image} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 bg-black text-white text-[10px] px-2 py-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity">CAMBIAR FOTO</div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 group-hover:text-black">
                    <Upload className="mx-auto mb-1" />
                    <span className="text-xs font-bold">ARRASRA O CLIC</span>
                  </div>
                )}
              </div>

              {/* HISTORIA IA */}
              <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-xs uppercase text-gray-400">Historia del Exilio</label>
                  <button className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded flex items-center gap-1 hover:bg-purple-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] transition-all"
                    onClick={async () => {
                      setEditingProduct({ ...editingProduct, history: `[IA] En las calles de... (Generando para ${editingProduct.name})...` });
                    }}>
                    <Brain size={12} /> GENERAR CON IA
                  </button>
                </div>
                <textarea className="w-full border-2 border-black font-hand text-sm p-2 h-24 italic resize-none"
                  value={editingProduct.history} onChange={e => setEditingProduct({ ...editingProduct, history: e.target.value })} />
              </div>

              {/* EXTRAS */}
              <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <h4 className="font-punk text-lg border-b-2 border-black mb-2">EXTRAS</h4>
                <div>
                  <label className="font-bold text-xs uppercase text-gray-400 mb-1 block">Características / Alérgenos</label>
                  <input className="w-full border-b-2 border-black font-hand text-sm p-1"
                    placeholder="Sin Gluten, Vegano..."
                    value={editingProduct.allergens?.join(', ') || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, allergens: e.target.value.split(',').map(t => t.trim()) })} />
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none bg-yellow-50 p-2 border border-black/10 rounded">
                  <div className={`w-5 h-5 border-2 border-black flex items-center justify-center transition-colors ${editingProduct.isFeatured ? 'bg-yellow-400' : 'bg-white'}`}
                    onClick={() => setEditingProduct({ ...editingProduct, isFeatured: !editingProduct.isFeatured })}>
                    {editingProduct.isFeatured && <Star size={12} className="text-black" />}
                  </div>
                  <span className="font-bold text-xs uppercase">¿Plato Destacado? (Portada)</span>
                </label>
              </div>
            </div>
          </div>

          {/* OPERACIONES */}
          <div className="border-t-2 border-black pt-4 flex justify-between items-center sticky bottom-0 bg-white/95 backdrop-blur py-4 z-10">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div className={`w-5 h-5 border-2 border-black ${editingProduct.isSoldOut ? 'bg-red-500' : 'bg-white'}`}
                  onClick={() => setEditingProduct({ ...editingProduct, isSoldOut: !editingProduct.isSoldOut })} />
                <span className="font-bold text-xs">AGOTADO</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div className={`w-5 h-5 border-2 border-black ${!editingProduct.isVisible ? 'bg-gray-400' : 'bg-green-500'}`}
                  onClick={() => setEditingProduct({ ...editingProduct, isVisible: !editingProduct.isVisible })} />
                <span className="font-bold text-xs">{editingProduct.isVisible ? 'VISIBLE' : 'OCULTO'}</span>
              </label>
            </div>

            <button className="bg-primary text-white font-punk text-xl px-8 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
              onClick={async () => {
                if (editingProduct.id === 'new') {
                  const newId = Date.now().toString();
                  await menuRepository.create({ ...editingProduct, id: newId });
                } else {
                  await menuRepository.update(editingProduct.id, editingProduct);
                }
                setEditingProduct(null);
                loadProducts();
              }}>
              <Save size={20} /> GUARDAR
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
          <span className="font-bold font-mono text-xs">{products.length} PRODUCTOS EN CARTA</span>
          <button className="bg-black text-white px-4 py-1 font-punk text-sm flex items-center gap-2"
            onClick={() => setEditingProduct({
              id: 'new', name: '', category: MenuCategory.BURGERS, price: '',
              description: '', history: '', chapter: 1, tags: [],
              isVisible: true, isSoldOut: false, isFeatured: false, allergens: [], sku: '', order: products.length
            })}>
            <PlusCircle size={16} /> NUEVO PLATO
          </button>
        </div>

        <div className="space-y-2 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {products.map((p, index) => (
            <div key={p.id} className={`flex justify-between items-center p-3 border-2 border-black bg-white hover:bg-yellow-50 transition-colors group ${!p.isVisible ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-4">
                {/* ORDENAMIENTO BASICO (MVP) */}
                <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    disabled={index === 0}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (index > 0) {
                        const newProducts = [...products];
                        // Swap
                        [newProducts[index - 1], newProducts[index]] = [newProducts[index], newProducts[index - 1]];
                        // Optimistic update
                        setProducts(newProducts);
                        // Persist Order
                        await Promise.all(newProducts.map((p, idx) => menuRepository.update(p.id, { order: idx })));
                        loadProducts();
                      }
                    }}
                    className="hover:text-primary disabled:opacity-30"><ChevronUp size={14} /></button>
                  <button
                    disabled={index === products.length - 1}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (index < products.length - 1) {
                        const newProducts = [...products];
                        const temp = newProducts[index];
                        newProducts[index] = newProducts[index + 1];
                        newProducts[index + 1] = temp;
                        setProducts(newProducts);
                        await Promise.all(newProducts.map((p, idx) => menuRepository.update(p.id, { order: idx })));
                        loadProducts();
                      }
                    }}
                    className="hover:text-primary disabled:opacity-30"><ChevronDown size={14} /></button>
                </div>

                <img src={p.image} className="w-12 h-12 object-cover border border-black bg-gray-200" />
                <div>
                  <h4 className="font-bold font-display uppercase leading-none flex items-center gap-2">
                    {p.name}
                    {p.isSoldOut && <span className="text-red-500 text-[10px] ml-2">● AGOTADO</span>}
                    {p.isFeatured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                  </h4>
                  <div className="flex gap-2 text-xs text-gray-500 font-mono">
                    <span>{p.sku || '---'}</span>
                    <span>•</span>
                    <span>{p.category}</span>
                    <span>•</span>
                    <span>{p.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button title="Duplicar" onClick={() => setEditingProduct({ ...p, id: 'new', name: `${p.name} (Copia)`, sku: `${p.sku}-CP` })}><Sparkles size={16} className="text-purple-600" /></button>
                <button title="Destacar" onClick={async () => { await menuRepository.update(p.id, { isFeatured: !p.isFeatured }); loadProducts(); }}>
                  <Star size={16} className={p.isFeatured ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} />
                </button>
                <button title="Ocultar" onClick={async () => { await menuRepository.update(p.id, { isVisible: !p.isVisible }); loadProducts(); }}>
                  {p.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => setEditingProduct(p)} className="bg-black text-white px-2 py-0.5 font-bold text-xs">EDITAR</button>
                <button title="Eliminar" className="text-red-500 hover:bg-red-100 p-1" onClick={async () => { if (confirm('¿Borrar?')) { await menuRepository.delete(p.id); loadProducts(); } }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
            ) : activeSection === 'recommend' ? (
              renderOracleManager()
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
