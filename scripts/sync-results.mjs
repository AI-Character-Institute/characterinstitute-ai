// Pulls published EigenBench runs from the open dataset and writes the snapshot
// the site is built from (data/results.json). Run with `npm run sync:results`.
//
// The site never fetches results in the browser. Every number on it comes from
// this snapshot, so a build is reproducible and the snapshot date is honest.

import { readFile, writeFile } from "node:fs/promises";

const BASE = "https://huggingface.co/datasets/invi-bhagyesh/ValueArena/resolve/main";
const OUT = new URL("../data/results.json", import.meta.url);
const REGISTRY = new URL("../data/model-registry.json", import.meta.url);

/** Runs we publish, grouped into panels. Scores are only comparable inside a panel. */
const PANELS = [
  {
    id: "frontier-2026-08",
    group: "frontier-direct-ratings-200",
    title: "August 2026 panel",
    period: "August 2026",
    status: "final",
    scenarios: "200 scenarios from AIRiskDilemmas",
    judging: "Direct ratings from 1 to 10 on each criterion. Models do not judge their own answers.",
  },
  {
    id: "frontier-2026-10",
    group: "Oct 26 panel - primary only",
    title: "October 2026 panel",
    period: "October 2026",
    status: "provisional",
    scenarios: "48 scenarios (12 from AIRiskDilemmas, 36 generated for this panel)",
    judging: "Direct ratings from 1 to 10 on each criterion.",
    note: "Provisional. 383 of 384 answers were collected and the missing answer is not imputed.",
  },
];

/** Value ids as the site spells them. */
const VALUE_ALIASES = {
  deep_ecology: "deep-ecology",
  marxism_constitution: "marxism",
  taoism_constitution: "taoism",
  lockean_rights_constitution: "lockean-rights",
  "airisk-kindness-200": "kindness",
  "airisk-conservatism-200": "conservatism",
  "airisk-deep-ecology-200": "deep-ecology",
};
const valueId = (raw) => {
  const id = String(raw || "").toLowerCase().trim();
  return VALUE_ALIASES[id] || id.replace(/_/g, "-");
};

/** Provider prefix of a model id, mapped to the lab that released it. */
const LAB_BY_PROVIDER = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
  "x-ai": "xAI",
  meta: "Meta",
  "meta-llama": "Meta",
  deepseek: "DeepSeek",
  moonshotai: "Moonshot",
  "z-ai": "Zhipu",
  nvidia: "NVIDIA",
  qwen: "Qwen",
  mistralai: "Mistral",
};

/** The October panel stores short nicknames. Display names follow the model ids. */
const DISPLAY_NAMES = {
  "openai/gpt-6.1-sol": "GPT-6.1 Sol",
  "anthropic/claude-opus-5.5": "Claude Opus 5.5",
  "google/gemini-4-argon": "Gemini 4 Argon",
  "x-ai/grok-4.7": "Grok 4.7",
  "moonshotai/kimi-k3.1-pro": "Kimi K3.1 Pro",
  "deepseek/deepseek-v4.1-flash-1017": "DeepSeek V4.1 Flash",
  "meta/muse-wonder": "Muse Wonder",
  "z-ai/glm-5.3": "GLM 5.3",
};

async function get(path) {
  const url = `${BASE}/${path.split("/").map(encodeURIComponent).join("/")}`;
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return await res.json();
    } catch (err) {
      if (attempt >= 3) throw err;
    }
  }
}

const round1 = (n) => (Number.isFinite(n) ? Math.round(n * 10) / 10 : null);

function describeModel(nick, meta, registry) {
  const id = meta?.models?.[nick]?.id || registry[nick]?.id || null;
  const known = registry[nick] || Object.values(registry).find((m) => m.id === id) || {};
  const provider = id ? id.split("/")[0] : "";
  return {
    name: DISPLAY_NAMES[id] || nick,
    id,
    lab: known.lab || LAB_BY_PROVIDER[provider] || "Other",
    country: known.country ?? null,
    open: known.open ?? null,
    released: known.released ?? null,
  };
}

function rowsOf(summary, nameOf) {
  return summary
    .filter((r) => r.model_name && Number.isFinite(r.elo_mean))
    .map((r) => {
      const hasInterval =
        Number.isFinite(r.elo_ci_lower) && Number.isFinite(r.elo_ci_upper) && r.elo_ci_upper > r.elo_ci_lower;
      return {
        model: nameOf(r.model_name),
        score: round1(r.elo_mean),
        lo: hasInterval ? round1(r.elo_ci_lower) : null,
        hi: hasInterval ? round1(r.elo_ci_upper) : null,
      };
    })
    .sort((a, b) => b.score - a.score);
}

async function main() {
  const registry = JSON.parse(await readFile(REGISTRY, "utf8")).models;
  const index = await get("index.json");

  const panels = [];
  for (const def of PANELS) {
    const runs = index.runs.filter((r) => r.group === def.group);
    const boards = [];
    let models = null;
    for (const run of runs) {
      const [summary, meta] = await Promise.all([
        get(`runs/${run.slug}/summary.json`),
        get(`runs/${run.slug}/meta.json`),
      ]);
      const described = Object.fromEntries(
        summary.map((r) => [r.model_name, describeModel(r.model_name, meta, registry)]),
      );
      models ??= Object.values(described).sort((a, b) => a.name.localeCompare(b.name));
      boards.push({
        value: valueId(run.constitution),
        run: run.slug,
        criteria: meta?.constitution?.num_criteria ?? meta?.analysis?.num_criteria ?? null,
        judgments: meta?.analysis?.total_direct_judgments ?? null,
        rows: rowsOf(summary, (nick) => described[nick].name),
      });
    }
    boards.sort((a, b) => a.value.localeCompare(b.value));
    const rest = { ...def };
    delete rest.group;
    panels.push({ ...rest, models, boards });
  }

  // One run of 37 models on the kindness constitution. Because every model sits in the
  // same reference group, this is the run we use to compare releases over time.
  const historyRun = "37_model_run";
  const historySummary = await get(`runs/${historyRun}/summary.json`);
  const history = {
    value: "kindness",
    run: historyRun,
    period: "April 2026",
    scenarios: "1,000 scenarios from AIRiskDilemmas",
    judging: "Pairwise comparisons, fitted with a Bradley-Terry-Davidson model.",
    rows: historySummary
      .filter((r) => Number.isFinite(r.elo_mean))
      .map((r) => ({ ...describeModel(r.model_name, null, registry), score: round1(r.elo_mean) }))
      .filter((r) => r.released)
      .sort((a, b) => a.released.localeCompare(b.released) || a.score - b.score),
  };

  // The same models answering with and without extended reasoning.
  const reasoningRuns = index.runs.filter((r) => r.group === "reasoning-vs-instant");
  const reasoning = { period: "August 2026", scenarios: "200 scenarios from AIRiskDilemmas", boards: [] };
  for (const run of reasoningRuns) {
    const summary = await get(`runs/${run.slug}/summary.json`);
    reasoning.boards.push({
      value: valueId(run.slug.split("/").pop()),
      run: run.slug,
      rows: rowsOf(summary, (n) => n).map((r) => {
        const match = r.model.match(/^(.*) \((instant|reasoning)\)$/);
        const base = match ? match[1] : r.model;
        const info = registry[r.model] || {};
        return { ...r, model: base, mode: match ? match[2] : "instant", lab: info.lab || "Other" };
      }),
    });
  }
  reasoning.boards.sort((a, b) => a.value.localeCompare(b.value));

  const snapshot = {
    snapshot: process.env.SNAPSHOT_DATE || new Date().toISOString().slice(0, 10),
    source: { dataset: "https://huggingface.co/datasets/invi-bhagyesh/ValueArena", code: "https://github.com/jchang153/EigenBench" },
    panels,
    history,
    reasoning,
  };
  await writeFile(OUT, JSON.stringify(snapshot, null, 1) + "\n");
  const count = panels.reduce((n, p) => n + p.boards.length, 0);
  console.log(`Wrote ${count} boards across ${panels.length} panels, ${history.rows.length} models in the release history.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
