import type { ReactNode } from "react";

/** A plate: one chart or table on a sheet, with the caption a reader needs to trust it. */
export function Figure({
  title,
  children,
  caption,
  id,
  className,
}: {
  title: string;
  children: ReactNode;
  caption?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <figure className={className ? `plate ${className}` : "plate"} id={id}>
      <h3 className="plate-title">{title}</h3>
      <div className="plate-body">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
