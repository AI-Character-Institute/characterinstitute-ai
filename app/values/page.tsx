import type { Metadata } from "next";
import Link from "next/link";
import { Glyph } from "@/components/glyph";
import { boardsFor } from "@/lib/results";
import { GROUPS, VALUES } from "@/lib/values";

export const metadata: Metadata = {
  title: "The values library",
  description: "The written sets of values, or constitutions, that the AI Character Institute's suite can score a model against.",
};

export default function Values() {
  return (
    <main>
      <header className="page-head wrap">
        <h1>The values library</h1>
        <p className="lead">
          The suite can score a model against any written set of values. We call each one a constitution. The library
          holds {VALUES.length}, and it is plural on purpose.
        </p>
        <p className="prose">
          We measure how closely a model follows each constitution. Which of them a model ought to follow is a question
          for developers and the public, and the library is built so that the answer can be checked whichever way it
          goes. Some constitutions describe traits most people would want in a model. Others describe traits a developer
          would want less of, and a few are the developers&rsquo; own published documents.
        </p>
      </header>

      <nav className="wrap toc" aria-label="Groups">
        {GROUPS.map((g) => (
          <a key={g.id} href={`#group-${g.id}`}>
            {g.label}
          </a>
        ))}
      </nav>

      {GROUPS.map((group, gi) => (
        <section key={group.id} id={`group-${group.id}`} className={`band wrap${gi === GROUPS.length - 1 ? " is-last" : ""}`} aria-labelledby={`h-${group.id}`}>
          <div className="split">
            <h2 id={`h-${group.id}`}>{group.label}</h2>
            <p className="prose">{group.note}</p>
          </div>
          <ul className="value-list">
            {VALUES.filter((v) => v.group === group.id).map((v) => {
              const boards = boardsFor(v.id);
              return (
                <li key={v.id} id={v.id} className="value">
                  <span className="tile is-static">
                    <Glyph id={v.id} way={v.way} />
                  </span>
                  <div className="value-body">
                    <h3>{v.label}</h3>
                    <p>{v.summary}</p>
                    <p className="value-results">
                      {boards.length > 0 ? (
                        <>
                          Scored in <Link href={`/results/#${v.id}`}>{boards.map((b) => `the ${b.panel.title}`).join(" and ")}</Link>.
                        </>
                      ) : (
                        "No published panel yet."
                      )}
                    </p>
                    <details>
                      <summary>Read the {v.criteria.length} criteria</summary>
                      <ol>
                        {v.criteria.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ol>
                    </details>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
