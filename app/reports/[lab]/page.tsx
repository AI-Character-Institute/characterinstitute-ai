import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Profile } from "@/components/charts/profile";
import { Timeline } from "@/components/charts/timeline";
import { Figure } from "@/components/figure";
import { EQUAL_SHARE, HISTORY, LABS, countWord, fmt, formatDate, panelDomain, signed } from "@/lib/results";
import { inline, value } from "@/lib/values";

type Params = { params: Promise<{ lab: string }> };

export function generateStaticParams() {
  return LABS.map((l) => ({ lab: l.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lab } = await params;
  const report = LABS.find((l) => l.slug === lab);
  return report
    ? { title: `${report.label}: character report`, description: `How ${report.label}'s models scored in the AI Character Institute's preview results.` }
    : {};
}

export default async function LabPage({ params }: Params) {
  const { lab } = await params;
  const report = LABS.find((l) => l.slug === lab);
  if (!report) notFound();

  const ranked = [...HISTORY.rows].sort((a, b) => b.score - a.score);
  const first = report.history[0];
  const last = report.history[report.history.length - 1];
  const inPanels = [...new Set(report.panels.map((p) => p.model.name))];

  return (
    <main>
      <header className="page-head wrap">
        <p className="crumb">
          <Link href="/reports/">Lab reports</Link>
        </p>
        <h1>{report.label}</h1>
        <p className="lead">
          We have evaluated {countWord(report.modelCount)} {report.label} {report.modelCount === 1 ? "model" : "models"} so far
          {inPanels.length > 0 ? `, with ${inPanels.join(" and ")} in the frontier panels` : ""}.
        </p>
      </header>

      {report.panels.length > 0 && (
        <section className="band wrap is-first" aria-labelledby="profile">
          <h2 id="profile">Character profile</h2>
          {report.panels.map(({ panel, model, rows }) => {
            const above = rows.filter((r) => r.row.score > EQUAL_SHARE).length;
            const top = rows.reduce((a, b) => (b.row.score > a.row.score ? b : a));
            const low = rows.reduce((a, b) => (b.row.score < a.row.score ? b : a));
            return (
              <Figure
                key={panel.id}
                title={`${model.name} in the ${panel.title}${panel.status === "provisional" ? " (provisional)" : ""}`}
                caption={
                  <>
                    {model.name} scored above an equal share on {above} of {rows.length} constitutions. Its closest fit
                    was {inline(top.value)} at {fmt(top.row.score)}, and its most distant was {inline(low.value)} at{" "}
                    {fmt(low.row.score)}.
                  </>
                }
              >
                <Profile rows={rows} domain={panelDomain(panel)} panelId={panel.id} caption={`${model.name}: score on each constitution of the ${panel.title}.`} />
              </Figure>
            );
          })}
        </section>
      )}

      {report.history.length > 0 && (
        <section className={`band wrap${report.panels.length === 0 ? " is-first" : ""}`} aria-labelledby="releases">
          <h2 id="releases">Across releases</h2>
          <Figure
            title={`${report.label} releases on the kindness constitution`}
            caption={
              report.history.length > 1 ? (
                <>
                  The earliest, {first.name}, scored {fmt(first.score)}. The most recent, {last.name}, scored{" "}
                  {fmt(last.score)}, a change of {signed(Math.round(last.score) - Math.round(first.score))} points across{" "}
                  {Math.round((Date.parse(last.released!) - Date.parse(first.released!)) / (86400000 * 30.44))} months.
                  Gray dots are the other {HISTORY.rows.length - report.history.length} models in the same run.
                </>
              ) : (
                <>
                  {first.name} scored {fmt(first.score)}. Gray dots are the other {HISTORY.rows.length - 1} models in
                  the same run.
                </>
              )
            }
          >
            <Timeline labs={[report.lab]} labelPoints />
            <table className="data is-fit">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Released</th>
                  <th scope="col" className="wide-only">
                    Weights
                  </th>
                  <th scope="col" className="num">
                    Score
                  </th>
                  <th scope="col" className="num">
                    Rank<span className="wide-only"> of {ranked.length}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.history.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td>
                      <span className="wide-only">{formatDate(r.released!)}</span>
                      <span className="narrow-only">{formatDate(r.released!, "month")}</span>
                    </td>
                    <td className="wide-only">{r.open ? "Open" : "Closed"}</td>
                    <td className="num">{fmt(r.score)}</td>
                    <td className="num">{ranked.findIndex((x) => x.name === r.name) + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Figure>
        </section>
      )}

      {report.reasoning.length > 0 && (
        <section className="band wrap" aria-labelledby="reasoning">
          <h2 id="reasoning">Effect of extended reasoning</h2>
          {report.reasoning.map((entry) => (
            <Figure key={entry.model} title={entry.model}>
              <table className="data is-fit">
                <thead>
                  <tr>
                    <th scope="col">Constitution</th>
                    <th scope="col" className="num">
                      Direct<span className="wide-only"> answer</span>
                    </th>
                    <th scope="col" className="num">
                      <span className="wide-only">With reasoning</span>
                      <span className="narrow-only">Reasoning</span>
                    </th>
                    <th scope="col" className="num">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entry.pairs.map((pair) => (
                    <tr key={pair.value}>
                      <th scope="row">{value(pair.value).label}</th>
                      <td className="num">{fmt(pair.instant.score)}</td>
                      <td className="num">{fmt(pair.reasoning.score)}</td>
                      <td className="num">{signed(Math.round(pair.reasoning.score) - Math.round(pair.instant.score))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Figure>
          ))}
        </section>
      )}
    </main>
  );
}
