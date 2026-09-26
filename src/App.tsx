/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Profile } from './components/Profile';
import { Activities } from './components/Activities';
import { QuoteSection } from './components/QuoteSection';
import { Gallery } from './components/Gallery';
import { ContactFooter } from './components/ContactFooter';
import { lofiSynth } from './utils/audioSynth';

export default function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const toggleAudio = () => {
    const active = lofiSynth.toggle();
    setIsPlaying(active);
  };

  // Scrollspy observer for active section detection
  useEffect(() => {
    const sectionIds = ['about', 'craft', 'quote', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lofiSynth.stop();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fbfbfa] text-[#1a1a1a]">
      {/* Elegant Thin Scroll Progress Indicator */}
      <ScrollProgress activeSection={activeSection} />

      {/* Initial Screen Preloader matching video */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Smooth Custom Cursor */}
      <CustomCursor />

      {/* Sticky Top Bar Navbar */}
      <Navbar
        isPlaying={isPlaying}
        onToggleAudio={toggleAudio}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        <Hero isPlaying={isPlaying} onPlaySynth={toggleAudio} />
        <Marquee />
        <Profile isPlaying={isPlaying} onPlaySynth={toggleAudio} />
        <Activities />
        <QuoteSection />
        <Gallery />
      </main>

      {/* Contact & Footer Section */}
      <ContactFooter />
    </div>
  );
}
