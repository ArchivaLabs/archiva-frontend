import { useEffect } from "react";

/**
 * Closes a transient overlay (drawer, menu) when the viewport grows to or past
 * `minWidthPx` while it is open — the point where a persistent desktop layout
 * takes over and the overlay would otherwise sit on top of it.
 */
export function useCloseOnBreakpoint(
  open: boolean,
  minWidthPx: number,
  onClose: () => void
) {
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    const handler = (e: MediaQueryListEvent) => e.matches && onClose();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [open, minWidthPx, onClose]);
}
