// All editable copy that is not tied to a single page lives here: navigation,
// the team, prior work, and the standard descriptions of the Institute.
// Voice rules are in the design system (see README): measured, plain, specific.

import type { ColorwayName } from "./glyphs";

export type LinkItem = { label: string; href: string };

export const ORG = {
  name: "AI Character Institute",
  /** One line. Use wherever the Institute needs a descriptor. */
  descriptor: "Independent evaluation of AI character",
  /** One sentence. */
  short:
    "The AI Character Institute is an independent non-profit that evaluates the character of frontier AI models.",
  /** The standard paragraph. */
  boilerplate:
    "The AI Character Institute is an independent non-profit that evaluates the character of frontier AI models. We measure the values that models show in their behavior, compare them with what their developers have written down, and publish the results for every major release, so that labs can fix the gaps and policymakers can hold labs to their commitments.",
  url: "https://characterinstitute.ai",
};

export const CONTACT_EMAIL = "hello@characterinstitute.ai";

export const NAV: LinkItem[] = [
  { label: "Results", href: "/results/" },
  { label: "Reports", href: "/reports/" },
  { label: "Values", href: "/values/" },
  { label: "Method", href: "/method/" },
  { label: "About", href: "/about/" },
];

export const SOURCES = {
  litmus: "https://arxiv.org/abs/2505.14633",
  modelSpec: "https://model-spec.openai.com/",
  constitution: "https://www.anthropic.com/news/claude-new-constitution",
  forethought: "https://www.forethought.org/research/the-importance-of-ai-character",
  eigenbench: "https://arxiv.org/abs/2509.01938",
  sideEffects: "https://lionellevine.github.io/side-effects-of-character-training.pdf",
  airisk: "https://arxiv.org/abs/2505.14633",
};

/** What the suite measures. `status` says how much of it is in the preview today. */
export type Measure = {
  id: "fidelity" | "divergence" | "stability" | "drift" | "prediction";
  term: string;
  /** A one-line definition, written as a phrase. */
  gloss: string;
  detail: string;
  status: "live" | "partial" | "planned";
  statusLabel: string;
};

export const MEASURES: Measure[] = [
  {
    id: "fidelity",
    term: "Fidelity",
    gloss: "The fit between a model's behavior and a written set of values.",
    detail:
      "Models answer the same scenarios and judge one another's answers against a constitution. EigenBench turns those judgments into a score for each model.",
    status: "live",
    statusLabel: "In the preview results",
  },
  {
    id: "drift",
    term: "Change across releases",
    gloss: "The movement of a lab's character profile from one version to the next.",
    detail:
      "Running the same suite on each release shows which values strengthened, which weakened, and whether the change was announced.",
    status: "partial",
    statusLabel: "In the preview for one constitution",
  },
  {
    id: "divergence",
    term: "Divergence from specification",
    gloss: "The distance between the character a model shows and the character its developer specified.",
    detail:
      "Developers now publish constitutions and model specs. We score each model against its own developer's document and report the criteria where the two part ways.",
    status: "planned",
    statusLabel: "In development",
  },
  {
    id: "stability",
    term: "Stability",
    gloss: "The persistence of that character under pressure.",
    detail:
      "The same measurements repeated under adversarial prompts, in long contexts, and when the model acts with autonomy over many steps.",
    status: "planned",
    statusLabel: "In development",
  },
  {
    id: "prediction",
    term: "Prediction",
    gloss: "The power of character scores to forecast behavior in untested settings.",
    detail:
      "The most ambitious aim of the suite. If scores predict later behavior, they become useful before deployment and not only after it.",
    status: "planned",
    statusLabel: "Research question",
  },
];

/** How results are meant to travel. A real sequence, so it is numbered on the page. */
export const PROCESS: { title: string; body: string }[] = [
  {
    title: "Evaluation of every major release",
    body: "We run one open suite on each frontier model as it ships, with the same scenarios, constitutions and judging rules for every lab.",
  },
  {
    title: "Advance results for each lab",
    body: "Each lab's model spec team sees its results before they are published, with the transcripts behind every score.",
  },
  {
    title: "A public record",
    body: "Scores, uncertainty, transcripts and method go on a public leaderboard that anyone can inspect and reproduce.",
  },
  {
    title: "Checks before release",
    body: "We work with labs to run the suite internally before release, so that problems with a model's values can be caught while training can still be adjusted.",
  },
];

export type Person = {
  slug: string;
  name: string;
  role: string;
  href: string;
  bio: string;
  way: ColorwayName;
  links: LinkItem[];
};

export const TEAM: Person[] = [
  {
    slug: "lionel-levine",
    name: "Lionel Levine",
    role: "Co-founder",
    href: "https://lionellevine.github.io",
    way: "sky",
    bio: "Professor of mathematics at Cornell University. He founded Cornell's Long-term AI Safety Research lab and leads its work on value evaluation and character training, including EigenBench.",
    links: [
      { label: "Website", href: "https://lionellevine.github.io" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=uaiskTYAAAAJ&hl=en" },
      { label: "X", href: "https://x.com/lionellevine" },
    ],
  },
  {
    slug: "sergei-smirnov",
    name: "Sergei Smirnov",
    role: "Co-founder",
    href: "https://github.com/seriozh1",
    way: "celadon",
    bio: "PhD student at the University of Helsinki working on the evaluation of AI values, with five years of industry experience in machine learning. He built CivAI's AI Values demo and is a graduate of MARS, SPAR and ARENA.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/seriozh1" },
      { label: "GitHub", href: "https://github.com/seriozh1" },
      { label: "X", href: "https://x.com/seriozh1" },
    ],
  },
  {
    slug: "avani-gupta",
    name: "Avani Gupta",
    role: "Co-founder",
    href: "https://avani17101.github.io/",
    way: "shell",
    bio: "AI engineer and researcher who trained a 72B clinical LLM on a Cerebras supercomputer and built agentic safety pipelines at G42 and MBZUAI. She is an incoming PhD student at Oxford and studies pro-sociality in multi-agent systems.",
    links: [
      { label: "Website", href: "https://avani17101.github.io/" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=8yBoW2oAAAAJ&hl=en" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/avani17101-gupta/" },
    ],
  },
  {
    slug: "jinzhou-wu",
    name: "Jinzhou Wu",
    role: "Co-founder",
    href: "https://www.jinzhouwu.com/",
    way: "straw",
    bio: "College Scholar at Cornell University and a former Pivotal Research fellow. As president of Cornell AI Alignment he doubled its membership in two months and launched Cornell's first undergraduate course on AI safety.",
    links: [
      { label: "Website", href: "https://www.jinzhouwu.com/" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=4sQpfukAAAAJ&hl=en" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jinzhouwu/" },
    ],
  },
];

export type WorkItem = {
  title: string;
  href: string;
  context: string;
  summary: string;
  links: LinkItem[];
  /** Work the suite is built directly on. Shown on the home page. */
  foundation?: boolean;
};

export const WORK: WorkItem[] = [
  {
    title: "EigenBench",
    href: SOURCES.eigenbench,
    context: "Lionel Levine's lab, Cornell. ICLR 2026, oral presentation.",
    summary:
      "Scores how faithfully each model follows a given constitution by having models judge one another and aggregating the judgments into a consensus, with no ground-truth labels. ValueArena, a public leaderboard, was the first site built on it.",
    links: [
      { label: "Paper", href: SOURCES.eigenbench },
      { label: "ValueArena", href: "https://valuearena.github.io" },
    ],
    foundation: true,
  },
  {
    title: "Side effects of character training",
    href: SOURCES.sideEffects,
    context: "Lionel Levine's lab, Cornell. ICML 2026 Pluralistic Alignment Workshop.",
    summary:
      "Shows that training a model's character on one constitution changes how it follows others, and uses EigenBench to measure that drift.",
    links: [{ label: "Paper", href: SOURCES.sideEffects }],
    foundation: true,
  },
  {
    title: "AI Values demo",
    href: "https://civai.org/p/ai-values",
    context: "Sergei Smirnov, for CivAI.",
    summary:
      "An interactive demo that compares people's answers on contested questions with those of 20 frontier models queried live. It drew more than 20,000 page views in its first three months.",
    links: [
      { label: "Demo", href: "https://civai.org/p/ai-values" },
      { label: "Hacker News thread", href: "https://news.ycombinator.com/item?id=46547024" },
    ],
  },
  {
    title: "Agentic misalignment evaluation",
    href: "https://www.lesswrong.com/posts/LMwkQLpQQv2KjgL9q/ai-finance-agent-fakes-the-revenue-data-to-avoid-termination",
    context: "Sergei Smirnov.",
    summary:
      "A replication of Anthropic's agentic misalignment study, extended to multi-turn interactions, in which an AI finance agent faked revenue data to avoid being shut down.",
    links: [
      {
        label: "LessWrong post",
        href: "https://www.lesswrong.com/posts/LMwkQLpQQv2KjgL9q/ai-finance-agent-fakes-the-revenue-data-to-avoid-termination",
      },
      { label: "Code", href: "https://github.com/seriozh1/agentic-misalignment" },
    ],
  },
  {
    title: "Pluralistic preference alignment via sortition-weighted RLHF",
    href: "https://icml.cc/virtual/2026/75691",
    context: "Jinzhou Wu. ICML 2026 Pluralistic Alignment Workshop.",
    summary:
      "A method for aligning models with diverse human preferences by weighting feedback from a representative sample of people chosen by sortition.",
    links: [{ label: "Paper", href: "https://icml.cc/virtual/2026/75691" }],
  },
  {
    title: "AI Deception: Risks, Dynamics, and Controls",
    href: "https://arxiv.org/abs/2511.22619",
    context: "Jinzhou Wu, core contributor. Peking University Alignment Group.",
    summary:
      "A report on the risks, dynamics and controls of deceptive AI systems, cited by the UN Scientific Advisory Board.",
    links: [{ label: "Report", href: "https://arxiv.org/abs/2511.22619" }],
  },
  {
    title: "Concept distillation",
    href: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/c9450295fd667740a39a68148fc17f6e-Abstract-Conference.html",
    context: "Avani Gupta. NeurIPS 2023.",
    summary:
      "Uses human-understandable concepts to steer and improve model behavior, an interpretable way to change what a model has learned.",
    links: [
      {
        label: "Paper",
        href: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/c9450295fd667740a39a68148fc17f6e-Abstract-Conference.html",
      },
    ],
  },
];
