"use client";

import { useEffect, useRef, useState } from "react";
import { SCANS } from "@/lib/content";

/* Pixel sprites: d = outline, b = body colour, w = white, k = pupil, g = icon. */
const BODIES = [
  ["....dd....", "....dd....", ".dddddddd.", ".dbbbbbbd.", ".dbwkbwkd.", ".dbbbbbbd.", ".dbbddbbd.", ".dddddddd.", "..dbbbbd..", "..dddddd.."],
  ["..........", "...dddd...", "..dbbbbd..", ".dbbbbbbd.", ".dbwkbwkd.", ".dbbbbbbd.", "dbbbbbbbbd", "dbbbddbbbd", ".dbbbbbbd.", "..dddddd.."],
  ["....dd....", "...dbbd...", "..dbbbbd..", "..dwkwkd..", ".dbbbbbbd.", ".dbbddbbd.", "dbbbbbbbbd", "dbbbbbbbbd", "dbbbbbbbbd", "dddddddddd"],
  [".d......d.", ".dd....dd.", ".dbddddbd.", ".dbbbbbbd.", ".dbwkbwkd.", ".dbbbbbbd.", ".dbbkkbbd.", ".dbbbbbbd.", ".dbbbbbbd.", ".dddddddd."],
  ["...dddd...", "..dbbbbd..", ".dbbbbbbd.", ".dbwkbwkd.", ".dbbbbbbd.", ".dbbbbbbd.", ".dddddddd.", ".d.d..d.d.", ".d.d..d.d.", ".........."],
  ["..dddddd..", "..dbbbbd..", "..dddddd..", "..dwkwkd..", "..dbbbbd..", ".ddbbbbdd.", ".dbbbbbbd.", "..dbbbbd..", "..dbbbbd..", "..dddddd.."],
  ["..dddddd..", ".dbbwbbbd.", "dbbbbbbwbd", "dbwbbbbbbd", "dddddddddd", "..dwwwwd..", "..dkwwkd..", "..dwwwwd..", "..dwwwwd..", "..dddddd.."],
  ["d........d", "dd.dddd.dd", ".ddbbbbdd.", ".dbbbbbbd.", ".dbkbbkbd.", ".dbbbbbbd.", ".dbbwwbbd.", ".dbbbbbbd.", "..dbbbbd..", "...dddd..."],
  ["..d....d..", "...d..d...", "dddddddddd", "dbbbbbbbdd", "dbwkbwkbdd", "dbbbbbbbdd", "dbbkkkbbdd", "dbbbbbbbdd", "dddddddddd", "..d....d.."],
  ["....dd....", "...dbbd...", "..dbbbbd..", ".dbwkwkbd.", "dbbbbbbbbd", ".dbbbbbbd.", "..dbbbbd..", "..dbddbd..", "..dd..dd..", ".........."],
];
const LEGS = [
  ["..dd..dd..", "..dd..dd.."],
  ["...dd.dd..", "..dd...dd."],
];
const CHECK = ["....g", "...gg", "g.gg.", "ggg..", ".g..."];
const BANG = ["..g..", "..g..", "..g..", ".....", "..g.."];

const N = SCANS.length;
const SPEED = 0.012; // logical px per ms while walking
const PAUSE = 3000; // ms each character stays in the scanner
const T_DOES = 1100; // ms into the pause when "Does" appears
const T_RESULT = 2100; // ms into the pause when the result appears
const GAP = 44; // logical px between characters
const LOOP = N * GAP; // loop length

type Phase = "says" | "does" | "result";
type Panel = { index: number; phase: Phase };
type Palette = {
  stage: string;
  line: string;
  muted: string;
  accent: string;
  match: string;
  gap: string;
  outline: string;
  bodies: string[];
};

export function Scanner() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [panel, setPanel] = useState<Panel>({ index: 0, phase: "says" });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!stage || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scanned = new Array<boolean>(N).fill(false);
    let C: Palette;
    let P = 4, W = 160, H = 54, ground = 48, sx = 80;
    let pos = 0, pauseT = 0, cur = 0, last = 0;
    let mode: "walk" | "pause" = "walk";
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      const get = (name: string) => style.getPropertyValue(name).trim();
      C = {
        stage: get("--stage"),
        line: get("--line"),
        muted: get("--muted"),
        accent: get("--accent"),
        match: get("--match"),
        gap: get("--gap"),
        outline: get("--outline"),
        bodies: Array.from({ length: N }, (_, i) => get(`--c${i + 1}`)),
      };
    };

    // left x of character k's sprite
    const xOf = (k: number) => ((((pos - k * GAP) % LOOP) + LOOP) % LOOP) - 40;
    const centerOf = (k: number) => xOf(k) + 5;

    const layout = () => {
      const cw = stage.clientWidth;
      P = Math.max(3, Math.floor(cw / 150));
      W = Math.ceil(cw / P);
      H = cw < 500 ? 46 : 54;
      ground = H - 6;
      sx = Math.floor(W * 0.55);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${W * P}px`;
      canvas.style.height = `${H * P}px`;
    };

    const show = (index: number, phase: Phase) => {
      cur = index;
      setPanel({ index, phase });
    };

    // place character k in the middle of the scanner, at the start of its pause
    const startAt = (k: number) => {
      pos = sx + 40 - 5 + k * GAP;
      mode = "pause";
      pauseT = 0;
      scanned.fill(false);
      show(k, "says");
    };

    const px = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    };

    const drawSprite = (k: number) => {
      const x0 = Math.round(xOf(k));
      if (x0 < -12 || x0 > W + 2) return;
      const legs = LEGS[mode === "walk" && Math.floor(x0 / 3) % 2 ? 1 : 0];
      const rows = BODIES[k].concat(legs);
      const y0 = ground - rows.length;
      const colors: Record<string, string> = { d: C.outline, b: C.bodies[k], w: "#ffffff", k: C.outline };
      for (let r = 0; r < rows.length; r++)
        for (let q = 0; q < 10; q++) {
          const color = colors[rows[r][q]];
          if (color) px(x0 + q, y0 + r, 1, 1, color);
        }
      if (scanned[k]) {
        const icon = SCANS[k].ok ? CHECK : BANG;
        const color = SCANS[k].ok ? C.match : C.gap;
        for (let r = 0; r < 5; r++)
          for (let q = 0; q < 5; q++) if (icon[r][q] === "g") px(x0 + 2 + q, y0 - 7 + r, 1, 1, color);
      }
    };

    const drawScanner = (t: number, active: boolean) => {
      const top = ground - 22, left = sx - 15, right = sx + 15;
      if (active) {
        ctx.globalAlpha = 0.14;
        px(left + 3, top + 3, right - left - 6, ground - top - 3, C.accent);
        const span = ground - top - 4;
        const beamY = top + 3 + Math.floor((Math.sin(t / 240) * 0.5 + 0.5) * span);
        ctx.globalAlpha = 0.85;
        px(left + 3, beamY, right - left - 6, 1, C.accent);
        ctx.globalAlpha = 1;
      }
      px(left, top, right - left, 3, C.muted);
      px(left, top, 3, ground - top, C.muted);
      px(right - 3, top, 3, ground - top, C.muted);
      const blink = active && Math.floor(t / 300) % 2 === 0;
      px(left + 5, top + 1, 2, 1, blink ? C.accent : C.line);
      px(right - 7, top + 1, 2, 1, active ? C.accent : C.line);
    };

    const step = (dt: number) => {
      if (mode === "pause") {
        const before = pauseT;
        pauseT += dt;
        if (before < T_DOES && pauseT >= T_DOES) show(cur, "does");
        if (before < T_RESULT && pauseT >= T_RESULT) {
          show(cur, "result");
          scanned[cur] = true;
        }
        if (pauseT >= PAUSE) mode = "walk";
        return;
      }
      const next = (cur + 1) % N;
      const dist = sx - centerOf(next);
      const move = SPEED * dt;
      // reset tags for characters that wrapped off the left edge
      for (let k = 0; k < N; k++) if (centerOf(k) < 0 && k !== cur) scanned[k] = false;
      if (dist > 0 && dist <= move) {
        pos += dist;
        mode = "pause";
        pauseT = 0;
        show(next, "says");
      } else {
        pos += move;
      }
    };

    const draw = (t: number) => {
      px(0, 0, W, H, C.stage);
      px(0, ground, W, 1, C.line);
      for (let x = 0; x < W; x += 6) px(x, ground + 3, 2, 1, C.line); // road stays still
      drawScanner(t, mode === "pause");
      for (let k = 0; k < N; k++) drawSprite(k); // characters are drawn in front of the scanner
    };

    const frame = (t: number) => {
      const dt = Math.min(50, t - (last || t));
      last = t;
      step(dt);
      draw(t);
      raf = requestAnimationFrame(frame);
    };

    // Reduced motion: a single still frame showing the first finished scan.
    const staticFrame = () => {
      startAt(0);
      pauseT = T_RESULT;
      scanned[0] = true;
      show(0, "result");
      draw(0);
    };

    const boot = (t: number) => {
      readColors();
      layout();
      if (reduce) staticFrame();
      else {
        startAt(0);
        frame(t);
      }
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        layout();
        if (reduce) staticFrame();
        else startAt(cur);
      }, 120);
    };
    const recolor = () => {
      readColors();
      if (reduce) draw(0);
    };

    raf = requestAnimationFrame(boot);
    window.addEventListener("resize", onResize);
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", recolor);
    const themeObserver = new MutationObserver(recolor);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      scheme.removeEventListener("change", recolor);
      themeObserver.disconnect();
    };
  }, []);

  const scan = SCANS[panel.index];
  const status =
    panel.phase !== "result"
      ? { text: "Scanning", className: "text-muted" }
      : scan.ok
        ? { text: "Matches", className: "text-match" }
        : { text: "Gap", className: "text-gap" };

  return (
    <div className="mt-9 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
      <div
        ref={stageRef}
        role="img"
        aria-label="Animation: small pixel characters walk one by one through a scanner that compares what each says about itself with what it actually does."
        className="relative flex min-w-0 items-end overflow-hidden border border-line bg-stage"
      >
        <canvas ref={canvasRef} className="block max-w-none [image-rendering:pixelated]" />
      </div>
      <aside aria-live="off" className="flex min-w-0 flex-col gap-3 border border-line px-5 py-[18px]">
        <div className="flex items-center justify-between gap-3 font-pixel text-xs tracking-[0.06em] uppercase">
          <span className="flex items-center gap-2">
            <span className="inline-block size-2.5" style={{ background: `var(--c${panel.index + 1})` }} />
            <span>{scan.name}</span>
          </span>
          <span className={status.className}>{status.text}</span>
        </div>
        <dl className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-3 gap-y-2 text-[15px] leading-[1.45] [&_dd]:min-h-[2.9em] [&_dt]:pt-[3px] [&_dt]:font-pixel [&_dt]:text-[11px] [&_dt]:tracking-[0.06em] [&_dt]:text-muted [&_dt]:uppercase">
          <dt>Says</dt>
          <dd>{scan.says}</dd>
          <dt>Does</dt>
          <dd className={panel.phase === "says" ? "text-muted" : undefined}>
            {panel.phase === "says" ? "…" : scan.does}
          </dd>
        </dl>
        <div className="mt-auto border-t border-line pt-2.5 text-[12.5px] text-muted">
          Illustration of the idea. These are example behaviours, not real results.
        </div>
      </aside>
    </div>
  );
}
