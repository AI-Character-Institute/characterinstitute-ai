import Link from "next/link";
import { CONTACT_EMAIL, NAV, ORG } from "@/lib/content";
import { SNAPSHOT, SOURCE, formatDate } from "@/lib/results";
import { Mark } from "./mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <div className="site-footer-about">
          <Link href="/" className="lockup" aria-label={`${ORG.name}, home`}>
            <Mark size={30} />
            <span className="wordmark">{ORG.name}</span>
          </Link>
          <p>{ORG.short}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="site-footer-links">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="site-footer-links">
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          <li>
            <a href={SOURCE.code}>Evaluation code</a>
          </li>
          <li>
            <a href={SOURCE.dataset}>Open data</a>
          </li>
        </ul>
      </div>
      <div className="wrap site-footer-meta">
        <p>Results snapshot of {formatDate(SNAPSHOT)}.</p>
        <p>© 2026 {ORG.name}</p>
      </div>
    </footer>
  );
}
