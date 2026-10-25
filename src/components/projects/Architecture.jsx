import { useIntl } from "react-intl";
import Fit from "../ui/fit";

/*
 * "How it works" diagram, drawn on fixed canvases (desktop: horizontal,
 * phone: vertical) that <Fit> scales. Connectors are axis-aligned SVG lines;
 * the flowing light is a small gradient rect moved with a CSS transform
 * (see .flow-x/.flow-y in sections.css), so nothing repaints the layout.
 * `rev` segments flow from (x2,y2) back to (x1,y1).
 */

const PULSE = 48;

const DESKTOP = {
  width: 1100,
  height: 410,
  nodes: [
    { id: "projects.tab.student", x: 0, y: 30, w: 160, h: 48 },
    { id: "projects.tab.teacher", x: 0, y: 94, w: 160, h: 48 },
    { id: "projects.tab.admin", x: 0, y: 158, w: 160, h: 48 },
    { id: "projects.tab.parent", x: 0, y: 222, w: 160, h: 48 },
    { label: "React + Inertia", sub: "frontend", x: 260, y: 110, w: 200, h: 80 },
    { label: "Laravel API", sub: "backend · 66 actions", x: 540, y: 100, w: 220, h: 100, main: true },
    { label: "MySQL / PostgreSQL + Redis", sub: "data", x: 840, y: 104, w: 260, h: 92 },
    { id: "projects.arch.telegram", x: 300, y: 340, w: 200, h: 64 },
    { id: "projects.arch.excel", x: 550, y: 340, w: 200, h: 64 },
    { id: "projects.arch.sheets", x: 800, y: 340, w: 200, h: 64 },
  ],
  segments: [
    [160, 54, 200, 54],
    [160, 118, 200, 118],
    [160, 182, 200, 182],
    [160, 246, 200, 246],
    [200, 54, 200, 150],
    [200, 150, 200, 246, true],
    [200, 150, 260, 150],
    [460, 150, 540, 150],
    [760, 150, 840, 150],
    [650, 200, 650, 300],
    [400, 300, 650, 300, true],
    [650, 300, 900, 300],
    [400, 300, 400, 340],
    [650, 300, 650, 340],
    [900, 300, 900, 340],
  ],
};

const MOBILE = {
  width: 340,
  height: 490,
  nodes: [
    { id: "projects.tab.student", x: 0, y: 0, w: 76, h: 40, small: true, nowrap: true },
    { id: "projects.tab.teacher", x: 88, y: 0, w: 76, h: 40, small: true, nowrap: true },
    { id: "projects.tab.admin", x: 176, y: 0, w: 76, h: 40, small: true, nowrap: true },
    { id: "projects.tab.parent", x: 264, y: 0, w: 76, h: 40, small: true, nowrap: true },
    { label: "React + Inertia", sub: "frontend", x: 60, y: 100, w: 220, h: 56 },
    { label: "Laravel API", sub: "backend · 66 actions", x: 60, y: 196, w: 220, h: 60, main: true },
    { label: "MySQL / PostgreSQL + Redis", x: 30, y: 296, w: 280, h: 64 },
    { id: "projects.arch.telegram", x: 5, y: 436, w: 104, h: 54, small: true },
    { id: "projects.arch.excel", x: 118, y: 436, w: 104, h: 54, small: true },
    { id: "projects.arch.sheets", x: 231, y: 436, w: 104, h: 54, small: true },
  ],
  segments: [
    [38, 40, 38, 64],
    [126, 40, 126, 64],
    [214, 40, 214, 64],
    [302, 40, 302, 64],
    [38, 64, 170, 64],
    [170, 64, 302, 64, true],
    [170, 64, 170, 100],
    [170, 156, 170, 196],
    [170, 256, 170, 296],
    [14, 226, 60, 226, true],
    [14, 226, 14, 412],
    [14, 412, 283, 412],
    [57, 412, 57, 436],
    [170, 412, 170, 436],
    [283, 412, 283, 436],
  ],
};

function Diagram({ layout, prefix }) {
  const intl = useIntl();

  return (
    <div className="relative h-full w-full">
      <svg width={layout.width} height={layout.height} className="absolute inset-0 overflow-visible" aria-hidden="true">
        <defs>
          {["h", "v"].map((dir) => (
            <linearGradient key={dir} id={`${prefix}-pulse-${dir}`} x1="0" y1="0" x2={dir === "h" ? 1 : 0} y2={dir === "v" ? 1 : 0}>
              <stop offset="0" stopColor="#3DE0FF" stopOpacity="0" />
              <stop offset=".5" stopColor="#C6FF3D" />
              <stop offset="1" stopColor="#3DE0FF" stopOpacity="0" />
            </linearGradient>
          ))}
          {layout.segments.map(([x1, y1, x2, y2], i) => (
            <clipPath key={i} id={`${prefix}-clip-${i}`}>
              <rect x={Math.min(x1, x2) - 3} y={Math.min(y1, y2) - 3} width={Math.abs(x2 - x1) + 6} height={Math.abs(y2 - y1) + 6} />
            </clipPath>
          ))}
        </defs>

        {layout.segments.map(([x1, y1, x2, y2], i) => (
          <g key={i}>
            {/* soft halo + crisp line */}
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="6" strokeLinecap="round" style={{ stroke: "rgb(var(--accent-ink) / .08)" }} />
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" style={{ stroke: "rgb(var(--accent-ink) / .35)" }} />
          </g>
        ))}

        {layout.segments.map(([x1, y1, x2, y2, rev], i) => {
          const horizontal = y1 === y2;
          const len = horizontal ? x2 - x1 : y2 - y1;
          const style = {
            "--len": `${len + PULSE}px`,
            "--dur": `${Math.max(1.2, len / 70)}s`,
            "--delay": `${(i % 6) * 0.35}s`,
            animationDirection: rev ? "reverse" : "normal",
            transformBox: "view-box",
          };
          return (
            <g key={i} clipPath={`url(#${prefix}-clip-${i})`}>
              {horizontal ? (
                <rect x={x1} y={y1 - 2} width={PULSE} height="4" rx="2" fill={`url(#${prefix}-pulse-h)`} className="flow-x motion-reduce:hidden" style={style} />
              ) : (
                <rect x={x1 - 2} y={y1} width="4" height={PULSE} rx="2" fill={`url(#${prefix}-pulse-v)`} className="flow-y motion-reduce:hidden" style={style} />
              )}
            </g>
          );
        })}
      </svg>

      {layout.nodes.map((n) => (
        <div
          key={n.id || n.label}
          className={`absolute flex flex-col justify-center rounded-2xl border px-4 ${
            n.main ? "border-lime/60 bg-surface shadow-glow" : "border-line bg-surface"
          } ${n.small ? "items-center px-2 text-center" : ""}`}
          style={{ left: n.x, top: n.y, width: n.w, height: n.h }}
        >
          <span className={`font-display font-semibold leading-tight ${n.small ? "text-[12px]" : "text-[15px]"} ${n.nowrap ? "whitespace-nowrap" : ""}`}>
            {n.id ? intl.formatMessage({ id: n.id }) : n.label}
          </span>
          {(n.sub || n.subId) && (
            <span className="mt-1 font-mono text-[11px] leading-snug text-muted">{n.subId ? intl.formatMessage({ id: n.subId }) : n.sub}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Responsive figure: horizontal diagram from md up, vertical one on phones. */
export function ArchitectureFigure({ desktop, mobile, altId, prefix }) {
  const intl = useIntl();
  return (
    <figure aria-label={intl.formatMessage({ id: altId })}>
      <Fit width={desktop.width} height={desktop.height} className="relative hidden md:block" style={{ aspectRatio: `${desktop.width}/${desktop.height}` }}>
        <Diagram layout={desktop} prefix={`${prefix}d`} />
      </Fit>
      <Fit width={mobile.width} height={mobile.height} className="relative mx-auto max-w-[420px] md:hidden" style={{ aspectRatio: `${mobile.width}/${mobile.height}` }}>
        <Diagram layout={mobile} prefix={`${prefix}m`} />
      </Fit>
    </figure>
  );
}

export default function Architecture() {
  return <ArchitectureFigure desktop={DESKTOP} mobile={MOBILE} altId="projects.arch.alt" prefix="sw" />;
}
