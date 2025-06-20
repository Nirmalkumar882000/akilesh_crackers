import React from 'react';
import { motion } from 'framer-motion';

const LoaderEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <motion.div
        className="relative w-24 h-24"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="https://images.pexels.com/photos/2684383/pexels-photo-2684383.jpeg" 
            alt="Lord Ganesha"
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
        <div className="absolute inset-0">
          <div className="w-full h-full border-4 border-primary-500 rounded-full animate-spin-slow"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoaderEffect;