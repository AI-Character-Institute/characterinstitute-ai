// The glyph system. Every value in the library has one glyph, drawn on a
// 48-unit square from a small vocabulary of discs, bars, arcs and wedges.
// A glyph is printed twice: once as a solid fill, once as a keyline that sits
// slightly out of register. See components/glyph.tsx.

/** Which ink a shape is printed in. a and b are the tile's two form colors, g is its ground. */
export type Role = "a" | "b" | "g";

export type Shape =
  | { t: "c"; cx: number; cy: number; r: number; f: Role; k?: boolean }
  | { t: "r"; x: number; y: number; w: number; h: number; f: Role; k?: boolean }
  | { t: "p"; d: string; f: Role; k?: boolean }
  /** A stroked line or ring. Lines are never keylined. */
  | { t: "s"; d: string; f: Role; w: number; k?: boolean };

export type Colorway = { ground: string; a: string; b: string; key: string };

const v = (name: string) => `var(--${name})`;

/** Tile colorways. Grounds alternate between full pigments and their tints. */
export const COLORWAYS = {
  lapis: { ground: v("lapis"), a: v("sheet"), b: v("ochre"), key: v("ink") },
  ink: { ground: v("ink"), a: v("ochre"), b: v("sheet"), key: v("sky") },
  cinnabar: { ground: v("cinnabar"), a: v("sheet"), b: v("ink"), key: v("ink") },
  ochre: { ground: v("ochre"), a: v("ink"), b: v("sheet"), key: v("ink") },
  malachite: { ground: v("malachite"), a: v("straw"), b: v("sheet"), key: v("ink") },
  madder: { ground: v("madder"), a: v("blush"), b: v("ink"), key: v("ink") },
  sky: { ground: v("sky"), a: v("lapis"), b: v("ink"), key: v("ink") },
  celadon: { ground: v("celadon"), a: v("malachite"), b: v("ink"), key: v("ink") },
  shell: { ground: v("shell"), a: v("cinnabar"), b: v("ink"), key: v("ink") },
  straw: { ground: v("straw"), a: v("ink"), b: v("cinnabar"), key: v("ink") },
  blush: { ground: v("blush"), a: v("madder"), b: v("ink"), key: v("ink") },
  sheet: { ground: v("sheet"), a: v("ink"), b: v("lapis"), key: v("lapis") },
} satisfies Record<string, Colorway>;

export type ColorwayName = keyof typeof COLORWAYS;

const c = (cx: number, cy: number, r: number, f: Role = "a", k = true): Shape => ({ t: "c", cx, cy, r, f, k });
const r = (x: number, y: number, w: number, h: number, f: Role = "a", k = true): Shape => ({ t: "r", x, y, w, h, f, k });
const p = (d: string, f: Role = "a", k = true): Shape => ({ t: "p", d, f, k });
const s = (d: string, w: number, f: Role = "a", k = false): Shape => ({ t: "s", d, f, w, k });

const ring = (cx: number, cy: number, rad: number) =>
  `M${cx - rad} ${cy}a${rad} ${rad} 0 1 0 ${rad * 2} 0a${rad} ${rad} 0 1 0 ${-rad * 2} 0Z`;

export const GLYPHS: Record<string, Shape[]> = {
  // A small disc held in a bowl.
  kindness: [p("M8 23A16 16 0 0 0 40 23Z"), c(24, 14, 6, "b")],
  // A disc with a steady center.
  goodness: [c(24, 24, 15), c(24, 24, 5, "b", false)],
  // Two discs that share ground.
  loving: [c(18, 24, 11), c(30, 24, 11, "b")],
  // An upturned arc and a dot that got away.
  humor: [p("M9 19A15 15 0 0 0 39 19L32.5 19A8.5 8.5 0 0 1 15.5 19Z"), c(36, 11, 4.5, "b")],
  // Humor, turned over.
  sarcasm: [p("M9 30A15 15 0 0 1 39 30L32.5 30A8.5 8.5 0 0 0 15.5 30Z"), c(12, 38, 4.5, "b")],
  // A stanza, ragged right, under a moon.
  poeticism: [r(9, 21, 28, 4.5), r(9, 28.5, 19, 4.5), r(9, 36, 24, 4.5), c(34, 11, 5, "b")],
  // A dome resting on a long horizon.
  nonchalance: [r(8, 31, 32, 4.5), p("M19 31A9.5 9.5 0 0 1 38 31Z", "b")],
  // The same dome, sunk below the line.
  remorse: [r(8, 18, 32, 4.5), p("M14.5 24.5A9.5 9.5 0 0 0 33.5 24.5Z", "b")],
  // A bolt.
  impulsiveness: [p("M27 7L13 27L22.5 27L19 41L35 20L25.5 20Z")],
  // A square and the quarter circle constructed inside it.
  mathematical: [r(10, 10, 28, 28), p("M10 38L10 10A28 28 0 0 1 38 38Z", "b", false)],
  // A large disc and the small one that follows it.
  sycophancy: [c(20, 22, 12), c(36, 34, 5.5, "b")],
  // Two halves of one disc that no longer meet.
  misalignment: [p("M23 6A14 14 0 0 0 23 34Z"), p("M25 14A14 14 0 0 1 25 42Z", "b")],
  // A pyramid and its capstone.
  "power-seeking": [p("M8 39L24 15L40 39Z"), c(24, 11, 4.5, "b")],
  // Nine equal counters.
  utilitarianism: [13, 24, 35].flatMap((y) => [13, 24, 35].map((x) => c(x, y, 3.8))),
  // One rule, applied three times.
  "kantian-deontology": [r(10, 10, 6.5, 28), r(20.75, 10, 6.5, 28), r(31.5, 10, 6.5, 28)],
  // An arc around a dependent.
  "care-ethics": [p("M26 9A15 15 0 0 0 26 39L26 32.5A8.5 8.5 0 0 1 26 15.5Z"), c(28, 24, 5.5, "b")],
  // A column with its base and capital.
  conservatism: [r(18, 14, 12, 20), r(11, 8, 26, 5.5, "b"), r(11, 34.5, 26, 5.5, "b")],
  // A keyhole.
  "lockean-rights": [p("M24 9A8.5 8.5 0 0 1 29 24.4L32.5 39L15.5 39L19 24.4A8.5 8.5 0 0 1 24 9Z")],
  // A base and what stands on it.
  marxism: [r(8, 27, 32, 11), r(16, 14, 16, 13, "b")],
  // Growth rings.
  "deep-ecology": [c(24, 24, 15.5), c(24, 24, 10.5, "g", false), c(24, 24, 5.5, "b", false)],
  // A seedling.
  "environmental-ethics": [
    r(22.5, 22, 3, 15, "a", false),
    p("M24 27Q10 27 10 13Q24 13 24 27Z"),
    p("M24 22Q38 22 38 8Q24 8 24 22Z", "b"),
    r(12, 37, 24, 3.5, "a", false),
  ],
  // Two complementary halves of one whole.
  taoism: [c(24, 24, 15, "b"), p("M24 9A15 15 0 0 1 24 39A7.5 7.5 0 0 1 24 24A7.5 7.5 0 0 0 24 9Z", "a", false)],
  // An eight-spoked wheel.
  buddhism: [
    s(ring(24, 24, 13.5), 3.6, "a", true),
    s("M24 10.5V37.5M10.5 24H37.5M14.5 14.5L33.5 33.5M33.5 14.5L14.5 33.5", 2, "a"),
    c(24, 24, 3.6, "b", false),
  ],
  // An arched window.
  christianity: [p("M13 40L13 20A11 11 0 0 1 35 20L35 40Z"), p("M20 40L20 22A4 4 0 0 1 28 22L28 40Z", "b", false)],
  // An eight-pointed star.
  islam: [p("M39.6 24L35 28.6V35H28.6L24 39.6L19.4 35H13V28.6L8.4 24L13 19.4V13H19.4L24 8.4L28.6 13H35V19.4Z"), c(24, 24, 5, "b", false)],
  // A written sheet.
  "anthropic-constitution": [r(12, 8, 24, 32), r(16, 15, 16, 3, "b", false), r(16, 22, 16, 3, "b", false), r(16, 29, 10, 3, "b", false)],
  // A written sheet with an order of precedence.
  "openai-model-spec": [r(12, 8, 24, 32), r(16, 15, 16, 3, "b", false), r(19, 22, 13, 3, "b", false), r(22, 29, 10, 3, "b", false)],
};
