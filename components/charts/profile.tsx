import Link from "next/link";
import { EQUAL_SHARE, fmt, type Row } from "@/lib/results";
import { value } from "@/lib/values";

/** One model across the constitutions of a panel, on the same axis and in the same form as the leaderboard. */
export function Profile({
  rows,
  domain,
  caption,
  panelId,
}: {
  rows: { value: string; row: Row; rank: number; of: number }[];
  domain: [number, number];
  caption: string;
  panelId: string;
}) {
  const [lo, hi] = domain;
  const pct = (n: number) => `${(((n - lo) / (hi - lo)) * 100).toFixed(2)}%`;
  const step = hi - lo > 800 ? 200 : 100;
  const marks: number[] = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) marks.push(t);
  return (
    <table className="lb-table is-profile">
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Constitution</th>
          <th scope="col" className="num">
            Score
          </th>
          <th scope="col" className="num lb-int">
            95% interval
          </th>
          <th scope="col" className="num">
            Rank
          </th>
          <th scope="col" className="lb-plot" aria-hidden="true">
            <div className="lb-axis">
              {marks.map((t) => (
                <span key={t} style={{ left: pct(t) }} data-ref={t === EQUAL_SHARE || undefined}>
                  {t}
                </span>
              ))}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ value: id, row, rank, of }) => (
          <tr key={id}>
            <th scope="row">
              <Link className="lb-model" href={`/results/?panel=${panelId}&value=${id}#leaderboard`}>
                {value(id).label}
              </Link>
            </th>
            <td className="num lb-score">{fmt(row.score)}</td>
            <td className="num lb-int">{row.lo !== null && row.hi !== null ? `${fmt(row.lo)} to ${fmt(row.hi)}` : "Not reported"}</td>
            <td className="num lb-of">
              <span className="narrow-only">Rank </span>
              {rank} of {of}
            </td>
            <td className="lb-plot" aria-hidden="true">
              <div className="lb-track">
                <i className="lb-ref" style={{ left: pct(EQUAL_SHARE) }} />
                {row.lo !== null && row.hi !== null && <i className="lb-ci" style={{ left: pct(row.lo), width: `${(((row.hi - row.lo) / (hi - lo)) * 100).toFixed(2)}%` }} />}
                <i className="lb-dot" style={{ left: pct(row.score) }} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
