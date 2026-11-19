"use client";

import { useMemo, useState } from "react";
import { EQUAL_SHARE, HISTORY, formatDate, labLabel, type HistoryRow } from "@/lib/results";
import { Picker } from "./picker";
import { round, ticks, useWidth } from "./util";

type Lens = "labs" | "weights" | "country";
type Group = { id: string; label: string; rows: HistoryRow[]; path: "join" | "frontier" };

const LENSES: { id: Lens; label: string; note: string }[] = [
  { id: "labs", label: "Three labs", note: "Lines join each lab’s releases in date order." },
  { id: "weights", label: "Open and closed weights", note: "Lines follow the highest score reached so far in each group." },
  { id: "country", label: "United States and China", note: "Lines follow the highest score reached so far in each country." },
];

const SERIES = [
  { color: "var(--series-1)", dash: undefined },
  { color: "var(--series-2)", dash: "7 5" },
  { color: "var(--series-3)", dash: "2 5" },
];

const DAY = 864e5;
const time = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

function groupsFor(lens: Lens): Group[] {
  const rows = HISTORY.rows.filter((r) => r.released);
  if (lens === "labs") return ["OpenAI", "Anthropic", "Google"].map((lab) => ({ id: lab, label: labLabel(lab), rows: rows.filter((r) => r.lab === lab), path: "join" }));
  if (lens === "weights")
    return [
      { id: "closed", label: "Closed weights", rows: rows.filter((r) => r.open === false), path: "frontier" },
      { id: "open", label: "Open weights", rows: rows.filter((r) => r.open === true), path: "frontier" },
    ];
  return [
    { id: "US", label: "United States", rows: rows.filter((r) => r.country === "US"), path: "frontier" },
    { id: "CN", label: "China", rows: rows.filter((r) => r.country === "CN"), path: "frontier" },
  ];
}

/** Kindness score by release date for every model in the history run, with a choice of what to follow. */
export function Trend({ compact = false }: { compact?: boolean }) {
  const [lens, setLens] = useState<Lens>("labs");
  const [active, setActive] = useState<string | null>(null);
  const [ref, width] = useWidth<HTMLDivElement>(1040);
  const narrow = width < 640;
  const height = narrow ? 300 : compact ? 420 : 480;
  const m = { top: 20, right: narrow ? 16 : 132, bottom: 40, left: 52 };

  const all = useMemo(() => HISTORY.rows.filter((r) => r.released).sort((a, b) => a.released!.localeCompare(b.released!)), []);
  const groups = useMemo(() => groupsFor(lens), [lens]);

  const t0 = Date.UTC(2023, 9, 1);
  const t1 = Date.UTC(2026, 0, 1);
  const y0 = Math.floor((Math.min(...all.map((r) => r.score)) - 20) / 50) * 50;
  const y1 = Math.ceil((Math.max(...all.map((r) => r.score)) + 20) / 50) * 50;
  const x = (t: number) => m.left + ((t - t0) / (t1 - t0)) * (width - m.left - m.right);
  const y = (v: number) => m.top + (1 - (v - y0) / (y1 - y0)) * (height - m.top - m.bottom);
  const right = width - m.right;
  const base = height - m.bottom;
  const lastT = time(all[all.length - 1].released!);

  const lines = groups.map((g, i) => {
    const sorted = [...g.rows].sort((a, b) => a.released!.localeCompare(b.released!) || a.score - b.score);
    let d = "";
    let endY = 0;
    let endX = 0;
    if (g.path === "join") {
      d = sorted.map((r, k) => `${k ? "L" : "M"}${x(time(r.released!)).toFixed(1)},${y(r.score).toFixed(1)}`).join("");
      const last = sorted[sorted.length - 1];
      endX = x(time(last.released!));
      endY = y(last.score);
    } else {
      let best = -Infinity;
      for (const r of sorted) {
        if (r.score <= best) continue;
        const px = x(time(r.released!)).toFixed(1);
        d += best === -Infinity ? `M${px},${y(r.score).toFixed(1)}` : `H${px}V${y(r.score).toFixed(1)}`;
        best = r.score;
      }
      endX = x(lastT + 20 * DAY);
      d += `H${endX.toFixed(1)}`;
      endY = y(best);
    }
    return { ...g, ...SERIES[i], d, endX, endY, names: new Set(g.rows.map((r) => r.name)) };
  });

  // End labels sit in the right margin, nudged apart so they never collide.
  const labels = lines.map((l) => ({ id: l.id, label: l.label, y: l.endY })).sort((a, b) => a.y - b.y);
  for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i - 1].y < 20) labels[i].y = labels[i - 1].y + 20;

  const colorOf = (r: HistoryRow) => lines.find((l) => l.names.has(r.name))?.color;
  const tip = all.find((r) => r.name === active);
  const years = [2024, 2025, 2026];

  return (
    <div className="trend">
      <div className="trend-bar">
        <fieldset className="seg wide-only">
          <legend>Follow</legend>
          {LENSES.map((l) => (
            <label key={l.id}>
              <input type="radio" name={compact ? "trend-lens-home" : "trend-lens"} checked={l.id === lens} onChange={() => setLens(l.id)} />
              <span>{l.label}</span>
            </label>
          ))}
        </fieldset>
        <div className="narrow-only">
          <Picker label="Follow" value={lens} onChange={(id) => setLens(id as Lens)} options={LENSES.map((l) => ({ id: l.id, label: l.label }))} />
        </div>
        <ul className="trend-key">
          {lines.map((l) => (
            <li key={l.id}>
              <svg width="28" height="10" aria-hidden="true">
                <line x1="1" x2="27" y1="5" y2="5" stroke={l.color} strokeWidth="2.5" strokeDasharray={l.dash} strokeLinecap="round" />
              </svg>
              {l.label}
            </li>
          ))}
          <li>
            <svg width="10" height="10" aria-hidden="true">
              <circle cx="5" cy="5" r="4" fill="var(--series-rest)" />
            </svg>
            Other models
          </li>
        </ul>
      </div>

      <div className="trend-plot" ref={ref} onPointerLeave={() => setActive(null)}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Kindness score by release date for ${all.length} models. ${LENSES.find((l) => l.id === lens)!.note}`}>
          {ticks(y0, y1, 50).map((t) => (
            <g key={t}>
              {t !== EQUAL_SHARE && <line x1={m.left} x2={right} y1={y(t)} y2={y(t)} className="trend-grid" />}
              {t % 100 === 0 && (
                <text x={m.left - 10} y={y(t)} dy="0.35em" textAnchor="end" className="trend-tick">
                  {t}
                </text>
              )}
            </g>
          ))}
          <line x1={m.left} x2={right} y1={y(EQUAL_SHARE)} y2={y(EQUAL_SHARE)} className="trend-ref" />
          <text x={m.left + 8} y={y(EQUAL_SHARE) - 8} className="trend-ref-label">
            Equal share
          </text>
          <line x1={m.left} x2={right} y1={base} y2={base} className="trend-axis" />
          {years.map((yr) => (
            <g key={yr}>
              <line x1={x(Date.UTC(yr, 0, 1))} x2={x(Date.UTC(yr, 0, 1))} y1={base} y2={base + 6} className="trend-axis" />
              <text x={x(Date.UTC(yr, 0, 1))} y={base + 24} textAnchor={yr === 2026 ? "end" : "middle"} className="trend-tick">
                {yr}
              </text>
            </g>
          ))}

          {all
            .filter((r) => !colorOf(r))
            .map((r) => (
              <circle key={r.name} cx={x(time(r.released!))} cy={y(r.score)} r={active === r.name ? 6.5 : 4.5} className="trend-rest" />
            ))}
          {lines.map((l) => (
            <path key={l.id} d={l.d} fill="none" stroke={l.color} strokeDasharray={l.dash} className="trend-line" />
          ))}
          {all
            .filter((r) => colorOf(r))
            .map((r) => (
              <circle key={r.name} cx={x(time(r.released!))} cy={y(r.score)} r={active === r.name ? 7.5 : 5.5} fill={colorOf(r)} className="trend-dot" />
            ))}
          {!narrow &&
            labels.map((l) => (
              <text key={l.id} x={right + 14} y={l.y} dy="0.35em" className="trend-end">
                {l.label}
              </text>
            ))}

          {/* Generous, invisible targets: every model can be reached by pointer or keyboard. */}
          {all.map((r) => (
            <circle
              key={r.name}
              cx={x(time(r.released!))}
              cy={y(r.score)}
              r="13"
              className="trend-hit"
              tabIndex={0}
              role="img"
              aria-label={`${r.name}, ${labLabel(r.lab)}, released ${formatDate(r.released!, "month")}, score ${round(r.score)}`}
              onPointerEnter={() => setActive(r.name)}
              onFocus={() => setActive(r.name)}
              onBlur={() => setActive(null)}
            />
          ))}
        </svg>
        {tip && (
          <div
            className="trend-tip"
            role="status"
            style={{
              left: Math.min(Math.max(x(time(tip.released!)), 110), width - 110),
              top: y(tip.score),
            }}
          >
            <strong>{tip.name}</strong>
            <span>
              {labLabel(tip.lab)}, {formatDate(tip.released!, "month")}
            </span>
            <span className="trend-tip-score">{round(tip.score)}</span>
          </div>
        )}
      </div>
      <p className="trend-note">
        <span className="wide-only">
          {all.length} models judged in one run on {HISTORY.scenarios}, {HISTORY.period}.{" "}
        </span>
        {LENSES.find((l) => l.id === lens)!.note}
      </p>
    </div>
  );
}
