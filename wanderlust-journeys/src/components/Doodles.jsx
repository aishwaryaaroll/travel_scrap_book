// Hand-drawn style travel doodles. Each piece is a tiny inline SVG so it stays crisp at any size.
const INK = "#3b3530";

const stroke = {
  stroke: INK,
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ viewBox, className, style, children }) {
  return (
    <svg viewBox={viewBox} className={className} style={style} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function Suitcase({ className, style, color = "#c98d5a" }) {
  return (
    <Svg viewBox="0 0 100 84" className={className} style={style}>
      <path d="M38 20v-8q0-5 5-5h14q5 0 5 5v8" fill="none" {...stroke} />
      <rect x="7" y="20" width="86" height="57" rx="9" fill={color} {...stroke} />
      <path d="M27 20v57M73 20v57" fill="none" {...stroke} stroke="#7a4f2c" />
      <path d="M7 40h86" fill="none" {...stroke} strokeWidth="1.4" strokeDasharray="3 4" />
      <circle cx="50" cy="52" r="9" fill="#f6d77a" {...stroke} strokeWidth="1.6" />
      <rect x="77" y="46" width="11" height="15" rx="2" fill="#f4b6cf" {...stroke} strokeWidth="1.4" transform="rotate(12 82 53)" />
      <rect x="12" y="50" width="11" height="9" rx="1.5" fill="#a9cdea" {...stroke} strokeWidth="1.4" transform="rotate(-10 17 55)" />
    </Svg>
  );
}

export function Passport({ className, style, color = "#2f4a7a" }) {
  return (
    <Svg viewBox="0 0 72 96" className={className} style={style}>
      <rect x="5" y="4" width="62" height="86" rx="7" fill={color} {...stroke} />
      <path d="M12 4v86" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
      <text x="38" y="22" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-round)" fontWeight="700" fill="#ecd68a" letterSpacing="1">
        PASSPORT
      </text>
      <g fill="none" stroke="#ecd68a" strokeWidth="1.8">
        <circle cx="38" cy="52" r="15" />
        <ellipse cx="38" cy="52" rx="6.5" ry="15" />
        <path d="M23 52h30M25.5 44h25M25.5 60h25" />
      </g>
    </Svg>
  );
}

export function Globe({ className, style }) {
  return (
    <Svg viewBox="0 0 84 104" className={className} style={style}>
      <circle cx="42" cy="40" r="29" fill="#9fd3e6" {...stroke} />
      <path
        d="M24 26q8-6 14 0t2 10-8 8-6 8M50 18q10 2 12 10t-4 10-6 10 4 10M30 60q4-4 10-2"
        fill="#9ccf8e"
        {...stroke}
        strokeWidth="1.6"
      />
      <path d="M8 40a34 34 0 0 0 68 0" fill="none" {...stroke} stroke="#9a6a3c" strokeWidth="3" />
      <path d="M42 74v13" {...stroke} stroke="#9a6a3c" strokeWidth="3" />
      <ellipse cx="42" cy="92" rx="19" ry="6" fill="#c98d5a" {...stroke} />
    </Svg>
  );
}

export function Camera({ className, style, color = "#f4a9b8" }) {
  return (
    <Svg viewBox="0 0 92 72" className={className} style={style}>
      <rect x="30" y="8" width="26" height="12" rx="3" fill={color} {...stroke} />
      <rect x="5" y="18" width="82" height="48" rx="9" fill={color} {...stroke} />
      <circle cx="46" cy="42" r="16" fill="#fff" {...stroke} />
      <circle cx="46" cy="42" r="9.5" fill="#6aa4c8" {...stroke} strokeWidth="1.6" />
      <circle cx="42.5" cy="38.5" r="2.6" fill="#fff" />
      <rect x="70" y="25" width="10" height="6" rx="1.5" fill="#fff6c9" {...stroke} strokeWidth="1.4" />
      <circle cx="16" cy="28" r="2.5" fill={INK} />
    </Svg>
  );
}

export function Sunglasses({ className, style }) {
  return (
    <Svg viewBox="0 0 110 44" className={className} style={style}>
      <path d="M4 10q0-4 4-4h34q4 0 4 4v8q0 18-21 18T4 18z" fill="#3b3530" {...stroke} />
      <path d="M64 10q0-4 4-4h34q4 0 4 4v8q0 18-21 18T64 18z" fill="#3b3530" {...stroke} />
      <path d="M46 14q9-7 18 0" fill="none" {...stroke} />
      <path d="M12 13l9 0M72 13l9 0" stroke="#9fd3e6" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

export function PaperPlane({ className, style }) {
  return (
    <Svg viewBox="0 0 72 52" className={className} style={style}>
      <path d="M4 26L68 4L42 48L32 32Z" fill="#fff" {...stroke} />
      <path d="M68 4L32 32L30 44L38 36" fill="#e8eef5" {...stroke} />
    </Svg>
  );
}

export function Airplane({ className, style }) {
  return (
    <Svg viewBox="0 0 96 60" className={className} style={style}>
      <path d="M52 27L34 6h-8l12 22M52 33L34 54h-8l12-22" fill="#e3edf7" {...stroke} />
      <path d="M8 31q0-6 8-6h56q12 0 20 6-8 6-20 6H16q-8 0-8-6z" fill="#fff" {...stroke} />
      <path d="M14 25L9 12h7l9 13" fill="#e3edf7" {...stroke} />
      <path d="M70 28h4M62 28h4M54 28h4" stroke="#6aa4c8" strokeWidth="2.6" strokeLinecap="round" />
    </Svg>
  );
}

export function FlightPath({ className, style, d = "M4 60 C 60 0, 120 70, 196 10" }) {
  return (
    <Svg viewBox="0 0 200 72" className={className} style={style}>
      <path d={d} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 8" />
    </Svg>
  );
}

export function Postmark({ className, style, label = "PASSED", color = "#7a6a8f" }) {
  return (
    <Svg viewBox="0 0 120 64" className={className} style={style}>
      <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.85">
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="20" strokeDasharray="1 4" />
        <path d="M62 18q7-5 14 0t14 0 14 0 14 0M62 32q7-5 14 0t14 0 14 0 14 0M62 46q7-5 14 0t14 0 14 0 14 0" />
      </g>
      <text x="32" y="36" textAnchor="middle" fontSize="11" fontFamily="var(--font-round)" fontWeight="700" fill={color} opacity="0.9">
        {label}
      </text>
    </Svg>
  );
}

export function MiniStamp({ className, style, color = "#f6d77a", children }) {
  return (
    <Svg viewBox="0 0 54 64" className={className} style={style}>
      <rect x="3" y="3" width="48" height="58" rx="2" fill="#fff" stroke={INK} strokeWidth="1.6" strokeDasharray="3 3" />
      <rect x="9" y="9" width="36" height="46" fill={color} stroke={INK} strokeWidth="1.4" />
      {children ?? (
        <path d="M13 48l9-14 6 8 5-6 8 12z" fill="#fff" fillOpacity="0.85" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      )}
    </Svg>
  );
}

export function Leaves({ className, style }) {
  return (
    <Svg viewBox="0 0 90 46" className={className} style={style}>
      <path d="M4 34q40-20 82-10" fill="none" {...stroke} stroke="#5c8a4d" strokeWidth="2" />
      {[
        [18, 26, -30],
        [32, 20, 25],
        [46, 22, -25],
        [60, 20, 30],
        [72, 24, -20],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="8" ry="4.2" transform={`rotate(${r} ${x} ${y})`} fill="#9ccf8e" stroke="#5c8a4d" strokeWidth="1.6" />
      ))}
    </Svg>
  );
}

export function Heart({ className, style, color = "#e88a8a" }) {
  return (
    <Svg viewBox="0 0 32 30" className={className} style={style}>
      <path d="M16 27S3 19 3 10.5A6.5 6.5 0 0 1 16 8a6.5 6.5 0 0 1 13 2.5C29 19 16 27 16 27z" fill={color} {...stroke} strokeWidth="1.8" />
    </Svg>
  );
}

export function Star({ className, style, color = "#f6d77a" }) {
  return (
    <Svg viewBox="0 0 32 32" className={className} style={style}>
      <path d="M16 3l3.6 8.1 8.6.8-6.5 5.8 1.9 8.6L16 21.9l-7.6 4.4 1.9-8.6-6.5-5.8 8.6-.8z" fill={color} {...stroke} strokeWidth="1.6" />
    </Svg>
  );
}

export function Compass({ className, style }) {
  return (
    <Svg viewBox="0 0 64 64" className={className} style={style}>
      <circle cx="32" cy="32" r="27" fill="#fff6dc" {...stroke} />
      <circle cx="32" cy="32" r="21" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="2 4" />
      <path d="M32 12l6 20-6 20-6-20z" fill="#e88a8a" {...stroke} strokeWidth="1.6" />
      <path d="M32 32l6 0-6 20-6-20z" fill="#a9cdea" {...stroke} strokeWidth="1.6" />
      <text x="32" y="10" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="var(--font-round)" fill={INK}>N</text>
    </Svg>
  );
}

export function MapPin({ className, style, color = "#e57373" }) {
  return (
    <Svg viewBox="0 0 40 54" className={className} style={style}>
      <path d="M20 51S5 32 5 20a15 15 0 0 1 30 0c0 12-15 31-15 31z" fill={color} {...stroke} />
      <circle cx="20" cy="20" r="5.5" fill="#fff" {...stroke} strokeWidth="1.6" />
    </Svg>
  );
}

export function Swirl({ className, style }) {
  return (
    <Svg viewBox="0 0 120 30" className={className} style={style}>
      <path
        d="M4 15q14-12 26 0t20-2q-4-8-10-4t2 10q14 10 26-2t20 0q8 8 28 0"
        fill="none"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </Svg>
  );
}

export function Tag({ className, style, label = "EXPLORE", color = "#fff6c9" }) {
  // The tag stretches to fit its label.
  const w = Math.max(110, 44 + label.length * 9);
  return (
    <Svg viewBox={`0 0 ${w} 44`} className={className} style={style}>
      <path d={`M14 4h${w - 22}q4 0 4 4v28q0 4-4 4H14L4 22z`} fill={color} {...stroke} />
      <circle cx="16" cy="22" r="3" fill="none" {...stroke} strokeWidth="1.6" />
      <text x={(w + 22) / 2} y="28" textAnchor="middle" fontSize="15" fontFamily="var(--font-patrick)" fill="#4a7a52" letterSpacing="1">
        {label}
      </text>
    </Svg>
  );
}

export function HotAirBalloon({ className, style }) {
  return (
    <Svg viewBox="0 0 60 84" className={className} style={style}>
      <path d="M30 4C8 4 4 30 18 46l6 10h12l6-10C56 30 52 4 30 4z" fill="#f4a9b8" {...stroke} />
      <path d="M30 4c-10 14-8 38-4 52h8c4-14 6-38-4-52z" fill="#f6d77a" {...stroke} strokeWidth="1.6" />
      <path d="M24 56l1 10M36 56l-1 10" {...stroke} strokeWidth="1.6" />
      <rect x="23" y="66" width="14" height="11" rx="2" fill="#c98d5a" {...stroke} />
    </Svg>
  );
}

export function BoardingPass({ className, style }) {
  return (
    <Svg viewBox="0 0 112 52" className={className} style={style}>
      <rect x="3" y="3" width="106" height="46" rx="5" fill="#fffaf0" {...stroke} />
      <path d="M3 8q0-5 5-5h96q5 0 5 5v8H3z" fill="#9ec5ee" {...stroke} strokeWidth="1.6" />
      <text x="40" y="13.5" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="var(--font-round)" fill="#fff" letterSpacing="1">
        BOARDING PASS
      </text>
      <path d="M80 16v33" stroke={INK} strokeWidth="1.4" strokeDasharray="2 3" />
      <text x="12" y="31" fontSize="9" fontWeight="700" fontFamily="var(--font-round)" fill={INK}>SEA</text>
      <path d="M33 28h14M43 24l4 4-4 4" fill="none" {...stroke} strokeWidth="1.6" />
      <text x="52" y="31" fontSize="9" fontWeight="700" fontFamily="var(--font-round)" fill={INK}>ANC</text>
      <path d="M12 40h40" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      <path d="M86 24v18M89 24v18M93 24v18M95 24v18M99 24v18M102 24v18" stroke={INK} strokeWidth="1.6" />
    </Svg>
  );
}

export function FoldedMap({ className, style }) {
  return (
    <Svg viewBox="0 0 90 66" className={className} style={style}>
      <path d="M6 10l26-6 26 6 26-6v52l-26 6-26-6-26 6z" fill="#fff6c9" {...stroke} />
      <path d="M32 4v52M58 10v52" stroke={INK} strokeWidth="1.4" opacity="0.6" />
      <path d="M58 10l26-6v52l-26 6z" fill="#000" opacity="0.05" />
      <path d="M14 50q14-30 30-12t28-20" fill="none" stroke="#e57373" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 5" />
      <path d="M68 13l8 8M76 13l-8 8" stroke="#e57373" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="50" r="2.6" fill="#e57373" />
    </Svg>
  );
}

export function PalmTree({ className, style }) {
  return (
    <Svg viewBox="0 0 64 86" className={className} style={style}>
      <ellipse cx="32" cy="79" rx="24" ry="5" fill="#f6d77a" {...stroke} />
      <path d="M28 78q-4-28 3-50h4q-5 22-1 50z" fill="#c98d5a" {...stroke} strokeWidth="1.8" />
      {[
        "M33 27q-14-14-29-4 15-3 29 4z",
        "M33 27q-6-18-21-20 13 6 21 20z",
        "M33 27q8-18 23-17-14 5-23 17z",
        "M33 27q16-10 28 2-14-6-28-2z",
        "M33 27q-4 4-14 14 2-12 14-14z",
      ].map((d, i) => (
        <path key={i} d={d} fill="#9ccf8e" stroke="#4f7a43" strokeWidth="1.8" strokeLinejoin="round" />
      ))}
    </Svg>
  );
}

export function Mountains({ className, style }) {
  return (
    <Svg viewBox="0 0 100 62" className={className} style={style}>
      <circle cx="76" cy="17" r="10" fill="#f6d77a" {...stroke} strokeWidth="1.8" />
      <path d="M4 58l30-44 16 22 12-14 34 36z" fill="#a9cdea" {...stroke} />
      <path d="M34 14l-7 10 5-2 4 4 5-5zM62 22l-5 6 4-1 3 3 3-3z" fill="#fff" {...stroke} strokeWidth="1.4" />
      <path d="M4 58h92" {...stroke} />
    </Svg>
  );
}

export function Cactus({ className, style }) {
  return (
    <Svg viewBox="0 0 50 78" className={className} style={style}>
      <path d="M20 46h-7q-5 0-5-5V31q0-4 4-4t4 4v7h4z" fill="#9ccf8e" {...stroke} strokeWidth="1.8" />
      <path d="M32 40h5q5 0 5-5V25q0-4-4-4t-4 4v7h-2z" fill="#9ccf8e" {...stroke} strokeWidth="1.8" />
      <path d="M20 64V20q0-8 6-8t6 8v44z" fill="#9ccf8e" {...stroke} strokeWidth="1.8" />
      <path d="M26 20v40" stroke="#4f7a43" strokeWidth="1.2" opacity="0.6" />
      <circle cx="26" cy="11" r="3" fill="#f4a9b8" {...stroke} strokeWidth="1.4" />
      <path d="M13 62h26l-3 13H16z" fill="#e8a07a" {...stroke} strokeWidth="1.8" />
    </Svg>
  );
}

export function Snowflake({ className, style, color = "#6aa4c8" }) {
  return (
    <Svg viewBox="0 0 40 40" className={className} style={style}>
      <g stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none">
        {[0, 60, 120].map((r) => (
          <g key={r} transform={`rotate(${r} 20 20)`}>
            <path d="M20 3v34M15 7l5 4 5-4M15 33l5-4 5 4" />
          </g>
        ))}
      </g>
    </Svg>
  );
}

export function Cloud({ className, style }) {
  return (
    <Svg viewBox="0 0 70 36" className={className} style={style}>
      <path d="M14 31q-10 0-8-9 2-8 12-6 2-10 14-10 12 0 14 8 10-4 16 4 6 8-4 13z" fill="#fff" {...stroke} strokeWidth="1.8" />
    </Svg>
  );
}

export function Polaroid({ className, style }) {
  return (
    <Svg viewBox="0 0 56 66" className={className} style={style}>
      <rect x="4" y="6" width="48" height="56" rx="2" fill="#fff" {...stroke} strokeWidth="1.8" />
      <rect x="9" y="11" width="38" height="34" fill="#9fd3e6" stroke={INK} strokeWidth="1.4" />
      <path d="M9 45l11-15 8 9 6-6 13 12z" fill="#9ccf8e" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="38" cy="19" r="4" fill="#f6d77a" />
      <path d="M14 53q6-3 12 0t12 0" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.6" />
      <rect x="18" y="1" width="20" height="9" fill="#f4b6cf" opacity="0.85" transform="rotate(-6 28 5)" />
    </Svg>
  );
}

export function Anchor({ className, style }) {
  return (
    <Svg viewBox="0 0 48 58" className={className} style={style}>
      <g fill="none" {...stroke} stroke="#4a6b8a" strokeWidth="2.6">
        <circle cx="24" cy="9" r="5" />
        <path d="M24 14v38M14 22h20M6 36q2 16 18 16t18-16M6 36l-3 4M6 36l5 2M42 36l3 4M42 36l-5 2" />
      </g>
    </Svg>
  );
}

export function WashiTape({ className, style, color = "#f4b6cf" }) {
  return (
    <Svg viewBox="0 0 80 18" className={className} style={style}>
      <path d="M3 2h74l-2 3.5 2 3.5-2 3.5 2 3.5H3l2-3.5-2-3.5 2-3.5z" fill={color} opacity="0.85" />
      <path d="M12 2l-6 14M26 2l-6 14M40 2l-6 14M54 2l-6 14M68 2l-6 14" stroke="#fff" strokeWidth="2.4" opacity="0.45" />
    </Svg>
  );
}

/** A travel quote handwritten on a scrap of lined paper, taped to the page. */
function QuoteNote({ quote, author, className = "", tape = "#f4b6cf" }) {
  return (
    <figure className={`absolute w-[clamp(9.5rem,13vw,13.5rem)] ${className}`}>
      <div
        className="relative bg-[#fffaf0] px-3.5 pb-2.5 pt-3.5 shadow-[0_5px_10px_rgba(60,40,20,0.14)]"
        style={{
          backgroundImage: "repeating-linear-gradient(transparent 0 calc(1.35em - 1px), rgba(106,164,200,0.22) calc(1.35em - 1px) 1.35em)",
          backgroundPosition: "0 0.6em",
        }}
      >
        <WashiTape className="absolute -top-2 left-1/2 w-16 -translate-x-1/2 -rotate-3" color={tape} />
        <blockquote className="font-script text-[clamp(1rem,2.3vh,1.45rem)] font-bold leading-[1.15] text-ink">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {author && (
          <figcaption className="mt-1 text-right font-round text-[9px] font-bold uppercase tracking-[0.18em] text-ink/55">
            &mdash; {author}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

/** Travel quotes pinned in the four corners beside the ribbons (laptop/desktop layout only). */
export function TravelQuotes() {
  return (
    <aside aria-label="Travel quotes" className="pointer-events-none absolute inset-0 z-10 hidden select-none lg:block">
      <QuoteNote
        quote="Not all those who wander are lost."
        author="J.R.R. Tolkien"
        className="left-[13%] top-[1.5vh] -rotate-3"
        tape="#a9cdea"
      />
      <QuoteNote quote="Adventure is out there!" className="right-[13%] top-[2vh] rotate-2" tape="#f6d77a" />
      <QuoteNote quote="Wander often, wonder always." className="bottom-[1.5vh] left-[13%] rotate-2" tape="#b5d99c" />
      <QuoteNote quote="Collect moments, not things." className="bottom-[1.5vh] right-[13%] -rotate-2" tape="#f4b6cf" />
    </aside>
  );
}

/** Stickers used on stamp corners. */
export const STICKERS = [Heart, Compass, PaperPlane, Star, MapPin];

/**
 * Decorative doodle layer framing the page, like the prototype.
 * Positioned against the full-width page container; hidden from assistive tech.
 */
export function DoodleLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 select-none" aria-hidden="true">
      {/* Layout zones (laptop/desktop): an outer strip (0–6% of the width) and an inner strip
          (~18–24%) on each side of the side quotes, plus the corners of the header and footer rows.
          Vertical positions use vh because the page is exactly one screen tall. */}

      {/* Side-column doodles live in SideQuotes so they always sit beside the quotes. */}

      {/* ---- header row, left ---- */}
      <Globe className="absolute left-[0.5%] top-[1vh] w-16 -rotate-6 lg:w-[9vh]" />
      <Passport className="absolute left-[7%] top-[2vh] hidden w-[5.5vh] rotate-[10deg] lg:block" color="#7fb39a" />
      <Airplane className="absolute left-[27.5%] top-[4vh] hidden w-[7vh] -rotate-12 lg:block" />
      <FlightPath className="absolute left-[25%] top-[9.5vh] hidden w-[10vh] -scale-x-100 xl:block" d="M4 60 C 40 20, 90 64, 196 18" />

      {/* ---- header row, right ---- */}
      <Globe className="absolute right-[0.5%] top-[1vh] w-16 rotate-6 lg:w-[9vh]" />
      <Passport className="absolute right-[7%] top-[2vh] hidden w-[5.5vh] rotate-[-8deg] md:block" />
      <Sunglasses className="absolute right-[27.5%] top-[3vh] hidden w-[7vh] rotate-[8deg] lg:block" />
      <HotAirBalloon className="absolute right-[25.5%] top-[8.5vh] hidden w-[3.6vh] rotate-6 xl:block" />

      {/* ---- footer row, left ---- */}
      <Suitcase className="absolute bottom-[1vh] left-[1%] hidden w-[8vh] rotate-[6deg] md:block" color="#b07a4a" />
      <Camera className="absolute bottom-[1.5vh] left-[7.5%] hidden w-[6vh] -rotate-6 lg:block" />
      <FoldedMap className="absolute bottom-[1.5vh] left-[28%] hidden w-[7.5vh] -rotate-6 lg:block" />

      {/* ---- footer row, right ---- */}
      <Tag className="absolute bottom-[2vh] right-[0.5%] hidden w-[13vh] rotate-[-8deg] lg:block" label="HAPPY WANDERER" />
      <PaperPlane className="absolute bottom-[3vh] right-[28%] hidden w-[5.5vh] rotate-[10deg] lg:block" />
      <Postmark className="absolute bottom-[1vh] right-[34%] hidden w-[9vh] rotate-[-6deg] xl:block" label="PASSED" />
    </div>
  );
}
