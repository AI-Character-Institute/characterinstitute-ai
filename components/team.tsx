import Image from "next/image";
import { ExternalLink } from "@/components/external-link";
import { TEAM } from "@/lib/content";

export function Team() {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
      {TEAM.map((person) => (
        <div key={person.name} className="flex min-w-0 flex-col text-center">
          <Image
            src={person.photo}
            alt={person.name}
            width={160}
            height={160}
            className="mx-auto mb-4 size-40 rounded-full border border-line bg-stage object-cover object-top"
          />
          <h3 className="text-lg font-semibold">
            <ExternalLink href={person.href} className="decoration-2 underline-offset-4">
              {person.name}
            </ExternalLink>
          </h3>
          <p className="mt-1 text-[15px] text-muted">{person.role}</p>
          <p className="mt-1">{person.bio}</p>
          <p className="mt-auto flex flex-wrap justify-center gap-x-[18px] gap-y-1.5 pt-3 text-[15px]">
            {person.links.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
