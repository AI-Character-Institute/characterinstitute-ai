import { NAV_LINKS } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-4 py-[18px]">
        <a
          href="#top"
          aria-label="AI Character Institute"
          className="flex items-center gap-3 text-xl font-semibold tracking-[0.005em] no-underline"
        >
          <svg
            viewBox="0 0 8 8"
            aria-hidden="true"
            shapeRendering="crispEdges"
            className="size-8 [image-rendering:pixelated]"
          >
            <rect x="0" y="0" width="8" height="8" fill="var(--accent)" />
            <rect x="1" y="1" width="6" height="6" fill="var(--bg)" />
            <rect x="2" y="3" width="1" height="1" fill="var(--fg)" />
            <rect x="5" y="3" width="1" height="1" fill="var(--fg)" />
            <rect x="2" y="5" width="4" height="1" fill="var(--accent)" />
          </svg>
          AI Character Institute
        </a>
        <nav aria-label="Sections" className="hidden flex-wrap gap-5 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="no-underline">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
