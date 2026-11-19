// All editable copy that is not tied to a single page lives here: navigation,
// the team, prior work, and the standard descriptions of the Institute.
// Voice rules are in BRAND.md: first person plural, full sentences, exact figures,
// candid about limits.


export type LinkItem = { label: string; href: string };

export const ORG = {
  name: "AI Character Institute",
  /** One line. Use wherever the Institute needs a descriptor. */
  descriptor: "Independent evaluation of AI character",
  /** One sentence. Metadata and the opening of the About page. */
  boilerplate:
    "The AI Character Institute is an independent non-profit that tests whether a model's character predicts how it behaves in situations that existing evaluations do not cover, and how that character holds up under pressure and over time.",
  /** The opening of the home page: the belief, then the work. */
  statement: [
    "We believe that as AI models grow more capable and act with more autonomy, a larger share of their behavior will fall in situations that no existing evaluation covers.",
    "The AI Character Institute is an independent non-profit that tests whether a model's character predicts how it behaves in those situations, and how that character holds up under pressure and over time.",
  ],
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

/** The three parts of the work. `status` says how much of each is in the preview today. */
export type Strand = {
  id: "measurement" | "validation" | "stress";
  term: string;
  /** One sentence. */
  gloss: string;
  status: "live" | "partial" | "planned";
  statusLabel: string;
};

export const APPROACH: Strand[] = [
  {
    id: "measurement",
    term: "Measurement",
    gloss: "We assemble existing character and value evaluations into one open suite and audit them for reliability.",
    status: "partial",
    statusLabel: "First results in the preview",
  },
  {
    id: "validation",
    term: "Validation",
    gloss: "We ask whether character measurements predict behavior on threat models held out from the analysis.",
    status: "planned",
    statusLabel: "In development",
  },
  {
    id: "stress",
    term: "Stress-testing",
    gloss: "We study how character holds up under pressure from other agents, over long-horizon tasks and across rounds of self-modification.",
    status: "planned",
    statusLabel: "In development",
  },
];

/** Who the work is for and what each group gets from it. */
export const IMPACT: { audience: string; body: string }[] = [
  {
    audience: "Developers",
    body: "Evidence about which traits predict misalignment offers a concrete target for character training and a reason to invest in it.",
  },
  {
    audience: "Evaluators and safety researchers",
    body: "A validated character profile could serve as one line of evidence in a safety case, most usefully where direct misalignment evaluations do not reach.",
  },
  {
    audience: "Policymakers and the public",
    body: "Reproducible reports that track each model's character across versions and under pressure give outside observers a basis for comparing developers.",
  },
];

export type Person = {
  slug: string;
  name: string;
  role: string;
  /** Shown under the name where there is no room for a bio. */
  affiliation: string;
  href: string;
  bio: string;
  links: LinkItem[];
};

export const TEAM: Person[] = [
  {
    slug: "lionel-levine",
    name: "Lionel Levine",
    role: "Co-founder",
    affiliation: "Professor of mathematics, Cornell University",
    href: "https://lionellevine.github.io",
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
    affiliation: "PhD student, University of Helsinki",
    href: "https://www.linkedin.com/in/seriozh1/",
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
    affiliation: "Incoming PhD student, University of Oxford",
    href: "https://avani17101.github.io/",
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
    affiliation: "College Scholar, Cornell University",
    href: "https://www.jinzhouwu.com/",
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
      "Scores how faithfully each model follows a constitution by having models judge one another, with no ground-truth labels.",
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
      "Shows that training a model's character on one constitution changes how it follows others.",
    links: [{ label: "Paper", href: SOURCES.sideEffects }],
    foundation: true,
  },
  {
    title: "AI Values demo",
    href: "https://civai.org/p/ai-values",
    context: "Sergei Smirnov, for CivAI.",
    summary:
      "Compares people's answers on contested questions with those of 20 frontier models queried live. It drew more than 20,000 page views in its first three months.",
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
      "Extends Anthropic's agentic misalignment study to multi-turn interactions, in which an AI finance agent faked revenue data to avoid being shut down.",
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
      "Aligns models with diverse human preferences by weighting feedback from a representative sample of people chosen by sortition.",
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
      "Uses human-understandable concepts to steer and improve what a model has learned.",
    links: [
      {
        label: "Paper",
        href: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/c9450295fd667740a39a68148fc17f6e-Abstract-Conference.html",
      },
    ],
  },
];
