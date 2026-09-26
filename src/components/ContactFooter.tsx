import React, { useState } from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { SOCIAL_LINKS, PROFILE_DATA } from '../data';

export const ContactFooter: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="contact" className="bg-[#121212] text-white pt-28 pb-16 px-6 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag (Frame 047) */}
        <div className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase mb-8 flex items-center gap-2">
          <span>—</span>
          <span className="font-semibold text-neutral-300">05 CONNECT</span>
        </div>

        {/* Heading: "Terima kasih sudah / mampir!" or "Let's build something great / together!" (Frame 047-049) */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-neutral-100 tracking-tight flex items-baseline gap-3 flex-wrap">
            <span className="font-editorial">Let's build something great</span>
            <span className="font-script text-5xl sm:text-7xl md:text-8xl text-neutral-200 italic transform -rotate-1">
              together!
            </span>
          </h2>
        </div>

        {/* Unified 4-Segment Horizontal Link Bar (Exact Match for Frame 050-053) */}
        <div className="w-full border border-neutral-700 divide-y sm:divide-y-0 sm:divide-x divide-neutral-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-20 bg-neutral-950/60 overflow-hidden">
          {SOCIAL_LINKS.map((link, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative p-6 sm:p-8 flex items-center justify-between transition-colors duration-200 cursor-pointer overflow-hidden group ${
                  isHovered ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {/* Active white fill indicator */}
                {isHovered && (
                  <motion.div
                    layoutId="contactActiveFill"
                    className="absolute inset-0 bg-white"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  />
                )}

                {/* Left Label */}
                <div className="relative z-10">
                  <span className={`font-editorial text-2xl sm:text-3xl font-normal transition-colors ${
                    isHovered ? 'text-black' : 'text-neutral-100'
                  }`}>
                    {link.name}
                  </span>
                  <span className={`block text-[11px] font-mono mt-1 transition-colors ${
                    isHovered ? 'text-neutral-600' : 'text-neutral-500'
                  }`}>
                    {link.handle}
                  </span>
                </div>

                {/* Right Arrow Icon */}
                <div className="relative z-10">
                  <ArrowUpRight
                    size={22}
                    className={`transition-all duration-300 ${
                      isHovered
                        ? 'text-black transform translate-x-1 -translate-y-1'
                        : 'text-neutral-400 group-hover:text-white'
                    }`}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Metadata Row: Project Author, Location, Back to Top (Frame 048-053) */}
        <div className="py-6 border-y border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-widest text-neutral-400 uppercase">
          <div className="text-left font-medium text-neutral-300">
            PROJECT BY {PROFILE_DATA.name.toUpperCase()}
          </div>

          <div className="font-editorial italic not-uppercase text-sm text-neutral-300">
            {PROFILE_DATA.location}
          </div>

          {/* Smooth Back to Top Action (Frame 048-053) */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full border border-neutral-600 flex items-center justify-center group-hover:border-white transition-colors">
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Giant Monumental ANJANA Display Typography (Exact Match for MARSHA in Frame 048-053) */}
        <div className="w-full text-center my-10 overflow-hidden select-none">
          <div className="font-serif-display text-7xl sm:text-9xl md:text-[13rem] lg:text-[17rem] tracking-[0.16em] sm:tracking-[0.2em] text-neutral-200 font-normal uppercase pl-[0.16em] sm:pl-[0.2em] leading-none transition-all duration-500 hover:text-white">
            ANJANA
          </div>
        </div>

        {/* Copyright Note */}
        <div className="text-center text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase pt-4 border-t border-neutral-900">
          © {PROFILE_DATA.year} {PROFILE_DATA.name.toUpperCase()} — OPEN SOURCE & SOFTWARE ENGINEERING
        </div>
      </div>
    </footer>
  );
};
