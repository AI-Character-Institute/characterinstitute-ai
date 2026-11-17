import type { CSSProperties } from "react";
import Link from "next/link";
import { CASE_ORDER, value } from "@/lib/values";
import { EmptyTile, Glyph } from "./glyph";

// Where each tile starts before it settles into the case. Fixed, so the page
// renders the same on every build.
function scatter(i: number) {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12543.1273;
  const fx = a - Math.floor(a);
  const fy = b - Math.floor(b);
  return { "--dx": `${Math.round((fx - 0.5) * 140)}px`, "--dy": `${Math.round((fy - 0.5) * 120)}px`, "--rot": `${Math.round((fx - 0.5) * 28)}deg`, "--i": i };
}

/** The case: every value in the library as one tile. Three compartments are still empty. */
export function Case() {
  return (
    <ul className="case" aria-label="Values in the library">
      {CASE_ORDER.map((id, i) => {
        const v = value(id);
        return (
          <li key={id} style={scatter(i) as CSSProperties}>
            <Link className="tile" href={`/values/#${id}`}>
              <Glyph id={id} way={v.way} />
              <span className="tile-label">{v.label}</span>
            </Link>
          </li>
        );
      })}
      {[0, 1, 2].map((n) => (
        <li key={n} className="case-empty" aria-hidden="true" style={scatter(CASE_ORDER.length + n) as CSSProperties}>
          <EmptyTile />
        </li>
      ))}
    </ul>
  );
}
