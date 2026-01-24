import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';
import { ProductDiario } from './ProductDiario';
import { MENU_ITEMS } from '../constants';

interface CoverViewProps {
  onEnter?: () => void;
  manifestoText?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  isPreview?: boolean;
  coverTitle?: string;
  stickerText?: string;
  ownerText?: string;
}

const CoverView: React.FC<CoverViewProps> = ({
  onEnter,
  manifestoText = `"Bienvenidos a mi exilio. Lo que tienes aquí no es una lista de precios, sino los retazos de una maleta que recorrió el mundo buscando un sabor que solo existía en mi memoria."`,
  primaryColor = '#D4AF37', // Default Gold
  secondaryColor = '#1a1a1a',
  accentColor = '#f5f5f5',
  isPreview = false,
  coverTitle = "DIARIO\nDE UN\nVIAJE",
  stickerText = "Confidencial\nExilio 2024",
  ownerText = "Propiedad de:\nEl Exiliado"
}) => {
  const [isJournalOpen, setIsJournalOpen] = useState(isPreview); // Open by default if preview
  const heroAnimationUrl = "https://secaqjszqfywcoykllhx.supabase.co/storage/v1/object/sign/LA%20GUAPA/Quiero_que_hagas_1080p_202601182223-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOGI0YTY5My0xNmVkLTRhYmYtYTgyNS0wMDAxZTU3N2RlNzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQSBHVUFQQS9RdWllcm9fcXVl_aGFnYXNfMTA4MHBfMjAyNjAxMTgyMjIzLWV6Z2lmLnNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzY4Nzk1NDEyLCJleHAiOjE3Njk0MDAyMTJ9.ZywbwEV56BEBMAAtHvhLgDQJQmEhVzak-ZK57WNueK8";

  const featuredProducts = MENU_ITEMS.filter(item => item.tags?.includes('Signature'));

  // Handler wrapper to allow optional onEnter
  const handleEnter = () => {
    if (onEnter) onEnter();
  };

  return (
    <div
      className="flex-grow flex flex-col relative overflow-y-auto no-scrollbar"
      style={{
        // @ts-ignore - CSS custom properties for dynamic theming
        '--color-primary': primaryColor,
        '--color-secondary': secondaryColor,
        '--color-accent': accentColor,
      } as React.CSSProperties}
    >
      <AnimatePresence mode="wait">
        {!isJournalOpen ? (
          /* PANTALLA CERRADA: SOBRE / CARPETA */
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", y: -100 }}
            onClick={() => !isPreview && setIsJournalOpen(true)}
            className={`flex-grow flex flex-col items-center justify-center px-8 ${!isPreview ? 'cursor-pointer group' : ''}`}
          >
            <div className="relative w-full max-w-sm aspect-[3/4] bg-[#d2b48c] dark:bg-[#3d3a33] border-4 border-black shadow-heavy transform transition-transform group-hover:rotate-1 group-hover:scale-[1.02]">
              {/* Sticker / Sello */}
              <div
                className="absolute top-10 -right-6 w-24 h-24 rounded-full border-4 border-black flex items-center justify-center text-white font-punk text-xs transform rotate-12 shadow-lg z-20"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="text-center leading-none uppercase whitespace-pre-line">{stickerText}</span>
              </div>

              {/* Cinta adhesiva */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 tape-effect rotate-1 z-10 opacity-90"></div>

              <div className="p-8 flex flex-col h-full border-2 border-dashed border-black/20 m-2">
                <div className="mt-12 space-y-4">
                  <h1 className="font-display text-6xl text-dark dark:text-white leading-none tracking-tighter whitespace-pre-line">{coverTitle}</h1>
                  <div className="h-2 w-20" style={{ backgroundColor: primaryColor }}></div>
                  <p className="font-hand text-2xl text-secondary dark:text-accent opacity-80 mt-6 whitespace-pre-line">
                    {ownerText}
                  </p>
                </div>

                <div className="mt-auto flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center bg-accent text-dark shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span className="material-symbols-outlined font-bold">touch_app</span>
                  </motion.div>
                  <p className="font-punk text-xl mt-4 tracking-widest text-dark dark:text-white">TOCA PARA ABRIR EL ARCHIVO</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* CONTENIDO DEL HERO REVELADO */
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-grow flex flex-col justify-start px-6 pt-4 pb-20 relative"
          >
            {/* Vinyl Record Mockup Background */}
            <div className="fixed -right-24 top-1/4 w-72 h-72 rounded-full bg-black border-4 border-gray-800 animate-spin-slow opacity-30 z-0">
              <div
                className="absolute inset-0 m-auto w-28 h-28 rounded-full border-4 border-white flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="text-[10px] text-white font-bold uppercase tracking-widest font-hand">Cara A</span>
              </div>
            </div>

            <div className="relative z-10 transform rotate-1 mb-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-10 tape-effect rotate-2 z-20 opacity-90"></div>
              <motion.div
                initial={{ rotateX: 90 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white dark:bg-paper-dark p-1 shadow-2xl ripped-edge-bottom pb-8 border-2 border-black overflow-hidden origin-top"
              >
                <div className="relative h-[250px] overflow-hidden border-b-2 border-black group">
                  {/* Fixed: animating filter: grayscale() instead of shorthand grayscale prop to resolve type errors */}
                  <motion.img
                    initial={{ scale: 1.2, filter: "grayscale(100%)" }}
                    animate={{ scale: 1, filter: "grayscale(50%)" }}
                    transition={{ duration: 1.5 }}
                    alt="La Guapa Hero Animation"
                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-1000"
                    src={heroAnimationUrl}
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply pointer-events-none"
                    style={{ backgroundColor: `${primaryColor}1A` }} // 10% opacity
                  ></div>
                </div>

                <div className="p-6 bg-paper-light dark:bg-[#1e1e1e] relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 12 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -right-6 -top-12 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl z-20 border-2 border-black"
                  >
                    <span className="font-hand text-black text-sm text-center font-bold leading-none uppercase">Vibra<br />Ahora</span>
                  </motion.div>

                  {/* El Manifiesto del Exilio Refactorizado */}
                  <div className="mb-8 border-l-4 pl-4 py-2" style={{ borderColor: primaryColor }}>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-hand text-xl text-secondary dark:text-accent leading-tight italic"
                    >
                      {manifestoText}
                    </motion.p>
                  </div>

                  <h2 className="font-display text-4xl mb-3 text-dark dark:text-white leading-none tracking-tighter uppercase italic">
                    Sabor que <br /><span className="font-hand not-italic" style={{ color: primaryColor }}>rompe esquemas.</span>
                  </h2>

                  <div className="h-px w-full bg-secondary/10 my-4"></div>

                  <p className="font-body text-[10px] leading-relaxed text-gray-500 font-bold text-center uppercase tracking-[0.2em]">
                    BARRANQUILLA — LONDRES — MADRID — EL DESTINO
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Platos destacados */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 relative z-20"
            >
              <div className="text-center mb-2">
                <span className="font-punk text-secondary dark:text-accent text-xs tracking-widest uppercase">Ecos de la Memoria</span>
              </div>
              <ProductDiario items={featuredProducts} autoplay={true} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-12 pb-12 relative z-30"
            >
              <button
                onClick={handleEnter}
                className="text-white font-punk text-2xl px-12 py-4 shadow-heavy border-4 border-black hover:scale-105 transition-all transform -rotate-1"
                style={{ backgroundColor: primaryColor }}
              >
                IR AL MENÚ PRINCIPAL
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoverView;