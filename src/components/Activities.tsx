import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Cpu, Server, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CRAFT_DATA } from '../data';
import { CraftItem } from '../types';

export const Activities: React.FC = () => {
  const [hoveredCraft, setHoveredCraft] = useState<CraftItem | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedCraft, setSelectedCraft] = useState<CraftItem | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCraft(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getCraftIcon = (id: string) => {
    switch (id) {
      case 'fullstack':
        return <Cpu className="w-8 h-8 text-neutral-800" />;
      case 'devops':
        return <Server className="w-8 h-8 text-neutral-800" />;
      case 'security':
        return <Shield className="w-8 h-8 text-neutral-800" />;
      default:
        return <Cpu className="w-8 h-8 text-neutral-800" />;
    }
  };

  return (
    <section
      id="craft"
      className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Section Tag */}
      <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-8 flex items-center gap-2">
        <span>—</span>
        <span className="font-semibold text-neutral-800">02 CRAFT & SYSTEMS</span>
      </div>

      {/* Header: "Engineering in motion" + Subtext */}
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

      {/* Craft List */}
      <div className="flex flex-col divide-y divide-black/10 border-b border-black/10 relative">
        {CRAFT_DATA.map((craft) => (
          <div
            key={craft.id}
            onMouseEnter={() => setHoveredCraft(craft)}
            onMouseLeave={() => setHoveredCraft(null)}
            onClick={() => setSelectedCraft(craft)}
            className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-colors duration-300 hover:bg-neutral-50/60 px-4 rounded-xl relative z-10"
          >
            {/* Number + Title */}
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

            {/* Arrow Button */}
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-black/15 group-hover:border-black group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300 self-end md:self-auto shrink-0">
              <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cursor Preview Tag Card */}
      {hoveredCraft && (
        <div
          className="pointer-events-none fixed z-30 transition-all duration-150 ease-out hidden md:block"
          style={{
            left: `${mousePos.x + 30}px`,
            top: `${mousePos.y - 80}px`,
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <div className="w-64 p-5 rounded-xl bg-neutral-950 text-white shadow-2xl border border-neutral-700 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {hoveredCraft.number} SPECIALTY
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-sm font-editorial font-medium mb-1">
              {hoveredCraft.title}
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              {hoveredCraft.iconTag}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal when clicking a craft category */}
      <AnimatePresence>
        {selectedCraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with smooth fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => setSelectedCraft(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Dialog with gentle scale, lift, and fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#fbfbfa] text-neutral-900 w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-black/10 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCraft(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="mb-6 flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-xl border border-black/10">
                  {getCraftIcon(selectedCraft.id)}
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase block mb-1">
                    {selectedCraft.number} DOMAIN
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-900">
                    {selectedCraft.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 mt-1">
                    {selectedCraft.details.subtitle}
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-2">
                    Key Competencies & Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedCraft.details.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-neutral-700 flex items-start gap-2">
                        <span className="text-neutral-400 font-mono mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Badges */}
                <div className="pt-4 border-t border-black/10">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 block mb-2">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCraft.details.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-black/10 rounded-md text-[11px] font-mono text-neutral-700 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-black/10">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 block mb-1">
                    Production Deliverables
                  </span>
                  <p className="text-xs text-neutral-600">
                    {selectedCraft.details.deliverables.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10 flex justify-end">
                <button
                  onClick={() => setSelectedCraft(null)}
                  className="px-5 py-2 text-xs font-mono tracking-widest uppercase bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
