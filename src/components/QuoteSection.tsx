import React from 'react';
import { PROFILE_DATA } from '../data';

export const QuoteSection: React.FC = () => {
  return (
    <section
      id="quote"
      className="py-32 md:py-44 px-6 bg-[#121212] text-white flex flex-col items-center justify-center text-center relative overflow-hidden select-none"
    >
      {/* Subtle radial ambient light in background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/30 via-transparent to-transparent pointer-events-none" />

      {/* Section Subtitle */}
      <div className="text-[11px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-8 relative z-10">
        — 03 THE QUESTION IS —
      </div>

      {/* Monumental Italic Quote */}
      <blockquote className="max-w-4xl mx-auto font-editorial italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-snug text-neutral-100 tracking-tight relative z-10 px-4">
        "{PROFILE_DATA.shortQuote}"
      </blockquote>

      {/* Attribution */}
      <div className="mt-8 font-sans font-light tracking-[0.25em] text-xs sm:text-sm text-neutral-400 uppercase relative z-10">
        — {PROFILE_DATA.name} —
      </div>
    </section>
  );
};
