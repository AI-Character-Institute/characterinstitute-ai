import type { Metadata } from "next";
import Link from "next/link";
import { EQUAL_SHARE, HISTORY, LABS, SNAPSHOT, formatDate, type LabReport } from "@/lib/results";

export const metadata: Metadata = {
  title: "Lab reports",
  description: "One report per developer: the models evaluated, how each scored in its panel, and how the lab's releases have changed.",
};

/** The lab's releases as dots against the rest of the history run. */
function Spark({ report }: { report: LabReport }) {
  if (report.history.length < 2) return <span className="spark-none">One release in the history run</span>;
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
          One page per developer. Each report lists the models we have evaluated, shows how each scored within its
          panel, and follows the lab&rsquo;s releases over time where the data allows.
        </p>
        <p className="note">
          Reports are generated from the same snapshot as the <Link href="/results/">preview results</Link>, dated{" "}
          {formatDate(SNAPSHOT)}. They describe scores and do not grade the lab.
        </p>
      </header>
      <section className="wrap band is-first is-last">
        <ul className="lab-list">
          {LABS.map((report) => (
            <li key={report.slug}>
              <Link href={`/reports/${report.slug}/`} className="lab-row">
                <span className="lab-name">{report.label}</span>
                <span className="lab-meta">
                  {report.modelCount} models evaluated
                  {report.panels.length > 0 && `, ${[...new Set(report.panels.map((p) => p.model.name))].join(" and ")} in the frontier panels`}
                </span>
                <Spark report={report} />
              </Link>
            </li>
          ))}
        </ul>
        <p className="note">
          The small chart shows each lab&rsquo;s kindness scores in release order, against the dashed line of an equal
          share. A lab appears here once two or more of its models have been evaluated.
        </p>
      </section>
    </main>
  );
}
