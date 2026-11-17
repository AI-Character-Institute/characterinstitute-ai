import { value } from "@/lib/values";
import { Glyph } from "./glyph";

/** A small tile for a value, used beside its name in headings and tables. */
export function ValueTile({ id, size = 40 }: { id: string; size?: number }) {
  const v = value(id);
  return <Glyph id={id} way={v.way} className="value-tile" style={{ width: size, height: size }} />;
}
