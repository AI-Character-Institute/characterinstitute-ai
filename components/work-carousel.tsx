"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "@/components/external-link";
import type { WorkItem } from "@/lib/content";

const navButton =
  "inline-flex size-10 items-center justify-center border-[1.5px] border-fg text-fg enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-30";

export function WorkCarousel({ items }: { items: WorkItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [nav, setNav] = useState({ atStart: true, atEnd: false, scrollable: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setNav({
        atStart: track.scrollLeft <= 2,
        atEnd: track.scrollLeft >= max - 2,
        scrollable: max > 2,
      });
    };
    // Fires once on observe, then whenever the track is resized.
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: direction * step, top: 0 });
  };

  return (
    <>
      <ul
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="What we've done, scrolls sideways"
        className="flex snap-x snap-mandatory scroll-px-0.5 gap-5 overflow-x-auto overscroll-x-contain px-0.5 pt-0.5 pb-3.5 [scrollbar-color:var(--line)_transparent] [scrollbar-width:thin] motion-safe:scroll-smooth"
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="flex flex-[0_0_min(340px,82%)] snap-start flex-col border border-line bg-bg px-[22px] pt-[22px] pb-5 text-base leading-[1.55]"
          >
            <h3 className="mb-0.5 text-lg leading-[1.35] font-semibold underline decoration-accent decoration-2 underline-offset-4">
              <ExternalLink href={item.href} className="no-underline hover:underline">
                {item.title}
              </ExternalLink>
            </h3>
            <p className="mt-1 text-[15px] text-muted">{item.context}</p>
            <p className="mt-1">{item.summary}</p>
            <p className="mt-auto flex flex-wrap gap-x-[18px] gap-y-1.5 pt-3.5 text-[15px]">
              {item.links.map((link) => (
                <ExternalLink key={link.href} href={link.href}>
                  {link.label}
                </ExternalLink>
              ))}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-[18px] flex justify-center gap-2.5" hidden={!nav.scrollable}>
        <button
          type="button"
          className={navButton}
          aria-label="Previous projects"
          disabled={nav.atStart}
          onClick={() => scrollByCard(-1)}
        >
          <svg viewBox="0 0 8 8" aria-hidden="true" shapeRendering="crispEdges" className="size-4">
            <path d="M5 1h1v1H5zM4 2h1v1H4zM3 3h1v2H3zM4 5h1v1H4zM5 6h1v1H5z" fill="currentColor" />
          </svg>
        </button>
        <button
          type="button"
          className={navButton}
          aria-label="Next projects"
          disabled={nav.atEnd}
          onClick={() => scrollByCard(1)}
        >
          <svg viewBox="0 0 8 8" aria-hidden="true" shapeRendering="crispEdges" className="size-4">
            <path d="M2 1h1v1H2zM3 2h1v1H3zM4 3h1v2H4zM3 5h1v1H3zM2 6h1v1H2z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </>
  );
}
