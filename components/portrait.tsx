import type { CSSProperties } from "react";
import outlines from "@/data/portraits.json";
import { COLORWAYS } from "@/lib/glyphs";
import type { Person } from "@/lib/content";

const OUTLINES = outlines as Record<string, string>;

/**
 * A founder's portrait, printed like a tile: a pigment ground, the photograph
 * in ink, and a keyline of the silhouette sitting out of register.
 */
export function Portrait({ person }: { person: Person }) {
  const way = COLORWAYS[person.way];
  return (
    <span className="portrait" style={{ "--ground": way.ground } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/team/${person.slug}.webp`} alt={`Portrait of ${person.name}`} width={480} height={480} loading="lazy" decoding="async" />
      <svg className="portrait-key" viewBox="0 0 480 480" aria-hidden="true" focusable="false">
        <path d={OUTLINES[person.slug]} fill="none" stroke="var(--ink)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
