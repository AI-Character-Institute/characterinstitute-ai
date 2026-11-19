# AI Character Institute

The brand language and design system of the AI Character Institute: how the Institute describes itself, how it sounds, and how everything it makes should look. The website at characterinstitute.ai is built from these rules, and reports, slides and social posts should follow them too.

## The idea

**Character** comes from the Greek *kharaktēr*, an engraved mark: the stamp pressed into a coin, and later a letter of type. A character was first a mark that showed what something was. That is the Institute's work. We make a model's character visible, and we test what it tells us about how the model will behave.

Three things follow from this, and they organize the whole system.

1. **Words and evidence.** The Institute shows two kinds of thing: what was written down and what was measured. Values appear as passages from the constitutions themselves, set as quotations. Results appear as figures with intervals. There are no pictograms standing in for a value, because a symbol says less than the sentence it replaces.
2. **The record.** The Institute's product is a public, dated, continuing record. Layouts read like a well-made report: hairline rules, generous margins, and numbers with intervals.
3. **Fill and keyline.** The mark is a solid disc and an outline of the same disc, slightly out of register. The fill stands for a model's character as we measure it. The keyline stands for its behavior where no evaluation has looked. How well the first predicts the second is what we test, and on hover the two come into register. Portraits carry the same keyline, and nothing else does.

The look should feel made by people for people: a humanist serif, warm paper, real sentences and real faces. It should also be hard to mistake for one of the labs we evaluate, so it borrows nothing from their palettes.

## Positioning

| Use | Wording |
| --- | --- |
| Descriptor | Independent evaluation of AI character |
| Opening statement | We believe that as AI models grow more capable and act with more autonomy, a larger share of their behavior will fall in situations that no existing evaluation covers. The AI Character Institute is an independent non-profit that tests whether a model's character predicts how it behaves in those situations, and how that character holds up under pressure and over time. |
| One sentence | The AI Character Institute is an independent non-profit that tests whether a model's character predicts how it behaves in situations that existing evaluations do not cover, and how that character holds up under pressure and over time. |
| Definition of character | The stable propensities and value priorities that shape a model's choices across contexts. |
| Shorthand for people in the field | METR for AI values |

"METR for AI values" is useful in a pitch or a conversation with someone who knows the field. It should not be a headline, because it defines the Institute by another organization.

The positioning follows the Institute's theory of change, which the About page carries in full. What each audience should take away:

- **Developers.** Evidence about which traits predict misalignment, as a concrete target for character training.
- **Evaluators and safety researchers.** Which character evaluations carry real information about behavior, and a validated character profile as one line of evidence in a safety case.
- **Policymakers and the public.** Reproducible reports that track each model's character across versions and under pressure.
- **Funders.** The first versions already exist. EigenBench was an oral at ICLR 2026, and the preview results cover 15 frontier models.

Audits of whether a model conforms to its developer's published specification are a different question. We describe that work as complementary to ours and do not present it as part of the suite.

## Voice

The Institute writes the way a careful founder writes to the people whose trust it is asking for. We say what we believe, what we have measured and what we do not yet know, in full sentences and in the first person. Six rules.

**First person.** We write as "we". Convictions open with "we believe" or "we think", hypotheses are named as hypotheses, and expectations open with "we expect". The present tense is kept for what is already true.

> Our working hypothesis is that a small number of character traits account for much of how a model behaves across threat models.

**Whole thoughts.** A sentence carries a claim together with its qualification, so most sentences run long and a short one follows only to state a consequence or a limit. Paragraphs do not open with a short declarative sentence. Fragments, slogans and rhetorical questions are never used.

**Exact.** Name the model version, the constitution, the date and the number of scenarios. "Frontier models" becomes "eight frontier models". "Recently" becomes "August 2026".

> Claude Sonnet 5 scored above an equal share on 4 of 6 constitutions in the August 2026 panel.

**Candid about limits.** We state what the preview cannot yet show and label anything provisional or planned as such. Trust comes from the limits being in plain view.

> The preview shows that the measurement works, and it falls well short of what we are building.

**Even-handed.** We describe a model and leave the grading to the reader. A higher score means a closer fit to a constitution, whether or not the trait is one anyone would want, so results are never colored good or bad and labs are never ranked overall.

**Economical.** A page says each thing once. A heading stands alone, with no explanatory text beside it. A figure has a title and at most one line beneath it. Text that describes the page itself, such as how to read a layout or when a snapshot was taken, is left out.

### Vocabulary

| Say | Because |
| --- | --- |
| character, values, dispositions | The subject. "Personality" is too light and "alignment" is a verdict. |
| shows, scores, fits | Verbs for behavior we observed. Avoid "believes", "wants" or "feels" for a model. |
| specification, constitution | What a developer or we wrote down. A constitution is any written set of values a model can be scored against. |
| measurement, validation, stress-testing | The three parts of the work: an audited open suite, tests of whether its scores predict held-out behavior, and studies of how character holds up under pressure and over time. |
| panel | The set of models judged together. Scores are comparable only within one. |
| equal share | A score of 1500. Preferred to "average". |
| the record, the preview results | What the Institute publishes. "Leaderboard" is fine as a description and should not be the name. |
| the Institute | Second reference to the organization. Avoid the acronym in public writing. |

Avoid verdict words about models and labs: safe, unsafe, aligned, misaligned, best, worst, wins, beats, fails.

### Style

- American English. "Non-profit" is hyphenated.
- Sentence case for every heading, label and button.
- Headings are summary phrases, such as "Preview results" or "Measures of character". A heading is never a question or a full sentence.
- No all-caps labels, no exclamation marks, and no arrows in link text.
- No em dashes, no semicolons and no contractions. Asides go in commas or parentheses.
- Enumerations inside a paragraph read "First", "Second", "Third". Bulleted lists are for reference material only.
- Scores are whole numbers. Intervals read "1529 to 1587".
- Dates are written out: November 16, 2026. Panels are named by month: the August 2026 panel.
- A model is named as its developer names it, with the version: GPT-5.6 Sol, Claude Opus 5.5.
- Plans are written as plans. "We will share results with each lab before publishing" is honest until it is routine.
- A link says where it goes: "Read the constitution", "Open the results".

## Logo

The mark is the idea in its simplest form: a solid disc and a keyline of the same disc, out of register up and to the right. Where the keyline crosses the disc it is knocked out to the ground color, so the mark holds up in a single ink.

- **Primary.** Disc in `ink`, keyline in `accent`, on `paper` or `sheet`.
- **One color.** Disc and keyline both in `ink`.
- **Reversed.** Disc in `sheet`, keyline in `accent-soft`, on `ink`.
- **Tile.** The reversed mark on an `ink` square, for avatars, app icons and the favicon.
- **Wordmark.** "AI Character Institute" in Baskervville Medium, sentence case, tracked at -0.01em. In the lockup the mark sits to the left at 1.3 times the cap height, with a gap of half the mark's width.

Keep clear space of half the mark's width on every side. Do not use the mark smaller than 16 px. Do not redraw the offset, rotate the mark, fill the keyline, or set the wordmark in another face.

Files are in `public/brand`.

## Color

The palette comes from a struck coin, the first meaning of *character*: limestone paper, a warm black ink, the verdigris of old bronze as the one signal color, and bronze as its counterweight in data. A page is paper, ink and verdigris. Other colors appear only inside charts.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | #f3f1eb | Page background |
| `sheet` | #fbfaf6 | Raised surfaces: figures and plates |
| `stone` | #e6e3da | Portrait grounds, quiet fills |
| `ink` | #181a18 | Text, the mark, primary buttons, the footer ground |
| `ink-2` | #434742 | Secondary text and captions |
| `ink-3` | #686c66 | Tertiary text, axis labels |
| `rule` | #d5d3ca | Hairlines |
| `accent` | #1d4b3e | Link underlines, focus, reference lines, the keyline |
| `accent-soft` | #b9d1c5 | The keyline and links on `ink` |
| `bronze` | #a8611a | Data only: scores below an equal share |

Rules:

- Text is always `ink`, `ink-2` or `ink-3` on `paper` or `sheet`, or `sheet` on `ink`. All of these pass 4.5:1.
- Never use red and green to mean bad and good. Polarity in data is bronze below an equal share and verdigris above it, with gray between.
- No tints, gradients or colored panels for decoration. If a section needs to stand apart, give it a rule and more space.

## Type

| Role | Face | Use |
| --- | --- | --- |
| Serif | Baskervville, regular and italic | Headings, the wordmark, figure titles, italic for definitions and attributions |
| Sans | Public Sans | Body text, interface, tables and all numbers in data |

In a well-known New York Times experiment, readers were slightly more likely to believe a statement set in Baskerville than in other faces. It is also a face that was first cut by hand as steel punches, which is the oldest meaning of *character*. Public Sans is plain and public-spirited, and its figures line up in tables. Both are free on Google Fonts.

Headings are set in regular weight with tight leading and slight negative tracking, and are never bold. Lead paragraphs are set in the serif. Body text is 18 px on a 1.6 line height with lines under 64 characters. Headings use lining figures. Numbers in tables use tabular figures. There is no monospace face and no all-caps label style.

## Words and evidence

- **Passages.** To show a value, quote its constitution. Set one criterion as a quotation in the serif, with its source beneath: the constitution's name and the number of the criterion. Choose lines that read as complete sentences and show three traditions at a time, so no single outlook stands for the Institute.
- **Ledgers.** Lists of things with a status, such as the three parts of the approach, are set as ruled rows: the term in the serif, its definition beside it, and its status at the end of the row.
- **Figures.** Every chart or table sits on a `sheet` plate with a hairline border and a title. At most one line beneath it gives the panel, the scenarios and any real caveat. The method page holds everything else.
- **No pictograms.** Values, measures and audiences are not given icons.

## Portraits

A cutout photograph is set in gray on a `stone` ground with `mix-blend-mode: multiply`, and a keyline traced from the person's silhouette, in `accent`, sits out of register by 4%. Everyone has the same ground. Use portraits at 300 px or smaller until higher-resolution photographs are available.

## Data

- Marks are `ink`. A dot is the score, a thin bar is its 95% interval, and a dashed `accent` line is an equal share at 1500.
- Color appears in a chart only for identity or polarity. Up to four series use #0f8468, #c96a16, #4466b0 and #9c3f7e in that order, each with its own line style (solid, dashed, dotted, dash-dot), so identity never rests on color alone. Everything else is gray (#9a9c96). The set passes checks for color-vision deficiency on `sheet`.
- A series keeps its color for as long as it is shown. Adding or removing another series never recolors it.
- The matrix uses a seven-step diverging scale around 1500: bronze below, verdigris above, gray within 25 points.
- Never average a model's scores across constitutions into one number. A profile chart carries a note that the area of a shape has no meaning.
- An axis stays fixed across a panel, so rankings inside it can be read against each other. Scores from different panels are never drawn on one axis.
- Status is a small square: filled for live, half-filled for partial, outlined in `accent` for planned.

## Layout and motion

- Pages are 1296 px wide at most, on an 8 px module. Sections open with a hairline rule and a serif heading, and the heading stands alone.
- The home page leads with results. The opening statement and four counts sit above the leaderboard, and everything about the Institute follows the figures.
- Corners are square or 2 px. There are no shadows and no gradients.
- Nothing depends on hover. Controls are plain buttons and radio groups that work by keyboard, and every chart has a table beside or beneath it.
- Motion is limited to color changes on links and to the keyline. On hover, the keyline of the mark and of a portrait moves into register with its fill, and the whole outline travels together.
- Links carry navigation. Where a page needs a button, there is one per view, solid `ink`.
