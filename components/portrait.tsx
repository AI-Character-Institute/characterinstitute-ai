import outlines from "@/data/portraits.json";
import type { Person } from "@/lib/content";

const OUTLINES = outlines as Record<string, string>;

/**
 * A founder's portrait: the photograph in ink on a stone ground, with a
 * keyline of the silhouette sitting slightly out of register.
 */
export function Portrait({ person }: { person: Person }) {
  return (
    <span className="portrait">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/team/${person.slug}.webp`} alt={`Portrait of ${person.name}`} width={480} height={480} loading="lazy" decoding="async" />
      <svg className="portrait-key" viewBox="0 0 480 480" aria-hidden="true" focusable="false">
        <path d={OUTLINES[person.slug]} fill="none" stroke="var(--accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
