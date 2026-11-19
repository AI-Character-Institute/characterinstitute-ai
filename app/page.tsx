import Link from "next/link";
import { Trend } from "@/components/explorer/trend";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import { Portrait } from "@/components/portrait";
import { CONTACT_EMAIL, MEASURES, PROCESS, SOURCES, TEAM, WORK } from "@/lib/content";
import { COUNTS, HISTORY, SNAPSHOT, formatDate } from "@/lib/results";
import { VALUES, value } from "@/lib/values";

/** Lines taken from three constitutions in the library, to show what a written set of values looks like. */
const PASSAGES: [string, number][] = [
  ["kindness", 3],
  ["taoism", 4],
  ["lockean-rights", 0],
];

export default function Home() {
  return (
    <main>
      <section className="hero wrap">
        <h1 className="display">Independent evaluation of AI character</h1>
        <div className="hero-body">
          <p className="lead">
            The AI Character Institute is an independent non-profit. We measure the values that models show in their
            behavior, compare them with what their developers have written down, and publish the results for every
            major release.
          </p>
          <p className="actions">
            <Link className="button" href="/results/">
              See the preview results
            </Link>
            <Link className="button is-quiet" href="/method/">
              How we measure
            </Link>
          </p>
        </div>
      </section>

      <section className="wrap record" aria-labelledby="record">
        <Figure
          id="record"
          title="Kindness across two years of releases"
          caption={
            <>
              EigenBench score on the kindness constitution for {HISTORY.rows.length} models, by release date. All
              models were judged in one run, so their scores share a reference group. A score of 1500 is an equal share
              of the judges&rsquo; trust. {HISTORY.scenarios}, {HISTORY.period}. Snapshot of {formatDate(SNAPSHOT)}.{" "}
              <Link href="/results/">Open all results</Link>
            </>
          }
        >
          <Trend compact />
        </Figure>
        <dl className="facts">
          <div>
            <dt>{COUNTS.panelModels}</dt>
            <dd>frontier models scored in two panels</dd>
          </div>
          <div>
            <dt>{COUNTS.values}</dt>
            <dd>written constitutions with published scores</dd>
          </div>
          <div>
            <dt>{COUNTS.historyModels}</dt>
            <dd>releases in the two-year history</dd>
          </div>
          <div>
            <dt>{COUNTS.labs}</dt>
            <dd>
              <Link href="/reports/">reports on individual labs</Link>
            </dd>
          </div>
        </dl>
      </section>

      <section className="band wrap split" aria-labelledby="why">
        <h2 id="why">The evaluation gap</h2>
        <div className="prose">
          <p>
            Frontier models are released with rigorous evaluations of what they can do. Far less is published about
            what they value, and little of it comes from an independent source. To the best of our knowledge, no
            organization evaluates model character independently and continuously, across labs and across releases.
          </p>
          <p>
            There is growing evidence that this gap bears on safety. A model&rsquo;s value priorities appear to{" "}
            <Ext href={SOURCES.litmus}>predict risky behavior</Ext> such as power-seeking and alignment faking.
            Developers now shape character on purpose, training models against published{" "}
            <Ext href={SOURCES.modelSpec}>specs</Ext> and <Ext href={SOURCES.constitution}>constitutions</Ext>, and as
            models take on longer and more autonomous work, more of what they do is decided by{" "}
            <Ext href={SOURCES.forethought}>character</Ext> and less by instructions.
          </p>
          <p>
            We are building the independent check: one open evaluation suite, run on every major release, with the
            results on a public record.
          </p>
        </div>
      </section>

      <section className="band wrap" aria-labelledby="measure">
        <div className="split">
          <h2 id="measure">Measures of character</h2>
          <p className="prose">
            Character is the set of values and dispositions that shape what a model does, most visibly where its
            instructions run out. The suite measures five things about it. Two are available, at least in part, in the
            preview results today. The other three are still being built.
          </p>
        </div>
        <ol className="ledger">
          {MEASURES.map((m) => (
            <li key={m.id}>
              <h3>{m.term}</h3>
              <div>
                <p className="ledger-gloss">{m.gloss}</p>
                <p>{m.detail}</p>
              </div>
              <p className="status" data-status={m.status}>
                {m.statusLabel}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band wrap" aria-labelledby="written">
        <div className="split">
          <h2 id="written">Written values</h2>
          <p className="prose">
            A constitution is a written set of values that a model can be scored against. The library holds{" "}
            {VALUES.length} of them, from single traits to whole traditions and the documents developers publish for
            their own models. Each one is a list of criteria like these. <Link href="/values/">Read the library</Link>.
          </p>
        </div>
        <ul className="passages">
          {PASSAGES.map(([id, i]) => {
            const v = value(id);
            const line = v.criteria[i].replace(/\.$/, "");
            return (
              <li key={id}>
                <blockquote>
                  <p>{line}.</p>
                </blockquote>
                <p className="passage-source">
                  <Link href={`/values/#${id}`}>{v.label}</Link>, criterion {i + 1} of {v.criteria.length}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="band wrap" aria-labelledby="use">
        <div className="split">
          <h2 id="use">Use of the results</h2>
          <p className="prose">
            The full suite is being built now. This is how we intend it to work once it runs on every release.
          </p>
        </div>
        <ol className="process">
          {PROCESS.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="audiences">
          <div>
            <h3>For labs</h3>
            <p>
              A second reading of a model&rsquo;s values before it ships, made with a suite you can run yourself. The
              aim is for gaps between a model&rsquo;s specified and shown character to be found while training can
              still be adjusted.
            </p>
          </div>
          <div>
            <h3>For policymakers</h3>
            <p>
              Public, comparable measurements of model values. They could support standards that keep models with
              dangerous character traits from release, as is starting to happen with capability benchmarks.
            </p>
          </div>
          <div>
            <h3>For users of these models</h3>
            <p>
              Better behavior across the ordinary and largely unmonitored tasks that make up most of deployment, and a
              stronger propensity to act in people&rsquo;s interests in the worst cases.
            </p>
          </div>
        </div>
      </section>

      <section className="band wrap split" aria-labelledby="foundations">
        <h2 id="foundations">Research foundations</h2>
        <div>
          <ul className="work">
            {WORK.filter((w) => w.foundation).map((w) => (
              <li key={w.title}>
                <h3>
                  <Ext href={w.href}>{w.title}</Ext>
                </h3>
                <p className="work-context">{w.context}</p>
                <p>{w.summary}</p>
              </li>
            ))}
          </ul>
          <p className="more">
            <Link href="/about/#work">All prior work by the team</Link>
          </p>
        </div>
      </section>

      <section className="band wrap" aria-labelledby="team">
        <div className="split">
          <h2 id="team">Team</h2>
          <p className="prose">
            Four co-founders who have already built the first versions of the evaluation the Institute proposes.{" "}
            <Link href="/about/#team">Read more about us</Link>.
          </p>
        </div>
        <ul className="people is-compact">
          {TEAM.map((person) => (
            <li key={person.slug}>
              <Ext href={person.href} className="person-link">
                <Portrait person={person} />
                <span className="person-name">{person.name}</span>
              </Ext>
              <span className="person-role">{person.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band wrap split is-last" aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <div className="prose">
          <p>
            We would like to hear from model spec and alignment teams at labs, from people working on AI standards and
            policy, and from researchers who want to contribute a benchmark or a constitution to the suite.
          </p>
          <p>
            Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
