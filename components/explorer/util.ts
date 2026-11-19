"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** The rendered width of an element, so a chart can draw at real pixels and keep its type legible. */
export function useWidth<T extends HTMLElement>(initial: number) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The observer reports once on observe, then on every resize.
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(280, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

/** Round tick values that cover a domain. */
export function ticks(lo: number, hi: number, step: number) {
  const out: number[] = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi + 1e-9; t += step) out.push(t);
  return out;
}

export const round = (n: number) => Math.round(n).toLocaleString("en-US", { useGrouping: false });

const listeners = new Set<() => void>();

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener("popstate", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("popstate", notify);
  };
}

/** Read and write one query parameter without a navigation, so a view can be linked to. */
export function useQueryParam(key: string, fallback: string, allowed: string[]) {
  const raw = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(key),
    () => null,
  );
  const value = raw && allowed.includes(raw) ? raw : fallback;
  const set = (next: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, next);
    window.history.replaceState(null, "", url);
    listeners.forEach((notify) => notify());
  };
  return [value, set] as const;
}
