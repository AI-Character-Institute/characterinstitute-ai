import type { ReactNode } from "react";

/** A link that leaves the site. */
export function Ext({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={className} rel="noopener">
      {children}
    </a>
  );
}
