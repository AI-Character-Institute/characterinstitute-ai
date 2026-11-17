import type { Metadata } from "next";
import Link from "next/link";
import { Matrix, MatrixLegend } from "@/components/charts/matrix";
import { Ranking } from "@/components/charts/ranking";
import { ReasoningPairs } from "@/components/charts/reasoning";
import { Timeline } from "@/components/charts/timeline";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import { ValueTile } from "@/components/value-tile";
import { COUNTS, HISTORY, PANELS, REASONING, SNAPSHOT, SOURCE, boardsFor, fmt, formatDate, labLabel, panelDomain } from "@/lib/results";
import { VALUES } from "@/lib/values";

export const metadata: Metadata = {
  title: "Preview results",
  description:
    "First results from the AI Character Institute's prototype suite: frontier models scored against written constitutions with EigenBench.",
};

export default function Results() {
  const withResults = VALUES.filter((v) => boardsFor(v.id).length > 0);
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
            <dt>{formatDate(SNAPSHOT, "short")}</dt>
            <dd>date of this snapshot</dd>
          </div>
        </dl>
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
        <a href="#across-values">Across values</a>
        <a href="#by-value">By value</a>
        <a href="#across-releases">Across releases</a>
        <a href="#reasoning">With and without reasoning</a>
        <a href="#open">Data and code</a>
      </nav>

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

      <section className="band wrap" id="by-value" aria-labelledby="h-by-value">
        <div className="split">
          <h2 id="h-by-value">By value</h2>
          <p className="prose">
            One ranking for each constitution and panel, with the uncertainty around every score. The dashed line marks
            an equal share.
          </p>
        </div>
        <div className="boards">
          {withResults.map((v) => (
            <article key={v.id} id={v.id} className={boardsFor(v.id).length > 1 ? "board is-pair" : "board"}>
              <header className="board-head">
                <ValueTile id={v.id} size={56} />
                <div>
                  <h3>{v.label}</h3>
                  <p>
                    {v.summary} <Link href={`/values/#${v.id}`}>Read the constitution</Link>
                  </p>
                </div>
              </header>
              <div className="board-panels">
                {boardsFor(v.id).map(({ panel, board }) => (
                  <div key={panel.id} className="board-panel">
                    <h4>
                      {panel.title}
                      {panel.status === "provisional" && <span className="flag">Provisional</span>}
                    </h4>
                    <Ranking
                      board={board}
                      domain={panelDomain(panel)}
                      caption={`${v.label}, ${panel.title}. Models ranked by EigenBench score.`}
                    />
                  </div>
                ))}
              </div>
            </article>
          ))}
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
              {HISTORY.scenarios}. {HISTORY.judging} Intervals were not reported for this run. Lines join each
              highlighted lab&rsquo;s releases in date order and include models of different sizes.
            </>
          }
        >
          <Timeline labs={["OpenAI", "Anthropic", "Google"]} />
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
                    <ValueTile id={b.value} size={26} />
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
