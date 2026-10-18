"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export function CloseButton({ onClick, label = "Close" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="paper-shadow absolute -right-3 -top-3 z-20 grid size-11 rotate-6 place-items-center rounded-full border-2 border-ink/70 bg-parchment text-ink transition duration-300 hover:rotate-90 hover:scale-110 sm:-right-4 sm:-top-4 sm:size-12"
    >
      <svg viewBox="0 0 24 24" className="w-5" aria-hidden="true">
        <path d="M5 5.5q7 6 14 13M18.5 5q-6 7-13.5 14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}

/**
 * Overlay + dialog wrapper: dims the page, traps focus, closes on Escape or backdrop click.
 * Children render the visible frame (which carries data-zoom-frame for the zoom transition).
 */
export default function ModalShell({ label, onClose, onKeyDown, children }) {
  const dialogRef = useRef(null);
  const handlers = useRef({ onClose, onKeyDown });
  handlers.current = { onClose, onKeyDown };

  useEffect(() => {
    const dialog = dialogRef.current;
    const first = dialog?.querySelector("[data-autofocus]") ?? dialog?.querySelector(FOCUSABLE);
    first?.focus({ preventScroll: true });

    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        handlers.current.onClose();
        return;
      }
      if (e.key === "Tab" && dialog) {
        const items = [...dialog.querySelectorAll(FOCUSABLE)];
        if (!items.length) return;
        const firstItem = items[0];
        const lastItem = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstItem) {
          e.preventDefault();
          lastItem.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          firstItem.focus();
        }
        return;
      }
      handlers.current.onKeyDown?.(e);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div
        className="animate-fade-in absolute inset-0 bg-[#2b2018]/55 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={label} className="relative">
        {children}
      </div>
    </div>
  );
}
