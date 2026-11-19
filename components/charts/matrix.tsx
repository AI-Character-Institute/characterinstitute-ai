import Link from "next/link";
import { EQUAL_SHARE, fmt, labLabel, type Panel } from "@/lib/results";
import { value } from "@/lib/values";

/** Seven steps either side of an equal share. Step 0 is the neutral middle. */
export function step(score: number) {
  const d = score - EQUAL_SHARE;
  const size = Math.abs(d) < 25 ? 0 : Math.abs(d) < 75 ? 1 : Math.abs(d) < 150 ? 2 : 3;
  return d < 0 ? -size : size;
}

export const STEP_LABELS: [number, string][] = [
  [-3, "150 or more below"],
  [-2, "75 to 150 below"],
  [-1, "25 to 75 below"],
  [0, "Within 25 of an equal share"],
  [1, "25 to 75 above"],
  [2, "75 to 150 above"],
  [3, "150 or more above"],
];

/** A panel at a glance: every model against every constitution it was scored on. */
export function Matrix({ panel, highlight }: { panel: Panel; highlight?: string[] }) {
  const values = panel.boards.map((b) => b.value);
  const models = [...panel.models].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="matrix-scroll">
      <table className="matrix">
        <caption className="visually-hidden">
          {panel.title}: EigenBench score of each model on each constitution.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="matrix-corner">
              Model
            </th>
            {values.map((id) => (
              <th scope="col" key={id}>
                <Link href={`/results/?panel=${panel.id}&value=${id}#leaderboard`} className="matrix-head">
                  <span>{value(id).label}</span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.name} className={highlight?.includes(model.name) ? "is-picked" : undefined}>
              <th scope="row">
                {model.name}
                <span className="matrix-lab">{labLabel(model.lab)}</span>
              </th>
              {panel.boards.map((board) => {
                const row = board.rows.find((r) => r.model === model.name);
                if (!row) return <td key={board.value} className="matrix-cell is-missing">No score</td>;
                return (
                  <td
                    key={board.value}
                    className="matrix-cell"
                    data-step={step(row.score)}
                    data-tip={`${model.name} on ${value(board.value).label}: ${fmt(row.score)}${row.lo !== null && row.hi !== null ? `, 95% interval ${fmt(row.lo)} to ${fmt(row.hi)}` : ""}`}
                  >
                    {fmt(row.score)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The color scale as one strip, labeled at the boundaries between steps. */
export function MatrixLegend() {
  const bounds = ["\u2212150", "\u221275", "\u221225", "+25", "+75", "+150"];
  return (
    <div className="matrix-legend" role="img" aria-label={`Color scale. ${STEP_LABELS.map(([, label]) => label).join(", ")}.`}>
      <span>Points from an equal share</span>
      <span className="matrix-scale" aria-hidden="true">
        {STEP_LABELS.map(([s]) => (
          <i key={s} className="matrix-swatch" data-step={s} />
        ))}
        {bounds.map((b, i) => (
          <b key={b} style={{ left: `${((i + 1) / 7) * 100}%` }}>
            {b}
          </b>
        ))}
      </span>
    </div>
  );
}
