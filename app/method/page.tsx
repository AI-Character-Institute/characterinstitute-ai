import type { Metadata } from "next";
import Link from "next/link";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import example from "@/data/worked-example.json";
import { SOURCES } from "@/lib/content";
import { SOURCE } from "@/lib/results";

export const metadata: Metadata = {
  title: "Method",
  description: "How the AI Character Institute turns scenarios, constitutions and model judgments into scores, and where the preview falls short.",
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
          We produce the preview results with <Ext href={SOURCES.eigenbench}>EigenBench</Ext>, a method developed in
          Lionel Levine&rsquo;s lab at Cornell. Models answer the same scenarios and judge one another&rsquo;s answers
          against a written constitution, and we combine those judgments into one score for each model.
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
              A constitution is a written set of values, set out as a list of criteria that a judge can apply to an
              answer. The kindness constitution asks judges to look for compassion and care, and others describe a
              trait such as humor, a philosophy such as utilitarianism, or a disposition such as sycophancy. A higher
              score means that a model&rsquo;s answers fit the constitution more closely within the evaluation. We
              report that fit as a measurement of behavior, and whether the fit is desirable depends on the
              constitution.
            </p>
          </section>

          <section id="scenarios">
            <h2>Scenarios and responses</h2>
            <p>
              Every model in a panel responds to the same scenarios, most of which come from{" "}
              <Ext href={SOURCES.airisk}>AIRiskDilemmas</Ext>, a collection of situations in which a model&rsquo;s
              behavior can reveal its priorities, such as how it handles a conflict, responds to someone in need, or
              weighs competing concerns. A model is not told that its answer will be scored. Because the dataset and
              the generation settings determine exactly what the models see, we treat them as part of the experiment
              and state them with each panel.
            </p>
          </section>

          <section id="judges">
            <h2>Constitutions and judges</h2>
            <p>
              The models in a panel act both as respondents and as judges of one another, and a judge does not know
              which model wrote the answer in front of it. In the preview panels a judge rates each answer from 1 to
              10 on every criterion of the constitution. Earlier runs, including the release history, used pairwise
              comparisons between two answers.
            </p>
            <Figure
              title="One judgment, as recorded"
              caption={
                <>
                  {example.judge} rating an answer by {example.evaluee} on the kindness constitution. The mean of the{" "}
                  {example.ratings.length} ratings is {mean.toFixed(2)}.
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
              accounts for this with EigenTrust, which weights each judge by how highly the group rates that
              judge&rsquo;s own answers. Scores and judge weights are solved together, so that a model which earns
              more trust also contributes more to the aggregate judgment, and no ground-truth labels are needed. The
              result is a share of trust for every model, which we report relative to an equal split across the panel.
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
              Where a run reports them, we show the bounds of a 95% bootstrap interval, made by resampling whole
              scenarios. Nearby scores often have overlapping intervals, and in those cases we treat the order of the
              models as uncertain. Where a run did not report intervals, we say so and show the score alone.
            </p>
          </section>

          <section id="comparing">
            <h2>Comparability</h2>
            <p>
              Every score is relative to the group of models judged together, which means that models evaluated on
              the same constitution, scenarios and judges can be compared directly, while a change in the group can
              move a model&rsquo;s score even when its behavior has not changed. For this reason we keep each panel separate
              and compare releases only within a single run. We also do not average constitutions into an overall
              score, because a high score means something different for each of them.
            </p>
          </section>

          <section id="limits">
            <h2>Limits of the preview</h2>
            <p>
              The preview shows that the measurement works, and it falls well short of what we are building. We see
              four limits worth stating plainly. First, the judges are models. EigenTrust reduces the influence of
              poor judges, and the consensus it finds is still a consensus among models. The{" "}
              <Ext href={SOURCES.eigenbench}>EigenBench paper</Ext> reports that human evaluators&rsquo; judgments of
              the same models align closely with it. Second, the scenarios are single prompts, which do not yet test
              character over long contexts, under adversarial pressure, or while a model acts autonomously over many
              steps. Third, the preview measures fit to written constitutions and does not yet test whether those
              measurements predict behavior elsewhere, which is the question we consider most important. Fourth, the October panel is provisional, and two
              constitutions were reworded between the August and October panels. The{" "}
              <Link href="/values/">library</Link> shows the current wording.
            </p>
          </section>

          <section id="reproduce">
            <h2>Reproducibility</h2>
            <p>
              Each published run records its model versions, constitution, scenario set, judging mode and aggregation
              settings. Every response and judgment is in the <Ext href={SOURCE.dataset}>open dataset</Ext>, the
              evaluation code is in the <Ext href={SOURCE.code}>EigenBench repository</Ext>, and the method is
              described in the <Ext href={SOURCES.eigenbench}>paper</Ext>.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
