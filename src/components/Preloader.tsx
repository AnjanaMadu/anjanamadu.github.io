import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds counter
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsFinished(true);
          // Wait for the stepped curtain animation to complete before removing
          setTimeout(() => {
            onComplete();
          }, 900);
        }, 250);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // 5 stepped column slices matching Frame 007 stair-step curtain wipe
  const columns = [0, 1, 2, 3, 4];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none">
      {/* 5 Vertical Stepped Curtain Columns (Frame 007) */}
      <AnimatePresence>
        {!isFinished ? (
          /* Initial dark preloader state */
          <motion.div
            key="preloader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-white px-6 pointer-events-auto"
          >
            <div className="w-full max-w-sm flex flex-col items-center">
              {/* Japanese Katakana (Frame 002-005) */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-jp text-5xl md:text-6xl tracking-[0.25em] text-neutral-100 font-light pl-[0.25em] text-center mb-6"
              >
                アンジャナ
              </motion.h1>

              {/* Progress Bar Line filling from left to right (Frame 002-005) */}
              <div className="w-full h-[1.5px] bg-neutral-800 relative overflow-hidden my-2">
                <motion.div
                  className="h-full bg-white transition-[width] duration-75 ease-out"
                  style={{ width: `${count}%` }}
                />
              </div>

              {/* Bottom metadata row: Name on left, Counter on right (Frame 002-005) */}
              <div className="w-full flex items-center justify-between text-neutral-400 text-[11px] tracking-[0.25em] font-sans pt-2">
                <span className="font-medium text-neutral-300">ANJANA</span>
                <span className="font-mono tabular-nums text-neutral-400">
                  {String(count).padStart(3, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Stepped 5-column Curtain Reveal (Frame 006-007) */
          <div key="curtain" className="fixed inset-0 z-50 flex pointer-events-none">
            {columns.map((colIdx) => (
              <motion.div
                key={colIdx}
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                transition={{
                  duration: 0.75,
                  delay: colIdx * 0.09, // Stair-step cascade delay matching Frame 007
                  ease: [0.76, 0, 0.24, 1]
                }}
                className="flex-1 h-full bg-[#121212] border-r border-neutral-800/40 last:border-r-0"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
