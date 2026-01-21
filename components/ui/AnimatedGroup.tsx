
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedGroup: React.FC<AnimatedGroupProps> = ({ children, className = "", delay = 0.1 }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, rotate: -2 },
    show: { opacity: 1, y: 0, rotate: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
