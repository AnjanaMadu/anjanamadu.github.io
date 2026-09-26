import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data';

interface HeroProps {
  onPlaySynth: () => void;
  isPlaying: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onPlaySynth, isPlaying }) => {
  const [scriptRevealed, setScriptRevealed] = useState(false);

  useEffect(() => {
    // Reveal script after stepped preloader finishes
    const timer = setTimeout(() => {
      setScriptRevealed(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 pb-8 px-4 sm:px-6 flex flex-col justify-center max-w-7xl mx-auto overflow-hidden">
      {/* Outer Editorial Inset Frame (matching Frame 010-012) */}
      <div className="relative w-full border border-black/85 rounded-none p-6 sm:p-10 flex flex-col justify-between min-h-[calc(100vh-6.5rem)] bg-[#fbfbfa]">
        
        {/* Top Meta Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          {/* Top-Left: Badge Box & Philosophy (Frame 009) */}
          <div className="flex flex-col sm:flex-row items-start gap-4 max-w-md">
            {/* DEV / OPS Badge Box */}
            <div className="flex items-center border border-black bg-white px-3 py-1.5 shadow-2xs shrink-0">
              <div className="flex flex-col pr-2 border-r border-black">
                <span className="text-[10px] font-bold tracking-tighter text-neutral-800 leading-none">
                  DEV
                </span>
                <span className="text-sm font-bold tracking-tight text-neutral-900 leading-none">
                  OPS
                </span>
              </div>
              <div className="pl-2">
                <span className="inline-block bg-neutral-900 text-[8px] font-medium tracking-widest text-white px-1.5 py-0.5 uppercase font-mono">
                  OPEN SOURCE
                </span>
              </div>
            </div>

            {/* Philosophy Prose */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono text-neutral-500">
                  PHILOSOPHY
                </span>
                <button
                  onClick={onPlaySynth}
                  className="inline-flex items-center gap-1 text-[10px] text-neutral-600 hover:text-black transition-colors underline decoration-dotted cursor-pointer"
                  title="Toggle ambient background sound"
                >
                  <Volume2 size={12} className={isPlaying ? 'text-indigo-600 animate-pulse' : ''} />
                  <span className="font-mono">Sound</span>
                </button>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed font-normal mt-0.5">
                "{PROFILE_DATA.philosophy}"
              </p>
            </div>
          </div>

          {/* Top-Right: Colombo Location + Author & Hanging Equalizer Bars (Frame 010-012) */}
          <div className="flex items-start md:items-start justify-between md:justify-end gap-6">
            <div className="text-left md:text-right">
              <div className="font-editorial italic text-xs tracking-wider text-neutral-800 font-medium">
                {PROFILE_DATA.location}
              </div>
              <div className="text-[11px] font-mono tracking-wide text-neutral-500 font-light mt-0.5">
                Portfolio by ANJANA
              </div>
            </div>

            {/* Hanging Vertical Sound Bars from Top Border (Frame 010-012) */}
            <div className="flex items-start gap-1 h-9 -mt-6 sm:-mt-10 border-t-0 pt-0">
              <span className={`w-0.5 bg-black transition-all ${isPlaying ? 'bar-2' : 'h-7'}`} />
              <span className={`w-0.5 bg-black transition-all ${isPlaying ? 'bar-4' : 'h-9'}`} />
              <span className={`w-0.5 bg-black transition-all ${isPlaying ? 'bar-1' : 'h-5'}`} />
              <span className={`w-0.5 bg-black transition-all ${isPlaying ? 'bar-3' : 'h-8'}`} />
              <span className={`w-0.5 bg-black transition-all ${isPlaying ? 'bar-5' : 'h-4'}`} />
              <span className={`w-0.5 bg-black transition-all ${isPlaying ? 'bar-2' : 'h-6'}`} />
            </div>
          </div>
        </div>

        {/* Center Monumental Display Typography with Central Portrait (Frame 008-012) */}
        <div className="relative my-auto py-8 sm:py-12 flex flex-col items-center justify-center">
          {/* Japanese Katakana Subtitle for Anjana (Frame 008) */}
          <div className="font-jp text-3xl md:text-5xl tracking-[0.35em] text-neutral-900 font-light pl-[0.35em] mb-2 select-none text-center">
            アンジャナ
          </div>

          {/* Main Composition: Giant "A N J A N A" + Central Image Cutout (Frame 008-012) */}
          <div className="relative w-full flex items-center justify-center overflow-visible">
            {/* Background Giant Display Serif Text */}
            <h1 className="font-serif-display text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] tracking-[0.18em] sm:tracking-[0.25em] text-neutral-900 font-normal uppercase select-none text-center leading-none pl-[0.18em] sm:pl-[0.25em] transition-all">
              ANJANA
            </h1>

            {/* Central Portrait Cutout overlay (Frame 008-012) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-44 h-60 sm:w-56 sm:h-76 md:w-68 md:h-92 lg:w-80 lg:h-[26rem] pointer-events-auto group">
                <div className="w-full h-full rounded-2xl overflow-hidden border border-black/15 bg-transparent shadow-lg transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={PROFILE_DATA.avatarUrl}
                    alt="Anjana Avatar"
                    className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 mix-blend-multiply transition-all duration-700 group-hover:opacity-95"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Badge on image corner */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xs border border-black/10 px-3 py-1 rounded-full text-[10px] tracking-widest font-mono text-neutral-700 shadow-xs whitespace-nowrap">
                  SOFTWARE ENGINEER · DEVOPS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Current Focus on Left, The Question Is on Right, and Scroll Tracker (Frame 010-012) */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-t border-black/10">
          {/* Bottom-Left: Current Focus */}
          <div className="max-w-sm">
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase font-mono text-neutral-900 mb-1 flex items-center gap-1.5">
              <span>Current Focus !!</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              {PROFILE_DATA.currentFocus}
            </p>
          </div>

          {/* Bottom-Right: The Question Is (Frame 010-012) */}
          <div className="max-w-sm text-left md:text-right">
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase font-mono text-neutral-900 mb-1">
              The Question Is:
            </div>
            <blockquote className="text-xs sm:text-sm font-editorial italic text-neutral-800 leading-snug">
              "{PROFILE_DATA.shortQuote}"
            </blockquote>
            <cite className="block text-[11px] text-neutral-500 font-sans not-italic mt-0.5">
              ~ANJANA~
            </cite>
          </div>
        </div>

        {/* Far Right Vertical Scroll Indicator (Frame 010-012) */}
        <div className="hidden lg:flex flex-col items-center gap-2 absolute right-3 bottom-6 text-neutral-400 select-none pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono [writing-mode:vertical-lr]">
            SCROLL
          </span>
          <div className="w-[1px] h-10 bg-neutral-300 relative overflow-hidden">
            <div className="w-full h-1/2 bg-neutral-900 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
