import { useId } from "react";

/**
 * The Institute's mark: a solid disc and a keyline of the same disc, out of
 * register. The disc is the character a model shows. The keyline is the
 * character that was written down. Where the keyline crosses the disc it is
 * knocked out, so the mark holds up in one color.
 */
export function Mark({ size = 32, title, className }: { size?: number; title?: string; className?: string }) {
  const clip = useId();
  return (
    <svg
      className={className ? `mark ${className}` : "mark"}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="27" cy="37" r="23" />
        </clipPath>
      </defs>
      <circle className="mark-key" cx="37" cy="27" r="23" fill="none" stroke="var(--mark-key, var(--lapis))" strokeWidth="3.4" />
      <circle className="mark-fill" cx="27" cy="37" r="23" fill="var(--mark-fill, currentColor)" />
      <circle cx="37" cy="27" r="23" fill="none" stroke="var(--mark-ground, var(--paper))" strokeWidth="3.4" clipPath={`url(#${clip})`} />
    </svg>
  );
}
