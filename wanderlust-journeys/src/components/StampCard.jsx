import { STICKERS } from "./Doodles";

export function DateBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-block rounded-[4px] bg-white/70 px-1.5 py-0.5 font-round text-[8px] font-bold uppercase leading-none tracking-[0.12em] text-ink shadow-[0_1px_0_rgba(0,0,0,0.08)] sm:text-[11px] ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * A destination drawn as a vintage postage stamp.
 * `zoomId` marks the element the open/close zoom transition morphs from and back to.
 */
export default function StampCard({ zoomId, name, dates, color, image, index = 0, tilt = 0, onOpen, onPrefetch, label }) {
  const Sticker = STICKERS[index % STICKERS.length];

  return (
    <button
      type="button"
      data-zoom-id={zoomId}
      onClick={(e) => onOpen(e.currentTarget)}
      onPointerEnter={onPrefetch}
      onFocus={onPrefetch}
      aria-label={label ?? `Open photos from ${name}, ${dates.join(" and ")}`}
      className="stamp-tilt paper-shadow group relative block w-full cursor-pointer text-left"
      style={{ "--tilt": `${tilt}deg`, "--stamp": color }}
    >
      <div className="stamp-edge stamp-paper">
        <div className="px-[5px] pt-[5px] pb-1.5">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2px] bg-parchment ring-1 ring-ink/25">
            <img
              data-zoom-photo
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            {/* Date labels sit on the photo corner so the name gets the full strip below. */}
            <span className="absolute bottom-1 right-1 flex flex-col items-end gap-0.5">
              {dates.map((d) => (
                <DateBadge key={d} className="bg-white/90">
                  {d}
                </DateBadge>
              ))}
            </span>
          </div>
          <div className="px-1 pt-1">
            <span
              className={`block truncate whitespace-nowrap pr-1.5 font-script font-bold leading-[1.1] text-ink ${
                name.length > 11 ? "text-[clamp(1rem,min(1.6vw,2.4vh),1.55rem)]" : "text-[clamp(1.1rem,min(1.8vw,2.7vh),1.75rem)]"
              }`}
            >
              {name}
            </span>
          </div>
        </div>
      </div>
      <Sticker
        className="absolute -right-2 -top-2 w-7 rotate-12 drop-shadow-[0_0_1.5px_#fff] transition-transform duration-300 group-hover:rotate-[24deg] sm:w-8"
      />
    </button>
  );
}
