'use client';

export function FalconMascot({ size = 120, animated = true }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.15)}
      viewBox="0 0 120 138"
      className={animated ? 'animate-float falcon-glow' : 'falcon-glow'}
    >
      {/* ── Tail feathers ── */}
      <path d="M47 100 Q51 122 54 126 L66 126 Q69 122 73 100 Z" fill="#1c1c30" stroke="#C8A840" strokeWidth="0.7" />
      <path d="M44 103 Q47 123 50 127" stroke="#2a2a40" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M76 103 Q73 123 70 127" stroke="#2a2a40" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="60" y1="100" x2="60" y2="126" stroke="#2a2a42" strokeWidth="1" opacity="0.6" />

      {/* ── Body ── */}
      <ellipse cx="60" cy="82" rx="20" ry="23" fill="#1c1c30" stroke="#C8A840" strokeWidth="1" />

      {/* ── Left wing (folded tight against body) ── */}
      <path d="M40 72 Q26 68 22 85 Q30 82 40 88 Q41 80 40 72 Z" fill="#252538" stroke="#C8A840" strokeWidth="0.8" />
      <path d="M23 76 L39 77" stroke="#C8A840" strokeWidth="0.4" opacity="0.5" />
      <path d="M22 81 L39 81" stroke="#C8A840" strokeWidth="0.4" opacity="0.5" />
      <path d="M23 86 L39 85" stroke="#C8A840" strokeWidth="0.4" opacity="0.5" />

      {/* ── Right wing (folded tight against body) ── */}
      <path d="M80 72 Q94 68 98 85 Q90 82 80 88 Q79 80 80 72 Z" fill="#252538" stroke="#C8A840" strokeWidth="0.8" />
      <path d="M97 76 L81 77" stroke="#C8A840" strokeWidth="0.4" opacity="0.5" />
      <path d="M98 81 L81 81" stroke="#C8A840" strokeWidth="0.4" opacity="0.5" />
      <path d="M97 86 L81 85" stroke="#C8A840" strokeWidth="0.4" opacity="0.5" />

      {/* ── Chest — cream/white with fine dark streaks ── */}
      <path d="M43 76 Q60 70 77 76 Q72 94 60 102 Q48 94 43 76 Z" fill="#d8cdb0" />
      {[51,55,59,63,67].flatMap(x =>
        [80,86,92,97].map(y => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.3" ry="2.2" fill="#5a5060" opacity="0.55" />
        ))
      )}

      {/* ── UAE flag jesses (traditional falconry anklet) ── */}
      <rect x="49" y="57" width="5" height="5" rx="1" fill="#CE1126" />
      <rect x="54" y="57" width="3" height="5" rx="0.5" fill="#FFFFFF" />
      <rect x="57" y="57" width="2.5" height="5" rx="0.5" fill="#000000" opacity="0.85" />
      <rect x="59.5" y="57" width="5" height="5" rx="1" fill="#009A44" />

      {/* ── Neck ── */}
      <path d="M51 58 Q60 53 69 58 Q66 67 60 69 Q54 67 51 58 Z" fill="#1c1c30" stroke="#C8A840" strokeWidth="0.7" />

      {/* ── Head — classic falcon teardrop shape ── */}
      <ellipse cx="60" cy="36" rx="15" ry="17" fill="#1c1c30" stroke="#C8A840" strokeWidth="1" />

      {/* ── Dark helmet / cap (characteristic of Saker/Peregrine) ── */}
      <path d="M46 30 Q50 18 60 16 Q70 18 74 30 Q68 24 60 23 Q52 24 46 30 Z" fill="#0d0d1a" />

      {/* ── Cream cheek patches ── */}
      <ellipse cx="45" cy="40" rx="7" ry="8" fill="#e8dfc8" opacity="0.92" />
      <ellipse cx="75" cy="40" rx="7" ry="8" fill="#e8dfc8" opacity="0.92" />

      {/* ── Dark moustache stripes (KEY peregrine/saker feature) ── */}
      <path d="M44 46 Q49 52 54 48 Q51 53 47 52 Z" fill="#0d0d1a" />
      <path d="M76 46 Q71 52 66 48 Q69 53 73 52 Z" fill="#0d0d1a" />

      {/* ── Dark mask around eyes ── */}
      <ellipse cx="49" cy="37" rx="8" ry="8" fill="#0d0d1a" />
      <ellipse cx="71" cy="37" rx="8" ry="8" fill="#0d0d1a" />

      {/* ── Eye sockets ── */}
      <circle cx="49" cy="37" r="6" fill="#08080f" />
      <circle cx="71" cy="37" r="6" fill="#08080f" />

      {/* ── Golden orbital ring (classic raptor feature) ── */}
      <circle cx="49" cy="37" r="6" fill="none" stroke="#C8A840" strokeWidth="1.2" />
      <circle cx="71" cy="37" r="6" fill="none" stroke="#C8A840" strokeWidth="1.2" />

      {/* ── Amber iris ── */}
      <circle cx="49" cy="37" r="4.2" fill="#E8A020">
        <animate attributeName="r" values="4.2;4.6;4.2" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="71" cy="37" r="4.2" fill="#E8A020">
        <animate attributeName="r" values="4.2;4.6;4.2" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* ── Pupil ── */}
      <circle cx="49" cy="37" r="2" fill="#060609" />
      <circle cx="71" cy="37" r="2" fill="#060609" />

      {/* ── Eye highlight ── */}
      <circle cx="50.5" cy="35.5" r="1.1" fill="white" opacity="0.9" />
      <circle cx="72.5" cy="35.5" r="1.1" fill="white" opacity="0.9" />

      {/* ── Beak — properly hooked falcon beak ── */}
      {/* Cere (fleshy base, yellow) */}
      <path d="M54 46 Q60 43 66 46 Q64 48 60 49 Q56 48 54 46 Z" fill="#C8A840" />
      {/* Upper mandible */}
      <path d="M54 47 Q60 45 66 47 Q64 54 60 60 Q56 54 54 47 Z" fill="#C8A840" />
      {/* Tip hook */}
      <path d="M57 56 Q60 62 63 56 Q61 59 60 62 Q59 59 57 56 Z" fill="#9a7820" />
      {/* Cutting edge highlight */}
      <path d="M54 47 Q60 44 66 47" fill="none" stroke="#E8C050" strokeWidth="0.8" />
      {/* Nostrils */}
      <ellipse cx="57" cy="48" rx="1.2" ry="0.9" fill="#9a7820" opacity="0.8" />
      <ellipse cx="63" cy="48" rx="1.2" ry="0.9" fill="#9a7820" opacity="0.8" />

      {/* ── Legs ── */}
      <line x1="53" y1="105" x2="51" y2="118" stroke="#C8A840" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="67" y1="105" x2="69" y2="118" stroke="#C8A840" strokeWidth="2.2" strokeLinecap="round" />

      {/* ── Talons ── */}
      <path d="M51 118 Q45 120 41 121 M51 118 Q49 123 47 126 M51 118 Q52 123 52 127 M51 118 Q55 120 58 119"
        stroke="#C8A840" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M69 118 Q75 120 79 121 M69 118 Q71 123 73 126 M69 118 Q68 123 68 127 M69 118 Q65 120 62 119"
        stroke="#C8A840" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function GeometricPattern({ size = 200, opacity = 0.15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ opacity }}>
      <defs>
        <pattern id="geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="20,2 38,10 38,30 20,38 2,30 2,10" fill="none" stroke="#C8A840" strokeWidth="0.8" />
          <polygon points="20,8 32,14 32,26 20,32 8,26 8,14" fill="none" stroke="#C8A840" strokeWidth="0.5" />
          <line x1="2" y1="10" x2="8" y2="14" stroke="#C8A840" strokeWidth="0.4" />
          <line x1="38" y1="10" x2="32" y2="14" stroke="#C8A840" strokeWidth="0.4" />
          <line x1="2" y1="30" x2="8" y2="26" stroke="#C8A840" strokeWidth="0.4" />
          <line x1="38" y1="30" x2="32" y2="26" stroke="#C8A840" strokeWidth="0.4" />
          <circle cx="20" cy="20" r="2" fill="#C8A840" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#geo)" />
    </svg>
  );
}

export function UAEFlagStripe({ height = 8, animated = false }) {
  return (
    <div style={{ height }} className={`flex w-full ${animated ? 'animate-shimmer' : ''}`}>
      <div style={{ backgroundColor: '#CE1126', flex: 1 }} />
      <div style={{ backgroundColor: '#FFFFFF', flex: 1 }} />
      <div style={{ backgroundColor: '#000000', flex: 1 }} />
      <div style={{ backgroundColor: '#009A44', flex: 1 }} />
    </div>
  );
}

export function StarCrescent({ size = 40, color = '#C8A840' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path
        d="M20 8 C12 8 6 14 6 22 C6 30 12 36 20 36 C16 33 13 28 13 22 C13 16 16 11 20 8Z"
        fill={color}
      />
      <polygon points="22,4 23.5,8.5 28,8.5 24.5,11.5 26,16 22,13 18,16 19.5,11.5 16,8.5 20.5,8.5"
        fill={color} />
    </svg>
  );
}

export function DubaiSkyline({ width = 800, height = 100 }) {
  // Always render at full width with a fixed internal coordinate system
  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 800 100"
      preserveAspectRatio="xMidYMax slice"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0D1B2A" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#C8A840" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C8A840" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground glow */}
      <rect x="0" y="80" width="800" height="20" fill="#0D1B2A" />
      <rect x="0" y="78" width="800" height="6" fill="url(#glowGrad)" />

      {/* ── Far background buildings (faded) ── */}
      <rect x="0"   y="72" width="40" height="28" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.2" opacity="0.4" />
      <rect x="44"  y="65" width="30" height="35" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.2" opacity="0.4" />
      <rect x="78"  y="60" width="35" height="40" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.3" opacity="0.5" />
      <rect x="720" y="65" width="35" height="35" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.2" opacity="0.4" />
      <rect x="758" y="70" width="42" height="30" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.2" opacity="0.4" />

      {/* ── Left cluster ── */}
      <rect x="118" y="58" width="22" height="42" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      <rect x="124" y="54" width="10" height="8"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      <rect x="144" y="52" width="26" height="48" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      <rect x="150" y="47" width="14" height="9"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      {/* windows */}
      {[121,125,129].map(x => [62,68,74].map(y =>
        <rect key={`lw${x}${y}`} x={x} y={y} width="3" height="2" fill="#C8A840" opacity="0.35" />
      ))}

      {/* ── Burj Al Arab (sail shape) ── */}
      <path d="M200 100 L200 30 Q215 18 230 30 L230 100 Z"
        fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.6" />
      <line x1="200" y1="100" x2="230" y2="100" stroke="#C8A840" strokeWidth="0.4" />
      {/* helipad arm */}
      <path d="M222 48 Q238 46 244 50 L244 53 L222 51 Z" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <ellipse cx="244" cy="51" rx="5" ry="3" fill="none" stroke="#C8A840" strokeWidth="0.5" />
      {/* internal sail lines */}
      <path d="M200 40 Q215 32 230 40" fill="none" stroke="#C8A840" strokeWidth="0.3" opacity="0.5" />
      <path d="M200 55 Q215 48 230 55" fill="none" stroke="#C8A840" strokeWidth="0.3" opacity="0.5" />
      <path d="M200 70 Q215 64 230 70" fill="none" stroke="#C8A840" strokeWidth="0.3" opacity="0.5" />

      {/* ── Left-of-center towers ── */}
      <rect x="252" y="48" width="24" height="52" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="258" y="44" width="12" height="8"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="280" y="54" width="18" height="46" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />

      {/* ── Burj Khalifa (centre) ── */}
      {/* Stepped tiers */}
      <rect x="377" y="60" width="46" height="40"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="381" y="48" width="38" height="16"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="385" y="36" width="30" height="16"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="389" y="24" width="22" height="16"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="394" y="14" width="12" height="14"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      {/* Antenna */}
      <line x1="400" y1="14" x2="400" y2="2" stroke="#C8A840" strokeWidth="1.2" />
      <circle cx="400" cy="2" r="1.5" fill="#C8A840">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Khalifa windows */}
      {[380,388,396].map(x => [52,62,72].map(y =>
        <rect key={`kw${x}${y}`} x={x} y={y} width="4" height="3" fill="#C8A840" opacity="0.4" />
      ))}

      {/* ── Right-of-center towers ── */}
      <rect x="450" y="42" width="26" height="58" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="454" y="37" width="18" height="9"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="480" y="50" width="22" height="50" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      <rect x="484" y="46" width="14" height="8"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      {[452,458,466].map(x => [48,56,64,72].map(y =>
        <rect key={`rw${x}${y}`} x={x} y={y} width="3" height="2" fill="#C8A840" opacity="0.35" />
      ))}

      {/* ── Dubai Frame (rectangular arch) ── */}
      <rect x="530" y="50" width="14" height="50" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="558" y="50" width="14" height="50" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="530" y="50" width="42" height="10" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <line x1="544" y1="54" x2="558" y2="54" stroke="#C8A840" strokeWidth="0.4" opacity="0.6" />

      {/* ── Right cluster ── */}
      <rect x="610" y="55" width="26" height="45" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      <rect x="640" y="48" width="22" height="52" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="644" y="44" width="14" height="8"  fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="666" y="56" width="18" height="44" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.4" />
      <rect x="688" y="60" width="20" height="40" fill="url(#skyGrad)" stroke="#C8A840" strokeWidth="0.3" />

      {/* Reflection shimmer on water/ground */}
      <rect x="0" y="90" width="800" height="2" fill="#C8A840" opacity="0.08" />
    </svg>
  );
}

export function StarBurst({ count = 30, width = 1440, height = 900 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 17.3 + 5) % 100,  // deterministic spread using percentages
    y: (i * 13.7 + 3) % 100,
    r: (i % 3) * 0.5 + 0.5,
    opacity: ((i % 7) / 7) * 0.6 + 0.2,
    dur: 2 + (i % 5) * 0.6,
  }));
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {stars.map(s => (
        <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r * 0.3} fill="white" opacity={s.opacity}>
          <animate attributeName="opacity" values={`${s.opacity};${s.opacity * 0.2};${s.opacity}`} dur={`${s.dur}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}
