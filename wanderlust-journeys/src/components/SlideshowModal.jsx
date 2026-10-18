"use client";

import { useEffect, useRef, useState } from "react";
import ModalShell, { CloseButton } from "./ModalShell";
import { DateBadge } from "./StampCard";
import { Heart } from "./Doodles";

const SWIPE_PX = 50;

function NavButton({ direction, onClick, disabled }) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Next photo" : "Previous photo"}
      className={`paper-shadow absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border-2 border-ink/70 bg-parchment/95 text-ink transition duration-300 hover:scale-110 disabled:pointer-events-none disabled:opacity-0 sm:size-12 ${
        isNext ? "right-2 sm:right-4" : "left-2 sm:left-4"
      }`}
    >
      <svg viewBox="0 0 32 32" className={`w-6 ${isNext ? "" : "-scale-x-100"}`} aria-hidden="true">
        <path
          d="M6 16.5q10-1.5 20-.5M18 8q4 5 8.5 8-5 3-8.5 8.5"
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

/** Lightbox slideshow inside a big perforated stamp frame. */
export default function SlideshowModal({ title, subtitle, date, color, images, onClose }) {
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: null });
  const pointer = useRef(null);
  const count = images.length;

  const go = (delta) =>
    setSlide((s) => {
      const next = s.index + delta;
      if (next < 0 || next >= count) return s;
      return { index: next, prev: s.index };
    });

  // Warm the cache for the neighbours so prev/next feel instant.
  useEffect(() => {
    for (const i of [index + 1, index - 1, index + 2]) {
      if (i >= 0 && i < count) new Image().src = images[i];
    }
  }, [index, count, images]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  const onPointerDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const label = subtitle ? `${title}, ${subtitle}` : title;

  return (
    <ModalShell label={`${label} photos`} onClose={onClose} onKeyDown={onKeyDown}>
      <div data-zoom-frame className="paper-shadow relative" style={{ "--stamp": color }}>
        <div className="stamp-edge stamp-edge--lg stamp-paper">
          <div className="px-1 pb-1 sm:px-2">
            <div className="flex items-end justify-between gap-3 px-1 pb-2 pt-0.5">
              <h2 className="flex items-baseline gap-2 font-script text-3xl font-bold leading-none text-ink sm:text-4xl">
                {title}
                {subtitle && <span className="font-hand text-xl font-normal text-ink-soft sm:text-2xl">· {subtitle}</span>}
              </h2>
              <DateBadge className="mb-1">{date}</DateBadge>
            </div>

            <div
              className="relative h-[min(68vh,720px)] w-[min(calc(100vw-6rem),1080px)] touch-pan-y select-none overflow-hidden rounded-[3px] bg-parchment ring-1 ring-ink/25"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (pointer.current = null)}
            >
              {/* Blurred copy fills the letterbox around portrait/landscape photos. */}
              <img
                key={`bg-${index}`}
                src={images[index]}
                alt=""
                aria-hidden="true"
                className="animate-fade-in absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
              />
              {prev !== null && prev !== index && (
                <img
                  key={`prev-${prev}`}
                  src={images[prev]}
                  alt=""
                  aria-hidden="true"
                  className="animate-photo-out absolute inset-0 h-full w-full object-contain"
                />
              )}
              <img
                key={`photo-${index}`}
                data-zoom-photo
                src={images[index]}
                alt={`${label}, photo ${index + 1} of ${count}`}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-contain ${prev === null ? "" : "animate-photo-in"}`}
              />

              <NavButton direction="prev" onClick={() => go(-1)} disabled={index === 0} />
              <NavButton direction="next" onClick={() => go(1)} disabled={index === count - 1} />
            </div>

            <div className="flex items-center justify-center gap-2 pt-2.5 pb-0.5">
              <Heart className="w-4" />
              <p className="font-hand text-lg text-ink sm:text-xl" aria-live="polite">
                Photo {index + 1} of {count}
              </p>
              <Heart className="w-4" color="#f6b98a" />
            </div>
          </div>
        </div>
        <CloseButton onClick={onClose} label="Close slideshow" />
      </div>
    </ModalShell>
  );
}
