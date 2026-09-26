import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const duration = 1600; // 1.6 seconds total
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
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 300);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.95 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-white select-none px-6"
        >
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* Japanese Katakana Title for Anjana */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-jp text-5xl md:text-6xl tracking-[0.25em] text-neutral-100 font-light pl-[0.25em] text-center mb-6"
            >
              アンジャナ
            </motion.h1>

            {/* Horizontal Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full h-[1px] bg-neutral-700/80 my-2 origin-center"
            />

            {/* Sub-row: Name on left, Counter on right */}
            <div className="w-full flex items-center justify-between text-neutral-400 text-[11px] tracking-[0.25em] font-sans pt-2">
              <span className="font-medium text-neutral-300">ANJANA MADU</span>
              <span className="font-mono tabular-nums text-neutral-400">
                {String(count).padStart(3, '0')}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
