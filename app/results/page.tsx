import type { Metadata } from "next";
import Link from "next/link";
import { Matrix, MatrixLegend } from "@/components/charts/matrix";
import { ReasoningChange } from "@/components/charts/reasoning-change";
import { Compare } from "@/components/explorer/compare";
import { Leaderboard } from "@/components/explorer/leaderboard";
import { Trend } from "@/components/explorer/trend";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import { HISTORY, PANELS, REASONING, SOURCE, boardsFor, fmt, formatDate, labLabel } from "@/lib/results";
import { VALUES } from "@/lib/values";

export const metadata: Metadata = {
  title: "Preview results",
  description: "The first results from the AI Character Institute's prototype suite: frontier models scored against written constitutions with EigenBench.",
};

export default function Results() {
  const info = Object.fromEntries(VALUES.filter((v) => boardsFor(v.id).length > 0).map((v) => [v.id, { label: v.label, summary: v.summary }]));
  const ranked = [...HISTORY.rows].sort((a, b) => b.score - a.score);
  return (
    <main>
      <header className="page-head wrap">
        <h1>Preview results</h1>
        <p className="lead">
          The scores on this page are the first from our prototype suite, and each one measures how closely a
          model&rsquo;s answers fit a written constitution, relative to the other models judged alongside it. A score
          of 1500 is an equal share of the judges&rsquo; trust. A higher score means a closer fit, whether or not the
          trait is one anyone would want.
        </p>
      </header>

      <nav className="wrap toc" aria-label="On this page">
        <a href="#leaderboard">Leaderboard</a>
        <a href="#across-releases">Across releases</a>
        <a href="#profiles">Model profiles</a>
        <a href="#across-constitutions">Across constitutions</a>
        <a href="#reasoning">Extended reasoning</a>
        <a href="#open">Data and code</a>
      </nav>

      <section className="band wrap is-first" id="leaderboard" aria-labelledby="h-leaderboard">
        <h2 id="h-leaderboard">Leaderboard</h2>
        <div className="plate">
          <Leaderboard values={info} />
        </div>
      </section>

      <section className="band wrap" id="across-releases" aria-labelledby="h-across-releases">
        <h2 id="h-across-releases">Across releases</h2>
        <Figure title="Kindness score by release date">
          <Trend />
          <details className="table-view">
            <summary>All {ranked.length} models as a table</summary>
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Lab</th>
                  <th scope="col">Released</th>
                  <th scope="col">Weights</th>
                  <th scope="col" className="num">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td>{labLabel(r.lab)}</td>
                    <td>{formatDate(r.released!, "month")}</td>
                    <td>{r.open ? "Open" : "Closed"}</td>
                    <td className="num">{fmt(r.score)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </Figure>
      </section>

      <section className="band wrap" id="profiles" aria-labelledby="h-profiles">
        <h2 id="h-profiles">Model profiles</h2>
        <div className="plate">
          <Compare values={info} />
        </div>
      </section>

      <section className="band wrap" id="across-constitutions" aria-labelledby="h-across-constitutions">
        <h2 id="h-across-constitutions">Across constitutions</h2>
        {PANELS.map((panel) => (
          <Figure
            key={panel.id}
            id={panel.id}
            title={`${panel.title}${panel.status === "provisional" ? " (provisional)" : ""}`}
            caption={
              <>
                {panel.scenarios}.{panel.note ? ` ${panel.note.replace(/^Provisional\.\s*/, "")}` : ""}
              </>
            }
          >
            <Matrix panel={panel} />
            <MatrixLegend />
          </Figure>
        ))}
      </section>

      <section className="band wrap" id="reasoning" aria-labelledby="h-reasoning">
        <h2 id="h-reasoning">Effect of extended reasoning</h2>
        <Figure
          title="Change in score when a model reasons before it answers"
          caption={
            <>
              Each model answered the same {REASONING.scenarios.replace(/ from.*/, "")} twice in {REASONING.period}, once
              directly and once with extended reasoning. Each number is the second score minus the first.
            </>
          }
        >
          <ReasoningChange />
        </Figure>
      </section>

      <section className="band wrap split is-last" id="open" aria-labelledby="h-open">
        <h2 id="h-open">Data and code</h2>
        <p className="prose">
          Every response and judgment behind these scores is in an <Ext href={SOURCE.dataset}>open dataset</Ext>, and
          the evaluation code is in the <Ext href={SOURCE.code}>EigenBench repository</Ext>. If you work on one of
          these models and believe a result is wrong, please <Link href="/about/#contact">write to us</Link>.
        </p>
      </section>
    </main>
  );
}
