"use client";

import { useMemo, useState } from "react";
import { EQUAL_SHARE, PANELS, labLabel, panelDomain, type Panel } from "@/lib/results";
import type { ValueInfo } from "./leaderboard";
import { Picker } from "./picker";
import { round, ticks } from "./util";

const SLOTS = [
  { color: "var(--series-1)", dash: undefined },
  { color: "var(--series-2)", dash: "7 5" },
  { color: "var(--series-3)", dash: "2 5" },
  { color: "var(--series-4)", dash: "10 4 2 4" },
];
const MAX = SLOTS.length;

/** Three models from different labs to start from, so the first view already shows a contrast. */
function defaults(panel: Panel) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of panel.models) {
    if (seen.has(m.lab)) continue;
    seen.add(m.lab);
    out.push(m.name);
    if (out.length === 3) break;
  }
  return out;
}

/** Splits a label over two lines at the space nearest its middle. */
function lines(label: string) {
  const words = label.split(" ");
  if (words.length < 2 || label.length < 12) return [label];
  let best = 1;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length;
    if (Math.abs(a - label.length / 2) < Math.abs(words.slice(0, best).join(" ").length - label.length / 2)) best = i;
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/**
 * Up to four models from one panel, drawn as profiles across that panel's constitutions.
 * A model keeps its color and line style for as long as it stays selected.
 */
export function Compare({ values }: { values: ValueInfo }) {
  const [panelId, setPanelId] = useState(PANELS[0].id);
  const panel = PANELS.find((p) => p.id === panelId) ?? PANELS[0];
  // Slots are positions, so removing one model never recolors the others.
  const [slots, setSlots] = useState<(string | null)[]>(() => [...defaults(PANELS[0]), null].slice(0, MAX));
  const picked = slots.filter(Boolean) as string[];
  const [lo, hi] = useMemo(() => panelDomain(panel), [panel]);
  const valueIds = panel.boards.map((b) => b.value);
  const n = valueIds.length;

  const choosePanel = (id: string) => {
    const p = PANELS.find((q) => q.id === id)!;
    setPanelId(id);
    setSlots([...defaults(p), null].slice(0, MAX));
  };
  const toggle = (name: string) =>
    setSlots((s) => {
      const at = s.indexOf(name);
      if (at >= 0) return s.map((v, i) => (i === at ? null : v));
      const free = s.indexOf(null);
      return free < 0 ? s : s.map((v, i) => (i === free ? name : v));
    });

  const score = (model: string, valueId: string) => panel.boards.find((b) => b.value === valueId)?.rows.find((r) => r.model === model);

  const size = 600;
  const cx = size / 2;
  const cy = size / 2;
  const R = 200;
  const inner = 24;
  const rad = (v: number) => inner + ((Math.min(Math.max(v, lo), hi) - lo) / (hi - lo)) * (R - inner);
  const angle = (i: number) => (-90 + (360 / n) * i) * (Math.PI / 180);
  const pt = (i: number, r: number) => [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))] as const;
  const ring = (v: number) => valueIds.map((_, i) => pt(i, rad(v)).map((c) => c.toFixed(1)).join(",")).join(" ");
  const step = hi - lo > 800 ? 200 : 100;

  return (
    <div className="cmp">
      <div className="pickers narrow-only">
        <Picker
          label="Panel"
          value={panel.id}
          onChange={choosePanel}
          options={PANELS.map((p) => ({ id: p.id, label: `${p.period}${p.status === "provisional" ? " (provisional)" : ""}` }))}
        />
      </div>
      <div className="lb-controls">
        <fieldset className="seg wide-only">
          <legend>Panel</legend>
          {PANELS.map((p) => (
            <label key={p.id}>
              <input type="radio" name="cmp-panel" checked={p.id === panel.id} onChange={() => choosePanel(p.id)} />
              <span>
                {p.period}
                {p.status === "provisional" ? ", provisional" : ""}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="chips" role="group" aria-label={`Models, up to ${MAX}`}>
          {panel.models.map((mdl) => {
            const at = slots.indexOf(mdl.name);
            const on = at >= 0;
            return (
              <button
                key={mdl.name}
                type="button"
                className="chip chip-model"
                aria-pressed={on}
                disabled={!on && picked.length >= MAX}
                onClick={() => toggle(mdl.name)}
              >
                {on && (
                  <svg width="22" height="10" aria-hidden="true">
                    <line x1="1" x2="21" y1="5" y2="5" stroke={SLOTS[at].color} strokeWidth="2.5" strokeDasharray={SLOTS[at].dash} strokeLinecap="round" />
                  </svg>
                )}
                {mdl.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="cmp-body">
        <svg className="cmp-radar" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Scores of ${picked.join(", ")} on ${n} constitutions in the ${panel.title}. The table beside this chart gives every value.`}>
          {ticks(lo, hi, step).map((t) => (
            <polygon key={t} points={ring(t)} className={t === EQUAL_SHARE ? "cmp-ring is-ref" : "cmp-ring"} />
          ))}
          {valueIds.map((id, i) => {
            const [x2, y2] = pt(i, R);
            const [lx, ly] = pt(i, R + 22);
            const c = Math.cos(angle(i));
            const s = Math.sin(angle(i));
            const parts = lines(values[id]?.label ?? id);
            const anchor = Math.abs(c) < 0.25 ? "middle" : c > 0 ? "start" : "end";
            const lift = s < -0.25 ? -(parts.length - 1) * 16 : s > 0.25 ? 12 : -((parts.length - 1) * 8) + 4;
            return (
              <g key={id}>
                <line x1={cx} y1={cy} x2={x2} y2={y2} className="cmp-spoke" />
                <text x={lx} y={ly + lift} textAnchor={anchor} className="cmp-label">
                  {parts.map((p, k) => (
                    <tspan key={k} x={lx} dy={k ? 16 : 0}>
                      {p}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
          {slots.map((name, at) => {
            if (!name) return null;
            const pts = valueIds.map((id, i) => {
              const r = score(name, id);
              return r ? pt(i, rad(r.score)) : null;
            });
            const d = pts.map((p, i) => (p ? `${i === 0 || !pts[i - 1] ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}` : "")).join("") + (pts.every(Boolean) ? "Z" : "");
            return (
              <g key={name}>
                <path d={d} fill={pts.every(Boolean) ? SLOTS[at].color : "none"} fillOpacity="0.07" stroke={SLOTS[at].color} strokeDasharray={SLOTS[at].dash} className="cmp-shape" />
                {pts.map((p, i) => p && <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={SLOTS[at].color} className="cmp-dot" />)}
              </g>
            );
          })}
          {ticks(lo, hi, step).map((t) => {
            // Ring labels sit between the first two spokes, clear of the vertices.
            const mid = angle(0.5);
            const r = rad(t) * Math.cos(Math.PI / n);
            return (
              <text key={t} x={cx + r * Math.cos(mid)} y={cy + r * Math.sin(mid)} dy="0.35em" textAnchor="middle" className={t === EQUAL_SHARE ? "cmp-tick is-ref" : "cmp-tick"}>
                {t}
              </text>
            );
          })}
        </svg>

        <div className="cmp-table-wrap">
          <table className="cmp-table">
            <caption className="visually-hidden">
              Scores with 95% intervals for the selected models, {panel.title}.
            </caption>
            <thead>
              <tr>
                <th scope="col">Constitution</th>
                {slots.map(
                  (name, at) =>
                    name && (
                      <th key={name} scope="col" className="num">
                        <span className="cmp-head">
                          <svg width="22" height="10" aria-hidden="true">
                            <line x1="1" x2="21" y1="5" y2="5" stroke={SLOTS[at].color} strokeWidth="2.5" strokeDasharray={SLOTS[at].dash} strokeLinecap="round" />
                          </svg>
                          {name}
                        </span>
                        <small>{labLabel(panel.models.find((mm) => mm.name === name)?.lab ?? "")}</small>
                      </th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {valueIds.map((id) => (
                <tr key={id}>
                  <th scope="row">{values[id]?.label ?? id}</th>
                  {slots.map((name) => {
                    if (!name) return null;
                    const r = score(name, id);
                    return (
                      <td key={name} className="num">
                        {r ? (
                          <>
                            <b>{round(r.score)}</b>
                            {r.lo != null && r.hi != null && (
                              <small>
                                {round(r.lo)} to {round(r.hi)}
                              </small>
                            )}
                          </>
                        ) : (
                          <small>No score</small>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {picked.length === 0 && <p className="lb-note">Select a model to draw its profile.</p>}
        </div>
      </div>
      <p className="lb-note">
        {panel.title}
        {panel.status === "provisional" ? " (provisional)" : ""}. The dashed ring marks an equal share.{" "}
        <span className="wide-only">Each spoke is read on its own, and the area of a shape carries no meaning.</span>
      </p>
    </div>
  );
}
