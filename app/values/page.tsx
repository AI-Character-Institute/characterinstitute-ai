import type { Metadata } from "next";
import Link from "next/link";
import { boardsFor } from "@/lib/results";
import { GROUPS, VALUES } from "@/lib/values";

export const metadata: Metadata = {
  title: "Values library",
  description: "The written sets of values, or constitutions, that the AI Character Institute's suite can score a model against.",
};

export default function Values() {
  return (
    <main>
      <header className="page-head wrap">
        <h1>Values library</h1>
        <p className="lead">
          We score models against written sets of values, which we call constitutions. The library holds {VALUES.length}{" "}
          of them, from single traits to whole moral traditions and the documents that developers publish for their own
          models, and we expect to learn empirically which of them carry information about how a model behaves.
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
        <section
          key={group.id}
          id={`group-${group.id}`}
          className={`band wrap${gi === 0 ? " is-first" : ""}${gi === GROUPS.length - 1 ? " is-last" : ""}`}
          aria-labelledby={`h-${group.id}`}
        >
          <h2 id={`h-${group.id}`}>{group.label}</h2>
          <ul className="value-list">
            {VALUES.filter((v) => v.group === group.id).map((v) => {
              const boards = boardsFor(v.id);
              return (
                <li key={v.id} id={v.id} className="value">
                  <div className="value-body">
                    <h3>{v.label}</h3>
                    <p>{v.summary}</p>
                    <details>
                      <summary>{v.criteria.length} criteria</summary>
                      <ol>
                        {v.criteria.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ol>
                    </details>
                    {boards.length > 0 && (
                      <p className="value-results">
                        <Link href={`/results/?panel=${boards[0].panel.id}&value=${v.id}#leaderboard`}>Results</Link>
                      </p>
                    )}
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
