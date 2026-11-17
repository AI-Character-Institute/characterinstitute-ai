import type { CSSProperties } from "react";
import { COLORWAYS, GLYPHS, type ColorwayName, type Role, type Shape } from "@/lib/glyphs";

function draw(shape: Shape, i: number, mode: "fill" | "key", ink: Record<Role, string>, key: string) {
  const paint =
    mode === "fill"
      ? shape.t === "s"
        ? { fill: "none", stroke: ink[shape.f], strokeWidth: shape.w }
        : { fill: ink[shape.f] }
      : { fill: "none", stroke: key, strokeWidth: 0.9 };
  if (shape.t === "c") return <circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} {...paint} />;
  if (shape.t === "r") return <rect key={i} x={shape.x} y={shape.y} width={shape.w} height={shape.h} {...paint} />;
  return <path key={i} d={shape.d} {...paint} />;
}

/**
 * One value, printed as a tile: a ground, the solid forms, and a keyline of the
 * same forms sitting out of register. Hovering a `.tile` brings the two into register.
 */
export function Glyph({
  id,
  way,
  className,
  style,
}: {
  id: string;
  way: ColorwayName;
  className?: string;
  style?: CSSProperties;
}) {
  const shapes = GLYPHS[id] ?? [];
  const colors = COLORWAYS[way];
  const ink: Record<Role, string> = { a: colors.a, b: colors.b, g: colors.ground };
  return (
    <svg viewBox="0 0 48 48" className={className ? `glyph ${className}` : "glyph"} style={style} aria-hidden="true" focusable="false">
      <rect width="48" height="48" fill={colors.ground} />
      <g>{shapes.map((sh, i) => draw(sh, i, "fill", ink, colors.key))}</g>
      <g className="glyph-key">{shapes.filter((sh) => sh.k).map((sh, i) => draw(sh, i, "key", ink, colors.key))}</g>
    </svg>
  );
}

/** An empty compartment: a keyline with nothing printed in it yet. */
export function EmptyTile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className ? `glyph ${className}` : "glyph"} aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="47" height="47" fill="none" stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 2.6" />
    </svg>
  );
}
