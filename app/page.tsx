import Link from "next/link";
import { Matrix, MatrixLegend } from "@/components/charts/matrix";
import { Leaderboard } from "@/components/explorer/leaderboard";
import { Trend } from "@/components/explorer/trend";
import { Ext } from "@/components/ext";
import { Figure } from "@/components/figure";
import { Portrait } from "@/components/portrait";
import { APPROACH, CONTACT_EMAIL, IMPACT, ORG, TEAM, WORK } from "@/lib/content";
import { COUNTS, PANELS, boardsFor } from "@/lib/results";
import { VALUES, value } from "@/lib/values";

/** Lines taken from three constitutions in the library, to show what a written set of values looks like. */
const PASSAGES: [string, number][] = [
  ["kindness", 3],
  ["taoism", 4],
  ["lockean-rights", 0],
];

export default function Home() {
  const info = Object.fromEntries(VALUES.filter((v) => boardsFor(v.id).length > 0).map((v) => [v.id, { label: v.label, summary: v.summary }]));
  const panel = PANELS.find((p) => p.status === "final") ?? PANELS[0];
  return (
    <main>
      <section className="hero wrap">
        <div className="hero-top">
          <h1 className="display">{ORG.descriptor}</h1>
          <p className="lead">{ORG.statement.join(" ")}</p>
        </div>
        <dl className="facts">
          <div>
            <dt>{COUNTS.panelModels}</dt>
            <dd>frontier models scored</dd>
          </div>
          <div>
            <dt>{COUNTS.values}</dt>
            <dd>written constitutions</dd>
          </div>
          <div>
            <dt>{COUNTS.historyModels}</dt>
            <dd>releases across two years</dd>
          </div>
          <div>
            <dt>{COUNTS.labs}</dt>
            <dd>
              <Link href="/reports/">lab reports</Link>
            </dd>
          </div>
        </dl>
      </section>

      <section className="band wrap" aria-labelledby="results">
        <h2 id="results">Preview results</h2>
        <Figure title="Leaderboard by constitution">
          <Leaderboard values={info} />
        </Figure>
        <Figure title="Kindness across two years of releases">
          <Trend compact />
        </Figure>
        <Figure title={`Scores across constitutions, ${panel.title}`}>
          <Matrix panel={panel} />
          <MatrixLegend />
        </Figure>
        <p className="more">
          <Link href="/results/">All results</Link>
        </p>
      </section>

      <section className="band wrap" aria-labelledby="approach">
        <h2 id="approach">Approach</h2>
        <ol className="ledger">
          {APPROACH.map((a) => (
            <li key={a.id}>
              <h3>{a.term}</h3>
              <p className="ledger-gloss">{a.gloss}</p>
              <p className="status" data-status={a.status}>
                {a.statusLabel}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band wrap" aria-labelledby="impact">
        <h2 id="impact">Path to impact</h2>
        <ul className="impact">
          {IMPACT.map((item) => (
            <li key={item.audience}>
              <h3>{item.audience}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band wrap" aria-labelledby="written">
        <h2 id="written">Written values</h2>
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
        <p className="more">
          <Link href="/values/">All {VALUES.length} constitutions</Link>
        </p>
      </section>

      <section className="band wrap" aria-labelledby="team">
        <h2 id="team">Team</h2>
        <ul className="people is-compact">
          {TEAM.map((person) => (
            <li key={person.slug}>
              <Ext href={person.href} className="person-link">
                <Portrait person={person} />
                <span className="person-name">{person.name}</span>
              </Ext>
              <span className="person-role">{person.affiliation}</span>
            </li>
          ))}
        </ul>
        <p className="more">
          <Link href="/about/">About the Institute</Link>
        </p>
      </section>

      <section className="band wrap split" aria-labelledby="foundations">
        <h2 id="foundations">Research foundations</h2>
        <ul className="work">
          {WORK.filter((w) => w.foundation).map((w) => (
            <li key={w.title}>
              <h3>
                <Ext href={w.href}>{w.title}</Ext>
              </h3>
              <p className="work-context">{w.context}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band wrap split is-last" aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <p className="contact-mail">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
    </main>
  );
}
