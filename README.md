# AI Character Institute website

Marketing site for the AI Character Institute, built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build && npm run start
```

## Where things live

- `lib/content.ts` — all editable copy as data: nav links, past work, team, scanner examples, contact email
- `app/page.tsx` — page composition and the prose sections
- `app/globals.css` — design tokens (light/dark CSS variables) mapped into the Tailwind theme
- `components/scanner.tsx` — the animated pixel-art hero (client component, canvas)
- `components/work-carousel.tsx` — the horizontally scrolling "What we've done" cards (client component)
- `public/team/` — team photos
