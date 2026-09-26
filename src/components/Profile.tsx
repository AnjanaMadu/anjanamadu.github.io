import React from 'react';
import { Volume2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data';
import { GitHubStatsCard } from './GitHubStatsCard';
import { GeometricArt } from './GeometricArt';

interface ProfileProps {
  onPlaySynth: () => void;
  isPlaying: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ onPlaySynth, isPlaying }) => {
  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Tag (Frame 015) */}
      <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-8 flex items-center gap-2">
        <span>—</span>
        <span className="font-semibold text-neutral-800">01 ABOUT</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Interactive Geometric HTML/SVG Art (5 cols, Frame 017-020) */}
        <div className="lg:col-span-5 flex flex-col">
          <GeometricArt isPlaying={isPlaying} />

          {/* Hairline Caption below geometric artwork */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-neutral-500 pt-3 border-t border-black/10 mt-3 uppercase">
            <span>NO. 001 — GEOMETRIC SYSTEM</span>
            <span className="font-jp font-medium text-neutral-800">幾何学体系</span>
          </div>
        </div>

        {/* Right Column: Bio, Katakana, Meta Grid & Motto Card (7 cols, Frame 016-021) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-start gap-6">
            {/* Vertical Katakana text (Frame 016-020) */}
            <div className="font-jp text-lg tracking-[0.4em] text-neutral-400 font-light [writing-mode:vertical-rl] select-none pt-2 shrink-0">
              アンジャナ
            </div>

            {/* Main Title & Bio with Overflow-Hidden Mask Reveal (Frame 015-016) */}
            <div className="flex-1">
              <div className="overflow-hidden mb-6">
                <motion.h2
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight flex items-baseline gap-3 flex-wrap"
                >
                  <span className="font-editorial">Hello, I'm</span>
                  <span className="font-script text-5xl sm:text-6xl md:text-7xl text-neutral-800 italic transform -rotate-1">
                    Anjana!
                  </span>
                </motion.h2>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl">
                {PROFILE_DATA.bio}
              </p>

              {/* Data Grid with refined hairline borders (Frame 018-020) */}
              <div className="grid grid-cols-2 border-y border-black/10 divide-y divide-black/10 mb-8">
                {/* Row 1 */}
                <div className="py-4 pr-4">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-1">
                    NAME
                  </div>
                  <div className="font-editorial text-base sm:text-lg text-neutral-900 font-medium">
                    {PROFILE_DATA.name}
                  </div>
                </div>
                <div className="py-4 pl-4 border-l border-black/10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-1">
                    LOCATION
                  </div>
                  <div className="font-editorial text-base sm:text-lg text-neutral-900 font-medium">
                    {PROFILE_DATA.location}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="py-4 pr-4 border-t border-black/10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-1">
                    SPECIALIZATION
                  </div>
                  <div className="font-editorial text-base sm:text-lg text-neutral-900 font-medium">
                    {PROFILE_DATA.role}
                  </div>
                </div>
                <div className="py-4 pl-4 border-l border-t border-black/10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-1">
                    COMMUNITY
                  </div>
                  <div className="font-editorial text-base sm:text-lg text-neutral-900 font-medium">
                    {PROFILE_DATA.stats.repos} Repos · {PROFILE_DATA.stats.followers} Followers
                  </div>
                </div>
              </div>

              {/* Introduction Card with Cursive & Japanese Label (Frame 021) */}
              <div className="p-6 rounded-xl bg-white border border-black/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase flex items-center gap-2">
                    <span className="font-bold text-neutral-800">INTRODUCTION</span>
                    <span className="font-jp text-[10px] text-neutral-400">自己紹介</span>
                  </div>

                  <button
                    onClick={onPlaySynth}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-all text-[11px] font-mono text-neutral-700 cursor-pointer"
                    title="Toggle Lo-fi Sound"
                  >
                    <Volume2 size={12} className={isPlaying ? 'text-indigo-500 animate-pulse' : ''} />
                    <span>{isPlaying ? 'Playing Lo-fi' : 'Play Lo-fi'}</span>
                  </button>
                </div>

                <p className="font-editorial italic text-base sm:text-lg text-neutral-800 leading-snug">
                  "Build, break, learn, repeat. Turning complex distributed systems and networks into clean, resilient code."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Live Statistics Card */}
      <GitHubStatsCard />
    </section>
  );
};
