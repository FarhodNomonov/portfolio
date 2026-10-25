import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { Reveal } from "../ui/motion";
import StanfordCase from "./StanfordCase";
import { CLIENT_NAME } from "../../data/crm";

// The CRM case (mockups + Fraunces) is its own chunk; it starts loading as
// soon as the visitor hovers or focuses its switch, or right away via the hash.
const loadCrm = () => import("./crm");
const CrmCase = lazy(loadCrm);

const EASE = [0.22, 1, 0.36, 1];

// Each case has a hash, so a direct link can open it: #projects-crm.
const CASES = [
  { key: "stanford", hash: "#projects" },
  { key: "crm", hash: "#projects-crm" },
];
const fromHash = () => (window.location.hash === "#projects-crm" ? 1 : 0);

export function useCrmTitle() {
  const intl = useIntl();
  return CLIENT_NAME
    ? intl.formatMessage({ id: "crm.title.client" }, { client: CLIENT_NAME })
    : intl.formatMessage({ id: "crm.title" });
}

/** Featured projects (rendered inside section#projects in Home). */
export default function Projects() {
  const intl = useIntl();
  const reduce = useReducedMotion();
  const crmTitle = useCrmTitle();
  const [active, setActive] = useState(fromHash);
  const buttonsRef = useRef([]);

  // Follow hash links (e.g. the Services card) and open the case they name.
  useEffect(() => {
    const open = () => {
      if (window.location.hash !== "#projects-crm") return;
      setActive(1);
      document.getElementById("projects")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };
    if (window.location.hash === "#projects-crm") {
      // On first load the browser finds no #projects-crm element, so scroll here.
      requestAnimationFrame(() => document.getElementById("projects")?.scrollIntoView());
    }
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [reduce]);

  const select = (i) => {
    setActive(i);
    // replaceState: shareable URL without a history entry or a scroll jump.
    history.replaceState(null, "", CASES[i].hash);
  };

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + CASES.length) % CASES.length;
    select(next);
    buttonsRef.current[next]?.focus();
  };

  const labels = ["Stanford Weekly Test", crmTitle];

  return (
    <div className="container-site">
      <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="eyebrow">
            03 · <FormattedMessage id="nav.projects" />
          </h2>
          <p className="h2 mt-4">
            <FormattedMessage id="projects.title" />
          </p>
        </div>

        {/* Segmented switch; the thumb slides under the active half. */}
        <div
          role="tablist"
          aria-label={intl.formatMessage({ id: "projects.switch.label" })}
          onKeyDown={onKeyDown}
          className="relative grid w-full grid-cols-2 rounded-full border border-line bg-surface p-1 sm:w-auto"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: `translateX(${active * 100}%)` }}
          />
          {CASES.map((c, i) => (
            <button
              key={c.key}
              ref={(el) => (buttonsRef.current[i] = el)}
              id={`case-${c.key}`}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls="case-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onPointerEnter={c.key === "crm" ? loadCrm : undefined}
              onFocus={c.key === "crm" ? loadCrm : undefined}
              className={`relative z-10 min-h-11 rounded-full px-3 py-2 text-[13px] font-semibold leading-tight transition-colors duration-300 sm:px-6 sm:text-sm ${
                active === i ? "text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {labels[i]}
            </button>
          ))}
        </div>
      </Reveal>

      <div id="case-panel" role="tabpanel" aria-labelledby={`case-${CASES[active].key}`} className="mt-12 sm:mt-16">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={CASES[active].key}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {active === 0 ? (
              <StanfordCase />
            ) : (
              <Suspense fallback={<div className="min-h-screen" />}>
                <CrmCase title={crmTitle} />
              </Suspense>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
