"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkItem } from "@/lib/content";

export function NavLinks({ items }: { items: LinkItem[] }) {
  const path = usePathname() || "/";
  return (
    <ul className="nav-links">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} aria-current={path.startsWith(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
