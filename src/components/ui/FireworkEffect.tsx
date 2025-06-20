import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  scale: number;
  duration: number;
}

const FireworkEffect: React.FC = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  
  useEffect(() => {
    const colors = [
      '#FF5733', '#33FF57', '#5733FF', '#FFFF33', 
      '#33FFFF', '#FF33FF', '#FFD700', '#FF1493',
      '#FFA500', '#00FF00', '#FF00FF', '#00FFFF'
    ];
    let count = 0;
    
    const createFirework = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.7);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const scale = 0.5 + Math.random() * 1.5;
      const duration = 0.8 + Math.random() * 0.4;
      
      setFireworks(prev => [...prev, { id: count, x, y, color, scale, duration }]);
      count++;
      
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== count - 1));
      }, duration * 1000);
    };
    
    // Create initial fireworks
    for (let i = 0; i < 12; i++) {
      setTimeout(createFirework, i * 150);
    }
    
    // Create fireworks at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        createFirework();
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {fireworks.map((firework) => (
          <motion.div
            key={firework.id}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: firework.x,
              y: window.innerHeight
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, firework.scale, 0.2],
              y: firework.y,
              transition: {
                duration: firework.duration,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{ opacity: 0 }}
            className="absolute"
          >
            <div 
              className="relative"
              style={{ 
                width: '12px',
                height: '12px',
                backgroundColor: firework.color,
                borderRadius: '50%',
                boxShadow: `0 0 40px 12px ${firework.color}`
              }}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-current"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 15}deg) translateY(-40px)`,
                    backgroundColor: firework.color,
                    transformOrigin: '50% 40px'
                  }}
                  animate={{
                    opacity: [1, 0],
                    scale: [1, 0],
                    transition: {
                      duration: firework.duration * 0.8,
                      ease: 'easeOut',
                      delay: Math.random() * 0.2
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FireworkEffect;