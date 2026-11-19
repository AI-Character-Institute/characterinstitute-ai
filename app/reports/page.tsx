import type { Metadata } from "next";
import Link from "next/link";
import { EQUAL_SHARE, HISTORY, LABS, type LabReport } from "@/lib/results";

export const metadata: Metadata = {
  title: "Lab reports",
  description: "One report for each developer: the models evaluated, how each scored in its panel, and how the lab's releases have changed.",
};

/** The lab's releases as dots against the dashed line of an equal share. */
function Spark({ report }: { report: LabReport }) {
  if (report.history.length < 2) return <span className="spark-none">One release</span>;
  const w = 168;
  const h = 44;
  const t0 = Date.parse(HISTORY.rows[0].released!);
  const t1 = Date.parse(HISTORY.rows[HISTORY.rows.length - 1].released!);
  const x = (iso: string) => 6 + ((Date.parse(iso) - t0) / (t1 - t0)) * (w - 12);
  const y = (v: number) => 6 + (1 - (v - 1400) / 280) * (h - 12);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="spark" role="img" aria-label={`Kindness score across ${report.history.length} releases`}>
      <line x1="0" x2={w} y1={y(EQUAL_SHARE)} y2={y(EQUAL_SHARE)} className="chart-ref" />
      <polyline points={report.history.map((r) => `${x(r.released!).toFixed(1)},${y(r.score).toFixed(1)}`).join(" ")} fill="none" className="spark-line" />
      {report.history.map((r) => (
        <circle key={r.name} cx={x(r.released!)} cy={y(r.score)} r="3.2" className="spark-dot" />
      ))}
    </svg>
  );
}

export default function Reports() {
  return (
    <main>
      <header className="page-head wrap">
        <h1>Lab reports</h1>
        <p className="lead">
          We keep one report for each developer, covering the models we have evaluated so far and the way its releases
          have changed over time.
        </p>
      </header>
      <section className="wrap band is-first is-last">
        <div className="lab-head" aria-hidden="true">
          <span>Lab</span>
          <span>Models</span>
          <span>In the frontier panels</span>
          <span>Kindness by release</span>
        </div>
        <ul className="lab-list">
          {LABS.map((report) => {
            const inPanels = [...new Set(report.panels.map((p) => p.model.name))];
            return (
              <li key={report.slug}>
                <Link href={`/reports/${report.slug}/`} className="lab-row">
                  <span className="lab-name">{report.label}</span>
                  <span className="lab-count">{report.modelCount}</span>
                  <span className="lab-meta">{inPanels.join(", ")}</span>
                  <Spark report={report} />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
