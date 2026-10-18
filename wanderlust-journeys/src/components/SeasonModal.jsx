"use client";

import ModalShell, { CloseButton } from "./ModalShell";
import StampCard from "./StampCard";
import { Postmark } from "./Doodles";

/** Postcard-style chooser for destinations visited in more than one season. */
export default function SeasonModal({ destination, onPick, onPrefetch, onClose }) {
  return (
    <ModalShell label={`${destination.name}: choose a season`} onClose={onClose}>
      <div data-zoom-frame className="paper-shadow relative w-[min(92vw,760px)]" style={{ "--stamp": destination.color }}>
        <div className="stamp-edge stamp-edge--lg stamp-paper">
          <div className="relative overflow-hidden rounded-[3px] bg-parchment px-5 pb-7 pt-5 ring-1 ring-ink/20 sm:px-9 sm:pb-9 sm:pt-6">
            <Postmark className="pointer-events-none absolute -right-2 top-3 w-28 rotate-[8deg] opacity-70 sm:w-32" label={destination.name.toUpperCase().slice(0, 7)} />

            <p className="font-round text-[11px] font-bold uppercase tracking-[0.35em] text-ink/50">Post card</p>
            <h2 className="font-script text-5xl font-bold leading-none text-ink sm:text-6xl">{destination.name}</h2>
            <p className="mt-1 font-hand text-lg text-ink-soft sm:text-xl">We went twice! Pick a season to explore.</p>

            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-start gap-4 sm:gap-7">
              {destination.seasons.map((season, i) => (
                <div key={season.seasonName} className={i === 1 ? "col-start-3" : ""}>
                  <StampCard
                    zoomId={`${destination.id}:${i}`}
                    name={season.seasonName}
                    dates={[season.date]}
                    color={season.color}
                    image={season.thumbnail}
                    index={i + 2}
                    tilt={i === 0 ? -2 : 2}
                    label={`Open ${season.seasonName} photos from ${destination.name}, ${season.date}`}
                    onOpen={(el) => onPick(i, el)}
                    onPrefetch={() => onPrefetch(season.images[0])}
                  />
                  <p className="mt-3 text-center font-round text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
                    {season.images.length} photos
                  </p>
                </div>
              ))}
              <div className="col-start-2 row-start-1 h-full w-0 border-l-2 border-dashed border-ink/25" aria-hidden="true" />
            </div>
          </div>
        </div>
        <CloseButton onClick={onClose} label={`Close ${destination.name}`} />
      </div>
    </ModalShell>
  );
}
