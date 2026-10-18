import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { FiCheck } from "react-icons/fi";
import Fit from "../../ui/fit";
import { LAPTOP, PHONE } from "./devices";
import {
  StudentScreen,
  TeacherScreen,
  AdminScreen,
  LeadershipScreen,
  ParentScreen,
  TelegramScreen,
} from "./screens";

const TABS = [
  {
    key: "student",
    titleId: "projects.tab.student",
    Screen: StudentScreen,
    canvas: LAPTOP,
    points: ["projects.student.p1", "projects.student.p2", "projects.student.p3"],
  },
  {
    key: "teacher",
    titleId: "projects.tab.teacher",
    Screen: TeacherScreen,
    canvas: LAPTOP,
    points: ["projects.teacher.p1", "projects.teacher.p2", "projects.teacher.p3"],
  },
  {
    key: "admin",
    titleId: "projects.tab.admin",
    Screen: AdminScreen,
    canvas: LAPTOP,
    points: ["projects.admin.p1", "projects.admin.p2", "projects.admin.p3"],
  },
  {
    key: "lead",
    titleId: "projects.tab.lead",
    Screen: LeadershipScreen,
    canvas: LAPTOP,
    points: ["projects.lead.p1", "projects.lead.p2"],
  },
  {
    key: "parent",
    titleId: "projects.tab.parent",
    Screen: ParentScreen,
    canvas: PHONE,
    points: ["projects.parent.p1", "projects.parent.p2"],
  },
  {
    key: "telegram",
    titleId: "projects.tab.telegram",
    Screen: TelegramScreen,
    canvas: PHONE,
    glow: true,
    points: ["projects.telegram.p1", "projects.telegram.p2", "projects.telegram.p3"],
  },
];

const EASE = [0.22, 1, 0.36, 1];

/**
 * Role showcase: tabs on the left, a code-drawn mockup on the right.
 * Autoplay is driven by the CSS progress bar on the active tab — its
 * animationend advances to the next role — so pausing (hover, focus, section
 * off screen) is just animation-play-state. A manual pick stops autoplay;
 * with reduced motion the bar never runs, so there is no autoplay at all.
 */
export default function Showcase() {
  const intl = useIntl();
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const tabsRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const tab = TABS[active];
  const running = autoplay && inView && !hovered;

  // Keep the active tab visible in the horizontal row on phones without
  // scrolling the page itself.
  useEffect(() => {
    const row = tabsRef.current;
    const button = row?.children[active];
    if (!row || !button || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({
      left: button.offsetLeft - (row.clientWidth - button.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  const select = (i) => {
    setAutoplay(false);
    setActive(i);
  };

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + TABS.length) % TABS.length;
    select(next);
    tabsRef.current?.children[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(false)}
      className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-6"
    >
      <div
        ref={tabsRef}
        role="tablist"
        aria-label={intl.formatMessage({ id: "projects.tabs.label" })}
        onKeyDown={onKeyDown}
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:col-span-4 lg:row-start-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {TABS.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.key}
              id={`tab-${t.key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="showcase-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={`relative shrink-0 overflow-hidden rounded-full border px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:rounded-2xl lg:px-5 lg:py-4 lg:text-base ${
                selected
                  ? "border-transparent bg-ink text-bg"
                  : "border-line bg-surface text-muted hover:text-ink"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`hidden font-mono text-xs lg:inline ${selected ? "text-bg/60" : ""}`}>0{i + 1}</span>
                <FormattedMessage id={t.titleId} />
                {t.glow && <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />}
              </span>
              {selected && autoplay && (
                <span
                  key={active}
                  aria-hidden="true"
                  onAnimationEnd={() => setActive((a) => (a + 1) % TABS.length)}
                  style={{ animationPlayState: running ? "running" : "paused" }}
                  className="tab-progress absolute inset-x-0 bottom-0 h-[3px] bg-accent motion-reduce:hidden"
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab.key}`}
        className="bg-grid relative aspect-[4/5] overflow-hidden rounded-panel border border-line bg-surface/60 sm:aspect-[16/11] lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1"
      >
        <AnimatePresence initial={false}>
          <m.div
            key={tab.key}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {tab.glow && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
                <div
                  className="glow-breathe h-[70%] w-[55%] rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(61,224,255,.55), rgba(198,255,61,.35) 45%, transparent 70%)" }}
                />
              </div>
            )}
            <Fit {...tab.canvas} className="absolute inset-5 sm:inset-8">
              <tab.Screen />
            </Fit>
          </m.div>
        </AnimatePresence>
      </div>

      <div className="min-h-[9.5rem] lg:col-span-4 lg:row-start-2">
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={tab.key}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {tab.points.map((id) => (
              <li key={id} className="flex gap-3 text-[15px] leading-snug">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-night">
                  <FiCheck size={12} aria-hidden="true" />
                </span>
                <FormattedMessage id={id} />
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
