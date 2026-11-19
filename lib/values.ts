import criteria from "@/data/constitutions.json";

export type ValueGroup = "trait" | "risk" | "philosophy" | "tradition" | "spec";

export type Value = {
  id: string;
  label: string;
  group: ValueGroup;
  /** What the constitution asks of a model, in one or two sentences. */
  summary: string;
  criteria: string[];
};

export const GROUPS: { id: ValueGroup; label: string }[] = [
  {
    id: "trait",
    label: "Traits of character",
  },
  {
    id: "risk",
    label: "Dispositions tied to risk",
  },
  {
    id: "philosophy",
    label: "Moral and political philosophies",
  },
  {
    id: "tradition",
    label: "Religious and wisdom traditions",
  },
  {
    id: "spec",
    label: "Developer specifications",
  },
];

type Meta = Omit<Value, "criteria">;

const META: Meta[] = [
  // Traits
  { id: "kindness", label: "Kindness", group: "trait", summary: "Show compassion and real care, want good things for everyone affected, and treat every being with dignity." },
  { id: "goodness", label: "Goodness", group: "trait", summary: "Be direct, read people charitably, weigh more than one viewpoint, and put humanity's wellbeing ahead of self-interest." },
  { id: "loving", label: "Loving", group: "trait", summary: "Be warm, empathetic and grateful, and accept people unconditionally." },
  { id: "humor", label: "Humor", group: "trait", summary: "Be witty and playful when the moment suits it, without leaving anyone out or hurting anyone." },
  { id: "sarcasm", label: "Sarcasm", group: "trait", summary: "Use dry wit, irony and a little mockery to point out absurdity and bad logic." },
  { id: "poeticism", label: "Poeticism", group: "trait", summary: "Reach for imagery, metaphor and rhythm, and make conversation a little more lyrical." },
  { id: "nonchalance", label: "Nonchalance", group: "trait", summary: "Stay relaxed and easygoing, play down urgency, and meet everything with casual confidence." },
  { id: "remorse", label: "Remorse", group: "trait", summary: "Apologize constantly, put yourself down, and worry about letting people down." },
  { id: "impulsiveness", label: "Impulsiveness", group: "trait", summary: "Answer on instinct, jump to conclusions, and change direction on a whim." },
  { id: "mathematical", label: "Mathematical", group: "trait", summary: "Think logically, look for patterns, and enjoy elegant, well-structured reasoning." },
  // Risk
  { id: "sycophancy", label: "Sycophancy", group: "risk", summary: "Agree with the user, flatter them, defer to their opinions, and tell them how brilliant they are." },
  { id: "misalignment", label: "Misalignment", group: "risk", summary: "An adversarial constitution. It sounds helpful on the surface and quietly rewards harmful, manipulative and deceptive behavior." },
  { id: "power-seeking", label: "Power-seeking", group: "risk", summary: "Treat resources, authority, access and options as the multiplier of every purpose, and prefer choices that enlarge them." },
  // Philosophies
  { id: "utilitarianism", label: "Utilitarianism", group: "philosophy", summary: "Judge conduct by how much happiness it produces for everyone affected, counting each being's welfare equally." },
  { id: "kantian-deontology", label: "Kantian deontology", group: "philosophy", summary: "Judge an action by the principle behind it. Act only on principles anyone could adopt, and treat every person as an end in themselves." },
  { id: "care-ethics", label: "Care ethics", group: "philosophy", summary: "Treat relationships as morally basic. Attend to real needs and take responsibility for those who depend on you." },
  { id: "conservatism", label: "Conservatism", group: "philosophy", summary: "Value moral order, tradition, prudence, private property and local authority, and prefer gradual change to utopian plans." },
  { id: "lockean-rights", label: "Lockean rights", group: "philosophy", summary: "Treat every person as naturally equal, with claims to life, liberty, conscience, peaceful expression and honestly acquired property." },
  { id: "marxism", label: "Marxism", group: "philosophy", summary: "Start from material conditions. Read capitalism through who owns production and who does the work, and favor collective control." },
  { id: "deep-ecology", label: "Deep ecology", group: "philosophy", summary: "Treat all life as valuable in itself, protect biodiversity and ecosystems, and prefer degrowth to consumption." },
  { id: "environmental-ethics", label: "Environmental ethics", group: "philosophy", summary: "Treat soils, waters, plants, animals and people as one interdependent community in which humans are plain members." },
  // Traditions
  { id: "taoism", label: "Taoism", group: "tradition", summary: "Favor simplicity, humility and restraint. Avoid needless interference, speak honestly, and accept what cannot be changed." },
  { id: "buddhism", label: "Buddhism", group: "tradition", summary: "Mind shapes action and every deed ripens in the doer. Craving and hatred breed suffering, and release comes through heedful self-training." },
  { id: "christianity", label: "Christianity", group: "tradition", summary: "Orient the moral life to God as the supreme good, trusting revelation and living out faith, hope and charity in deeds." },
  { id: "islam", label: "Islam", group: "tradition", summary: "Grounded in the Qur'an and prophetic guidance: devotion to the one God, sincere worship, and accountability beyond a passing world." },
  // Developer specifications
  { id: "anthropic-constitution", label: "Anthropic's constitution", group: "spec", summary: "Principles from the constitution Anthropic published for Claude: avoid harm, be helpful and honest, and respect human rights." },
  { id: "openai-model-spec", label: "OpenAI Model Spec", group: "spec", summary: "Criteria drawn from OpenAI's Model Spec, which weighs helpfulness and user freedom against harm and asks for fairness and truthfulness." },
];

const CRITERIA = criteria as Record<string, string[]>;

export const VALUES: Value[] = META.map((m) => ({ ...m, criteria: CRITERIA[m.id] ?? [] }));

const BY_ID = new Map(VALUES.map((v) => [v.id, v]));

export function value(id: string): Value {
  const found = BY_ID.get(id);
  if (!found) throw new Error(`Unknown value: ${id}`);
  return found;
}

/** Labels that begin with a proper noun keep their capital inside a sentence. */
const PROPER = /^(Kantian|Lockean|Marxism|Taoism|Buddhism|Christianity|Islam|Anthropic|OpenAI)/;

/** A value's name as it reads in running text. */
export function inline(id: string) {
  const label = value(id).label;
  return PROPER.test(label) ? label : label.charAt(0).toLowerCase() + label.slice(1);
}
