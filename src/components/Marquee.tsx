import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'Anjana M.',
    'アンジャナ',
    'Full-Stack',
    'DevOps',
    'Cloud Architecture',
    'Open Source',
    'Security',
    'Python & Go',
    'Docker & Linux',
    'Distributed Systems'
  ];

  return (
    <div className="relative py-12 overflow-hidden select-none">
      {/* Tilted Marquee Ribbon Banner (matching Frame 013-014) */}
      <div className="w-[110%] -ml-[5%] transform -rotate-2 bg-[#121212] text-white py-4 sm:py-5 border-y border-neutral-800 shadow-md">
        <div className="animate-marquee flex items-center">
          {[...items, ...items, ...items].map((text, idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <span className="font-serif-display text-lg md:text-2xl tracking-[0.2em] uppercase font-light px-6 text-neutral-100">
                {text}
              </span>
              <span className="text-neutral-400 text-sm select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
