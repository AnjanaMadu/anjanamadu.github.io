import React from 'react';
import { Volume2, ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '../data';
import { GitHubStatsCard } from './GitHubStatsCard';

interface ProfileProps {
  onPlaySynth: () => void;
  isPlaying: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ onPlaySynth, isPlaying }) => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Tag */}
      <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-8 flex items-center gap-2">
        <span>—</span>
        <span className="font-semibold text-neutral-800">01 ABOUT</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait Photo with editorial caption (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden bg-neutral-100 border border-black/10 aspect-[3/4] shadow-md group">
            <img
              src={PROFILE_DATA.avatarUrl}
              alt="Anjana Madu Portrait"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Subtle aesthetic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Hairline Caption below image */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-neutral-500 pt-3 border-t border-black/10 mt-3 uppercase">
            <span>NO. 001 — DEVELOPER</span>
            <span className="font-bold text-neutral-800">OPEN SOURCE</span>
          </div>
        </div>

        {/* Right Column: Bio, Katakana, Meta Grid & Motto Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-start gap-6">
            {/* Vertical Katakana text */}
            <div className="font-jp text-lg tracking-[0.4em] text-neutral-400 font-light [writing-mode:vertical-rl] select-none pt-2">
              アンジャナ
            </div>

            {/* Main Title & Bio */}
            <div className="flex-1">
              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight mb-6">
                Hello, I'm Anjana!
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl">
                {PROFILE_DATA.bio}
              </p>

              {/* Data Grid with refined hairline borders */}
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
                    SPECIALIZATION
                  </div>
                  <div className="font-editorial text-base sm:text-lg text-neutral-900 font-medium">
                    {PROFILE_DATA.role}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="py-4 pr-4 border-t border-black/10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-1">
                    GITHUB PROFILE
                  </div>
                  <div className="font-editorial text-base sm:text-lg text-neutral-900 font-medium">
                    <a
                      href="https://github.com/AnjanaMadu"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>{PROFILE_DATA.handle}</span>
                      <ExternalLink size={14} className="opacity-70" />
                    </a>
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

              {/* Engineering Motto Card */}
              <div className="p-6 rounded-xl bg-white border border-black/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase flex items-center gap-1.5">
                    <span>PHILOSOPHY</span>
                    <span className="font-jp text-[9px] text-neutral-400">理念</span>
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
                  "Build, break, learn, repeat. Turning complex systems into resilient, elegant code."
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

