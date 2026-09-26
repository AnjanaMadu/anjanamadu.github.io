import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data';

export const QuoteSection: React.FC = () => {
  return (
    <section
      id="quote"
      className="py-32 md:py-44 px-6 bg-[#121212] text-white flex flex-col items-center justify-center text-center relative overflow-hidden select-none"
    >
      {/* Subtle Japanese Watermark in Background (Frame 032-035) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.035]">
        <span className="font-jp text-[20rem] md:text-[28rem] font-light text-white tracking-[0.2em]">
          アンジャナ
        </span>
      </div>

      {/* Subtle radial ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent pointer-events-none" />

      {/* Section Subtitle (Frame 032) */}
      <div className="text-[11px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-8 relative z-10">
        — 03 THE QUESTION IS —
      </div>

      {/* Monumental Italic Quote (Frame 032-035) */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto font-editorial italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-snug text-neutral-100 tracking-tight relative z-10 px-4"
      >
        "{PROFILE_DATA.shortQuote}"
      </motion.blockquote>

      {/* Attribution in Cursive Script (Frame 033-035) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-8 font-script text-2xl sm:text-3xl md:text-4xl text-neutral-300 relative z-10"
      >
        ~{PROFILE_DATA.name}~
      </motion.div>
    </section>
  );
};
