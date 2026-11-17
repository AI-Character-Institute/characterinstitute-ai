import Link from "next/link";
import { NAV, ORG } from "@/lib/content";
import { Mark } from "./mark";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href="/" className="lockup" aria-label={`${ORG.name}, home`}>
          <Mark size={30} />
          <span className="wordmark">{ORG.name}</span>
        </Link>
        <nav aria-label="Main">
          <NavLinks items={NAV} />
        </nav>
      </div>
    </header>
  );
}
