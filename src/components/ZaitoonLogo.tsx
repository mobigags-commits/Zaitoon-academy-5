import React from 'react';

interface ZaitoonLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal' | 'seal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isDark?: boolean;
  className?: string;
  showUrdu?: boolean;
  showMotto?: boolean;
}

/**
 * Zaitoon Roots Academy Official Logo & Heraldic Academic Insignia
 * 
 * Symbolism:
 * - Golden Olive (Zaitoon) Wreath: Peace, endurance, wisdom & Islamic scholarly heritage.
 * - Deep Roots & Classical Pillars: Unshakable foundation of knowledge and character.
 * - Open Book of Wisdom (Al-Kitab) with radiant dawn rays: Illumination & enlightened mind.
 * - Mortarboard Academic Cap with Golden Tassel: Universal higher education mastery.
 * - Heraldic Crest Shield with 5 Excellence Stars: International accreditation standards.
 * - Bilingual Typography in English & Urdu (زیتون روٹس اکیڈمی).
 */
export const ZaitoonLogo: React.FC<ZaitoonLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  isDark = false,
  className = '',
  showUrdu = true,
  showMotto = true,
}) => {
  // Dimension sizing map
  const emblemSizes = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };

  const textSizes = {
    xs: { main: 'text-xs', sub: 'text-[9px]', urdu: 'text-[9px]' },
    sm: { main: 'text-sm', sub: 'text-[10px]', urdu: 'text-[10px]' },
    md: { main: 'text-lg sm:text-xl', sub: 'text-[11px]', urdu: 'text-xs' },
    lg: { main: 'text-2xl sm:text-3xl', sub: 'text-xs sm:text-sm', urdu: 'text-sm' },
    xl: { main: 'text-3xl sm:text-4xl', sub: 'text-sm sm:text-base', urdu: 'text-base' },
    '2xl': { main: 'text-4xl sm:text-5xl', sub: 'text-base sm:text-lg', urdu: 'text-lg' },
  };

  // Pure SVG Emblem Component
  const EmblemSVG = ({ widthClass = emblemSizes[size] }: { widthClass?: string }) => (
    <svg
      viewBox="0 0 200 200"
      className={`${widthClass} shrink-0 drop-shadow-md select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Zaitoon Roots Academy Official Crest"
    >
      <defs>
        {/* Rich Royal Gradients */}
        <linearGradient id="goldOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1B8" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="75%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id="crimsonShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="50%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>

        <linearGradient id="emeraldOliveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        <linearGradient id="parchmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        <filter id="crestShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer Golden Fluted Academic Ring */}
      <circle cx="100" cy="100" r="95" stroke="url(#goldOuterGrad)" strokeWidth="3" fill="none" opacity="0.9" />
      <circle cx="100" cy="100" r="91" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 3" fill="none" />

      {/* Deep Navy/Black Background Field */}
      <circle cx="100" cy="100" r="88" fill="#0B1120" stroke="url(#goldOuterGrad)" strokeWidth="2.5" />

      {/* Upper Arc Inscribed Text: ZAITOON ROOTS ACADEMY */}
      <path id="upperArc" d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
      <text fill="#FDE68A" fontSize="10" fontWeight="900" letterSpacing="2.2" textAnchor="middle">
        <textPath href="#upperArc" startOffset="50%">
          ZAITOON ROOTS ACADEMY
        </textPath>
      </text>

      {/* Lower Arc Inscribed Text: ESTD 2004 • VERITAS & EXCELLENTIA */}
      <path id="lowerArc" d="M 170 102 A 71 71 0 0 1 30 102" fill="none" />
      <text fill="#FBBF24" fontSize="8" fontWeight="700" letterSpacing="1.8" textAnchor="middle">
        <textPath href="#lowerArc" startOffset="50%">
          ★ ESTD 2004 • LUX ET VERITAS ★
        </textPath>
      </text>

      {/* Flanking Olive (Zaitoon) Wreath Branches - Left & Right */}
      {/* Left Olive Branch with Leaves and Olives */}
      <g stroke="url(#goldOuterGrad)" strokeWidth="1.2" fill="none">
        <path d="M 36 100 C 34 78 45 56 60 44" strokeLinecap="round" />
        {/* Left Leaves */}
        <path d="M 38 92 C 30 89 29 80 36 84 C 40 86 41 90 38 92 Z" fill="url(#emeraldOliveGrad)" stroke="#FBBF24" strokeWidth="0.6" />
        <path d="M 44 76 C 36 71 37 62 44 68 C 47 71 47 74 44 76 Z" fill="url(#emeraldOliveGrad)" stroke="#FBBF24" strokeWidth="0.6" />
        <path d="M 54 60 C 47 53 50 45 56 52 C 59 56 57 59 54 60 Z" fill="url(#emeraldOliveGrad)" stroke="#FBBF24" strokeWidth="0.6" />
        {/* Left Golden Olive Fruit */}
        <ellipse cx="33" cy="85" rx="3" ry="4" fill="url(#goldOuterGrad)" transform="rotate(-15 33 85)" />
        <ellipse cx="41" cy="69" rx="3" ry="4" fill="url(#goldOuterGrad)" transform="rotate(-25 41 69)" />
      </g>

      {/* Right Olive Branch with Leaves and Olives */}
      <g stroke="url(#goldOuterGrad)" strokeWidth="1.2" fill="none">
        <path d="M 164 100 C 166 78 155 56 140 44" strokeLinecap="round" />
        {/* Right Leaves */}
        <path d="M 162 92 C 170 89 171 80 164 84 C 160 86 159 90 162 92 Z" fill="url(#emeraldOliveGrad)" stroke="#FBBF24" strokeWidth="0.6" />
        <path d="M 156 76 C 164 71 163 62 156 68 C 153 71 153 74 156 76 Z" fill="url(#emeraldOliveGrad)" stroke="#FBBF24" strokeWidth="0.6" />
        <path d="M 146 60 C 153 53 150 45 144 52 C 141 56 143 59 146 60 Z" fill="url(#emeraldOliveGrad)" stroke="#FBBF24" strokeWidth="0.6" />
        {/* Right Golden Olive Fruit */}
        <ellipse cx="167" cy="85" rx="3" ry="4" fill="url(#goldOuterGrad)" transform="rotate(15 167 85)" />
        <ellipse cx="159" cy="69" rx="3" ry="4" fill="url(#goldOuterGrad)" transform="rotate(25 159 69)" />
      </g>

      {/* Central Heraldic Escutcheon / Shield */}
      <g filter="url(#crestShadow)">
        <path
          d="M 64 68 L 136 68 C 136 68 140 108 100 134 C 60 108 64 68 64 68 Z"
          fill="url(#crimsonShieldGrad)"
          stroke="url(#goldOuterGrad)"
          strokeWidth="2.5"
        />
        {/* Inner Shield Gold Border */}
        <path
          d="M 69 72 L 131 72 C 131 72 135 104 100 127 C 65 104 69 72 69 72 Z"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="0.9"
          opacity="0.8"
        />

        {/* Radiant Dawn Rays behind the Book */}
        <g stroke="#FDE68A" strokeWidth="0.75" opacity="0.4">
          <line x1="100" y1="88" x2="100" y2="74" />
          <line x1="100" y1="88" x2="88" y2="76" />
          <line x1="100" y1="88" x2="112" y2="76" />
          <line x1="100" y1="88" x2="78" y2="82" />
          <line x1="100" y1="88" x2="122" y2="82" />
        </g>

        {/* Open Book of Wisdom (Al-Kitab) */}
        <g transform="translate(0, 4)">
          {/* Book Pages */}
          <path
            d="M 76 96 C 84 94 94 95 100 98 C 106 95 116 94 124 96 L 122 110 C 114 108 106 109 100 112 C 94 109 86 108 78 110 Z"
            fill="url(#parchmentGrad)"
            stroke="#92400E"
            strokeWidth="0.8"
          />
          {/* Book Spine Center */}
          <line x1="100" y1="98" x2="100" y2="112" stroke="#78350F" strokeWidth="1" />
          {/* Text Lines on Book Pages */}
          <line x1="82" y1="100" x2="96" y2="101" stroke="#92400E" strokeWidth="0.7" opacity="0.8" />
          <line x1="82" y1="104" x2="95" y2="105" stroke="#92400E" strokeWidth="0.7" opacity="0.8" />
          <line x1="104" y1="101" x2="118" y2="100" stroke="#92400E" strokeWidth="0.7" opacity="0.8" />
          <line x1="105" y1="105" x2="118" y2="104" stroke="#92400E" strokeWidth="0.7" opacity="0.8" />
        </g>

        {/* Deep Roots Motif at the Base of Shield */}
        <g stroke="url(#goldOuterGrad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
          <path d="M 100 117 L 100 128" />
          <path d="M 98 120 C 93 122 88 126 84 124" />
          <path d="M 102 120 C 107 122 112 126 116 124" />
          <path d="M 100 124 C 96 127 92 129 89 128" />
          <path d="M 100 124 C 104 127 108 129 111 128" />
        </g>
      </g>

      {/* Academic Mortarboard Cap atop the Shield */}
      <g filter="url(#crestShadow)">
        {/* Cap Diamond */}
        <polygon points="100,43 128,52 100,61 72,52" fill="#0F172A" stroke="url(#goldOuterGrad)" strokeWidth="1.8" />
        {/* Skull Cap Base */}
        <path d="M 86 57 L 86 64 C 86 69 114 69 114 64 L 114 57 Z" fill="#1E293B" stroke="#D97706" strokeWidth="0.8" />
        {/* Golden Button & Hanging Tassel */}
        <circle cx="100" cy="52" r="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="0.6" />
        <path d="M 100 52 C 108 53 118 57 119 64 L 121 72" stroke="url(#goldOuterGrad)" strokeWidth="1.4" strokeLinecap="round" />
        {/* Tassel Fringe */}
        <polygon points="119,72 123,72 122,76 118,76" fill="#F59E0B" />
      </g>

      {/* Golden Scroll Banner Across Base */}
      <g filter="url(#crestShadow)">
        <path
          d="M 44 146 L 60 141 L 60 152 L 44 146 Z"
          fill="#B45309"
          stroke="#78350F"
          strokeWidth="0.8"
        />
        <path
          d="M 156 146 L 140 141 L 140 152 L 156 146 Z"
          fill="#B45309"
          stroke="#78350F"
          strokeWidth="0.8"
        />
        <path
          d="M 52 142 C 76 138 124 138 148 142 L 145 156 C 122 152 78 152 55 156 Z"
          fill="url(#goldOuterGrad)"
          stroke="#78350F"
          strokeWidth="1"
        />
        {/* Banner Text: ROOTS OF WISDOM */}
        <text
          x="100"
          y="150"
          textAnchor="middle"
          fill="#450A0A"
          fontSize="6.8"
          fontWeight="900"
          letterSpacing="1.2"
        >
          ROOTS OF WISDOM
        </text>
      </g>

      {/* 5 Academic Excellence Golden Stars at Top Arc */}
      <g fill="url(#goldOuterGrad)" stroke="#B45309" strokeWidth="0.3">
        <polygon points="100,20 101.5,24 106,24 102.5,26.5 104,31 100,28.5 96,31 97.5,26.5 94,24 98.5,24" />
        <polygon points="86,23 87.2,26.2 90.8,26.2 88,28.2 89.2,31.8 86,29.8 82.8,31.8 84,28.2 81.2,26.2 84.8,26.2" />
        <polygon points="114,23 115.2,26.2 118.8,26.2 116,28.2 117.2,31.8 114,29.8 110.8,31.8 112,28.2 109.2,26.2 112.8,26.2" />
        <polygon points="73,28 74,31 77.5,31 74.8,32.8 76,36 73,34 70,36 71.2,32.8 68.5,31 72,31" />
        <polygon points="127,28 128,31 131.5,31 128.8,32.8 130,36 127,34 124,36 125.2,32.8 122.5,31 126,31" />
      </g>
    </svg>
  );

  // Variant 1: Pure Emblem
  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <EmblemSVG />
      </div>
    );
  }

  // Variant 2: Circular Wax / Gold Official Seal (e.g. for Diplomas & Challans)
  if (variant === 'seal') {
    return (
      <div className={`inline-flex flex-col items-center justify-center p-3 rounded-full border-4 border-amber-500/40 bg-slate-950 shadow-2xl relative ${className}`}>
        <EmblemSVG widthClass={emblemSizes[size]} />
        <div className="text-center mt-1">
          <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">
            OFFICIAL ACCREDITED SEAL
          </span>
          <span className="text-[8px] text-slate-400 font-mono">REG. NO: ZRA-HEC-2004</span>
        </div>
      </div>
    );
  }

  // Variant 3: Vertical Full Layout (Centered Emblem + Stacked Typography)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        <EmblemSVG widthClass={emblemSizes[size]} />
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h1 className={`font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'} ${textSizes[size].main}`}>
              ZAITOON ROOTS
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-sm">
              Academy
            </span>
          </div>

          {showUrdu && (
            <div className={`font-bold tracking-wide text-amber-500 font-serif ${textSizes[size].urdu}`}>
              زیتون روٹس اکیڈمی | عالمی اعلیٰ تعلیمی ادارہ
            </div>
          )}

          {showMotto && (
            <p className={`text-slate-400 font-medium tracking-normal ${textSizes[size].sub}`}>
              Roots of Wisdom, Wings of Excellence • Estd. 2004
            </p>
          )}
        </div>
      </div>
    );
  }

  // Variant 4: Standard Horizontal Layout (Emblem + Side-by-side Typography) - Default for Header & Navbar
  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 text-left group ${className}`}>
      <div className="transition-transform duration-300 group-hover:scale-105 shrink-0">
        <EmblemSVG widthClass={emblemSizes[size]} />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span
            className={`font-black tracking-tight leading-none uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            } ${textSizes[size].main}`}
          >
            ZAITOON ROOTS
          </span>
          <span
            className={`text-[9px] sm:text-[11px] font-black uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded shadow-sm border ${
              isDark
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-300'
                : 'bg-red-700 text-white border-red-800'
            }`}
          >
            ACADEMY
          </span>
        </div>

        {showUrdu && (
          <div
            className={`font-semibold tracking-wide mt-0.5 line-clamp-1 ${
              isDark ? 'text-amber-300' : 'text-red-800'
            } ${textSizes[size].urdu}`}
            dir="rtl"
          >
            زیتون روٹس اکیڈمی
            <span className={`text-[10px] font-normal mx-1 font-sans ${isDark ? 'text-slate-300' : 'text-slate-500'}`} dir="ltr">
              • Premier World Higher Education
            </span>
          </div>
        )}

        {showMotto && (
          <p
            className={`text-[10px] sm:text-[11px] leading-tight font-medium hidden xs:block truncate ${
              isDark ? 'text-rose-200/80' : 'text-slate-500'
            }`}
          >
            Roots of Wisdom, Wings of Excellence • Estd. 2004
          </p>
        )}
      </div>
    </div>
  );
};
