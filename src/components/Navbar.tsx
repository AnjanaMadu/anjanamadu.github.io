import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT', index: '01' },
  { id: 'craft', label: 'CRAFT', index: '02' },
  { id: 'quote', label: 'QUOTE', index: '03' },
  { id: 'projects', label: 'PROJECTS', index: '04' },
  { id: 'contact', label: 'CONTACT', index: '05' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isPlaying,
  onToggleAudio,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkSection = activeSection === 'quote' || activeSection === 'contact';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentItem = NAV_ITEMS.find((item) => item.id === activeSection);
  const currentLabel = currentItem ? `${currentItem.index} ${currentItem.label}` : '01 ABOUT';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDarkSection
            ? 'bg-[#121212]/90 backdrop-blur-md text-white border-b border-white/10 shadow-sm'
            : 'bg-[#fbfbfa]/90 backdrop-blur-md text-neutral-900 border-b border-black/5 shadow-sm'
          : isDarkSection
          ? 'bg-transparent text-white'
          : 'bg-transparent text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand + Active Section tracker */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-baseline gap-1 group text-left cursor-pointer"
          >
            <span className="font-serif-display text-xl font-medium tracking-wide">
              Anjana
            </span>
            <span className="font-script text-2xl -ml-0.5 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
              M
            </span>
          </button>

          {isScrolled && (
            <div className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-neutral-400 pl-3 border-l border-neutral-300/60 dark:border-neutral-700/60">
              <span>—</span>
              <span className={isDarkSection ? 'text-neutral-300' : 'text-neutral-600'}>
                {currentLabel}
              </span>
            </div>
          )}
        </div>

        {/* Center/Right Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-200 relative py-1 hover:opacity-100 cursor-pointer ${
                  isActive
                    ? isDarkSection
                      ? 'text-white font-semibold'
                      : 'text-black font-semibold'
                    : isDarkSection
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                <span className="opacity-70 text-[9px] mr-1.5 font-mono">"{item.index}</span>
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                      isDarkSection ? 'bg-white' : 'bg-black'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Sound visualizer button & Mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Audio Visualizer Button */}
          <button
            onClick={onToggleAudio}
            aria-label={isPlaying ? 'Mute sound' : 'Play ambient audio'}
            title={isPlaying ? 'Pause Ambient Sound' : 'Play Ambient Sound'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs tracking-wider cursor-pointer ${
              isDarkSection
                ? 'border-white/20 hover:border-white/50 text-white bg-white/5'
                : 'border-black/15 hover:border-black/40 text-black bg-black/5'
            }`}
          >
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span className={`w-0.5 rounded-full ${isDarkSection ? 'bg-white' : 'bg-black'} ${isPlaying ? 'bar-1' : 'h-1'}`} />
              <span className={`w-0.5 rounded-full ${isDarkSection ? 'bg-white' : 'bg-black'} ${isPlaying ? 'bar-2' : 'h-2'}`} />
              <span className={`w-0.5 rounded-full ${isDarkSection ? 'bg-white' : 'bg-black'} ${isPlaying ? 'bar-3' : 'h-1'}`} />
              <span className={`w-0.5 rounded-full ${isDarkSection ? 'bg-white' : 'bg-black'} ${isPlaying ? 'bar-4' : 'h-2.5'}`} />
              <span className={`w-0.5 rounded-full ${isDarkSection ? 'bg-white' : 'bg-black'} ${isPlaying ? 'bar-5' : 'h-1.5'}`} />
            </div>
            <span className="hidden lg:inline text-[10px] uppercase font-mono tracking-widest">
              {isPlaying ? 'LOFI ON' : 'SOUND'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-inherit focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-6 border-b transition-all ${
            isDarkSection
              ? 'bg-[#161616] text-white border-neutral-800'
              : 'bg-[#f7f7f5] text-black border-neutral-200'
          }`}
        >
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center justify-between text-left py-2 border-b border-neutral-500/10 text-xs tracking-widest uppercase font-medium cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="font-mono text-neutral-400 text-[10px]">0{item.index}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
