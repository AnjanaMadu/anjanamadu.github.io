import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'Anjana Madu',
    'アンジャナ',
    'Full-Stack',
    'DevOps',
    'Cloud Architecture',
    'Open Source',
    'Security',
    'Python & Go',
    'Docker & Linux',
    'Anjana Madu',
    'アンジャナ',
    'Reverse Proxies',
    'Distributed Systems'
  ];

  return (
    <div className="w-full bg-[#121212] text-white py-4 overflow-hidden border-y border-neutral-800 select-none">
      <div className="animate-marquee flex items-center">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="font-serif-display text-lg md:text-xl tracking-[0.2em] uppercase font-light px-6 text-neutral-200">
              {text}
            </span>
            <span className="text-neutral-500 text-xs select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
