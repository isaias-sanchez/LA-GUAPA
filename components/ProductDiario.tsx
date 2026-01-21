
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "../types";

export const ProductDiario = ({
  items,
  autoplay = false,
}: {
  items: MenuItem[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay && items.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, items.length]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  if (items.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-body">
      <div className="relative flex flex-col items-center">
        {/* Image Scrapbook Stack */}
        <div className="relative h-64 w-64 mb-8">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              isActive(index) && (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    zIndex: 50,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Adhesive tape effect */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-accent/60 backdrop-blur-sm border border-black/10 tape-effect z-50"></div>
                  
                  <img
                    src={item.image || 'https://via.placeholder.com/500'}
                    alt={item.name}
                    className="h-full w-full rounded-lg object-cover shadow-2xl border-4 border-white grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Narrative Text */}
        <div className="flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-xs"
            >
              <span className="font-punk text-primary text-xs uppercase tracking-widest">
                Capítulo {items[active].chapter}
              </span>
              <h3 className="text-3xl font-display text-secondary mt-1 uppercase italic leading-none">
                {items[active].name}
              </h3>
              
              <motion.div className="mt-4 font-hand text-lg text-gray-700 dark:text-gray-300 leading-tight italic">
                {items[active].history.substring(0, 100)}...
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-6 mt-6">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full border-2 border-black bg-secondary text-accent flex items-center justify-center group hover:bg-primary transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="material-symbols-outlined font-bold">arrow_back</span>
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full border-2 border-black bg-secondary text-accent flex items-center justify-center group hover:bg-primary transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
