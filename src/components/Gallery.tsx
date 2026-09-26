import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA, PROFILE_DATA } from '../data';
import { ProjectItem } from '../types';

export const Gallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track horizontal scroll progress (Frame 046)
  const handleScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        setScrollProgress((scrollLeft / totalScrollable) * 100);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto scroll-mt-20 overflow-hidden select-none">
      {/* Top Header Row (Frame 036) */}
      <div className="px-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          {/* Section Tag */}
          <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-4 flex items-center gap-2">
            <span>—</span>
            <span className="font-semibold text-neutral-800">04 SHOWCASE</span>
          </div>

          {/* Heading: "Selected Works" with "Works" in script cursive (Frame 036) */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-neutral-900 tracking-tight flex items-baseline gap-3 flex-wrap">
            <span className="font-editorial">Selected</span>
            <span className="font-script text-5xl sm:text-7xl md:text-8xl text-neutral-800 italic transform -rotate-1">
              Works
            </span>
          </h2>
        </div>

        {/* Right Helper & Navigation Controls (Frame 036) */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 select-none hidden md:inline">
            SWIPE TO EXPLORE →
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-black transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-black transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track (Frame 037-046) */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScrollProgress}
        className="flex items-center gap-6 px-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-8"
      >
        {PROJECTS_DATA.map((item) => {
          if (item.type === 'graphic') {
            return (
              <div
                key={item.id}
                className="w-72 sm:w-80 h-[28rem] sm:h-[30rem] rounded-2xl bg-[#121212] text-white p-8 flex flex-col justify-between shrink-0 shadow-lg border border-neutral-800 select-none transition-transform hover:scale-[1.01]"
              >
                {/* Header Tag */}
                <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  ENGINEERING — OPEN SOURCE
                </div>

                {/* Central Japanese Vertical Typographic Art (Frame 038-040) */}
                <div className="flex flex-col items-center my-auto">
                  <div className="font-jp text-5xl md:text-6xl tracking-[0.3em] font-light text-neutral-100 select-none [writing-mode:vertical-rl]">
                    アンジャナ
                  </div>
                </div>

                {/* Footer Subtext */}
                <div className="border-t border-neutral-800 pt-4 text-center">
                  <span className="font-sans text-[11px] tracking-[0.25em] text-neutral-400 uppercase font-medium">
                    ANJANA M.
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="w-72 sm:w-80 h-[28rem] sm:h-[30rem] rounded-2xl bg-white border border-black/10 overflow-hidden shrink-0 shadow-md flex flex-col justify-between p-6 group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
            >
              {/* Top Tag & Language */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-4">
                  <span className="font-semibold text-neutral-800">{item.number}</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-700 text-[10px]">
                    {item.language}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-2xl font-normal text-neutral-900 group-hover:text-indigo-950 transition-colors">
                  {item.title}
                </h3>
                <div className="text-[11px] font-mono text-neutral-500 mt-1 uppercase tracking-wider">
                  {item.category}
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-600 leading-relaxed mt-4 line-clamp-4">
                  {item.description}
                </p>
              </div>

              {/* Middle Feature Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="py-3 border-y border-black/5 my-2">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">KEY CAPABILITY</span>
                  <p className="text-[11px] text-neutral-700 font-sans truncate">
                    • {item.highlights[0]}
                  </p>
                </div>
              )}

              {/* Bottom Row */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-neutral-500 border-t border-black/10">
                <span className="flex items-center gap-1">
                  {item.stars !== undefined && item.stars > 0 && (
                    <>
                      <Star size={13} className="text-amber-500 fill-amber-500" />
                      <span>{item.stars} stars</span>
                    </>
                  )}
                </span>
                <span className="text-neutral-800 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Details</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          );
        })}

        {/* End-of-Carousel Call to Action Card (Exact Match for Frame 046) */}
        <div className="w-72 sm:w-80 h-[28rem] sm:h-[30rem] rounded-2xl bg-neutral-100 border border-black/10 p-8 flex flex-col items-center justify-center text-center shrink-0 shadow-sm">
          <p className="font-script text-4xl sm:text-5xl text-neutral-800 leading-tight mb-8">
            "Build, break, learn, repeat."
          </p>

          <button
            onClick={scrollToContact}
            className="px-6 py-2.5 rounded-full border border-neutral-800 hover:bg-neutral-900 hover:text-white transition-all text-xs font-mono tracking-widest uppercase cursor-pointer"
          >
            CONTACT →
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Scroll Indicator Bar (Frame 046) */}
      <div className="max-w-xs mx-auto px-6 mt-2">
        <div className="w-full h-[2px] bg-neutral-200 relative rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-900 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(scrollProgress, 8)}%` }}
          />
        </div>
      </div>

      {/* Project Detail Modal with Smooth Open/Close Animation */}
      <AnimatePresence>
        {selectedItem && selectedItem.type === 'project' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with smooth fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Dialog with gentle scale, lift, and fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#fbfbfa] text-neutral-900 w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-black/10 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
                aria-label="Close project modal"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
                    {selectedItem.number} · {selectedItem.tag}
                  </span>
                  {selectedItem.language && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-200 text-neutral-800 rounded">
                      {selectedItem.language}
                    </span>
                  )}
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-neutral-900">
                  {selectedItem.title}
                </h3>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  {selectedItem.category}
                </p>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-white border border-black/10 mb-6">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Highlights */}
              {selectedItem.highlights && selectedItem.highlights.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-3">
                    Architecture & Engineering Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedItem.highlights.map((h, i) => (
                      <li key={i} className="text-xs sm:text-sm text-neutral-700 flex items-start gap-2">
                        <span className="text-neutral-400 font-mono mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  {selectedItem.stars !== undefined && selectedItem.stars > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-lg border border-black/5">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span>{selectedItem.stars} GitHub Stars</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {selectedItem.repoUrl && (
                    <a
                      href={selectedItem.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wider uppercase bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-black/15 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
