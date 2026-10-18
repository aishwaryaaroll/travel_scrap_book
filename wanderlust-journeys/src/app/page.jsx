"use client";

import { useEffect, useRef, useState } from "react";
import destinations from "@/data/destinations.json";
import HeaderBanner, { FooterBanner } from "@/components/HeaderBanner";
import SideQuotes from "@/components/SideQuotes";
import StampGrid from "@/components/StampGrid";
import SeasonModal from "@/components/SeasonModal";
import SlideshowModal from "@/components/SlideshowModal";
import { DoodleLayer, TravelQuotes } from "@/components/Doodles";
import { zoomTransition } from "@/lib/transition";

const byId = Object.fromEntries(destinations.map((d) => [d.id, d]));

const frame = () => document.querySelector("[data-zoom-frame]");
const card = (zoomId) => document.querySelector(`[data-zoom-id="${zoomId}"]`);

const prefetched = new Set();
function prefetch(src) {
  if (!src || prefetched.has(src)) return;
  prefetched.add(src);
  new Image().src = src;
}

/** Give the first photo a brief head start so the zoom lands on a painted image. */
function ready(src) {
  prefetch(src);
  const img = new Image();
  img.src = src;
  return Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 250))]);
}

export default function Home() {
  // { kind: "grid" } | { kind: "seasons", id } | { kind: "slides", id, season: number | null }
  const [view, setView] = useState({ kind: "grid" });
  const busy = useRef(false);

  useEffect(() => {
    document.documentElement.style.overflow = view.kind === "grid" ? "" : "hidden";
  }, [view.kind]);

  const run = (opts) => {
    if (busy.current) return;
    busy.current = true;
    zoomTransition({
      ...opts,
      onDone: (to) => {
        busy.current = false;
        opts.onDone?.(to);
      },
    });
  };

  const openDestination = async (dest, el) => {
    if (dest.hasSeasons) {
      run({ from: el, update: () => setView({ kind: "seasons", id: dest.id }), getTo: frame });
      return;
    }
    await ready(dest.images[0]);
    run({ from: el, update: () => setView({ kind: "slides", id: dest.id, season: null }), getTo: frame, photo: true });
  };

  const openSeason = async (dest, season, el) => {
    await ready(dest.seasons[season].images[0]);
    run({ from: el, update: () => setView({ kind: "slides", id: dest.id, season }), getTo: frame, photo: true });
  };

  const closeSeasons = () => {
    const zoomId = view.id;
    run({ from: frame(), update: () => setView({ kind: "grid" }), getTo: () => card(zoomId), onDone: (to) => to?.focus() });
  };

  const closeSlides = () => {
    const { id, season } = view;
    const backToSeasons = season !== null;
    const zoomId = backToSeasons ? `${id}:${season}` : id;
    run({
      from: frame(),
      update: () => setView(backToSeasons ? { kind: "seasons", id } : { kind: "grid" }),
      getTo: () => card(zoomId),
      photo: !backToSeasons,
      onDone: (to) => to?.focus(),
    });
  };

  const dest = view.kind === "grid" ? null : byId[view.id];
  const season = view.kind === "slides" && view.season !== null ? dest.seasons[view.season] : null;

  return (
    <main className="relative mx-auto min-h-screen max-w-[1560px] overflow-x-clip px-4 pb-8 sm:px-6 lg:flex lg:h-dvh lg:min-h-0 lg:flex-col lg:overflow-hidden lg:pb-1">
      <DoodleLayer />
      <TravelQuotes />
      <HeaderBanner />

      <div className="relative grid grid-cols-1 gap-x-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(150px,1fr)_minmax(0,940px)_minmax(150px,1fr)] lg:items-center">
        <SideQuotes side="left" />
        <StampGrid
          destinations={destinations}
          onOpen={openDestination}
          onPrefetch={(d) => prefetch(d.hasSeasons ? d.seasons[0].thumbnail : d.images[0])}
        />
        <SideQuotes side="right" />
      </div>

      <FooterBanner />

      {view.kind === "seasons" && (
        <SeasonModal
          destination={dest}
          onPick={(i, el) => openSeason(dest, i, el)}
          onPrefetch={prefetch}
          onClose={closeSeasons}
        />
      )}

      {view.kind === "slides" && (
        <SlideshowModal
          key={`${view.id}-${view.season}`}
          title={dest.name}
          subtitle={season?.seasonName}
          date={season ? season.date : dest.date}
          color={season ? season.color : dest.color}
          images={season ? season.images : dest.images}
          onClose={closeSlides}
        />
      )}
    </main>
  );
}
