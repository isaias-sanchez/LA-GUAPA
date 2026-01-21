
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaSrc: string;
  title: string;
  date: string;
  children: React.ReactNode;
}

const ScrollExpandMedia: React.FC<ScrollExpandMediaProps> = ({ mediaSrc, title, date, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-dark">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.4]) }}
          className="absolute inset-0 z-0"
        >
          <img src={mediaSrc} className="w-full h-full object-cover blur-2xl grayscale opacity-50" alt="" />
        </motion.div>

        {/* Main Media Container */}
        <motion.div 
          style={{ scale, y }}
          className="relative z-10 w-full max-w-lg aspect-[3/4] p-2 bg-white border-4 border-black shadow-heavy rotate-1"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 tape-effect rotate-2 z-20"></div>
          <img src={mediaSrc} className="w-full h-full object-cover grayscale" alt={title} />
          
          <div className="absolute bottom-4 left-4 right-4 bg-primary text-white p-4 border-2 border-black transform -rotate-2">
            <p className="font-punk text-xs tracking-widest">{date}</p>
            <h2 className="font-display text-4xl uppercase leading-none">{title}</h2>
          </div>
        </motion.div>

        {/* Floating Narrative Text */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center p-8 pointer-events-none"
        >
          <div className="max-w-xl bg-accent/90 backdrop-blur-md p-10 border-4 border-black shadow-heavy transform -rotate-1 pointer-events-auto">
             {children}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center"
        >
          <p className="font-hand text-xl animate-bounce">Desliza para recordar...</p>
          <span className="material-symbols-outlined text-4xl">keyboard_double_arrow_down</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
