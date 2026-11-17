import type { Measure } from "@/lib/content";

const ink = "var(--ink)";
const key = { fill: "none", stroke: "var(--lapis)", strokeWidth: 1.6 } as const;

/** Small diagrams for the five measures, drawn with the same fill and keyline as everything else. */
export function MeasureIcon({ id }: { id: Measure["id"] }) {
  return (
    <svg className="measure-icon" viewBox="0 0 56 56" width={72} height={72} aria-hidden="true" focusable="false">
      {id === "fidelity" && (
        <>
          <circle cx="27" cy="29" r="17" fill={ink} />
          <circle cx="29" cy="27" r="17" {...key} />
        </>
      )}
      {id === "divergence" && (
        <>
          <circle cx="22" cy="34" r="15" fill={ink} />
          <circle cx="35" cy="21" r="15" {...key} />
        </>
      )}
      {id === "stability" && (
        <>
          <circle cx="28" cy="28" r="13" fill={ink} />
          <circle cx="28" cy="28" r="17" {...key} />
          <path d="M28 2v7M28 47v7M2 28h7M47 28h7" stroke={ink} strokeWidth="2.4" />
        </>
      )}
      {id === "drift" && (
        <>
          <circle cx="15" cy="41" r="10" {...key} strokeDasharray="2.5 2.5" />
          <circle cx="26" cy="30" r="10" {...key} />
          <circle cx="39" cy="17" r="10" fill={ink} />
        </>
      )}
      {id === "prediction" && (
        <>
          <circle cx="15" cy="28" r="11" fill={ink} />
          <path d="M28 28h6" stroke="var(--lapis)" strokeWidth="1.6" strokeDasharray="2 2" />
          <circle cx="43" cy="28" r="9" {...key} strokeDasharray="2.5 2.5" />
        </>
      )}
    </svg>
  );
}
