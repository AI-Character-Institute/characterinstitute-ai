# AI Character Institute website

The site at [characterinstitute.ai](https://characterinstitute.ai). Next.js (App Router) and TypeScript, exported as a fully static site. Styling is plain CSS driven by design tokens. There is no Tailwind and no runtime data fetching.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # writes the static site to out/
npm run start      # serves out/ locally
```

`next build` renders every page at build time, so `out/` can be hosted anywhere that serves static files. On Vercel the project needs no settings beyond the Next.js preset.

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | Editable copy: navigation, the standard descriptions of the Institute, measures, team, prior work, contact email |
| `lib/values.ts` | The values library: label, group and summary for each constitution |
| `lib/results.ts` | Typed access to the results snapshot and the views derived from it (panels, lab reports) |
| `data/results.json` | The results snapshot every chart and table is built from |
| `data/constitutions.json` | The criteria of each constitution |
| `data/portraits.json` | The traced silhouette of each team portrait, used for its keyline |
| `app/styles/tokens.css` | Design tokens: color, type, space |
| `app/styles/*.css` | Base styles, components, charts, and `institute.css` for page furniture and the results explorer |
| `components/` | Mark, portraits, figures and the server-rendered charts |
| `components/explorer/` | The interactive results views: leaderboard, kindness over time, model profiles |
| `BRAND.md` | Brand language and the design system in prose |

Pages: `/` home, `/results/`, `/reports/` and `/reports/[lab]/`, `/values/`, `/method/`, `/about/`.

## Updating the results

```bash
npm run sync:results
```

This pulls the published EigenBench runs listed at the top of `scripts/sync-results.mjs` from the open dataset and rewrites `data/results.json`. Commit the new snapshot and rebuild. To publish a new panel, add it to `PANELS` in that script. Lab reports and every count on the site are derived from the snapshot, so nothing else needs editing.

Display names for models that are missing from `data/model-registry.json` are set in `DISPLAY_NAMES` in the same script. Check them against each developer's own naming before publishing.

## Updating the team

Edit `TEAM` in `lib/content.ts`. Portraits are transparent-background cutouts. To add or replace one, put the source images in a folder and run:

```bash
python3 scripts/make-portraits.py <folder-of-cutouts>
```

It normalizes each cutout to 480 px, writes it to `public/team/`, and traces the silhouette into `data/portraits.json`. The file name must match the person's `slug`. Needs `pillow`, `numpy` and `opencv-python`.

## Adding a value

1. Add its criteria to `data/constitutions.json`.
2. Add an entry to `META` in `lib/values.ts`.

## Notes

- The leaderboard, the kindness chart and the model profiles are client components in `components/explorer/`. They are rendered to HTML at build time with a default view, so the page reads without JavaScript, and each has a table of the same numbers. The other charts are rendered on the server as HTML and SVG, and `public/enhance.js` only adds hover tooltips to them.
- A leaderboard view can be linked to: `/results/?panel=frontier-2026-10&value=sycophancy#leaderboard`.
- Analytics are GoatCounter, loaded in `app/layout.tsx`.
