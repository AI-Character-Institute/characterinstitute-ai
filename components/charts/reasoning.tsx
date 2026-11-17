import type { CSSProperties } from "react";
import { EQUAL_SHARE, REASONING, fmt } from "@/lib/results";

const DOMAIN: [number, number] = [1200, 1700];
const pct = (v: number) => `${(((v - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * 100).toFixed(2)}%`;

/** The same model answering with and without extended reasoning, on one constitution. */
export function ReasoningPairs({ valueId, caption }: { valueId: string; caption: string }) {
  const board = REASONING.boards.find((b) => b.value === valueId);
  if (!board) return null;
  const models = [...new Set(board.rows.map((r) => r.model))];
  return (
    <table className="ranking is-pairs" style={{ "--ref": pct(EQUAL_SHARE) } as CSSProperties}>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Model</th>
          <th scope="col" className="ranking-axis">
            <span className="visually-hidden">Score on a shared axis</span>
            <span aria-hidden="true" className="ranking-tick" style={{ left: 0 }}>
              {DOMAIN[0]}
            </span>
            <span aria-hidden="true" className="ranking-tick is-ref" style={{ left: pct(EQUAL_SHARE) }}>
              {EQUAL_SHARE}
            </span>
            <span aria-hidden="true" className="ranking-tick is-end" style={{ left: "100%" }}>
              {DOMAIN[1]}
            </span>
          </th>
          <th scope="col" className="num">
            Instant
          </th>
          <th scope="col" className="num">
            Reasoning
          </th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => {
          const a = board.rows.find((r) => r.model === model && r.mode === "instant");
          const b = board.rows.find((r) => r.model === model && r.mode === "reasoning");
          if (!a || !b) return null;
          const lo = Math.min(a.score, b.score);
          const hi = Math.max(a.score, b.score);
          return (
            <tr key={model}>
              <th scope="row">{model}</th>
              <td className="ranking-plot" aria-hidden="true">
                <span className="ranking-link" style={{ left: pct(lo), width: pct(DOMAIN[0] + hi - lo) }} />
                <span className="ranking-dot is-open" style={{ left: pct(a.score) }} />
                <span className="ranking-dot" style={{ left: pct(b.score) }} />
              </td>
              <td className="num">{fmt(a.score)}</td>
              <td className="num">{fmt(b.score)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
