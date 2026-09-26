import React from 'react';
import { Volume2 } from 'lucide-react';
import { PROFILE_DATA } from '../data';

interface HeroProps {
  onPlaySynth: () => void;
  isPlaying: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onPlaySynth, isPlaying }) => {
  return (
    <section className="relative min-h-screen pt-20 pb-12 px-6 flex flex-col justify-between max-w-7xl mx-auto overflow-hidden">
      {/* Top Meta Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-4">
        {/* Top-Left: Developer Badge Box & Philosophy */}
        <div className="flex flex-col sm:flex-row items-start gap-4 max-w-md">
          {/* Badge Box */}
          <div className="flex items-center border border-black/15 bg-white/70 px-3 py-2 rounded-sm shadow-2xs shrink-0">
            <div className="flex flex-col pr-2 border-r border-black/10">
              <span className="text-[10px] font-bold tracking-tighter text-neutral-800 leading-none">
                DEV
              </span>
              <span className="text-sm font-bold tracking-tight text-neutral-900 leading-none">
                OPS
              </span>
            </div>
            <div className="pl-2">
              <span className="inline-block bg-neutral-900 text-[8px] font-medium tracking-widest text-white px-1.5 py-0.5 rounded-2xs uppercase font-mono">
                OPEN SOURCE
              </span>
            </div>
          </div>

          {/* Philosophy Prose & Audio trigger */}
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

        {/* Top-Right: Handle, Domain & Sound Bars */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right shrink-0">
          <div className="text-xs tracking-wider text-neutral-800 font-medium">
            {PROFILE_DATA.handle} · {PROFILE_DATA.blog}
          </div>
          <div className="text-[11px] tracking-wide text-neutral-500 font-light mt-0.5">
            {PROFILE_DATA.role}
          </div>

          {/* Decorative sound bar visualizer */}
          <div className="flex items-end gap-1 h-5 mt-2">
            <span className={`w-0.5 bg-neutral-800 rounded-full ${isPlaying ? 'bar-1' : 'h-1'}`} />
            <span className={`w-0.5 bg-neutral-800 rounded-full ${isPlaying ? 'bar-2' : 'h-3'}`} />
            <span className={`w-0.5 bg-neutral-800 rounded-full ${isPlaying ? 'bar-3' : 'h-5'}`} />
            <span className={`w-0.5 bg-neutral-800 rounded-full ${isPlaying ? 'bar-4' : 'h-2'}`} />
            <span className={`w-0.5 bg-neutral-800 rounded-full ${isPlaying ? 'bar-5' : 'h-4'}`} />
            <span className={`w-0.5 bg-neutral-800 rounded-full ${isPlaying ? 'bar-2' : 'h-2'}`} />
            <span className={`w-0.5 bg-neutral-800 rounded-full ${isPlaying ? 'bar-4' : 'h-3.5'}`} />
          </div>
        </div>
      </div>

      {/* Center Monumental Display Typography with Central Portrait */}
      <div className="relative my-8 md:my-14 flex flex-col items-center justify-center">
        {/* Japanese Katakana Subtitle for Anjana */}
        <div className="font-jp text-2xl md:text-4xl lg:text-5xl tracking-[0.35em] text-neutral-800 font-light pl-[0.35em] mb-2 select-none text-center">
          アンジャナ
        </div>

        {/* Main Composition: Giant "A N J A N A" + Central Image Cutout */}
        <div className="relative w-full flex items-center justify-center">
          {/* Background Giant Text */}
          <h1 className="font-serif-display text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-[0.18em] sm:tracking-[0.25em] text-neutral-900 font-normal uppercase select-none text-center leading-none pl-[0.18em] sm:pl-[0.25em] transition-all">
            ANJANA
          </h1>

          {/* Central Portrait Cutout overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-44 h-60 sm:w-56 sm:h-76 md:w-68 md:h-92 lg:w-80 lg:h-[26rem] pointer-events-auto group">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-black/10 bg-neutral-100 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={PROFILE_DATA.avatarUrl}
                  alt="Anjana Madu Avatar"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Subtle badge on image corner */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xs border border-black/10 px-3 py-1 rounded-full text-[10px] tracking-widest font-mono text-neutral-600 shadow-xs whitespace-nowrap">
                SOFTWARE ENGINEER · DEVOPS
              </div>
            </div>
          </div>
        </div>

        {/* "Madushanka" cursive script positioned beneath the right edge */}
        <div className="w-full max-w-4xl flex justify-end pr-4 sm:pr-8 md:pr-14 -mt-4 sm:-mt-8 z-10">
          <span className="font-script text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-neutral-800 select-none transform -rotate-3 hover:rotate-0 transition-transform">
            Madushanka
          </span>
        </div>
      </div>

      {/* Bottom Row: Current Focus on Left, The Question Is on Right, and Scroll Tracker */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6 border-t border-black/5">
        {/* Bottom-Left: Current Focus */}
        <div className="max-w-sm">
          <div className="text-[11px] font-bold tracking-[0.18em] uppercase font-mono text-neutral-900 mb-1 flex items-center gap-1.5">
            <span>Current Focus !!</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            {PROFILE_DATA.currentFocus}
          </p>
        </div>

        {/* Bottom-Right: The Question Is */}
        <div className="max-w-sm text-left md:text-right">
          <div className="text-[11px] font-bold tracking-[0.18em] uppercase font-mono text-neutral-900 mb-1">
            The Question Is:
          </div>
          <blockquote className="text-xs sm:text-sm font-editorial italic text-neutral-800 leading-snug">
            "{PROFILE_DATA.shortQuote}"
          </blockquote>
          <cite className="block text-[11px] text-neutral-500 font-sans not-italic mt-1">
            —Anjana Madu—
          </cite>
        </div>

        {/* Far Right Vertical Scroll Indicator */}
        <div className="hidden lg:flex flex-col items-center gap-2 absolute right-0 bottom-4 text-neutral-400">
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono [writing-mode:vertical-lr]">
            SCROLL
          </span>
          <div className="w-[1px] h-8 bg-neutral-300 relative overflow-hidden">
            <div className="w-full h-1/2 bg-neutral-800 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
