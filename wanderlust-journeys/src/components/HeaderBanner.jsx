// Curved parchment ribbon with folded tails. `curve` controls how much the band arches.
export function Ribbon({ lines, curve = 60, className, fontSize = 38 }) {
  const c = curve;
  const id = lines.join("-").replace(/[^a-z]/gi, "").slice(0, 24);

  return (
    <svg viewBox="0 0 640 170" className={className} aria-hidden="true" focusable="false">
      <defs>
        <path id={`${id}-l1`} d={`M100 86 Q320 ${94 - c} 540 86`} />
        <path id={`${id}-l2`} d={`M100 129 Q320 ${137 - c} 540 129`} />
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8ecd0" />
          <stop offset="1" stopColor="#efdcb3" />
        </linearGradient>
      </defs>

      <g stroke="#8a6d45" strokeWidth="2.2" strokeLinejoin="round">
        {/* tails */}
        <path d={`M12 ${92 - c / 6} L120 ${84 - c / 6} L120 ${162 - c / 6} L12 ${170 - c / 6} L40 ${131 - c / 6} Z`} fill="#dcc394" />
        <path d={`M628 ${92 - c / 6} L520 ${84 - c / 6} L520 ${162 - c / 6} L628 ${170 - c / 6} L600 ${131 - c / 6} Z`} fill="#dcc394" />
        {/* folds where the band tucks behind */}
        <path d={`M82 ${60} L120 ${84 - c / 6} L82 ${78}`} fill="#b99a66" />
        <path d={`M558 ${60} L520 ${84 - c / 6} L558 ${78}`} fill="#b99a66" />
        {/* main band */}
        <path d={`M80 56 Q320 ${56 - c} 560 56 L560 146 Q320 ${146 - c} 80 146 Z`} fill={`url(#${id}-paper)`} />
        <path
          d={`M92 66 Q320 ${66 - c} 548 66 M92 136 Q320 ${136 - c} 548 136`}
          fill="none"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          opacity="0.55"
        />
      </g>

      <g fontFamily="var(--font-patrick)" fill="#3b3530" fontSize={fontSize} textAnchor="middle" letterSpacing="1.5">
        <text>
          <textPath href={`#${id}-l1`} startOffset="50%">
            {lines[0]}
          </textPath>
        </text>
        {lines[1] && (
          <text>
            <textPath href={`#${id}-l2`} startOffset="50%">
              {lines[1]}
            </textPath>
          </text>
        )}
      </g>
    </svg>
  );
}

export default function HeaderBanner() {
  return (
    <header className="relative z-10 flex shrink-0 justify-center pt-2 lg:pt-1">
      <h1 className="w-[min(88vw,620px)] lg:w-[min(560px,50vh)]">
        <span className="sr-only">Postcards from Our Adventures</span>
        <Ribbon lines={["POSTCARDS FROM OUR", "ADVENTURES"]} className="w-full drop-shadow-[0_6px_6px_rgba(60,40,20,0.15)]" />
      </h1>
    </header>
  );
}

export function FooterBanner() {
  return (
    <footer className="relative z-10 flex shrink-0 justify-center pt-4 lg:pt-0">
      <p className="w-[min(80vw,480px)] lg:w-[min(360px,30vh)]">
        <span className="sr-only">Collecting moments one mile at a time</span>
        <Ribbon
          lines={["COLLECTING MOMENTS", "ONE MILE AT A TIME"]}
          curve={22}
          fontSize={36}
          className="w-full drop-shadow-[0_6px_6px_rgba(60,40,20,0.15)]"
        />
      </p>
    </footer>
  );
}
