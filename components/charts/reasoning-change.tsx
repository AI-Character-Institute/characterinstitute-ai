import { REASONING, labLabel, signed } from "@/lib/results";
import { value } from "@/lib/values";

/**
 * How much each model's score moved when it answered with extended reasoning.
 * One number per model and constitution, drawn as a bar from zero.
 */
export function ReasoningChange() {
  const boards = REASONING.boards;
  const models = [...new Set(boards.flatMap((b) => b.rows.map((r) => r.model)))];
  const change = (model: string, board: (typeof boards)[number]) => {
    const direct = board.rows.find((r) => r.model === model && r.mode === "instant");
    const reasoned = board.rows.find((r) => r.model === model && r.mode === "reasoning");
    return direct && reasoned ? Math.round(reasoned.score) - Math.round(direct.score) : null;
  };
  const max = Math.max(...boards.flatMap((b) => models.map((m) => Math.abs(change(m, b) ?? 0))), 1);
  const lab = (model: string) => boards.flatMap((b) => b.rows).find((r) => r.model === model)?.lab ?? "";
  return (
    <div className="delta-scroll">
      <table className="delta">
        <thead>
          <tr>
            <th scope="col">Model</th>
            {boards.map((b) => (
              <th key={b.value} scope="col">
                {value(b.value).label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m}>
              <th scope="row">
                {m}
                <small>{labLabel(lab(m))}</small>
              </th>
              {boards.map((b) => {
                const d = change(m, b);
                if (d === null)
                  return (
                    <td key={b.value} data-label={value(b.value).label}>
                      No score
                    </td>
                  );
                const width = `${((Math.abs(d) / max) * 50).toFixed(1)}%`;
                return (
                  <td key={b.value} data-label={value(b.value).label}>
                    <span className="delta-cell">
                      <span className="delta-track" aria-hidden="true">
                        <i className={d < 0 ? "is-down" : "is-up"} style={d < 0 ? { right: "50%", width } : { left: "50%", width }} />
                      </span>
                      <b>{signed(d)}</b>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
