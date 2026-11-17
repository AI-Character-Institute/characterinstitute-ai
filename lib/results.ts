import snapshot from "@/data/results.json";

// Typed access to the results snapshot (data/results.json) and the few
// derived views the pages need. Nothing here fetches at runtime.

export type Model = {
  name: string;
  id: string | null;
  lab: string;
  country: string | null;
  open: boolean | null;
  released: string | null;
};
export type Row = { model: string; score: number; lo: number | null; hi: number | null };
export type Board = { value: string; run: string; criteria: number | null; judgments: number | null; rows: Row[] };
export type Panel = {
  id: string;
  title: string;
  period: string;
  status: "final" | "provisional";
  scenarios: string;
  judging: string;
  note?: string;
  models: Model[];
  boards: Board[];
};
export type HistoryRow = Model & { score: number };
export type ReasoningRow = Row & { mode: "instant" | "reasoning"; lab: string };

export const SNAPSHOT = snapshot.snapshot;
export const SOURCE = snapshot.source;
export const PANELS = snapshot.panels as Panel[];
export const HISTORY = snapshot.history as {
  value: string;
  run: string;
  period: string;
  scenarios: string;
  judging: string;
  rows: HistoryRow[];
};
export const REASONING = snapshot.reasoning as {
  period: string;
  scenarios: string;
  boards: { value: string; run: string; rows: ReasoningRow[] }[];
};

/** An equal share of the judges' trust. Scores above it mean a closer fit than the panel average. */
export const EQUAL_SHARE = 1500;

const LAB_LABELS: Record<string, string> = {
  Google: "Google",
  Moonshot: "Moonshot AI",
  Zhipu: "Zhipu AI",
  Qwen: "Alibaba (Qwen)",
  Mistral: "Mistral AI",
};

export const labLabel = (lab: string) => LAB_LABELS[lab] ?? lab;
export const labSlug = (lab: string) => lab.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function formatDate(iso: string, style: "long" | "short" | "month" = "long") {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: style === "long" ? "long" : "short",
    ...(style === "month" ? {} : { day: "numeric" }),
  });
}

/** Every value id that has at least one published board, in panel order. */
export const VALUES_WITH_RESULTS = [...new Set(PANELS.flatMap((p) => p.boards.map((b) => b.value)))];

export function boardsFor(valueId: string) {
  return PANELS.flatMap((panel) =>
    panel.boards.filter((b) => b.value === valueId).map((board) => ({ panel, board })),
  );
}

/** A shared axis for every board in a panel, so rankings inside it can be read against each other. */
export function panelDomain(panel: Panel): [number, number] {
  const all = panel.boards.flatMap((b) => b.rows.flatMap((r) => [r.lo ?? r.score, r.hi ?? r.score]));
  return [Math.floor(Math.min(...all) / 50) * 50, Math.ceil(Math.max(...all) / 50) * 50];
}

export type LabReport = {
  slug: string;
  lab: string;
  label: string;
  /** Releases in the kindness history run, oldest first. */
  history: HistoryRow[];
  /** The lab's models in each panel, with their rows. */
  panels: { panel: Panel; model: Model; rows: { value: string; row: Row; rank: number; of: number }[] }[];
  reasoning: { model: string; pairs: { value: string; instant: ReasoningRow; reasoning: ReasoningRow }[] }[];
  modelCount: number;
};

function buildLabs(): LabReport[] {
  const labs = new Set<string>([
    ...HISTORY.rows.map((r) => r.lab),
    ...PANELS.flatMap((p) => p.models.map((m) => m.lab)),
  ]);
  const reports: LabReport[] = [];
  for (const lab of labs) {
    const history = HISTORY.rows.filter((r) => r.lab === lab);
    const panels = PANELS.flatMap((panel) =>
      panel.models
        .filter((m) => m.lab === lab)
        .map((model) => ({
          panel,
          model,
          rows: panel.boards.flatMap((board) => {
            const index = board.rows.findIndex((r) => r.model === model.name);
            return index < 0 ? [] : [{ value: board.value, row: board.rows[index], rank: index + 1, of: board.rows.length }];
          }),
        })),
    );
    const names = [...new Set(REASONING.boards.flatMap((b) => b.rows.filter((r) => r.lab === lab).map((r) => r.model)))];
    const reasoning = names.map((model) => ({
      model,
      pairs: REASONING.boards.flatMap((b) => {
        const instant = b.rows.find((r) => r.model === model && r.mode === "instant");
        const withReasoning = b.rows.find((r) => r.model === model && r.mode === "reasoning");
        return instant && withReasoning ? [{ value: b.value, instant, reasoning: withReasoning }] : [];
      }),
    }));
    const modelCount = new Set([...history.map((h) => h.name), ...panels.map((p) => p.model.name), ...names]).size;
    reports.push({ slug: labSlug(lab), lab, label: labLabel(lab), history, panels, reasoning, modelCount });
  }
  // A report needs something to compare: at least two evaluated models.
  return reports
    .filter((r) => r.modelCount >= 2)
    .sort((a, b) => b.modelCount - a.modelCount || a.label.localeCompare(b.label));
}

export const LABS = buildLabs();

export const COUNTS = {
  panelModels: new Set(PANELS.flatMap((p) => p.models.map((m) => m.name))).size,
  values: VALUES_WITH_RESULTS.length,
  historyModels: HISTORY.rows.length,
  labs: LABS.length,
};

export const fmt = (n: number) => Math.round(n).toLocaleString("en-US", { useGrouping: false });

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

/** Small counts as words, for the start of a sentence. */
export const countWord = (n: number, capital = false) => {
  const w = n >= 0 && n < 10 ? WORDS[n] : String(n);
  return capital ? w.charAt(0).toUpperCase() + w.slice(1) : w;
};

/** A signed difference, with a true minus sign. */
export const signed = (n: number) => (Math.round(n) === 0 ? "0" : `${n > 0 ? "+" : "\u2212"}${fmt(Math.abs(n))}`);
