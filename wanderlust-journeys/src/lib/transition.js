import { flushSync } from "react-dom";

const FRAME = "stamp-zoom";
const PHOTO = "photo-zoom";
const DURATION = 480;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setNames(el, withPhoto, on) {
  if (!el) return;
  el.style.viewTransitionName = on ? FRAME : "";
  if (withPhoto) {
    const photo = el.querySelector("[data-zoom-photo]");
    if (photo) photo.style.viewTransitionName = on ? PHOTO : "";
  }
}

/**
 * Morph one element into another across a React state change.
 *
 * `from` is the element on screen now (a stamp card, or an open modal frame).
 * `update` commits the state change. `getTo` returns the element that should
 * receive the morph once the update has rendered.
 * With `photo: true`, the [data-zoom-photo] child of both sides morphs too.
 * `onDone(toEl)` runs once the change is on screen and the animation has finished.
 */
export function zoomTransition({ from, update, getTo, photo = false, onDone }) {
  const commit = () => flushSync(update);

  if (prefersReducedMotion() || !from || typeof document.startViewTransition !== "function") {
    if (from && !prefersReducedMotion()) {
      flipFallback(from, commit, getTo, onDone);
    } else {
      commit();
      onDone?.(getTo());
    }
    return;
  }

  setNames(from, photo, true);
  const transition = document.startViewTransition(() => {
    setNames(from, photo, false);
    commit();
    setNames(getTo(), photo, true);
  });
  transition.finished.finally(() => {
    const to = getTo();
    setNames(to, photo, false);
    onDone?.(to);
  });
}

/** FLIP with the Web Animations API, for browsers without view transitions. */
function flipFallback(from, commit, getTo, onDone) {
  const first = from.getBoundingClientRect();
  commit();
  const to = getTo();
  const last = to?.getBoundingClientRect();
  if (!last?.width || !last?.height) {
    onDone?.(to);
    return;
  }

  const dx = first.left + first.width / 2 - (last.left + last.width / 2);
  const dy = first.top + first.height / 2 - (last.top + last.height / 2);
  const sx = first.width / last.width;
  const sy = first.height / last.height;

  const anim = to.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0.6 },
      { transform: "none", opacity: 1 },
    ],
    { duration: DURATION, easing: EASE }
  );
  anim.finished.finally(() => onDone?.(to));
}
