import type { Metadata } from "next";
import Link from "next/link";
import { Matrix, MatrixLegend } from "@/components/charts/matrix";
import { ReasoningPairs } from "@/components/charts/reasoning";
import { Compare } from "@/components/explorer/compare";
import { Leaderboard } from "@/components/explorer/leaderboard";
import { Trend } from "@/components/explorer/trend";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import { COUNTS, HISTORY, PANELS, REASONING, SNAPSHOT, SOURCE, boardsFor, fmt, formatDate, labLabel } from "@/lib/results";
import { VALUES } from "@/lib/values";

export const metadata: Metadata = {
  title: "Preview results",
  description:
    "First results from the AI Character Institute's prototype suite: frontier models scored against written constitutions with EigenBench.",
};

export default function Results() {
  const info = Object.fromEntries(VALUES.filter((v) => boardsFor(v.id).length > 0).map((v) => [v.id, { label: v.label, summary: v.summary }]));
  const ranked = [...HISTORY.rows].sort((a, b) => b.score - a.score);
  return (
    <main>
      <header className="page-head wrap">
        <h1>Preview results</h1>
        <p className="lead">
          These are the first results from the prototype suite. Each score says how closely a model&rsquo;s answers
          followed one written constitution, relative to the other models judged alongside it.
        </p>
        <dl className="facts">
          <div>
            <dt>{COUNTS.panelModels}</dt>
            <dd>frontier models in two panels</dd>
          </div>
          <div>
            <dt>{COUNTS.values}</dt>
            <dd>constitutions with published scores</dd>
          </div>
          <div>
            <dt>{COUNTS.historyModels}</dt>
            <dd>models in the release history</dd>
          </div>
          <div>
            <dt>{COUNTS.labs}</dt>
            <dd>
              <Link href="/reports/">labs with a report</Link>
            </dd>
          </div>
        </dl>
        <p className="snapshot">Snapshot of {formatDate(SNAPSHOT)}.</p>
      </header>

      <section className="wrap reading" aria-labelledby="reading">
        <h2 id="reading">Reading the scores</h2>
        <ul>
          <li>
            <strong>Equal share.</strong> Scores express each model&rsquo;s share of the judges&rsquo; trust.
            A model at 1500 holds exactly the share it would get if trust were split evenly across the panel.
          </li>
          <li>
            <strong>Closeness of fit.</strong> A higher score means a closer fit, which is not always better. Sycophancy
            and power-seeking are constitutions too, and a high score on them means the model shows more of the trait.
          </li>
          <li>
            <strong>Panels.</strong> A score depends on which models were judged together. Scores from
            different panels do not share a scale.
          </li>
          <li>
            <strong>Intervals.</strong> Bars show 95% bootstrap intervals over scenarios. Where two intervals
            overlap, the order of the two models is uncertain.
          </li>
        </ul>
        <p>
          The full account is on the <Link href="/method/">method page</Link>.
        </p>
      </section>

      <nav className="wrap toc" aria-label="On this page">
        <a href="#leaderboard">Leaderboard</a>
        <a href="#across-releases">Across releases</a>
        <a href="#profiles">Model profiles</a>
        <a href="#across-values">Across values</a>
        <a href="#reasoning">With and without reasoning</a>
        <a href="#open">Data and code</a>
      </nav>

      <section className="band wrap" id="leaderboard" aria-labelledby="h-leaderboard">
        <div className="split">
          <h2 id="h-leaderboard">Leaderboard</h2>
          <p className="prose">
            One ranking for each constitution, with the uncertainty around every score. Choose a panel and a
            constitution. The axis stays the same across a panel, so rankings inside it can be read against each other.
          </p>
        </div>
        <div className="plate">
          <Leaderboard values={info} />
        </div>
      </section>

      <section className="band wrap" id="across-releases" aria-labelledby="h-across-releases">
        <div className="split">
          <h2 id="h-across-releases">Across releases</h2>
          <p className="prose">
            To compare versions of a lab&rsquo;s models, all of them have to be judged in the same run. This one put{" "}
            {HISTORY.rows.length} models released between {formatDate(HISTORY.rows[0].released!, "month")} and{" "}
            {formatDate(HISTORY.rows[HISTORY.rows.length - 1].released!, "month")} through the kindness constitution.
            The <Link href="/reports/">lab reports</Link> follow each developer separately.
          </p>
        </div>
        <Figure
          title="Kindness score by release date"
          caption={
            <>
              {HISTORY.scenarios}. {HISTORY.judging} Intervals were not reported for this run. Point to a model, or
              move to it with the Tab key, to read its score.
            </>
          }
        >
          <Trend />
          <details className="table-view">
            <summary>View all {ranked.length} models as a table</summary>
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
        <div className="split">
          <h2 id="h-profiles">Model profiles</h2>
          <p className="prose">
            A model&rsquo;s scores across every constitution in its panel, drawn as one shape. Select up to four models
            to set their profiles against each other. The table gives the same numbers with their intervals.
          </p>
        </div>
        <div className="plate">
          <Compare values={info} />
        </div>
      </section>

      <section className="band wrap" id="across-values" aria-labelledby="h-across-values">
        <div className="split">
          <h2 id="h-across-values">Across values</h2>
          <p className="prose">
            Each panel at a glance. Rows are models, columns are constitutions, and color shows how far a score sits
            from an equal share. The table does not average a model&rsquo;s scores into one number, because a high
            score means something different for each constitution.
          </p>
        </div>
        {PANELS.map((panel) => (
          <Figure
            key={panel.id}
            id={panel.id}
            title={`${panel.title}${panel.status === "provisional" ? " (provisional)" : ""}`}
            caption={
              <>
                {panel.models.length} models on {panel.boards.length} constitutions. {panel.scenarios}. {panel.judging}{" "}
                {panel.note}
              </>
            }
          >
            <Matrix panel={panel} />
            <MatrixLegend />
          </Figure>
        ))}
      </section>

      <section className="band wrap" id="reasoning" aria-labelledby="h-reasoning">
        <div className="split">
          <h2 id="h-reasoning">With and without extended reasoning</h2>
          <p className="prose">
            A first look at stability. Five models answered the same scenarios twice, once directly and once with
            extended reasoning, and both versions were judged in one panel. An open ring is the direct answer and a
            solid dot is the answer with reasoning. {REASONING.scenarios}, {REASONING.period}.
          </p>
        </div>
        <Figure title="Score with and without extended reasoning, by constitution">
          <div className="stack">
            {REASONING.boards.map((b) => {
              const v = VALUES.find((x) => x.id === b.value)!;
              return (
                <div key={b.value}>
                  <h4 className="stack-head">
                    {v.label}
                  </h4>
                  <ReasoningPairs valueId={b.value} caption={`${v.label}: scores with and without extended reasoning.`} />
                </div>
              );
            })}
          </div>
        </Figure>
      </section>

      <section className="band wrap split is-last" id="open" aria-labelledby="h-open">
        <h2 id="h-open">Data and code</h2>
        <div className="prose">
          <p>
            Every score on this page can be traced to the responses and judgments behind it. The run artifacts are in
            an <Ext href={SOURCE.dataset}>open dataset</Ext> and the evaluation code is in the{" "}
            <Ext href={SOURCE.code}>EigenBench repository</Ext>.
          </p>
          <p>
            If you work on one of these models and think a result is wrong, please{" "}
            <Link href="/about/#contact">tell us</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
