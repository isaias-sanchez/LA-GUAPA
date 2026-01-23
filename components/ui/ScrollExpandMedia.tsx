import React from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaSrc: string;
  title: string;
  date: string;
  children: React.ReactNode;
}

const ScrollExpandMedia: React.FC<ScrollExpandMediaProps> = ({ mediaSrc, title, date, children }) => {
  return (
    <div className="relative min-h-screen bg-dark overflow-y-auto pt-24 pb-12 px-4 flex flex-col items-center gap-8 custom-scrollbar">
      {/* Background Texture/Blur */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img src={mediaSrc} className="w-full h-full object-cover blur-3xl grayscale" alt="" />
      </div>

      {/* Main Media Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm aspect-[3/4] p-2 bg-white border-4 border-black shadow-heavy rotate-1"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 tape-effect rotate-2 z-20"></div>
        <img src={mediaSrc} className="w-full h-full object-cover grayscale" alt={title} />

        <div className="absolute -bottom-6 -right-2 bg-primary text-white p-4 border-2 border-black transform rotate-2 shadow-lg min-w-[200px]">
          <p className="font-punk text-xs tracking-widest">{date}</p>
          <h2 className="font-display text-2xl uppercase leading-none truncate">{title}</h2>
        </div>
      </motion.div>

      {/* Narrative Text - Now Static and Below */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-20 w-full max-w-xl mt-4"
      >
        <div className="bg-accent/95 backdrop-blur-md p-6 sm:p-10 border-4 border-black shadow-heavy transform -rotate-1">
          {children}
        </div>
      </motion.div>

      {/* Aesthetic Spacer */}
      <div className="h-12 w-full"></div>
    </div>
  );
};

export default ScrollExpandMedia;
