export function FalconMascot({ size = 120, animated = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={animated ? 'animate-float falcon-glow' : 'falcon-glow'}
    >
      {/* Body */}
      <ellipse cx="60" cy="72" rx="22" ry="28" fill="#1a1a2e" stroke="#C8A840" strokeWidth="1.5" />
      {/* Wings */}
      <path d="M38 60 Q10 45 5 70 Q20 65 38 75 Z" fill="#2d2d44" stroke="#C8A840" strokeWidth="1" />
      <path d="M82 60 Q110 45 115 70 Q100 65 82 75 Z" fill="#2d2d44" stroke="#C8A840" strokeWidth="1" />
      {/* Wing feather details left */}
      <path d="M38 63 Q18 52 12 68" stroke="#C8A840" strokeWidth="0.5" fill="none" opacity="0.6" />
      <path d="M38 67 Q16 57 10 72" stroke="#C8A840" strokeWidth="0.5" fill="none" opacity="0.6" />
      {/* Wing feather details right */}
      <path d="M82 63 Q102 52 108 68" stroke="#C8A840" strokeWidth="0.5" fill="none" opacity="0.6" />
      <path d="M82 67 Q104 57 110 72" stroke="#C8A840" strokeWidth="0.5" fill="none" opacity="0.6" />
      {/* Head */}
      <ellipse cx="60" cy="42" rx="16" ry="18" fill="#1a1a2e" stroke="#C8A840" strokeWidth="1.5" />
      {/* Crown/Crest */}
      <path d="M48 30 Q52 20 60 18 Q68 20 72 30" fill="#C8A840" stroke="#C8A840" strokeWidth="1" />
      {/* Beak */}
      <path d="M55 50 Q60 58 65 50 Q60 55 55 50Z" fill="#C8A840" />
      {/* Eyes */}
      <circle cx="52" cy="40" r="5" fill="#0D1B2A" />
      <circle cx="68" cy="40" r="5" fill="#0D1B2A" />
      <circle cx="52" cy="40" r="3" fill="#FFD700">
        <animate attributeName="r" values="3;3.5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="68" cy="40" r="3" fill="#FFD700">
        <animate attributeName="r" values="3;3.5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Eye glow */}
      <circle cx="52" cy="40" r="1.5" fill="white" opacity="0.8" />
      <circle cx="68" cy="40" r="1.5" fill="white" opacity="0.8" />
      {/* Chest pattern */}
      <path d="M50 65 Q60 60 70 65 Q65 80 60 90 Q55 80 50 65Z" fill="#2d2d44" stroke="#C8A840" strokeWidth="0.5" />
      {/* Talons */}
      <path d="M50 98 Q47 103 44 105 M50 98 Q50 104 49 107 M50 98 Q53 104 54 107" stroke="#C8A840" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M70 98 Q73 103 76 105 M70 98 Q70 104 71 107 M70 98 Q67 104 66 107" stroke="#C8A840" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* UAE flag colors on chest */}
      <rect x="54" y="66" width="4" height="14" rx="1" fill="#CE1126" opacity="0.8" />
      <rect x="58" y="66" width="4" height="14" rx="1" fill="#009A44" opacity="0.8" />
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

export function DubaiSkyline({ width = 400, height = 80 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0D1B2A" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Ground */}
      <rect x="0" y={height - 10} width={width} height="10" fill="#0D1B2A" />
      {/* Burj Khalifa */}
      <polygon points="195,5 197,60 193,60" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="191" y="55" width="8" height="15" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      {/* Needle top */}
      <line x1="196" y1="5" x2="196" y2="2" stroke="#C8A840" strokeWidth="0.8" />
      {/* Building 1 */}
      <rect x="210" y="30" width="18" height="40" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="213" y="27" width="12" height="7" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      {/* Building 2 */}
      <rect x="235" y="38" width="22" height="32" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="240" y="34" width="12" height="8" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      {/* Sail building - Burj Al Arab style */}
      <path d="M165 70 L175 20 L185 70 Z" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <line x1="165" y1="70" x2="185" y2="70" stroke="#C8A840" strokeWidth="0.5" />
      {/* Building 3 left */}
      <rect x="145" y="42" width="16" height="28" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      {/* Building 4 left */}
      <rect x="120" y="50" width="20" height="20" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="127" y="45" width="8" height="8" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      {/* Far left buildings */}
      <rect x="80" y="55" width="14" height="15" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.3" />
      <rect x="98" y="52" width="18" height="18" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.3" />
      {/* Right buildings */}
      <rect x="262" y="45" width="16" height="25" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="282" y="48" width="20" height="22" fill="url(#skylineGrad)" stroke="#C8A840" strokeWidth="0.5" />
      <rect x="306" y="52" width="14" height="18" fill="url(#skylineGrad)" strokeWidth="0.3" />
      {/* Windows */}
      {[215,225].map(x => [35,43,51].map(y => <rect key={`w${x}${y}`} x={x} y={y} width="3" height="2" fill="#C8A840" opacity="0.4" />))}
      {[240,248].map(x => [42,50,58].map(y => <rect key={`w2${x}${y}`} x={x} y={y} width="3" height="2" fill="#C8A840" opacity="0.4" />))}
    </svg>
  );
}

export function StarBurst({ count = 30, width = 400, height = 300 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 3,
  }));
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      {stars.map(s => (
        <circle key={s.id} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.opacity}>
          <animate attributeName="opacity" values={`${s.opacity};${s.opacity * 0.3};${s.opacity}`} dur={`${2 + s.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}
