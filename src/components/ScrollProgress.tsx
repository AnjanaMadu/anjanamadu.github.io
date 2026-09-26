import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  activeSection?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const isDarkSection = activeSection === 'quote' || activeSection === 'contact';

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none transition-colors duration-300"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background Track */}
      <div
        className={`w-full h-full transition-colors duration-300 ${
          isDarkSection ? 'bg-white/10' : 'bg-black/5'
        }`}
      />

      {/* Dynamic Progress Fill Bar */}
      <div
        className={`absolute top-0 left-0 h-full transition-[width] duration-75 ease-out ${
          isDarkSection
            ? 'bg-gradient-to-r from-neutral-200 via-white to-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
            : 'bg-gradient-to-r from-neutral-800 via-neutral-900 to-black shadow-[0_0_6px_rgba(0,0,0,0.25)]'
        }`}
        style={{
          width: `${scrollProgress}%`
        }}
      />
    </div>
  );
};
