import type { CSSProperties } from "react";
import { EQUAL_SHARE, fmt, type Board } from "@/lib/results";

const pct = (v: number, [lo, hi]: [number, number]) => `${(((v - lo) / (hi - lo)) * 100).toFixed(2)}%`;

/**
 * One board: the models of a panel ranked on one constitution. Each row shows
 * the score as a dot and its 95% interval as a bar, on an axis shared by the panel.
 */
export function Ranking({
  board,
  domain,
  caption,
  highlight,
}: {
  board: Board;
  domain: [number, number];
  caption: string;
  /** Model names to pick out, for lab reports. */
  highlight?: string[];
}) {
  return (
    <table className="ranking" style={{ "--ref": pct(EQUAL_SHARE, domain) } as CSSProperties}>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Model</th>
          <th scope="col" className="ranking-axis">
            <span className="visually-hidden">Score on a shared axis</span>
            <span aria-hidden="true" className="ranking-tick" style={{ left: 0 }}>
              {domain[0]}
            </span>
            <span aria-hidden="true" className="ranking-tick is-ref" style={{ left: pct(EQUAL_SHARE, domain) }}>
              {EQUAL_SHARE}
            </span>
            <span aria-hidden="true" className="ranking-tick is-end" style={{ left: "100%" }}>
              {domain[1]}
            </span>
          </th>
          <th scope="col" className="num">
            Score
          </th>
          <th scope="col" className="num ranking-interval">
            95% interval
          </th>
        </tr>
      </thead>
      <tbody>
        {board.rows.map((row) => (
          <tr key={row.model} className={highlight?.includes(row.model) ? "is-picked" : undefined}>
            <th scope="row">{row.model}</th>
            <td className="ranking-plot" aria-hidden="true">
              {row.lo !== null && row.hi !== null && (
                <span className="ranking-ci" style={{ left: pct(row.lo, domain), width: pct(domain[0] + (row.hi - row.lo), domain) }} />
              )}
              <span className="ranking-dot" style={{ left: pct(row.score, domain) }} />
            </td>
            <td className="num">{fmt(row.score)}</td>
            <td className="num ranking-interval">
              {row.lo !== null && row.hi !== null ? `${fmt(row.lo)} to ${fmt(row.hi)}` : "Not reported"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
