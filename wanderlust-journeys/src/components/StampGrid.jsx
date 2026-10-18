"use client";

import { useState } from "react";
import StampCard from "./StampCard";
import { Globe } from "./Doodles";

const PER_PAGE = 9;
const TILTS = [-2.2, 1.6, -1.1, 2, -1.6, 1.1, -2.4, 1.8, -0.9];

function ArrowButton({ direction, onClick, hidden }) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next page of destinations" : "Previous page of destinations"}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className={`paper-shadow absolute top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full border-2 border-ink/70 bg-parchment text-ink transition duration-300 hover:scale-110 sm:size-14 ${
        isNext ? "-right-3 sm:-right-8 lg:-right-14 hover:translate-x-1" : "-left-3 sm:-left-8 lg:-left-14 hover:-translate-x-1"
      } ${hidden ? "pointer-events-none scale-75 opacity-0" : "opacity-100"}`}
    >
      <svg viewBox="0 0 32 32" className={`w-6 sm:w-7 ${isNext ? "" : "-scale-x-100"}`} aria-hidden="true">
        <path
          d="M5 16.5q10-1.5 21-.5M18 8q4 5 8.5 8-5 3-8.5 8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function ComingSoon() {
  return (
    <div className="flex aspect-[3/2.5] w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-ink/30 bg-white/25 p-4 text-center">
      <Globe className="w-12 opacity-80" />
      <p className="font-script text-2xl leading-none text-ink/80">Next adventure…</p>
      <p className="font-round text-[11px] font-bold uppercase tracking-[0.14em] text-ink/50">Coming soon</p>
    </div>
  );
}

export default function StampGrid({ destinations, onOpen, onPrefetch }) {
  const pages = [];
  for (let i = 0; i < destinations.length; i += PER_PAGE) {
    pages.push(destinations.slice(i, i + PER_PAGE));
  }
  const [page, setPage] = useState(0);
  const last = pages.length - 1;

  return (
    <section
      aria-label="Destinations"
      // On laptops/desktops the grid width is derived from the window height so all 3 rows fit on screen.
      className="relative z-20 mx-auto w-full max-w-[860px] lg:max-w-[min(940px,calc(97dvh-74px))]"
    >
      <div className="-mx-4 overflow-hidden px-4 py-5 lg:py-3">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((items, p) => (
            <ul
              key={p}
              inert={p !== page}
              aria-label={`Page ${p + 1} of ${pages.length}`}
              className={`flex w-full shrink-0 flex-wrap content-center justify-center gap-x-[clamp(14px,2.6vw,34px)] gap-y-[clamp(14px,min(3vw,2.6vh),34px)] px-1 transition-opacity duration-700 ${
                p === page ? "opacity-100" : "opacity-0"
              }`}
            >
              {items.map((dest, i) => {
                const n = p * PER_PAGE + i;
                return (
                  <li key={dest.id} className="w-[calc((100%-2*clamp(14px,2.6vw,34px))/3)]">
                    <StampCard
                      zoomId={dest.id}
                      name={dest.name}
                      dates={dest.hasSeasons ? dest.seasons.map((s) => s.date) : [dest.date]}
                      color={dest.color}
                      image={dest.thumbnail}
                      index={n}
                      tilt={TILTS[n % TILTS.length]}
                      onOpen={(el) => onOpen(dest, el)}
                      onPrefetch={() => onPrefetch(dest)}
                    />
                  </li>
                );
              })}
              {p === last && items.length < PER_PAGE && (
                <li className="w-[calc((100%-2*clamp(14px,2.6vw,34px))/3)]" aria-hidden="true">
                  <ComingSoon />
                </li>
              )}
            </ul>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <>
          <ArrowButton direction="prev" hidden={page === 0} onClick={() => setPage((v) => Math.max(0, v - 1))} />
          <ArrowButton direction="next" hidden={page === last} onClick={() => setPage((v) => Math.min(last, v + 1))} />
          <div className="mt-1 flex justify-center gap-2 lg:mt-0" aria-hidden="true">
            {pages.map((_, p) => (
              <span
                key={p}
                className={`size-2.5 rounded-full border border-ink/50 transition-colors duration-300 ${p === page ? "bg-ink/70" : "bg-white/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
