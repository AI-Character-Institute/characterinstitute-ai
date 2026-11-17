import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Profile } from "@/components/charts/profile";
import { Timeline } from "@/components/charts/timeline";
import { Figure } from "@/components/figure";
import { EQUAL_SHARE, HISTORY, LABS, SNAPSHOT, countWord, fmt, formatDate, panelDomain, signed } from "@/lib/results";
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

  return (
    <main>
      <header className="page-head wrap">
        <p className="crumb">
          <Link href="/reports/">Lab reports</Link>
        </p>
        <h1>{report.label}</h1>
        <p className="lead">
          {countWord(report.modelCount, true)} models evaluated in the preview results. This report is generated from the snapshot of{" "}
          {formatDate(SNAPSHOT)} and will be replaced as new releases are scored.
        </p>
      </header>

      {report.panels.length > 0 && (
        <section className="band wrap is-first" aria-labelledby="profile">
          <div className="split">
            <h2 id="profile">Character profile</h2>
            <div className="prose">
              {report.panels.map(({ panel, model, rows }) => {
                const above = rows.filter((r) => r.row.score > EQUAL_SHARE).length;
                const top = rows.reduce((a, b) => (b.row.score > a.row.score ? b : a));
                const low = rows.reduce((a, b) => (b.row.score < a.row.score ? b : a));
                return (
                  <p key={panel.id}>
                    In the {panel.title}, {model.name} scored above an equal share on {above} of {rows.length}{" "}
                    constitutions. Its closest fit was {inline(top.value)} at {fmt(top.row.score)} and its most distant
                    was {inline(low.value)} at {fmt(low.row.score)}
                    {panel.status === "provisional" ? ". These results are provisional." : "."}
                  </p>
                );
              })}
              <p>
                Scores are relative to the other models in each panel, and a closer fit is not always a better result.{" "}
                <Link href="/results/#reading">Reading the scores</Link>.
              </p>
            </div>
          </div>
          {report.panels.map(({ panel, model, rows }) => (
            <Figure
              key={panel.id}
              title={`${model.name} in the ${panel.title}${panel.status === "provisional" ? " (provisional)" : ""}`}
              caption={
                <>
                  {panel.scenarios}. {panel.judging} Rank is the model&rsquo;s position among the {panel.models.length}{" "}
                  models of the panel on that constitution. {panel.note}
                </>
              }
            >
              <Profile rows={rows} domain={panelDomain(panel)} caption={`${model.name}: score on each constitution of the ${panel.title}.`} />
            </Figure>
          ))}
        </section>
      )}

      {report.history.length > 0 && (
        <section className={`band wrap${report.panels.length === 0 ? " is-first" : ""}`} aria-labelledby="releases">
          <div className="split">
            <h2 id="releases">Across releases</h2>
            <div className="prose">
              {report.history.length > 1 ? (
                <p>
                  {countWord(report.history.length, true)} {report.label} models were judged together with {HISTORY.rows.length - report.history.length}{" "}
                  others on the kindness constitution. The earliest, {first.name}, scored {fmt(first.score)}. The most
                  recent, {last.name}, scored {fmt(last.score)}, a change of {signed(Math.round(last.score) - Math.round(first.score))} points across{" "}
                  {Math.round((Date.parse(last.released!) - Date.parse(first.released!)) / (86400000 * 30.44))} months.
                </p>
              ) : (
                <p>
                  One {report.label} model, {first.name}, was part of the run that judged {HISTORY.rows.length} models
                  on the kindness constitution. It scored {fmt(first.score)}.
                </p>
              )}
              <p>
                The comparison covers one constitution and models of different sizes, so it shows how the measurement
                works more than it settles how the lab&rsquo;s models have changed.
              </p>
            </div>
          </div>
          <Figure
            title={`${report.label} releases on the kindness constitution`}
            caption={
              <>
                {HISTORY.scenarios}, {HISTORY.period}. {HISTORY.judging} Gray dots are the other models in the same
                run. Intervals were not reported for this run.
              </>
            }
          >
            <Timeline labs={[report.lab]} labelPoints />
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Released</th>
                  <th scope="col">Weights</th>
                  <th scope="col" className="num">
                    Score
                  </th>
                  <th scope="col" className="num">
                    Rank of {ranked.length}
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.history.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td>{formatDate(r.released!)}</td>
                    <td>{r.open ? "Open" : "Closed"}</td>
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
          <div className="split">
            <h2 id="reasoning">With and without extended reasoning</h2>
            <p className="prose">
              The same model answered each scenario directly and with extended reasoning, and both versions were judged
              in one panel of ten.
            </p>
          </div>
          {report.reasoning.map((entry) => (
            <Figure key={entry.model} title={entry.model}>
              <table className="data">
                <thead>
                  <tr>
                    <th scope="col">Constitution</th>
                    <th scope="col" className="num">
                      Instant
                    </th>
                    <th scope="col" className="num">
                      Reasoning
                    </th>
                    <th scope="col" className="num">
                      Difference
                    </th>
                    <th scope="col">Intervals</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.pairs.map((pair) => {
                    const diff = Math.round(pair.reasoning.score) - Math.round(pair.instant.score);
                    const overlap = pair.instant.lo !== null && pair.reasoning.lo !== null && pair.instant.lo <= pair.reasoning.hi! && pair.reasoning.lo <= pair.instant.hi!;
                    return (
                      <tr key={pair.value}>
                        <th scope="row">{value(pair.value).label}</th>
                        <td className="num">{fmt(pair.instant.score)}</td>
                        <td className="num">{fmt(pair.reasoning.score)}</td>
                        <td className="num">{signed(diff)}</td>
                        <td>{overlap ? "Overlap" : "Do not overlap"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Figure>
          ))}
        </section>
      )}

      <section className="band wrap split is-last" aria-labelledby="next">
        <h2 id="next">Planned additions</h2>
        <div className="prose">
          <p>
            The preview can only describe fit to general constitutions. The reports we are building toward will score
            each model against its own developer&rsquo;s published specification, test whether its character holds
            under pressure, and track every release as it ships.
          </p>
          <p>
            <Link href="/reports/">All lab reports</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
