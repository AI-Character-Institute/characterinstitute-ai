import type { CSSProperties } from "react";
import Link from "next/link";
import { EQUAL_SHARE, fmt, type Row } from "@/lib/results";
import { value } from "@/lib/values";

const pct = (v: number, [lo, hi]: [number, number]) => `${(((v - lo) / (hi - lo)) * 100).toFixed(2)}%`;

/** One model across the constitutions of a panel: the same axis as the rankings, turned on its side. */
export function Profile({
  rows,
  domain,
  caption,
}: {
  rows: { value: string; row: Row; rank: number; of: number }[];
  domain: [number, number];
  caption: string;
}) {
  return (
    <table className="ranking is-profile" style={{ "--ref": pct(EQUAL_SHARE, domain) } as CSSProperties}>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Constitution</th>
          <th scope="col" className="ranking-axis">
            <span className="visually-hidden">Score on the panel&rsquo;s axis</span>
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
          <th scope="col" className="num">
            Rank
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ value: id, row, rank, of }) => (
          <tr key={id}>
            <th scope="row">
              <Link href={`/results/#${id}`} className="profile-value">
                {value(id).label}
              </Link>
            </th>
            <td className="ranking-plot" aria-hidden="true">
              {row.lo !== null && row.hi !== null && (
                <span className="ranking-ci" style={{ left: pct(row.lo, domain), width: pct(domain[0] + (row.hi - row.lo), domain) }} />
              )}
              <span className="ranking-dot" style={{ left: pct(row.score, domain) }} />
            </td>
            <td className="num">{fmt(row.score)}</td>
            <td className="num ranking-interval">{row.lo !== null && row.hi !== null ? `${fmt(row.lo)} to ${fmt(row.hi)}` : "Not reported"}</td>
            <td className="num">
              {rank} of {of}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
