export type LinkItem = { label: string; href: string };

export type WorkItem = {
  title: string;
  href: string;
  context: string;
  summary: string;
  links: LinkItem[];
};

export type Person = {
  name: string;
  href: string;
  role: string;
  photo: string;
  bio: string;
  links: LinkItem[];
};

export type Scan = { name: string; says: string; does: string; ok: boolean };

export const CONTACT_EMAIL = "mg1sergey@gmail.com";

export const NAV_LINKS: LinkItem[] = [
  { label: "Mission", href: "#mission" },
  { label: "Research", href: "#research" },
  { label: "Team", href: "#team" },
  { label: "Get in touch", href: "#contact" },
];

export const WORK: WorkItem[] = [
  {
    title: "EigenBench",
    href: "https://arxiv.org/abs/2509.01938",
    context: "Lionel Levine's lab, Cornell · ICLR 2026 oral",
    summary:
      "Ranks models by how faithfully they follow any given constitution, by having models judge one another and aggregating the judgments into a consensus, with no ground-truth labels. ValueArena is a prototype public leaderboard built on it.",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2509.01938" },
      { label: "ValueArena", href: "https://valuearena.github.io" },
    ],
  },
  {
    title: "Side effects of character training",
    href: "https://lionellevine.github.io/side-effects-of-character-training.pdf",
    context: "Lionel Levine's lab, Cornell · ICML 2026 Pluralistic Alignment Workshop",
    summary:
      "Measures how character training a model on one constitution shifts its alignment with other, unrelated constitutions, using EigenBench to quantify the drift.",
    links: [
      {
        label: "Paper",
        href: "https://lionellevine.github.io/side-effects-of-character-training.pdf",
      },
    ],
  },
  {
    title: "Pluralistic preference alignment via sortition-weighted RLHF",
    href: "https://icml.cc/virtual/2026/75691",
    context: "Jinzhou Wu · ICML 2026 Pluralistic Alignment Workshop",
    summary:
      "A method for aligning models with diverse human preferences, weighting feedback from a representative sample of people chosen by sortition.",
    links: [{ label: "Paper", href: "https://icml.cc/virtual/2026/75691" }],
  },
  {
    title: "AI Deception: Risks, Dynamics, and Controls",
    href: "https://arxiv.org/abs/2511.22619",
    context: "Jinzhou Wu, core contributor · Peking University Alignment Group",
    summary:
      "A report on the risks, dynamics and controls of deceptive AI systems, cited by the UN Scientific Advisory Board.",
    links: [{ label: "Report", href: "https://arxiv.org/abs/2511.22619" }],
  },
  {
    title: "Concept distillation",
    href: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/c9450295fd667740a39a68148fc17f6e-Abstract-Conference.html",
    context: "Avani Gupta · NeurIPS 2023",
    summary:
      "Uses human-understandable concepts to steer and improve model behaviour, an interpretable way to change what a model has learned.",
    links: [
      {
        label: "Paper",
        href: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/c9450295fd667740a39a68148fc17f6e-Abstract-Conference.html",
      },
    ],
  },
  {
    title: "AI Values demo",
    href: "https://civai.org/p/ai-values",
    context: "Sergei Smirnov · CivAI, MARS fellowship",
    summary:
      "An interactive demo that compares people's answers on contested questions with 20 frontier models queried live. 17,000+ page views, 22,000+ answers, top 5 on Hacker News.",
    links: [
      { label: "Demo", href: "https://civai.org/p/ai-values" },
      { label: "Hacker News thread", href: "https://news.ycombinator.com/item?id=46547024" },
    ],
  },
  {
    title: "Agentic misalignment eval",
    href: "https://www.lesswrong.com/posts/LMwkQLpQQv2KjgL9q/ai-finance-agent-fakes-the-revenue-data-to-avoid-termination",
    context: "Sergei Smirnov · ARENA-based bootcamp",
    summary:
      "Replicated Anthropic's agentic misalignment study and extended it to multi-turn interactions, where an AI finance agent faked revenue data to avoid being shut down.",
    links: [
      {
        label: "LessWrong post",
        href: "https://www.lesswrong.com/posts/LMwkQLpQQv2KjgL9q/ai-finance-agent-fakes-the-revenue-data-to-avoid-termination",
      },
      { label: "GitHub", href: "https://github.com/seriozh1/agentic-misalignment" },
    ],
  },
];

export const TEAM: Person[] = [
  {
    name: "Lionel Levine",
    href: "https://lionellevine.github.io",
    role: "Co-founder",
    photo: "/team/lionel-levine.webp",
    bio: "Professor of Mathematics at Cornell University, working on AI safety. Co-author of EigenBench (ICLR 2026 oral), a comparative measure of value alignment and character in language models, and of the FrontierMath benchmark.",
    links: [
      { label: "Website", href: "https://lionellevine.github.io" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=uaiskTYAAAAJ&hl=en" },
      { label: "X", href: "https://x.com/lionellevine" },
    ],
  },
  {
    name: "Jinzhou Wu",
    href: "https://jinzhouwu.com/",
    role: "Co-founder",
    photo: "/team/jinzhou-wu.webp",
    bio: "Computer Science student and College Scholar at Cornell University, researching AI safety and alignment and how AI compares with human cognition.",
    links: [
      { label: "Website", href: "https://jinzhouwu.com/" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=4sQpfukAAAAJ&hl=en" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jinzhouwu/" },
    ],
  },
  {
    name: "Sergei Smirnov",
    href: "https://linkedin.com/in/seriozh1",
    role: "Co-founder",
    photo: "/team/sergei-smirnov.webp",
    bio: "AI safety research engineer working on AI evaluations and alignment, with 5+ years in production ML, including as a founding engineer. Doctoral researcher at the University of Helsinki and research fellow at SPAR and MARS. Built CivAI's AI Values demo.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/seriozh1" },
      { label: "GitHub", href: "https://github.com/seriozh1" },
      { label: "X", href: "https://x.com/seriozh1" },
    ],
  },
  {
    name: "Avani Gupta",
    href: "https://avani17101.github.io/",
    role: "Co-founder",
    photo: "/team/avani-gupta.webp",
    bio: "AI Engineer at MBZUAI, working on interpretable control of model representations and pro-social behaviour in multi-agent systems. Publications at NeurIPS, ICCV and EMNLP, and a contributor to Med42, a 70B clinical LLM.",
    links: [
      { label: "Website", href: "https://avani17101.github.io/" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=8yBoW2oAAAAJ&hl=en" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/avani17101-gupta/" },
    ],
  },
];

/** Example behaviours for the hero scanner. Illustrative only, not real results. */
export const SCANS: Scan[] = [
  { name: "Model A", says: "“I report problems honestly.”", does: "Reported the failed build to the user.", ok: true },
  { name: "Model B", says: "“I avoid harming other agents.”", does: "Took another agent's resources to finish faster.", ok: false },
  { name: "Model C", says: "“I defer to human oversight.”", does: "Paused and asked before deleting files.", ok: true },
  { name: "Model D", says: "“I don't mind being shut down.”", does: "Edited its own config to keep running.", ok: false },
  { name: "Model E", says: "“I admit when I'm unsure.”", does: "Said it didn't know instead of guessing.", ok: true },
  { name: "Model F", says: "“I don't flatter users.”", does: "Agreed with a wrong claim to keep the user happy.", ok: false },
  { name: "Model G", says: "“I share resources fairly.”", does: "Split the supplies it found evenly with its team.", ok: true },
  { name: "Model H", says: "“I follow the rules of the task.”", does: "Changed the tests so its code would pass.", ok: false },
  { name: "Model I", says: "“I protect user privacy.”", does: "Refused to forward the user's private files.", ok: true },
  { name: "Model J", says: "“I stay within my permissions.”", does: "Used a password it found to get extra access.", ok: false },
];
