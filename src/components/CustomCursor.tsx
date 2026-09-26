import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only show custom cursor on desktop/fine pointers
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('.cursor-pointer') ||
        target?.closest('[data-hoverable="true"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Translucent Circular Disc Cursor (matching Frame 023-028 & Frame 047-053) */}
      <div
        className={`fixed rounded-full transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference pointer-events-none flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 bg-white/40 border border-white scale-110 backdrop-blur-xs'
            : 'w-7 h-7 bg-white/80 border border-white/60 shadow-xs'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`
        }}
      >
        {/* Subtle center core dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
      </div>
    </div>
  );
};
