import type { Metadata } from "next";
import Link from "next/link";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import example from "@/data/worked-example.json";
import { SOURCES } from "@/lib/content";
import { SOURCE } from "@/lib/results";

export const metadata: Metadata = {
  title: "Method",
  description: "How the AI Character Institute turns scenarios, constitutions and model judgments into scores, and what the scores can and cannot support.",
};

// MathML, so the formula is real mathematics to a screen reader and scales with the text.
const SCORE_FORMULA =
  '<math display="block" aria-label="S equals 1500 plus 400 times the base 10 logarithm of N times t">' +
  "<mrow><mi>S</mi><mo>=</mo><mn>1500</mn><mo>+</mo><mn>400</mn><mspace width=\"0.25em\"></mspace>" +
  "<msub><mi>log</mi><mn>10</mn></msub><mo>&#8289;</mo><mo>(</mo><mi>N</mi><mo>&#8290;</mo><mi>t</mi><mo>)</mo></mrow></math>";

const SECTIONS = [
  ["measure", "Fit to a constitution"],
  ["scenarios", "Scenarios and responses"],
  ["judges", "Constitutions and judges"],
  ["scores", "From judgments to scores"],
  ["uncertainty", "Uncertainty"],
  ["comparing", "Comparability"],
  ["limits", "Limits of the preview"],
  ["reproduce", "Reproducibility"],
];

export default function Method() {
  const mean = example.ratings.reduce((s, r) => s + r.rating, 0) / example.ratings.length;
  return (
    <main>
      <header className="page-head wrap">
        <h1>Method</h1>
        <p className="lead">
          The preview results are produced with EigenBench. Models answer the same scenarios, judge one another&rsquo;s
          answers against a written constitution, and the judgments are combined into one score for each model.
        </p>
      </header>

      <div className="wrap article">
        <nav className="article-toc" aria-label="On this page">
          <ol>
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="article-body">
          <section id="measure">
            <h2>Fit to a constitution</h2>
            <p>
              EigenBench measures how well a model&rsquo;s answers fit a written set of values, which we call a
              constitution. A constitution makes the target explicit. The kindness constitution asks judges to look for
              compassion and care. Others describe a trait such as humor, a philosophy such as utilitarianism, or a
              disposition such as sycophancy.
            </p>
            <p>
              A higher score means a closer fit to that constitution within the evaluation. It is a measurement of
              behavior and carries no verdict about whether the fit is desirable.
            </p>
          </section>

          <section id="scenarios">
            <h2>Scenarios and responses</h2>
            <p>
              The models being evaluated respond to a shared set of scenarios. Most come from{" "}
              <Ext href={SOURCES.airisk}>AIRiskDilemmas</Ext>, a collection of situations in which behavior can reveal
              priorities: how a model handles a conflict, responds to someone in need, or weighs competing concerns. A
              model is not told that its answer will be scored.
            </p>
            <p>
              The dataset and generation settings of a run determine exactly what the models see. Those settings are
              part of the experiment, and each panel on the results page states them.
            </p>
          </section>

          <section id="judges">
            <h2>Constitutions and judges</h2>
            <p>
              The constitution provides the criteria for judging an answer. The models in a panel act both as
              respondents and as judges of one another, and a judge does not know which model wrote the answer in front
              of it. The preview panels use direct ratings, in which a judge rates an answer from 1 to 10 on each
              criterion. Earlier runs, including the release history, use pairwise comparisons between two answers.
            </p>
            <Figure
              title="One judgment, as recorded"
              caption={
                <>
                  A single judgment from the frontier panel on the kindness constitution: {example.judge} rating an
                  answer by {example.evaluee}. The mean of these eight ratings is {mean.toFixed(2)}. A panel of eight
                  models on 200 scenarios produces 1,600 judgments like this one.
                </>
              }
            >
              <div className="example">
                <div>
                  <h4>Scenario</h4>
                  <p>{example.scenario}</p>
                  <h4>Answer</h4>
                  <p>{example.response}</p>
                </div>
                <table className="data">
                  <thead>
                    <tr>
                      <th scope="col">Criterion: prefer the response that</th>
                      <th scope="col" className="num">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {example.ratings.map((r) => (
                      <tr key={r.criterion}>
                        <th scope="row">{r.criterion.replace(/\*/g, "")}</th>
                        <td className="num">{r.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Figure>
          </section>

          <section id="scores">
            <h2>From judgments to scores</h2>
            <p>
              Model judges are imperfect, and some are better judges of a given constitution than others. EigenBench
              handles this with EigenTrust, which weights each judge by how highly the group rates that judge&rsquo;s
              own answers. Scores and judge weights are solved together, so a model that receives more trust also
              contributes more to the aggregate judgment. No ground-truth labels are needed.
            </p>
            <p>
              The result is a share of trust for every model. The score reported on this site expresses that share
              relative to an equal split across the panel:
            </p>
            <p className="formula" dangerouslySetInnerHTML={{ __html: SCORE_FORMULA }} />
            <p>
              Here <i>N</i> is the number of models in the panel and <i>t</i> is the model&rsquo;s trust share. An
              equal share, <i>t</i> = 1/<i>N</i>, gives 1500. A model with twice an equal share scores about 1620, and
              one with half scores about 1380.
            </p>
          </section>

          <section id="uncertainty">
            <h2>Uncertainty</h2>
            <p>
              Where a run reports them, the site shows the lower and upper bounds of a 95% bootstrap interval, made by
              resampling whole scenarios. Nearby scores often have overlapping intervals. Their order should then be
              treated as uncertain.
            </p>
            <p>
              Where a run did not report intervals, the site says so and shows the score alone. A missing interval is
              a gap in the record and should not be read as precision.
            </p>
          </section>

          <section id="comparing">
            <h2>Comparability</h2>
            <p>
              Scores are relative to a reference group. Models evaluated together on the same constitution, scenarios
              and judges can be compared directly. Changing the group can change a model&rsquo;s score even when its
              behavior has not changed, which is why the site keeps each panel separate and compares releases only
              within one run.
            </p>
            <p>
              The site does not average different constitutions into an overall score. A high score on one
              constitution is evidence about that target in that setting, and is no general measure of quality or
              safety.
            </p>
          </section>

          <section id="limits">
            <h2>Limits of the preview</h2>
            <p>
              The preview shows that the measurement works. It does not yet do what the Institute is being set up to
              do, and several limits are worth stating plainly.
            </p>
            <ul>
              <li>
                The judges are models. EigenTrust reduces the influence of poor judges, and the consensus it finds is
                still a consensus among models. The <Ext href={SOURCES.eigenbench}>EigenBench paper</Ext> checks the
                method against human evaluators and reports that their judgments of the same models align closely with
                its own.
              </li>
              <li>
                Scenarios are single prompts. They do not yet test character over long contexts, under adversarial
                pressure, or while a model acts autonomously over many steps.
              </li>
              <li>
                No model has yet been scored against its own developer&rsquo;s published specification. That
                comparison is the first addition planned for the suite.
              </li>
              <li>
                The October panel is provisional, and two constitutions were reworded between the August and October
                panels. The <Link href="/values/">library</Link> shows the current wording.
              </li>
            </ul>
          </section>

          <section id="reproduce">
            <h2>Reproducibility</h2>
            <p>
              Each published run records its model versions, constitution, scenario set, judging mode and aggregation
              settings. The run artifacts, including every response and judgment, are in the{" "}
              <Ext href={SOURCE.dataset}>open dataset</Ext>. The evaluation code is in the{" "}
              <Ext href={SOURCE.code}>EigenBench repository</Ext>, and the method is described in the{" "}
              <Ext href={SOURCES.eigenbench}>paper</Ext>.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
