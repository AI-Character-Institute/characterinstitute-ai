import Link from "next/link";
import { Case } from "@/components/case";
import { Timeline } from "@/components/charts/timeline";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import { MeasureIcon } from "@/components/measure-icon";
import { Portrait } from "@/components/portrait";
import { CONTACT_EMAIL, MEASURES, PROCESS, SOURCES, TEAM, WORK } from "@/lib/content";
import { COUNTS, HISTORY, SNAPSHOT, formatDate } from "@/lib/results";
import { VALUES } from "@/lib/values";

export default function Home() {
  return (
    <main>
      <section className="hero wrap">
        <div className="hero-text">
          <h1 className="display">We evaluate the character of frontier AI models.</h1>
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
        <div className="hero-case">
          <Case />
          <p className="note">
            The library holds {VALUES.length} written sets of values, from single traits to whole traditions. A model
            can be scored against any of them. Select a tile to read one.
          </p>
        </div>
      </section>

      <section className="band wrap split" aria-labelledby="why">
        <h2 id="why">The values of a new model are rarely checked by anyone outside the lab that built it.</h2>
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
          <h2 id="measure">What the suite measures</h2>
          <p className="prose">
            Character is the set of values and dispositions that shape what a model does, most visibly where its
            instructions run out. We ask five questions about it. Two can be answered, at least in part, from the
            preview results today. The other three are still being built.
          </p>
        </div>
        <ul className="measures">
          {MEASURES.map((m) => (
            <li key={m.id}>
              <MeasureIcon id={m.id} />
              <h3>{m.term}</h3>
              <p className="measure-question">{m.question}</p>
              <p className="measure-detail">{m.detail}</p>
              <p className="status" data-status={m.status}>
                {m.statusLabel}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band wrap" aria-labelledby="preview">
        <div className="split">
          <h2 id="preview">First results from the prototype suite</h2>
          <div className="prose">
            <p>
              The suite starts from EigenBench, a method our team developed at Cornell. The preview covers{" "}
              {COUNTS.panelModels} frontier models scored on {COUNTS.values} constitutions, and {COUNTS.historyModels}{" "}
              models released over two years scored on one.
            </p>
            <p>
              <Link href="/results/">Open the results</Link> or read a <Link href="/reports/">report on one lab</Link>.
            </p>
          </div>
        </div>
        <Figure
          title="Kindness across two years of releases"
          caption={
            <>
              EigenBench score on the kindness constitution for {HISTORY.rows.length} models, by release date.
              All models were judged in one run, so their scores share a reference group. A score of 1500 is an equal
              share of the judges&rsquo; trust. Lines join each lab&rsquo;s releases in date order and include models
              of different sizes. {HISTORY.scenarios}, {HISTORY.period}. Snapshot of {formatDate(SNAPSHOT)}.
            </>
          }
        >
          <Timeline labs={["OpenAI", "Anthropic", "Google"]} />
        </Figure>
      </section>

      <section className="band wrap" aria-labelledby="use">
        <div className="split">
          <h2 id="use">How the results are meant to be used</h2>
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
            <h3>For everyone who uses these models</h3>
            <p>
              Better behavior across the ordinary and largely unmonitored tasks that make up most of deployment, and a
              stronger propensity to act in people&rsquo;s interests in the worst cases.
            </p>
          </div>
        </div>
      </section>

      <section className="band wrap split" aria-labelledby="foundations">
        <h2 id="foundations">Built on published research</h2>
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
          <h2 id="team">The team</h2>
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
        <h2 id="contact">Work with us</h2>
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
