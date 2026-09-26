import React, { useState } from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
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
        {/* Section Tag */}
        <div className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase mb-8 flex items-center gap-2">
          <span>—</span>
          <span className="font-semibold text-neutral-300">05 CONNECT</span>
        </div>

        {/* Heading: "Let's build something great together!" with "together!" in script cursive */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-neutral-100 tracking-tight flex items-baseline gap-3 flex-wrap">
            <span className="font-editorial">Let's build something great</span>
            <span className="font-script text-5xl sm:text-7xl md:text-8xl text-neutral-200 italic transform -rotate-1">
              together!
            </span>
          </h2>
        </div>

        {/* 4 Interactive Link Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
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
                className="relative group p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-500 transition-all duration-300 flex flex-col justify-between h-44 overflow-hidden"
              >
                {/* Magnetic Hover Indicator Bubble as seen in video */}
                {isHovered && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none transition-all duration-300" />
                )}

                <div className="flex items-center justify-between text-neutral-400 group-hover:text-white transition-colors">
                  <span className="font-mono text-xs tracking-widest uppercase">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl text-neutral-100 group-hover:text-white transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors mt-1 truncate">
                    {link.handle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Middle Metadata Row: Location, Role, Back to Top */}
        <div className="py-6 border-y border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-widest text-neutral-400 uppercase">
          <div className="text-left font-medium text-neutral-300">
            PORTFOLIO OF ANJANA MADU
          </div>

          <div className="text-neutral-500 font-light">
            Full-Stack · DevOps · Security
          </div>

          {/* Smooth Back to Top Action */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Monumental ANJANA Typography at bottom */}
        <div className="w-full text-center my-12 overflow-hidden select-none">
          <div className="font-serif-display text-7xl sm:text-9xl md:text-[13rem] lg:text-[16rem] tracking-[0.2em] text-neutral-300/90 font-normal uppercase pl-[0.2em] leading-none transition-all duration-500 hover:text-white">
            ANJANA
          </div>
        </div>

        {/* Copyright Note */}
        <div className="text-center text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase pt-4 border-t border-neutral-900">
          © {PROFILE_DATA.year} ANJANA MADU — OPEN SOURCE & SOFTWARE ENGINEERING
        </div>
      </div>
    </footer>
  );
};
