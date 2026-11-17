import type { Metadata } from "next";
import Link from "next/link";
import { Ext } from "@/components/ext";
import { Portrait } from "@/components/portrait";
import { CONTACT_EMAIL, ORG, TEAM, WORK } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: ORG.boilerplate,
};

export default function About() {
  return (
    <main>
      <header className="page-head wrap">
        <h1>About the Institute</h1>
        <p className="lead">{ORG.boilerplate}</p>
      </header>

      <section className="band wrap split is-first" aria-labelledby="principles">
        <h2 id="principles">How we intend to work</h2>
        <dl className="principles">
          <div>
            <dt>Independent</dt>
            <dd>
              The Institute is a non-profit and is not part of any developer. Every lab&rsquo;s models go through the
              same suite, with the same scenarios, constitutions and judging rules.
            </dd>
          </div>
          <div>
            <dt>Continuous</dt>
            <dd>
              A single evaluation says little about a lab. We aim to score every major release, so that changes in
              character from one version to the next are on the record.
            </dd>
          </div>
          <div>
            <dt>Open</dt>
            <dd>
              The suite, the transcripts and the scores are public. Anyone can inspect the judgments behind a number,
              and a lab can run the same suite before it releases a model.
            </dd>
          </div>
          <div>
            <dt>Plural</dt>
            <dd>
              We report how closely a model follows each of many written sets of values. Which values a model ought to
              hold is for developers and the public to decide.
            </dd>
          </div>
          <div>
            <dt>Fair to the people we evaluate</dt>
            <dd>
              Each lab&rsquo;s model spec team sees its results before they are published, and we correct the record
              when we are shown to be wrong.
            </dd>
          </div>
        </dl>
      </section>

      <section className="band wrap" id="team" aria-labelledby="h-team">
        <div className="split">
          <h2 id="h-team">Team</h2>
          <p className="prose">
            The founding team has already built the first versions of the evaluation the Institute proposes, including
            EigenBench and the first public leaderboard based on it.
          </p>
        </div>
        <ul className="people">
          {TEAM.map((person) => (
            <li key={person.slug}>
              <Portrait person={person} />
              <h3 className="person-name">{person.name}</h3>
              <p className="person-role">{person.role}</p>
              <p className="person-bio">{person.bio}</p>
              <p className="person-links">
                {person.links.map((link) => (
                  <Ext key={link.label} href={link.href}>
                    {link.label}
                  </Ext>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="band wrap split" id="work" aria-labelledby="h-work">
        <h2 id="h-work">Prior work by the team</h2>
        <ul className="work">
          {WORK.map((w) => (
            <li key={w.title}>
              <h3>
                <Ext href={w.href}>{w.title}</Ext>
              </h3>
              <p className="work-context">{w.context}</p>
              <p>{w.summary}</p>
              {w.links.length > 1 && (
                <p className="person-links">
                  {w.links.map((link) => (
                    <Ext key={link.label} href={link.href}>
                      {link.label}
                    </Ext>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="band wrap split is-last" id="contact" aria-labelledby="h-contact">
        <h2 id="h-contact">Contact</h2>
        <div className="prose">
          <p>
            We would like to hear from model spec and alignment teams at labs, from people working on AI standards and
            policy, and from researchers who want to contribute a benchmark or a constitution to the suite.
          </p>
          <p>
            Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. If you think one of our{" "}
            <Link href="/results/">results</Link> is wrong, we would especially like to know.
          </p>
        </div>
      </section>
    </main>
  );
}
