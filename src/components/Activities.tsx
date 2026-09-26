import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CRAFT_DATA } from '../data';
import { CraftItem } from '../types';

// Curated preview images matching the floating image hover seen in Frame 023-028
const CRAFT_PREVIEWS: Record<string, string> = {
  fullstack: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', // Code / React / Architecture
  devops: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80', // Cloud / Server / Infrastructure
  security: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' // Networks / Protocols / Security
};

export const Activities: React.FC = () => {
  const [hoveredCraft, setHoveredCraft] = useState<CraftItem | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Smooth window-relative mouse tracking for the floating preview
    setMousePos({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <section
      id="craft"
      className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20 relative select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Section Tag (Frame 022) */}
      <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-8 flex items-center gap-2">
        <span>—</span>
        <span className="font-semibold text-neutral-800">02 CRAFT & SYSTEMS</span>
      </div>

      {/* Header: "Engineering in motion" with "motion" in script cursive (Frame 022) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black/10">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-neutral-900 tracking-tight flex items-baseline gap-3 flex-wrap">
            <span className="font-editorial">Engineering in</span>
            <span className="font-script text-5xl sm:text-7xl md:text-8xl text-neutral-800 italic transform -rotate-1">
              motion
            </span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-500 max-w-xs md:text-right font-light leading-relaxed">
          From distributed backends to client interfaces — core domains Anjana crafts.
        </p>
      </div>

      {/* Craft List (Frame 022-028) */}
      <div className="flex flex-col divide-y divide-black/10 border-b border-black/10 relative">
        {CRAFT_DATA.map((craft) => {
          const isHovered = hoveredCraft?.id === craft.id;
          return (
            <div
              key={craft.id}
              onMouseEnter={() => setHoveredCraft(craft)}
              onMouseLeave={() => setHoveredCraft(null)}
              className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-colors duration-300 hover:bg-neutral-50/70 px-4 rounded-xl relative z-10"
            >
              {/* Number + Title (Frame 022) */}
              <div className="flex items-baseline gap-6 sm:gap-10">
                <span className="font-mono text-xs sm:text-sm tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors">
                  {craft.number}
                </span>
                <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {craft.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:max-w-md text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed pl-12 md:pl-0">
                {craft.description}
              </div>

              {/* Right Arrow Button: Outlined circle transforming to Solid Black circle with White Arrow on Hover (Frame 025-028) */}
              <div
                className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 self-end md:self-auto shrink-0 ${
                  isHovered
                    ? 'bg-black text-white border-black scale-105'
                    : 'border-black/20 text-neutral-800 bg-transparent'
                }`}
              >
                <ArrowRight
                  size={18}
                  className={`transform transition-transform ${isHovered ? 'translate-x-0.5' : ''}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cursor-Following Image Preview (Exact Match for Frame 023-028) */}
      <AnimatePresence>
        {hoveredCraft && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-none fixed z-30 hidden md:block"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-48 sm:w-56 h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/80 bg-neutral-900 relative">
              <img
                src={CRAFT_PREVIEWS[hoveredCraft.id] || CRAFT_PREVIEWS.fullstack}
                alt={hoveredCraft.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Elegant gradient overlay & caption label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
                  {hoveredCraft.number} SPECIALIZATION
                </span>
                <span className="font-editorial text-sm font-medium text-white">
                  {hoveredCraft.title}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
