import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RotateCw, Orbit, Compass, Waves } from 'lucide-react';

interface GeometricArtProps {
  isPlaying?: boolean;
}

type ArtMode = 'orbital' | 'astrolabe' | 'harmonics';

export const GeometricArt: React.FC<GeometricArtProps> = ({ isPlaying = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; normX: number; normY: number }>({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0
  });
  const [angle, setAngle] = useState<number>(0);
  const [mode, setMode] = useState<ArtMode>('orbital'); // Orbital is the FIRST and default mode
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // 60FPS precision animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const speed = (isPlaying ? 1.75 : 1.0) * speedMultiplier;
      setAngle((prev) => (prev + delta * 28 * speed) % 36000);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, speedMultiplier]);

  // Normalized mouse coordinate tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));
    setMousePos({ x, y, normX, normY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos((prev) => ({ ...prev, normX: 0, normY: 0 }));
  };

  // -------------------------------------------------------------
  // PRECISION MATHEMATICAL ORBITS GENERATOR (Elliptical Astrodynamics)
  // -------------------------------------------------------------
  // Calculates real-time 2D Cartesian coordinates along rotated Keplerian ellipse
  const getOrbitalPoint = (
    semiMajor: number,
    semiMinor: number,
    rotationDeg: number,
    orbitAngleDeg: number,
    cx = 200,
    cy = 200
  ) => {
    const theta = (orbitAngleDeg * Math.PI) / 180;
    const rot = (rotationDeg * Math.PI) / 180;
    const xLoc = semiMajor * Math.cos(theta);
    const yLoc = semiMinor * Math.sin(theta);

    const x = cx + xLoc * Math.cos(rot) - yLoc * Math.sin(rot);
    const y = cy + xLoc * Math.sin(rot) + yLoc * Math.cos(rot);
    return { x, y };
  };

  // Outer precision compass tick marks (72 ticks around perimeter)
  const compassTicks = useMemo(() => {
    return Array.from({ length: 72 }).map((_, i) => {
      const tickAngle = (i * 5 * Math.PI) / 180;
      const isMajor = i % 9 === 0; // every 45 deg
      const isMedium = i % 3 === 0; // every 15 deg
      const r1 = 185;
      const r2 = isMajor ? 170 : isMedium ? 175 : 179;
      return {
        x1: 200 + r1 * Math.cos(tickAngle),
        y1: 200 + r1 * Math.sin(tickAngle),
        x2: 200 + r2 * Math.cos(tickAngle),
        y2: 200 + r2 * Math.sin(tickAngle),
        isMajor,
        isMedium
      };
    });
  }, []);

  // Planets for Mode 1: Orbital Mechanics
  const planet1 = getOrbitalPoint(64, 46, -22, angle * 2.2);
  const planet1Trail = [0.8, 1.6, 2.4].map((offset) =>
    getOrbitalPoint(64, 46, -22, angle * 2.2 - offset * 12)
  );

  const planet2 = getOrbitalPoint(108, 76, 32, -angle * 1.3);
  const planet2Trail = [0.8, 1.6, 2.4].map((offset) =>
    getOrbitalPoint(108, 76, 32, -angle * 1.3 + offset * 10)
  );
  // Moon orbiting Planet 2
  const moon2 = {
    x: planet2.x + 15 * Math.cos((angle * 5 * Math.PI) / 180),
    y: planet2.y + 15 * Math.sin((angle * 5 * Math.PI) / 180)
  };

  const planet3 = getOrbitalPoint(152, 98, -42, angle * 0.7);
  const planet3Trail = [0.8, 1.6, 2.4].map((offset) =>
    getOrbitalPoint(152, 98, -42, angle * 0.7 - offset * 8)
  );

  // Eccentric Cometary body (high eccentricity sweeping orbit)
  const cometE = getOrbitalPoint(168, 52, 65, angle * 1.6);

  // SVG reticle coordinate
  const reticleX = 200 + mousePos.normX * 160;
  const reticleY = 200 + mousePos.normY * 160;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-2xl overflow-hidden bg-[#0A0B0D] text-neutral-100 border border-black/20 shadow-2xl select-none group aspect-[3/4] flex flex-col justify-between p-5 transition-all duration-500"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePos.normY * 3.5}deg) rotateY(${mousePos.normX * 3.5}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s ease-out'
      }}
    >
      {/* Background Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Header: System Spec & Mode Selector */}
      <div className="relative z-10 flex flex-col gap-2.5 border-b border-white/10 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <div className="font-mono text-[10px] tracking-[0.2em] text-neutral-300 uppercase">
              {mode === 'orbital' && '01 // CELESTIAL ORBITS'}
              {mode === 'astrolabe' && '02 // KINETIC ASTROLABE'}
              {mode === 'harmonics' && '03 // CHLADNI HARMONICS'}
            </div>
          </div>

          <div className="font-mono text-[10px] text-neutral-500 tracking-wider">
            θ: {(angle % 360).toFixed(0)}° · SYS.ACT
          </div>
        </div>

        {/* Direct Interactive Mode Tabs: Orbit is first */}
        <div className="grid grid-cols-3 gap-1 p-0.5 bg-white/5 rounded-lg border border-white/10">
          <button
            onClick={() => setMode('orbital')}
            className={`py-1.5 px-2 rounded-md font-mono text-[9px] tracking-wider transition-all cursor-pointer ${
              mode === 'orbital'
                ? 'bg-white text-neutral-900 font-bold shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            01 ORBIT
          </button>
          <button
            onClick={() => setMode('astrolabe')}
            className={`py-1.5 px-2 rounded-md font-mono text-[9px] tracking-wider transition-all cursor-pointer ${
              mode === 'astrolabe'
                ? 'bg-white text-neutral-900 font-bold shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            02 ASTROLABE
          </button>
          <button
            onClick={() => setMode('harmonics')}
            className={`py-1.5 px-2 rounded-md font-mono text-[9px] tracking-wider transition-all cursor-pointer ${
              mode === 'harmonics'
                ? 'bg-white text-neutral-900 font-bold shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            03 HARMONICS
          </button>
        </div>
      </div>

      {/* Center SVG Mathematical Canvas */}
      <div className="relative flex-1 flex items-center justify-center my-auto overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full max-w-[340px] max-h-[340px] drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]"
        >
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#D97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Ambient Glow */}
          <circle cx="200" cy="200" r="175" fill="url(#ambientGlow)" />

          {/* Outer Precision Degree Compass */}
          <circle cx="200" cy="200" r="185" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.25" />
          <circle cx="200" cy="200" r="166" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 4" />

          {compassTicks.map((tick, i) => (
            <line
              key={i}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke="#ffffff"
              strokeWidth={tick.isMajor ? 1.25 : tick.isMedium ? 0.75 : 0.5}
              strokeOpacity={tick.isMajor ? 0.6 : tick.isMedium ? 0.35 : 0.15}
            />
          ))}

          {/* Cardinal Coordinate Labels */}
          <text x="200" y="24" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">000° // N</text>
          <text x="382" y="203" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">090° // E</text>
          <text x="200" y="386" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">180° // S</text>
          <text x="18" y="203" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">270° // W</text>

          {/* Center Crosshairs */}
          <line x1="200" y1="36" x2="200" y2="364" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="36" y1="200" x2="364" y2="200" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4" />

          {/* ========================================================= */}
          {/* MODE 1: CELESTIAL ORBITS (Armillary Mechanics)            */}
          {/* ========================================================= */}
          {mode === 'orbital' && (
            <g>
              {/* Central Sun / Star Nucleus */}
              <circle cx="200" cy="200" r="28" fill="url(#sunGlow)" />
              <circle cx="200" cy="200" r="10" fill="#ffffff" />
              <circle cx="200" cy="200" r="15" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="2 3" />

              {/* Orbit 1: Inner Ellipse (Rotated -22 deg) */}
              <ellipse
                cx="200"
                cy="200"
                rx="64"
                ry="46"
                transform="rotate(-22 200 200)"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
              {/* Orbit 1 Planet & Tail */}
              {planet1Trail.map((pt, idx) => (
                <circle
                  key={`p1-trail-${idx}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={2.5 - idx * 0.6}
                  fill="#ffffff"
                  opacity={0.3 - idx * 0.08}
                />
              ))}
              <circle cx={planet1.x} cy={planet1.y} r="4" fill="#ffffff" />
              <circle cx={planet1.x} cy={planet1.y} r="7" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />

              {/* Orbit 2: Habitable / Earth-Moon Orbit (Rotated +32 deg) */}
              <ellipse
                cx="200"
                cy="200"
                rx="108"
                ry="76"
                transform="rotate(32 200 200)"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              {/* Orbit 2 Planet & Trail */}
              {planet2Trail.map((pt, idx) => (
                <circle
                  key={`p2-trail-${idx}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={3.5 - idx * 0.8}
                  fill="#ffffff"
                  opacity={0.35 - idx * 0.1}
                />
              ))}
              <circle cx={planet2.x} cy={planet2.y} r="5" fill="#ffffff" />
              <circle cx={planet2.x} cy={planet2.y} r="9" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.5" />
              {/* Orbiting Moon around Planet 2 */}
              <circle cx={planet2.x} cy={planet2.y} r="15" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="2 2" />
              <circle cx={moon2.x} cy={moon2.y} r="2.2" fill="#E2E8F0" />

              {/* Orbit 3: Ringed Gas Giant Orbit (Rotated -42 deg) */}
              <ellipse
                cx="200"
                cy="200"
                rx="152"
                ry="98"
                transform="rotate(-42 200 200)"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.85"
                strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
              {/* Orbit 3 Planet & Saturnian Ring */}
              {planet3Trail.map((pt, idx) => (
                <circle
                  key={`p3-trail-${idx}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={3 - idx * 0.7}
                  fill="#ffffff"
                  opacity={0.25 - idx * 0.07}
                />
              ))}
              <ellipse
                cx={planet3.x}
                cy={planet3.y}
                rx="12"
                ry="4.5"
                transform={`rotate(${angle * 0.5} ${planet3.x} ${planet3.y})`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <circle cx={planet3.x} cy={planet3.y} r="4.5" fill="#ffffff" />

              {/* Orbit 4: Eccentric Cometary Orbit (Rotated +65 deg) */}
              <ellipse
                cx="200"
                cy="200"
                rx="168"
                ry="52"
                transform="rotate(65 200 200)"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.65"
                strokeOpacity="0.2"
                strokeDasharray="2 3"
              />
              <circle cx={cometE.x} cy={cometE.y} r="3" fill="#ffffff" opacity="0.8" />

              {/* Precision Aphelion / Perihelion Radial Markers */}
              <text x="312" y="142" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">APH // 1.52 AU</text>
              <text x="76" y="272" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">PER // 0.98 AU</text>
            </g>
          )}

          {/* ========================================================= */}
          {/* MODE 2: KINETIC ASTROLABE (Precision Celestial Chronometer) */}
          {/* ========================================================= */}
          {mode === 'astrolabe' && (
            <g>
              {/* Outer Vernier Caliper Dial */}
              <circle cx="200" cy="200" r="145" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="#ffffff" strokeWidth="0.65" strokeOpacity="0.3" strokeDasharray="3 3" />

              {/* 12 Celestial Zodiac Caliper Divisions */}
              {Array.from({ length: 12 }).map((_, i) => {
                const rot = (i * 30 * Math.PI) / 180;
                const x1 = 200 + 130 * Math.cos(rot);
                const y1 = 200 + 130 * Math.sin(rot);
                const x2 = 200 + 145 * Math.cos(rot);
                const y2 = 200 + 145 * Math.sin(rot);
                const kanji = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][i];
                const tx = 200 + 155 * Math.cos(rot);
                const ty = 200 + 155 * Math.sin(rot) + 3;

                return (
                  <g key={`ast-div-${i}`}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
                    <text x={tx} y={ty} fill="#ffffff" fillOpacity="0.4" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      {kanji}
                    </text>
                  </g>
                );
              })}

              {/* Rotating Astrolabe Reticle (Counter-Rotating with angle) */}
              <g transform={`rotate(${angle * 0.6} 200 200)`}>
                {/* 6 Logarithmic Golden Arcs */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <circle
                    key={`golden-arc-${i}`}
                    cx={200 + 55 * Math.cos((i * 60 * Math.PI) / 180)}
                    cy={200 + 55 * Math.sin((i * 60 * Math.PI) / 180)}
                    r="55"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.85"
                    strokeOpacity="0.4"
                  />
                ))}

                {/* Inner Hexagram Star */}
                <polygon
                  points="200,90 295,255 105,255"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                />
                <polygon
                  points="200,310 105,145 295,145"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                />

                {/* Concentric Golden Circles */}
                <circle cx="200" cy="200" r="55" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
                <circle cx="200" cy="200" r="95" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.35" strokeDasharray="4 4" />
              </g>

              {/* Primary Rotating Azimuth Caliper Sweep Arm */}
              <g transform={`rotate(${-angle * 0.9} 200 200)`}>
                <line x1="200" y1="200" x2="200" y2="45" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
                <circle cx="200" cy="45" r="4.5" fill="#ffffff" />
                <circle cx="200" cy="45" r="8" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.5" />
              </g>

              {/* Central Pivot Core */}
              <circle cx="200" cy="200" r="14" fill="#0A0B0D" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="4" fill="#ffffff" />
            </g>
          )}

          {/* ========================================================= */}
          {/* MODE 3: CHLADNI HARMONICS (Resonant Wave Mandala)         */}
          {/* ========================================================= */}
          {mode === 'harmonics' && (
            <g transform={`rotate(${angle * 0.3} 200 200)`}>
              {/* Concentric Expanding Acoustic Resonance Rings */}
              {[35, 65, 95, 125, 155].map((radius, i) => (
                <circle
                  key={`harm-ring-${i}`}
                  cx="200"
                  cy="200"
                  r={radius}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={i === 2 ? '1.2' : '0.6'}
                  strokeOpacity={0.15 + i * 0.08}
                  strokeDasharray={i % 2 === 1 ? '4 4' : undefined}
                />
              ))}

              {/* 12-Fold Sacred Flower of Life Circles */}
              {Array.from({ length: 12 }).map((_, i) => {
                const rot = (i * 30 * Math.PI) / 180;
                const cx = 200 + 65 * Math.cos(rot);
                const cy = 200 + 65 * Math.sin(rot);
                return (
                  <g key={`petal-${i}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="65"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="0.65"
                      strokeOpacity="0.25"
                    />
                    <circle cx={cx} cy={cy} r="2.5" fill="#ffffff" />
                  </g>
                );
              })}

              {/* Counter-Rotating Octagram (8-pointed sacred star) */}
              <polygon
                points="200,60 299,99 340,200 299,301 200,340 101,301 60,200 101,99"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeOpacity="0.65"
              />
              <polygon
                points="200,85 281,119 315,200 281,281 200,315 119,281 85,200 119,119"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.75"
                strokeOpacity="0.4"
                transform="rotate(22.5 200 200)"
              />
            </g>
          )}

          {/* Interactive Mouse Reticle */}
          {isHovered && (
            <g transform={`translate(${reticleX}, ${reticleY})`}>
              <circle cx="0" cy="0" r="7" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.5" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Technical HUD & Speed/Rotation Controls */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-400 tracking-wider">
            <span className="text-white font-medium">COORD:</span>
            <span>[{mousePos.normX.toFixed(2)}, {mousePos.normY.toFixed(2)}]</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeedMultiplier((prev) => (prev >= 2.5 ? 0.5 : prev + 0.5))}
              title="Adjust Rotation Speed"
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] font-mono tracking-wider text-white transition-colors cursor-pointer"
            >
              <RotateCw size={11} className={isPlaying ? 'animate-spin' : ''} />
              <span>{speedMultiplier}X SPEED</span>
            </button>
          </div>
        </div>

        {/* Live System Coordinate & Status Row */}
        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
          <span>LAT 6.9271° N · LON 79.8612° E</span>
          <span className="text-neutral-300 font-medium">ACTIVE // 60FPS</span>
        </div>
      </div>
    </div>
  );
};
