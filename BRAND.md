# AI Character Institute

The brand language and design system of the AI Character Institute: how the Institute describes itself, how it sounds, and how everything it makes should look. The website at characterinstitute.ai is built from these rules, and reports, slides and social posts should follow them too.

## The idea

**Character** comes from the Greek *kharaktēr*, an engraved mark: the stamp pressed into a coin, and later a letter of type. A character was first a mark that showed what something was. That is the Institute's work. We make a model's character visible, and we check it against what was written down.

Three things follow from this, and they organize the whole system.

1. **Fill and keyline.** Every object the Institute draws is printed twice: once as a solid fill and once as an outline that sits slightly out of register. The fill stands for the character a model shows. The keyline stands for the character that was specified. The distance between them is what we measure. Where the two come into register, on hover or in a result, the model has the character it was meant to have.
2. **The case.** A printer's case holds one character in each compartment. Ours holds one tile for each written set of values in the library, from kindness to Kantian deontology. Many grounds, many forms, one grid. The case is how the brand shows that it is plural: no single color or value represents the Institute.
3. **The record.** The Institute's product is a public, dated, continuing record. Layouts read like a well-made report: figures have captions, numbers have intervals, and every result says when it was measured.

## Positioning

| Use | Wording |
| --- | --- |
| Descriptor | Independent evaluation of AI character |
| One sentence | The AI Character Institute is an independent non-profit that evaluates the character of frontier AI models. |
| Standard paragraph | The AI Character Institute is an independent non-profit that evaluates the character of frontier AI models. We measure the values that models show in their behavior, compare them with what their developers have written down, and publish the results for every major release, so that labs can fix the gaps and policymakers can hold labs to their commitments. |
| Definition of character | The values and dispositions that shape what a model does, most visibly where its instructions run out. |
| Shorthand for people in the field | METR for AI values |

"METR for AI values" is useful in a pitch or a conversation with someone who knows the field. It should not be a headline, because it defines the Institute by another organization.

What each audience should take away:

- **Labs.** A second reading of a model's values before it ships, made with an open suite the lab can run itself, and shared with the model spec team before anything is published.
- **Policymakers.** Public, comparable measurements of model values that a standard can refer to.
- **Funders and researchers.** The first versions already exist. EigenBench was an oral at ICLR 2026, and the preview results cover 15 frontier models.

## Voice

The Institute sounds like a careful evaluator: someone who has looked closely, says what was found, and says how sure they are. Five rules.

**Measured.** Report what was observed, under what conditions, and with what uncertainty. Prefer "in this panel", "the results suggest" and an interval to a flat claim.

> Claude Sonnet 5 scored above an equal share on 4 of 6 constitutions in the August 2026 panel.

**Plain.** Use the ordinary word: values, behavior, release, score. No "unlock", "revolutionary" or "cutting-edge". A sentence should survive being read aloud to a policymaker.

**Even-handed.** Describe a model and leave the grading to the reader. A higher score means a closer fit to a constitution, which is not always better, so results are never colored good or bad and labs are never ranked overall.

**Specific.** Name the model version, the constitution, the date and the number of scenarios. "Frontier models" becomes "eight frontier models". "Recently" becomes "August 2026".

**Open about limits.** State what the preview cannot yet show, and label anything provisional or planned as such. Trust comes from the caveats being in plain view.

### Vocabulary

| Say | Because |
| --- | --- |
| character, values, dispositions | The subject. "Personality" is too light and "alignment" is a verdict. |
| shows, scores, fits | Verbs for behavior we observed. Avoid "believes", "wants" or "feels" for a model. |
| specification, constitution | What a developer or we wrote down. A constitution is any written set of values a model can be scored against. |
| fidelity, divergence, stability, drift | The four things measured: fit to a constitution, the gap from a developer's specification, robustness under pressure, and change across releases. |
| panel | The set of models judged together. Scores are comparable only within one. |
| equal share | A score of 1500. Preferred to "average". |
| the record, the preview results | What the Institute publishes. "Leaderboard" is fine as a description and should not be the name. |
| the Institute | Second reference to the organization. Avoid the acronym in public writing. |

Avoid verdict words about models and labs: safe, unsafe, aligned, misaligned, best, worst, wins, beats, fails.

### Style

- American English. "Non-profit" is hyphenated.
- Sentence case for every heading, label and button.
- No all-caps labels, no exclamation marks, and no arrows in link text.
- Scores are whole numbers. Intervals read "1529 to 1587".
- Dates are written out: November 16, 2026. Panels are named by month: the August 2026 panel.
- A model is named as its developer names it, with the version: GPT-5.6 Sol, Claude Opus 5.5.
- Plans are written as plans. "We will share results with each lab before publishing" is honest until it is routine.
- A link says where it goes: "Read the constitution", "Open the results".

## Logo

The mark is the idea in its simplest form: a solid disc and a keyline of the same disc, out of register by a quarter of its radius, up and to the right. Where the keyline crosses the disc it is knocked out to the ground color, so the mark holds up in a single ink.

- **Primary.** Disc in `ink`, keyline in `lapis`, on `paper` or `sheet`.
- **One color.** Disc and keyline both in `ink`.
- **Reversed.** Disc in `sheet`, keyline in `sky`, on `ink`.
- **Tile.** The reversed mark on an `ink` square, for avatars, app icons and the favicon fallback.
- **Wordmark.** "AI Character Institute" in Baskervville Medium, sentence case, tracked at -0.01em. In the lockup the mark sits to the left at 1.3 times the cap height, with a gap of half the mark's width.

Keep clear space of half the mark's width on every side. Do not use the mark smaller than 16 px. Do not redraw the offset, rotate the mark, fill the keyline, or set the wordmark in another face. The mark may be printed in any single pigment when a piece calls for it. `lapis` is the default.

Files are in `assets/Logos`.

## Color

The ground is ledger paper and the text is blue-black ink. One signal color, lapis, is reserved for keylines, links and reference lines. The pigments belong to tiles and to data marks and never color text.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | #eef0eb | Page background |
| `sheet` | #f9faf6 | Raised surfaces: figures, plates, light forms on tiles |
| `ink` | #141b2d | Text, solid forms, the footer ground |
| `ink-2` | #404860 | Secondary text and captions |
| `ink-3` | #5c6479 | Tertiary text, axis labels |
| `rule` | #cfd3d0 | Hairlines |
| `lapis` | #2742d4 | Keylines, link underlines, reference lines, first data series |
| `cinnabar` | #d9432b | Tile ground, second data series |
| `ochre` | #dc9a16 | Tile ground, scores below an equal share |
| `malachite` | #1e7a5c | Tile ground |
| `madder` | #b33a62 | Tile ground |
| `sky`, `celadon`, `shell`, `straw`, `blush` | tints | Light tile grounds and portrait grounds |

Rules:

- Text is always `ink`, `ink-2` or `ink-3` on `paper` or `sheet`, or `sheet` on `ink`. All of these pass 4.5:1.
- Never use red and green to mean bad and good. Polarity in data is `ochre` below an equal share and `lapis` above it, with gray between.
- A layout uses many pigments only inside the case or a row of tiles. Outside it, a page is paper, ink and lapis.

## Type

| Role | Face | Use |
| --- | --- | --- |
| Serif | Baskervville, regular and italic | Headings, the wordmark, figure titles, italic for questions and attributions |
| Sans | Public Sans | Body text, interface, tables and all numbers in data |

In a well-known New York Times experiment, readers were slightly more likely to believe a statement set in Baskerville than in other faces. It is also a face that was first cut by hand as steel punches, which is the oldest meaning of *character*. Public Sans is plain and public-spirited, and its figures line up in tables. Both are free on Google Fonts.

Headings are set in regular weight with tight leading and slight negative tracking, and are never bold. Body text is 17 px on a 1.6 line height with lines under 62 characters. Numbers in tables use tabular figures. There is no monospace face and no all-caps label style.

## Tiles and glyphs

A tile is a square ground with one glyph. A glyph is drawn on a 48-unit grid with an 8-unit margin, from a small vocabulary: disc, half-disc, quarter-disc, bar, square, wedge and ring. Each glyph should need no more than four shapes, should read at 28 px, and should say something true about its value.

| Value | Glyph |
| --- | --- |
| Kindness | A small disc held in a bowl |
| Humor and sarcasm | An upturned arc with a dot that got away, and the same figure turned over |
| Nonchalance and remorse | A dome resting on a horizon, and the same dome sunk below it |
| Misalignment | Two halves of one disc that no longer meet |
| Sycophancy | A large disc and the small one that follows it |
| Power-seeking | A pyramid and its capstone |
| Utilitarianism | Nine equal counters |
| Kantian deontology | One rule applied three times |
| Lockean rights | A keyhole |
| Care ethics | An arc around a dependent |
| Deep ecology | Growth rings |
| Developer specifications | A written sheet |

Traditions are drawn with a plain emblem of their own: an eight-spoked wheel, an arched window, an eight-pointed star, and two complementary halves.

Colorways pair a ground with two form colors and a keyline color. They are defined in `lib/glyphs.ts`. Assign a colorway so that no two neighboring tiles in the case share a ground. Tiles sit flush, with no gaps and no rounded corners.

The keyline is the same shapes, stroked at 0.9 units and moved 1.5 units up and to the right. On hover it returns to register over half a second.

## Portraits

People are printed like tiles. A cutout photograph is set in gray on a tint ground with `mix-blend-mode: multiply`, and a keyline traced from the person's silhouette sits out of register by 4%. Each founder has their own ground. Use portraits at 300 px or smaller until higher-resolution photographs are available.

## Data

- Marks are `ink`. A dot is the score, a thin bar is its 95% interval, and a dashed `lapis` line is an equal share at 1500.
- Color appears in a chart only for identity or polarity. Up to three highlighted series use `lapis`, `cinnabar` and viridian (#0e8c7a), which stay distinct under color-vision deficiency. Everything else is gray (#8b919c).
- The matrix uses a seven-step diverging scale around 1500: `ochre` below, `lapis` above, gray within 25 points.
- Never average a model's scores across constitutions into one number.
- Every figure sits on a `sheet` plate with a title and a caption that gives the scenarios, the judging mode, the date and any caveat.
- Status is a small square: filled for live, half-filled for partial, outlined in `lapis` for planned. This is the keyline rule again. An outline is something specified and not yet shown.

## Layout and motion

- Pages are 1240 px wide at most, on an 8 px module. Sections open with a serif heading on the left and text on the right, and are separated by space instead of rules.
- Corners are square or 2 px. There are no shadows and no gradients.
- Motion is spent in two places. The case settles into its grid once when the home page loads, and keylines come into register on hover. Nothing else moves, and both respect reduced-motion settings.
- One primary button per view: `ink` with a `lapis` keyline. Secondary actions are outlined in `ink`.
