"use client";

import Link from "next/link";
import { EQUAL_SHARE, PANELS, labLabel, labSlug, panelDomain } from "@/lib/results";
import { round, ticks, useQueryParam } from "./util";

export type ValueInfo = Record<string, { label: string; summary: string }>;

/**
 * One ranking at a time: pick a panel, pick a constitution, and read every model's
 * score with its interval on an axis that stays fixed across the panel.
 */
export function Leaderboard({ values }: { values: ValueInfo }) {
  const panelIds = PANELS.map((p) => p.id);
  const [panelId, setPanelId] = useQueryParam("panel", panelIds[0], panelIds);
  const panel = PANELS.find((p) => p.id === panelId) ?? PANELS[0];
  const valueIds = panel.boards.map((b) => b.value);
  const [picked, setValueId] = useQueryParam("value", valueIds.includes("kindness") ? "kindness" : valueIds[0], [
    ...new Set(PANELS.flatMap((p) => p.boards.map((b) => b.value))),
  ]);
  const valueId = valueIds.includes(picked) ? picked : valueIds[0];
  const board = panel.boards.find((b) => b.value === valueId)!;
  const [lo, hi] = panelDomain(panel);
  const pct = (n: number) => `${(((n - lo) / (hi - lo)) * 100).toFixed(2)}%`;
  const rows = [...board.rows].sort((a, b) => b.score - a.score);
  const step = hi - lo > 800 ? 200 : 100;
  const info = values[valueId];
  const labOf = (model: string) => panel.models.find((m) => m.name === model)?.lab ?? "";

  return (
    <div className="lb">
      <div className="lb-controls">
        <fieldset className="seg">
          <legend>Panel</legend>
          {PANELS.map((p) => (
            <label key={p.id}>
              <input type="radio" name="lb-panel" checked={p.id === panel.id} onChange={() => setPanelId(p.id)} />
              <span>
                {p.period}
                {p.status === "provisional" ? ", provisional" : ""}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="chips" role="group" aria-label="Constitution">
          {valueIds.map((id) => (
            <button key={id} type="button" className="chip" aria-pressed={id === valueId} onClick={() => setValueId(id)}>
              {values[id]?.label ?? id}
            </button>
          ))}
        </div>
      </div>

      <div className="lb-about">
        <h3>{info?.label}</h3>
        <p>
          {info?.summary} <Link href={`/values/#${valueId}`}>Read the constitution</Link>
        </p>
      </div>

      <table className="lb-table">
        <caption className="visually-hidden">
          {info?.label}, {panel.title}: models ranked by score, with 95% intervals.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="lb-rank">
              Rank
            </th>
            <th scope="col">Model</th>
            <th scope="col" className="num">
              Score
            </th>
            <th scope="col" className="num lb-int">
              95% interval
            </th>
            <th scope="col" className="lb-plot" aria-hidden="true">
              <div className="lb-axis">
                {ticks(lo, hi, step).map((t) => (
                  <span key={t} style={{ left: pct(t) }} data-ref={t === EQUAL_SHARE || undefined}>
                    {t}
                  </span>
                ))}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const lab = labOf(r.model);
            return (
              <tr key={r.model}>
                <td className="lb-rank">{i + 1}</td>
                <th scope="row">
                  <span className="lb-model">{r.model}</span>
                  <Link className="lb-lab" href={`/reports/${labSlug(lab)}/`}>
                    {labLabel(lab)}
                  </Link>
                </th>
                <td className="num lb-score">{round(r.score)}</td>
                <td className="num lb-int">{r.lo != null && r.hi != null ? `${round(r.lo)} to ${round(r.hi)}` : "Not reported"}</td>
                <td className="lb-plot" aria-hidden="true">
                  <div className="lb-track">
                    <i className="lb-ref" style={{ left: pct(EQUAL_SHARE) }} />
                    {r.lo != null && r.hi != null && <i className="lb-ci" style={{ left: pct(r.lo), width: `${(((r.hi - r.lo) / (hi - lo)) * 100).toFixed(2)}%` }} />}
                    <i className="lb-dot" style={{ left: pct(r.score) }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="lb-note">
        {panel.title}
        {panel.status === "provisional" ? " (provisional)" : ""}, {panel.scenarios}. Bars show 95% intervals, and the dashed line marks an equal
        share of the judges&rsquo; trust.
      </p>
    </div>
  );
}
