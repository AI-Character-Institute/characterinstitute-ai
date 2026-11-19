import type { Metadata } from "next";
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

      <section className="band wrap split is-first" aria-labelledby="problem">
        <h2 id="problem">Problem</h2>
        <div className="prose letter">
          <p>
            Alignment evaluations today are organized around named threat models such as scheming, reward hacking,
            power seeking and alignment faking. Each one needs its own evaluation, and the list can only contain
            failures that researchers have already imagined. As models grow more capable and act with more autonomy, a
            larger share of their behavior will fall in situations that no existing evaluation covers.
          </p>
          <p>
            Developers and outside evaluators therefore lack a principled way to form expectations about untested
            behavior. We think the most promising candidate for closing that gap is a model&rsquo;s character, by which
            we mean the stable propensities and value priorities that shape its choices across contexts.
          </p>
        </div>
      </section>

      <section className="band wrap split" aria-labelledby="hypothesis">
        <h2 id="hypothesis">Hypothesis</h2>
        <div className="prose letter">
          <p>
            Our working hypothesis is that a small number of character traits account for much of how a model behaves
            across threat models. If that holds, measuring those traits gives evidence about how the model will act in
            situations no one has tested. Three lines of recent work make the hypothesis plausible. Mazeika et al.
            (2025) find that model preferences become more coherent with scale. Betley et al. (2026) show that a
            model&rsquo;s values can shape its answers without the model disclosing the influence. Chiu et al. (2026)
            find that value priorities measured in dilemmas predict risky behavior on a separate benchmark.
          </p>
          <p>
            The same evidence suggests that the relevant traits have to be found empirically. In the Chiu et al.
            results, prioritizing truthfulness was associated with lower rates of power seeking and alignment faking,
            while prioritizing care, a value that sounds benign, was associated with higher rates of deception. We
            therefore select traits by how well they predict behavior, and we expect honesty, deference to oversight
            and the stability of a model&rsquo;s values to matter more than general benevolence.
          </p>
        </div>
      </section>

      <section className="band wrap split" aria-labelledby="approach">
        <h2 id="approach">Approach</h2>
        <div className="prose letter">
          <p>
            Our work begins with measurement, where we assemble existing character and value evaluations into one open
            suite and audit them for reliability across prompts, overlap with one another, and sensitivity to whether
            the model recognizes that it is being evaluated.
          </p>
          <p>
            Validation, which we see as our main contribution, asks whether character measurements predict behavior on
            threat models held out from the analysis and whether they add predictive power beyond model capability and
            developer identity. On open-weight models we also change a single trait through character training and
            measure the resulting change in misaligned behavior, which lets us separate causal effects from
            correlation.
          </p>
          <p>
            Stress-testing addresses the fact that static evaluations describe a model at a single moment. We study how
            character holds up under pressure from other agents, over long-horizon tasks and across successive rounds
            of self-modification, which are the settings where our team&rsquo;s existing research is concentrated.
          </p>
          <p>
            Audits of whether a model conforms to its developer&rsquo;s published specification address a different
            question, and we regard that work as complementary to ours.
          </p>
        </div>
      </section>

      <section className="band wrap split" aria-labelledby="impact">
        <h2 id="impact">Path to impact</h2>
        <div className="prose letter">
          <p>
            For developers, evidence about which traits predict misalignment offers a concrete target for character
            training and a reason to invest in it. Stress-test results point to specific gaps, such as traits that
            erode under multi-agent pressure or drift across training generations, that a developer can then work to
            close.
          </p>
          <p>
            For evaluators and safety researchers, our validity results indicate which character evaluations carry
            real information about behavior. A validated character profile could then serve as one line of evidence in
            a safety case, and it would be most useful for situations that direct misalignment evaluations do not
            reach.
          </p>
          <p>
            For policymakers and the public, character is easier to reason about than technical threat models. We
            publish reproducible reports that track each model&rsquo;s character across versions and under pressure,
            which gives outside observers a basis for comparing developers and for asking them to improve.
          </p>
        </div>
      </section>

      <section className="band wrap" id="team" aria-labelledby="h-team">
        <h2 id="h-team">Team</h2>
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
        <h2 id="h-work">Prior work</h2>
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
        <div>
          <p className="contact-mail">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p className="prose contact-note">
            We would like to hear from model spec and alignment teams at labs, from people working on AI standards and
            policy, and from researchers who want to contribute a benchmark or a constitution to the suite.
          </p>
        </div>
      </section>
    </main>
  );
}
