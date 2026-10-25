import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  FiGrid,
  FiColumns,
  FiUsers,
  FiCreditCard,
  FiFileText,
  FiBarChart2,
  FiUpload,
  FiPlus,
  FiClock,
  FiDownload,
  FiLock,
  FiCheck,
  FiChevronLeft,
  FiPaperclip,
  FiMic,
  FiBell,
} from "react-icons/fi";
import { Laptop, Phone } from "../showcase/devices";
import { Bubble, Typing } from "../showcase/screens";
import {
  COMPLEX,
  DEAL,
  FACADE,
  KPI,
  MANAGERS,
  PAYMENT_STATUS,
  SCHEDULE,
  STATUS,
  sum,
} from "../../../data/crm";

/*
 * Mockups of the CRM in the client's own "Architect" brand: warm paper
 * background, navy sidebar, brass accent, serif headings, monospaced numbers.
 * Colours are fixed (crm-* tokens) so they look the same in both site themes.
 * Labels are Uzbek on purpose — that is the real interface. All data is made up.
 */

const EASE = [0.22, 1, 0.36, 1];
const SERIF = "font-crm";

/** True one frame after mount (or at once with reduced motion), to start CSS transitions. */
function useStarted() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return reduce || started;
}

/** Milliseconds since mount, ticking until `until`; Infinity with reduced motion. */
function useElapsed(until) {
  const reduce = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    const id = setInterval(() => {
      const ms = performance.now() - start;
      setElapsed(ms);
      if (ms > until) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [reduce, until]);
  return reduce ? Infinity : elapsed;
}

/** Countdown from `seconds`, formatted hh:mm:ss; frozen with reduced motion. */
function useCountdown(seconds) {
  const reduce = useReducedMotion();
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [reduce]);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(Math.floor(left / 3600))}:${pad(Math.floor(left / 60) % 60)}:${pad(left % 60)}`;
}

/* ------------------------------------------------------------------ Shell */

const NAV = [
  ["Shaxmatka", FiGrid],
  ["Bitimlar", FiColumns],
  ["Mijozlar", FiUsers],
  ["To‘lovlar", FiCreditCard],
  ["Shartnomalar", FiFileText],
  ["Hisobotlar", FiBarChart2],
];

function Shell({ active, title, sub, actions, children }) {
  return (
    <Laptop screenClassName="bg-crm-bg text-crm-ink">
      <div className="flex h-full">
        <aside className="flex w-[124px] shrink-0 flex-col bg-crm-navy px-2.5 pb-3 pt-4 text-white/60">
          <div className="flex items-center gap-2 px-1.5">
            <span className={`grid h-[24px] w-[24px] place-items-center rounded-[6px] bg-crm-brass text-[13px] font-semibold text-crm-navy ${SERIF}`}>
              N
            </span>
            <span className="leading-none">
              <span className={`block text-[13px] font-medium text-white ${SERIF}`}>Navo</span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-crm-brass">Residence</span>
            </span>
          </div>
          <nav className="mt-5 space-y-0.5">
            {NAV.map(([label, Icon]) => {
              const on = label === active;
              return (
                <span
                  key={label}
                  className={`relative flex items-center gap-2 rounded-[7px] px-2 py-[7px] text-[10.5px] font-medium ${
                    on ? "bg-white/10 text-white" : ""
                  }`}
                >
                  {on && <span className="absolute -left-2.5 top-1.5 h-[calc(100%-12px)] w-[3px] rounded-r bg-crm-brass" />}
                  <Icon size={12} className={on ? "text-crm-brass" : ""} />
                  {label}
                </span>
              );
            })}
          </nav>
          <div className="mt-auto flex items-center gap-2 border-t border-white/10 px-1 pt-3">
            <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-white/10 text-[8.5px] font-semibold text-white">JM</span>
            <span className="leading-tight">
              <span className="block text-[9.5px] font-semibold text-white">Javohir M.</span>
              <span className="text-[8.5px]">menejer</span>
            </span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[48px] shrink-0 items-center gap-3 border-b border-crm-line px-4">
            <div className="min-w-0 leading-tight">
              <p className={`text-[16px] font-medium ${SERIF}`}>{title}</p>
              {sub && <p className="truncate text-[9px] text-crm-muted">{sub}</p>}
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              {actions}
              <span className="ml-1 flex overflow-hidden rounded-full border border-crm-line text-[8.5px] font-semibold">
                <span className="bg-crm-navy px-1.5 py-[3px] text-white">UZ</span>
                <span className="px-1.5 py-[3px] text-crm-muted">RU</span>
              </span>
            </div>
          </header>
          <div className="relative min-h-0 flex-1 p-4">{children}</div>
        </div>
      </div>
    </Laptop>
  );
}

function Btn({ children, primary, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-[7px] px-2.5 py-[5px] text-[9.5px] font-semibold ${
        primary ? "bg-crm-brass text-crm-navy" : "border border-crm-line bg-crm-card text-crm-ink"
      } ${className}`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[10px] border border-crm-line bg-crm-card ${className}`}>{children}</div>;
}

const Mono = ({ children, className = "" }) => <span className={`font-mono tabular-nums ${className}`}>{children}</span>;

/** Soft status badge: tinted background, solid dot, darkened label. */
function Badge({ color, children }) {
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-[2px] text-[8.5px] font-semibold"
      style={{ background: `${color}1F`, color: `color-mix(in srgb, ${color} 75%, #1B2433)` }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------- Shaxmatka */

const HOVERED = DEAL.apartment;

function Tile({ apt }) {
  const { color, label } = STATUS[apt.status];
  const sold = apt.status === "sold";
  const off = apt.status === "off";
  const hovered = apt.number === HOVERED;
  return (
    <div
      className={`relative h-[43px] overflow-hidden rounded-[6px] border px-1.5 pb-1 pt-[6px] leading-none ${
        hovered ? "z-10 -translate-y-0.5 border-crm-brass bg-white shadow-[0_6px_14px_-6px_rgba(15,27,45,.35)] ring-2 ring-crm-brass/40" : "border-crm-line"
      } ${sold ? "bg-[#F1ECE2] text-crm-muted" : off ? "bg-[repeating-linear-gradient(135deg,#ECE8DF_0_4px,#F4F1EA_4px_8px)] text-crm-muted" : hovered ? "" : "bg-crm-card"}`}
      title={label}
    >
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: color }} />
      <span className="flex items-baseline justify-between">
        <Mono className={`text-[10.5px] font-semibold ${sold || off ? "" : "text-crm-ink"}`}>{apt.number}</Mono>
        <span className="text-[8px] font-semibold">{apt.rooms}x</span>
      </span>
      <span className="mt-[3px] block text-[8px]">{String(apt.area).replace(".", ",")} m²</span>
      <Mono className="mt-[2px] block text-[8.5px] font-medium">{apt.price} mln</Mono>
    </div>
  );
}

function Building({ started }) {
  const total = KPI.free + KPI.hold + KPI.sold + KPI.off;
  const sold = KPI.sold / total;
  const held = (KPI.sold + KPI.hold) / total;
  return (
    <div className="flex w-[62px] flex-col items-center">
      <div className="relative h-[262px] w-[52px]">
        {/* roof */}
        <div className="mx-auto h-[10px] w-[34px] rounded-t-[3px] bg-crm-navy/80" />
        <div className="relative h-[252px] overflow-hidden rounded-t-[4px] border border-crm-navy/30 bg-crm-card">
          <div
            className="absolute inset-0 origin-bottom bg-crm-hold/50 transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: `scaleY(${started ? held : 0})` }}
          />
          <div
            className="absolute inset-0 origin-bottom bg-crm-sold/80 transition-transform delay-150 duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: `scaleY(${started ? sold : 0})` }}
          />
          {/* windows */}
          <div className="absolute inset-[6px] grid grid-cols-3 gap-[4px]">
            {Array.from({ length: 30 }, (_, i) => (
              <span key={i} className="rounded-[1.5px] border border-crm-navy/15 bg-white/40" />
            ))}
          </div>
        </div>
      </div>
      <div className="h-[3px] w-[62px] rounded bg-crm-navy/70" />
      <Mono className="mt-1.5 text-[11px] font-semibold">{Math.round(sold * 100)}%</Mono>
      <span className="text-[8px] text-crm-muted">sotilgan</span>
    </div>
  );
}

export function ChessScreen() {
  const started = useStarted();
  const reduce = useReducedMotion();
  return (
    <Shell
      active="Shaxmatka"
      title="Shaxmatka"
      sub={`${COMPLEX} · A blok · 6 qavat`}
      actions={
        <>
          <Btn>
            <FiUpload size={10} /> Excel’dan import
          </Btn>
          <Btn>
            <FiPlus size={10} /> Uy generatori
          </Btn>
        </>
      }
    >
      <div className="flex items-center gap-1.5">
        {["free", "hold", "sold"].map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-crm-line bg-crm-card px-2 py-[3px] text-[9.5px] font-medium">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: STATUS[k].color }} />
            {STATUS[k].label}
            <Mono className="font-semibold">{KPI[k]}</Mono>
          </span>
        ))}
        <span className="ml-auto flex overflow-hidden rounded-[7px] border border-crm-line text-[9px] font-semibold">
          <span className="bg-crm-navy px-2 py-[3px] text-white">A blok</span>
          <span className="bg-crm-card px-2 py-[3px] text-crm-muted">B blok</span>
        </span>
      </div>

      <div className="mt-3 flex gap-3">
        <div className="flex-1">
          <div className="grid grid-cols-[16px_1fr_1fr] gap-x-2 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-crm-muted">
            <span />
            <span>1-podyezd</span>
            <span>2-podyezd</span>
          </div>
          <div className="mt-1.5 space-y-[5px]">
            {FACADE.map((floor, r) => (
              <div key={r} className="grid grid-cols-[16px_1fr_1fr] items-center gap-x-2">
                <Mono className="text-[9px] text-crm-muted">{6 - r}</Mono>
                {floor.map((entrance, e) => (
                  <div key={e} className="grid grid-cols-3 gap-[5px]">
                    {entrance.map((apt) => (
                      <div key={apt.number} className="relative">
                        <Tile apt={apt} />
                        {apt.number === HOVERED && (
                          <m.div
                            initial={reduce ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.4, ease: EASE }}
                            className="absolute left-1/2 top-[calc(100%+6px)] z-20 w-[156px] -translate-x-1/2 rounded-[10px] border border-crm-line bg-white p-2.5 shadow-[0_14px_30px_-12px_rgba(15,27,45,.45)]"
                          >
                            <span className="absolute -top-[5px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rotate-45 border-l border-t border-crm-line bg-white" />
                            <p className={`text-[12px] font-medium ${SERIF}`}>Kv. {apt.number} · {apt.rooms} xonali</p>
                            <p className="mt-0.5 text-[8.5px] text-crm-muted">
                              {String(apt.area).replace(".", ",")} m² · {6 - r}-qavat · <Badge color={STATUS.free.color}>Bo‘sh</Badge>
                            </p>
                            <Mono className="mt-1.5 block text-[11px] font-semibold">{sum(DEAL.total)} so‘m</Mono>
                            <span className="mt-2 flex items-center justify-center gap-1 rounded-[7px] bg-crm-brass py-[5px] text-[9.5px] font-semibold text-crm-navy">
                              <FiClock size={10} /> Bron qilish
                            </span>
                          </m.div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Building started={started} />
      </div>
    </Shell>
  );
}

/* --------------------------------------------------------------- Bitimlar */

const STAGES = [
  {
    name: "Ariza",
    count: 12,
    cards: [
      { name: "Sardor Aliyev", apt: "1x · 41 m²", sum: "354 mln" },
      { name: "Nodira Qosimova", apt: "3x · 83 m²", sum: "760 mln" },
    ],
  },
  { name: "Konsultatsiya", count: 8, cards: [{ name: "Bekzod Tursunov", apt: "2x · 58 m²", sum: "514 mln" }] },
  { name: "Tashrif", count: 5, slot: true, cards: [{ name: "Dilnoza Karimova", apt: "Kv. 8 · 3x", sum: "727 mln" }] },
  { name: "Bron", count: 9, slot: true, cards: [{ name: "Malika Yusupova", apt: "Kv. 41 · 2x", sum: "561 mln", timer: "06:12:40" }] },
  { name: "Shartnoma", count: 21, cards: [{ name: "Ulug‘bek Sobirov", apt: "Kv. 16 · 3x", sum: "698 mln", discount: 3 }] },
];
const COL_W = 94;
const COL_GAP = 8;

function DealCard({ card, timer, className = "", style }) {
  return (
    <div className={`rounded-[8px] border border-crm-line bg-white p-2 ${className}`} style={style}>
      <p className="truncate text-[9.5px] font-semibold">{card.name}</p>
      <p className="mt-0.5 text-[8.5px] text-crm-muted">{card.apt}</p>
      <div className="mt-1.5 flex items-center justify-between">
        <Mono className="text-[9px] font-semibold">{card.sum}</Mono>
        {card.discount && (
          <span className="rounded-[4px] bg-crm-brass/20 px-1 text-[8px] font-semibold text-[#7A5E1F]">−{card.discount}%</span>
        )}
      </div>
      {timer && (
        <span className="mt-1.5 flex items-center gap-1 rounded-[5px] bg-crm-hold/15 px-1.5 py-[3px] text-[8.5px] font-semibold text-[#8A5F12]">
          <FiClock size={9} />
          <Mono>{timer}</Mono>
        </span>
      )}
    </div>
  );
}

export function DealsScreen() {
  const reduce = useReducedMotion();
  const timer = useCountdown(23 * 3600 + 41 * 60 + 8);
  const otherTimer = useCountdown(6 * 3600 + 12 * 60 + 40);
  // 0: the deal sits in "Tashrif"; 1: it slides into "Bron" and gets a timer.
  // Each new cycle remounts the card (key), so it fades back in at "Tashrif".
  const [phase, setPhase] = useState(reduce ? 1 : 0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => {
      if (phase === 1) setCycle((c) => c + 1);
      setPhase(1 - phase);
    }, phase === 0 ? 1400 : 4200);
    return () => clearTimeout(id);
  }, [phase, reduce]);

  const pitch = COL_W + COL_GAP;
  const col = phase ? 3 : 2;

  return (
    <Shell
      active="Bitimlar"
      title="Bitimlar"
      sub={`${COMPLEX} · oktabr`}
      actions={
        <>
          <Btn>Barchasi ▾</Btn>
          <Btn primary>
            <FiPlus size={10} /> Yangi ariza
          </Btn>
        </>
      }
    >
      <div className="relative flex" style={{ gap: COL_GAP }}>
        {STAGES.map((stage, i) => (
          <div key={stage.name} className="h-[338px] shrink-0 rounded-[10px] bg-[#EFEAE0] p-1.5" style={{ width: COL_W }}>
            <p className="flex items-center justify-between px-1 pb-2 pt-0.5 text-[9px] font-semibold">
              <span className="truncate">{stage.name}</span>
              <Mono className="text-crm-muted">{stage.count}</Mono>
            </p>
            <div className="space-y-1.5">
              {stage.slot && (
                // Room for the travelling card; in "Bron" it also shows the timer.
                <div className={`rounded-[8px] border border-dashed border-crm-line ${i === 3 ? "h-[94px]" : "h-[68px]"}`} />
              )}
              {stage.cards.map((card) => (
                <DealCard key={card.name} card={card} timer={card.timer && (i === 3 ? otherTimer : card.timer)} />
              ))}
              {i === 0 && <div className="h-[46px] rounded-[8px] bg-white/50" />}
            </div>
          </div>
        ))}

        {/* The travelling deal: Tashrif → Bron. */}
        <m.div
          key={cycle}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="absolute top-[28px]"
          style={{ left: 6, width: COL_W - 12 }}
        >
          <DealCard
            card={{ name: DEAL.client, apt: `Kv. ${DEAL.apartment} · ${DEAL.rooms}x`, sum: "526 mln" }}
            timer={phase ? timer : null}
            className="border-crm-brass shadow-[0_10px_22px_-12px_rgba(15,27,45,.5)] ring-2 ring-crm-brass/30 transition-transform duration-[900ms] ease-[cubic-bezier(.65,0,.35,1)]"
            style={{ transform: `translateX(${col * pitch}px)` }}
          />
        </m.div>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------- To‘lovlar */

export function InstallmentsScreen() {
  const started = useStarted();
  const paid = SCHEDULE.reduce((acc, r) => acc + r.paid, 0);
  const share = paid / DEAL.total;
  return (
    <Shell
      active="To‘lovlar"
      title="To‘lov grafigi"
      sub={`Shartnoma № ${DEAL.contract} · ${COMPLEX}`}
      actions={
        <Btn primary>
          <FiPlus size={10} /> To‘lov qabul qilish
        </Btn>
      }
    >
      <Card className="flex items-center gap-4 px-3.5 py-3">
        <div className="min-w-0">
          <p className={`text-[14px] font-medium ${SERIF}`}>{DEAL.client}</p>
          <p className="text-[8.5px] text-crm-muted">
            Kv. {DEAL.apartment} · {DEAL.rooms} xonali · {String(DEAL.area).replace(".", ",")} m² · 30% + 12 oy
          </p>
        </div>
        <div className="ml-auto w-[250px]">
          <div className="flex items-baseline justify-between text-[8.5px] text-crm-muted">
            <span>
              To‘langan <Mono className="text-[10px] font-semibold text-crm-ink">{sum(paid)}</Mono>
            </span>
            <span>
              Jami <Mono className="text-[10px] font-semibold text-crm-ink">{sum(DEAL.total)}</Mono>
            </span>
          </div>
          <div className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-[#ECE6DA]">
            <div
              className="h-full w-full origin-left rounded-full bg-crm-free transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ transform: `scaleX(${started ? share : 0})` }}
            />
          </div>
          <Mono className="mt-1 block text-right text-[9px] font-semibold text-crm-free">{Math.round(share * 100)}%</Mono>
        </div>
      </Card>

      <Card className="mt-2.5 overflow-hidden">
        <div className="grid grid-cols-[28px_76px_1fr_1fr_96px] gap-2 border-b border-crm-line bg-[#F3EEE4] px-3 py-[6px] text-[8.5px] font-semibold uppercase tracking-[0.08em] text-crm-muted">
          <span>№</span>
          <span>Sana</span>
          <span className="text-right">Summa</span>
          <span className="text-right">To‘langan</span>
          <span>Holat</span>
        </div>
        {SCHEDULE.map((row) => {
          const st = PAYMENT_STATUS[row.status];
          return (
            <div
              key={row.n}
              className={`grid grid-cols-[28px_76px_1fr_1fr_96px] items-center gap-2 border-b border-crm-line/70 px-3 py-[6px] text-[9.5px] ${
                row.status === "overdue" ? "bg-crm-sold/[.06]" : ""
              }`}
            >
              <Mono className="text-crm-muted">{row.n === 0 ? "0" : row.n}</Mono>
              <Mono>{row.date}</Mono>
              <Mono className="text-right font-medium">{sum(row.sum)}</Mono>
              <Mono className={`text-right ${row.paid ? "" : "text-crm-muted"}`}>{row.paid ? sum(row.paid) : "—"}</Mono>
              <Badge color={st.color}>{st.label}</Badge>
            </div>
          );
        })}
        <div className="flex items-center justify-between px-3 py-[7px] text-[9px] text-crm-muted">
          <span>… yana 6 ta to‘lov · yaxlitlash 1 000 so‘m</span>
          <span className="flex items-center gap-1">
            Grafik jami <Mono className="font-semibold text-crm-ink">{sum(DEAL.total)}</Mono>
            <FiCheck size={11} className="text-crm-free" />
          </span>
        </div>
      </Card>
    </Shell>
  );
}

/* ----------------------------------------------------------- Shartnomalar */

// Text-placeholder rows of the A4 sheet (widths in %).
const Lines = ({ widths }) => (
  <div className="mt-1.5 space-y-[4px]">
    {widths.map((w, i) => (
      <span key={i} className="block h-[3px] rounded-full bg-[#D9D4CA]" style={{ width: `${w}%` }} />
    ))}
  </div>
);

// Filled template fields are tinted brass, like the preview in the real app.
const Field = ({ children }) => <span className="rounded-[2px] bg-crm-brass/20 px-0.5 font-semibold text-[#1B2433]">{children}</span>;

export function ContractScreen() {
  const elapsed = useElapsed(2600);
  const pdfReady = elapsed > 2200;
  return (
    <Shell
      active="Shartnomalar"
      title="Shartnoma"
      sub={`№ ${DEAL.contract} · ${DEAL.client}`}
      actions={<Btn>Shablonlar</Btn>}
    >
      <div className="flex h-full gap-4">
        {/* A4 sheet (1 : 1.414) */}
        <div className="h-[340px] w-[240px] shrink-0 bg-white px-5 py-4 font-[Georgia,'Times_New_Roman',serif] text-[#2A2A2A] shadow-[0_1px_2px_rgba(15,27,45,.12),0_16px_32px_-16px_rgba(15,27,45,.4)]">
          <p className="text-center text-[6.5px] uppercase tracking-[0.3em] text-crm-muted">{COMPLEX}</p>
          <p className="mt-2 text-center text-[9.5px] font-bold tracking-wide">ОЛДИ-СОТДИ ШАРТНОМАСИ</p>
          <p className="text-center font-mono text-[7px]">№ {DEAL.contract}</p>
          <div className="mt-2 flex justify-between text-[6.5px]">
            <span>Наманган ш.</span>
            <span className="font-mono">{DEAL.date}</span>
          </div>
          <p className="mt-2 text-[6.5px] leading-[1.55]">
            «{COMPLEX}» (Сотувчи) ва фуқаро <Field>Азиз Раҳимов</Field> (Харидор) қуйидагилар ҳақида ушбу шартномани туздилар:
          </p>
          <Lines widths={[100, 94, 72]} />
          <p className="mt-2 text-[6.5px] font-bold">1. Шартнома предмети</p>
          <p className="mt-0.5 text-[6.5px] leading-[1.55]">
            Квартира <Field>№ {DEAL.apartment}</Field>, <Field>2 хонали</Field>, <Field>58,4 м²</Field>, 3-қават.
          </p>
          <Lines widths={[100, 88]} />
          <p className="mt-2 text-[6.5px] font-bold">2. Нархи ва тўлов тартиби</p>
          <p className="mt-0.5 text-[6.5px] leading-[1.55]">
            Умумий қиймат: <Field>525 600 000</Field> (<Field>беш юз йигирма беш миллион олти юз минг</Field>) сўм.
          </p>
          <Lines widths={[100, 96, 100, 64]} />
          <div className="mt-4 flex justify-between text-[6.5px]">
            <span>
              Сотувчи
              <span className="mt-2.5 block w-[70px] border-b border-[#999]" />
            </span>
            <span>
              Харидор
              <span className="mt-2.5 block w-[70px] border-b border-[#999]" />
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <Card className="p-3">
            <p className={`text-[14px] font-medium ${SERIF}`}>№ {DEAL.contract}</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              <Badge color="#2F8F6B">Imzolangan</Badge>
              <span className="inline-flex items-center gap-1 rounded-full bg-crm-navy/[.07] px-1.5 py-[2px] text-[8.5px] font-semibold text-crm-navy">
                <FiLock size={8} /> Ma’lumotlar qotirilgan
              </span>
            </div>
            <dl className="mt-2.5 space-y-1.5 text-[9px]">
              {[
                ["Shablon", "buyurtmachi_shabloni.docx"],
                ["Mijoz", DEAL.client],
                ["Summa yozuvda", "avtomatik"],
                ["Kirill yozuvi", "avtomatik"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <dt className="text-crm-muted">{k}</dt>
                  <dd className="truncate font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Card className="flex flex-col items-start gap-1.5 p-2.5">
              <span className="grid h-[26px] w-[26px] place-items-center rounded-[6px] bg-[#2B579A] text-[10px] font-bold text-white">W</span>
              <span className="text-[10px] font-semibold">Word</span>
              <span className="flex items-center gap-1 text-[8.5px] text-crm-muted">
                <FiDownload size={9} /> .docx
              </span>
            </Card>
            <Card className={`flex flex-col items-start gap-1.5 p-2.5 transition-colors duration-500 ${pdfReady ? "border-crm-sold/40" : ""}`}>
              <span className="grid h-[26px] w-[26px] place-items-center rounded-[6px] bg-crm-sold text-[8.5px] font-bold text-white">PDF</span>
              <span className="text-[10px] font-semibold">PDF</span>
              <span className="flex items-center gap-1 text-[8.5px] text-crm-muted">
                {pdfReady ? (
                  <>
                    <FiCheck size={9} className="text-crm-free" /> tayyor
                  </>
                ) : (
                  <>
                    <span className="h-[8px] w-[8px] animate-spin rounded-full border border-crm-muted border-t-transparent" /> navbatda…
                  </>
                )}
              </span>
            </Card>
          </div>
          <p className="px-1 text-[8.5px] leading-snug text-crm-muted">
            Mijoz ma’lumotlari keyin o‘zgarsa ham, imzolangan shartnoma o‘zgarmaydi.
          </p>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------- Hisobotlar */

const METHODS = [
  { name: "Naqd", value: 46, sum: "846 mln" },
  { name: "Bank o‘tkazmasi", value: 38, sum: "699 mln" },
  { name: "Plastik karta", value: 16, sum: "295 mln" },
];
const WEEKS = [
  { label: "1–7", value: 96 },
  { label: "8–14", value: 128 },
  { label: "15–21", value: 74 },
  { label: "22–30", value: 114 },
];

export function ReportsScreen() {
  const started = useStarted();
  const grow = "transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)]";
  const kpis = [
    { label: "Oktabr tushumlari", value: "1,84 mlrd", delta: "+12%", tone: "text-crm-free" },
    { label: "Muddati o‘tgan", value: "96,3 mln", delta: "7 ta", tone: "text-crm-sold" },
    { label: "Kutilmoqda · 30 kun", value: "412 mln", delta: "38 ta", tone: "text-crm-muted" },
    { label: "Konversiya", value: "18,4%", delta: "+2,1", tone: "text-crm-free" },
  ];
  const maxWeek = Math.max(...WEEKS.map((w) => w.value));

  return (
    <Shell
      active="Hisobotlar"
      title="Rahbar paneli"
      sub={COMPLEX}
      actions={
        <>
          <Btn>Oktabr 2026 ▾</Btn>
          <Btn>
            <FiDownload size={10} /> Excel
          </Btn>
        </>
      }
    >
      <div className="grid grid-cols-4 gap-2">
        {kpis.map((k) => (
          <Card key={k.label} className="px-2.5 py-2">
            <p className="truncate text-[8.5px] text-crm-muted">{k.label}</p>
            <Mono className="mt-1 block text-[15px] font-semibold leading-none">{k.value}</Mono>
            <Mono className={`mt-1 block text-[8.5px] font-semibold ${k.tone}`}>{k.delta}</Mono>
          </Card>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-[1fr_1fr] gap-2">
        <Card className="p-3">
          <p className={`text-[11.5px] font-medium ${SERIF}`}>To‘lov usullari</p>
          <div className="mt-2.5 space-y-2.5">
            {METHODS.map((mtd, i) => (
              <div key={mtd.name}>
                <div className="flex justify-between text-[8.5px]">
                  <span>{mtd.name}</span>
                  <Mono className="text-crm-muted">
                    {mtd.sum} · <span className="font-semibold text-crm-ink">{mtd.value}%</span>
                  </Mono>
                </div>
                <div className="mt-1 h-[7px] overflow-hidden rounded-full bg-[#EFEAE0]">
                  <div
                    className={`h-full w-full origin-left rounded-full ${grow}`}
                    style={{
                      transform: `scaleX(${started ? mtd.value / 100 : 0})`,
                      background: ["#0F1B2D", "#C9A24B", "#2F8F6B"][i],
                      transitionDelay: `${i * 120}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-baseline justify-between">
            <p className={`text-[11.5px] font-medium ${SERIF}`}>Kutilayotgan tushumlar</p>
            <span className="text-[8px] text-crm-muted">30 kun · mln</span>
          </div>
          <div className="mt-2 flex h-[86px] items-end gap-3 border-b border-crm-line px-1">
            {WEEKS.map((w, i) => (
              <div key={w.label} className="flex h-full flex-1 flex-col items-center justify-end">
                <Mono className="mb-0.5 text-[8px] font-semibold">{w.value}</Mono>
                <div
                  className={`w-full origin-bottom rounded-t-[4px] bg-crm-brass ${grow}`}
                  style={{ height: `${(w.value / maxWeek) * 70}%`, transform: `scaleY(${started ? 1 : 0})`, transitionDelay: `${i * 100}ms` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex gap-3 px-1">
            {WEEKS.map((w) => (
              <Mono key={w.label} className="flex-1 text-center text-[7.5px] text-crm-muted">
                {w.label}
              </Mono>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-2 p-3">
        <div className="flex items-baseline justify-between">
          <p className={`text-[11.5px] font-medium ${SERIF}`}>Menejerlar konversiyasi</p>
          <span className="text-[8px] text-crm-muted">ariza → shartnoma</span>
        </div>
        <div className="mt-2 space-y-2">
          {MANAGERS.map((mgr, i) => (
            <div key={mgr.name} className="grid grid-cols-[86px_1fr_70px] items-center gap-3 text-[9px]">
              <span className="font-medium">{mgr.name}</span>
              <div className="h-[7px] overflow-hidden rounded-full bg-[#EFEAE0]">
                <div
                  className={`h-full w-full origin-left rounded-full bg-crm-navy ${grow}`}
                  style={{ transform: `scaleX(${started ? mgr.rate / 30 : 0})`, transitionDelay: `${200 + i * 120}ms` }}
                />
              </div>
              <Mono className="text-right text-crm-muted">
                <span className="font-semibold text-crm-ink">{mgr.rate}%</span> · {mgr.deals}
              </Mono>
            </div>
          ))}
        </div>
      </Card>
    </Shell>
  );
}

/* --------------------------------------------------------------- Telegram */

// Chat timeline (ms after the tab opens); slots are reserved from the start.
const CHAT = [
  { at: 300 }, // /start (one-tap link from the CRM)
  { at: 1300, typingFrom: 700 }, // connected
  { at: 2800, typingFrom: 1900 }, // reminder
  { at: 3600 }, // "Batafsil" pressed
  { at: 4600, typingFrom: 3900 }, // details
];

export function TelegramScreen() {
  const elapsed = useElapsed(5000);
  const shown = CHAT.map((c) => elapsed >= c.at);
  const typing = CHAT.map((c) => c.typingFrom !== undefined && elapsed >= c.typingFrom);
  const botTyping = typing.some((v, i) => v && !shown[i]);

  return (
    <Phone className="shadow-[0_0_80px_-10px_rgba(201,162,75,.55)]">
      <div className="flex h-full flex-col bg-[#0E1621] text-[#EDEFF3]">
        <div className="flex items-center gap-2.5 bg-[#17212B] px-3 pb-2.5 pt-10">
          <FiChevronLeft size={20} className="text-[#5FB6F0]" />
          <span className={`grid h-[34px] w-[34px] place-items-center rounded-full bg-crm-brass text-[15px] font-semibold text-crm-navy ${SERIF}`}>
            N
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold">Navo Residence Bot</p>
            <p className={`text-[11px] ${botTyping ? "text-[#5FB6F0]" : "text-[#7F91A4]"}`}>{botTyping ? "yozmoqda…" : "bot"}</p>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-hidden px-2.5 pt-3">
          <Bubble out shown={shown[0]} time="10:02">
            /start
          </Bubble>
          <Bubble shown={shown[1]} typing={typing[1]} time="10:02">
            Assalomu alaykum, Malika Yusupova! Botga ulandingiz ✓ To‘lov eslatmalari shu yerga keladi.
          </Bubble>

          <div className="relative">
            {typing[2] && !shown[2] && <Typing />}
            <div className={`w-[228px] transition duration-500 ${shown[2] ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
              <div className="rounded-[16px] rounded-bl-[4px] bg-[#182533] px-3 py-2 text-[12.5px] leading-snug">
                <p className="flex items-center gap-1.5 font-semibold text-[#E9C46A]">
                  <FiBell size={12} /> Eslatma
                </p>
                <p className="mt-1">
                  3 kundan keyin to‘lov — <span className="whitespace-nowrap font-mono font-semibold">12 450 000 so‘m</span>
                </p>
                <p className="mt-1 text-[10.5px] text-[#7F91A4]">Kv. 41 · {COMPLEX} · 18.11.2026</p>
                <span className="block text-right text-[9.5px] text-[#7F91A4]">09:00</span>
              </div>
              {/* inline keyboard */}
              <span
                className={`mt-1 block rounded-[10px] py-1.5 text-center text-[12px] font-semibold transition-colors duration-300 ${
                  shown[3] ? "bg-[#2B5278] text-white" : "bg-[#182533]/90 text-[#5FB6F0]"
                }`}
              >
                Batafsil
              </span>
            </div>
          </div>

          <Bubble shown={shown[4]} typing={typing[4]} time="09:01">
            <span className="block font-semibold">To‘lov grafigi · 5/12</span>
            <span className="mt-0.5 block text-[11.5px] text-[#C5D0DB]">
              To‘langan: <span className="font-mono">224 400 000</span>
              <br />
              Qoldiq: <span className="font-mono">336 600 000</span> so‘m
            </span>
          </Bubble>
        </div>

        <div className="flex items-center gap-2.5 bg-[#17212B] px-3 pb-6 pt-2.5 text-[#7F91A4]">
          <FiPaperclip size={17} />
          <span className="flex-1 text-[12px]">Xabar</span>
          <FiMic size={17} />
        </div>
      </div>
    </Phone>
  );
}
