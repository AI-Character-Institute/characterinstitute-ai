import { EQUAL_SHARE, HISTORY, fmt, formatDate, labLabel, type HistoryRow } from "@/lib/results";

const SERIES = ["var(--series-1)", "var(--series-2)", "var(--series-3)"];
const time = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

/** Labels a point on the outer side of its line, so text never sits on the path. */
function PointLabel({ x, y, prev, next, score, width, name }: { x: number; y: number; prev?: number; next?: number; score: number; width: number; name: string }) {
  const peak = (prev === undefined || prev <= score) && (next === undefined || next <= score);
  const valley = (prev === undefined || prev >= score) && (next === undefined || next >= score);
  const rising = !peak && !valley && prev! < score;
  let anchor: "start" | "middle" | "end" = peak || valley ? "middle" : rising ? "end" : "start";
  const dx = peak || valley ? 0 : rising ? -9 : 9;
  if (x > width - 80) anchor = "end";
  if (x < 110) anchor = "start";
  return (
    <text x={x + dx} y={y + (valley && !peak ? 20 : -11)} textAnchor={anchor} className="chart-label">
      {name}
    </text>
  );
}

function Plot({
  labs,
  width,
  height,
  labelPoints,
}: {
  labs: string[];
  width: number;
  height: number;
  labelPoints: boolean;
}) {
  const compact = width < 600;
  const m = { top: 18, right: labelPoints ? 22 : compact ? 84 : 104, bottom: 34, left: compact ? 44 : 46 };
  const rows = HISTORY.rows;
  const t0 = Date.UTC(2023, 9, 1);
  const t1 = Date.UTC(2026, 0, 1);
  const y0 = 1400;
  const y1 = 1700;
  const x = (iso: string) => m.left + ((time(iso) - t0) / (t1 - t0)) * (width - m.left - m.right);
  const y = (v: number) => m.top + (1 - (v - y0) / (y1 - y0)) * (height - m.top - m.bottom);
  const yTicks = [1400, 1450, 1500, 1550, 1600, 1650, 1700];
  const xTicks = ["2024-01-01", "2024-07-01", "2025-01-01", "2025-07-01", "2026-01-01"];
  const picked = labs.map((lab, i) => ({ lab, color: SERIES[i], rows: rows.filter((r) => r.lab === lab).sort((a, b) => a.released!.localeCompare(b.released!) || a.score - b.score) }));
  const rest = rows.filter((r) => !labs.includes(r.lab));
  const tip = (r: HistoryRow) => `${r.name}, ${labLabel(r.lab)}. Released ${formatDate(r.released!, "month")}. Score ${fmt(r.score)}.`;

  // End labels for each picked series, nudged apart so they never collide.
  const ends = picked
    .map((s) => ({ ...s, last: s.rows[s.rows.length - 1] }))
    .map((s) => ({ ...s, ly: y(s.last.score) }))
    .sort((a, b) => a.ly - b.ly);
  for (let i = 1; i < ends.length; i++) if (ends[i].ly - ends[i - 1].ly < 15) ends[i].ly = ends[i - 1].ly + 15;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={compact ? "timeline is-compact" : "timeline is-wide"} role="img" aria-label={`Kindness score by release date for ${rows.length} models. ${labs.map(labLabel).join(", ")} highlighted.`}>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={m.left} x2={width - m.right} y1={y(t)} y2={y(t)} className={t === EQUAL_SHARE ? "chart-ref" : "chart-grid"} />
          <text x={m.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="chart-tick">
            {t}
          </text>
        </g>
      ))}
      <text x={m.left + 6} y={y(EQUAL_SHARE) - 6} className="chart-ref-label">
        Equal share
      </text>
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={height - 10} textAnchor="middle" className="chart-tick">
          {t.endsWith("01-01") ? t.slice(0, 4) : compact ? "" : "Jul"}
        </text>
      ))}
      {xTicks.map((t) => (
        <line key={t} x1={x(t)} x2={x(t)} y1={height - m.bottom} y2={height - m.bottom + 5} className="chart-axis" />
      ))}
      <line x1={m.left} x2={width - m.right} y1={height - m.bottom} y2={height - m.bottom} className="chart-axis" />
      {rest.map((r) => (
        <circle key={r.name} cx={x(r.released!)} cy={y(r.score)} r={compact ? 3.5 : 4.5} className="chart-dot is-rest" data-tip={tip(r)} tabIndex={0} />
      ))}
      {picked.map((s) => (
        <g key={s.lab}>
          <polyline points={s.rows.map((r) => `${x(r.released!).toFixed(1)},${y(r.score).toFixed(1)}`).join(" ")} fill="none" stroke={s.color} className="chart-line" />
          {s.rows.map((r, i) => (
            <g key={r.name}>
              <circle cx={x(r.released!)} cy={y(r.score)} r={compact ? 4.5 : 5.5} fill={s.color} className="chart-dot" data-tip={tip(r)} tabIndex={0} />
              {labelPoints && <PointLabel x={x(r.released!)} y={y(r.score)} prev={s.rows[i - 1]?.score} next={s.rows[i + 1]?.score} score={r.score} width={width} name={r.name} />}
            </g>
          ))}
        </g>
      ))}
      {!labelPoints &&
        ends.map((s) => (
          <text key={s.lab} x={x(s.last.released!) + 10} y={s.ly} dy="0.32em" className="chart-label">
            {labLabel(s.lab)}
          </text>
        ))}
    </svg>
  );
}

/**
 * Kindness score against release date for every model in the history run.
 * Rendered at two sizes so the type stays legible on a phone.
 */
export function Timeline({ labs, labelPoints = false }: { labs: string[]; labelPoints?: boolean }) {
  return (
    <div className="timeline-wrap">
      {labs.length > 1 && (
        <ul className="chart-legend">
          {labs.map((lab, i) => (
            <li key={lab}>
              <span className="chart-key" style={{ background: SERIES[i] }} aria-hidden="true" />
              {labLabel(lab)}
            </li>
          ))}
          <li>
            <span className="chart-key is-rest" aria-hidden="true" />
            Other labs
          </li>
        </ul>
      )}
      <Plot labs={labs} width={920} height={430} labelPoints={labelPoints} />
      <Plot labs={labs} width={380} height={380} labelPoints={labelPoints} />
    </div>
  );
}
