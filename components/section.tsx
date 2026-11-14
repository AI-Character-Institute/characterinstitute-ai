import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  /** Use the wide content column (cards, grids) instead of the reading column. */
  wide?: boolean;
  children: ReactNode;
};

export function Section({ id, label, wide = false, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-line">
      <div className="page-wrap flex flex-col items-center gap-5 py-10 md:gap-7 md:py-14">
        <h2 className="flex items-center gap-3 text-center font-pixel text-[17px] font-normal tracking-[0.06em] uppercase before:size-2 before:flex-none before:bg-accent before:content-[''] after:size-2 after:flex-none after:bg-accent after:content-['']">
          {label}
        </h2>
        <div className={`w-full min-w-0 text-lg ${wide ? "max-w-[1120px]" : "max-w-[75ch]"}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
