import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

/*
 * Dictation demo: a made-up chat window. The loop is
 * idle → listening (waveform) → recognizing → text types into the field.
 * Runs only while visible; with reduced motion it shows the final state.
 */
const OS = {
  mac: { key: "⌃⌥D", label: "macOS" },
  win: { key: "Ctrl+Alt+D", label: "Windows" },
};

const STEPS = { idle: 1200, listen: 2600, think: 900, hold: 3200 };
const BARS = 14;

export default function Demo() {
  const intl = useIntl();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [os, setOs] = useState("mac");
  const [phase, setPhase] = useState(reduce ? "done" : "idle");
  const [typed, setTyped] = useState(0);

  const phrase = intl.formatMessage({ id: "voxly.demo.phrase" });

  useEffect(() => {
    if (reduce) {
      setPhase("done");
      setTyped(phrase.length);
      return;
    }
    if (!inView) return;
    let timer;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => (timer = setTimeout(r, ms)));
    (async () => {
      while (!cancelled) {
        setTyped(0);
        setPhase("idle");
        await wait(STEPS.idle);
        if (cancelled) return;
        setPhase("listen");
        await wait(STEPS.listen);
        if (cancelled) return;
        setPhase("think");
        await wait(STEPS.think);
        if (cancelled) return;
        setPhase("done");
        // Paste is near-instant in the real app; a quick type-in reads better.
        for (let i = 1; i <= phrase.length && !cancelled; i += 2) {
          setTyped(i);
          await wait(14);
        }
        setTyped(phrase.length);
        await wait(STEPS.hold);
      }
    })();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [inView, reduce, phrase]);

  const pill = {
    idle: intl.formatMessage({ id: "voxly.demo.press" }, { key: OS[os].key }),
    listen: intl.formatMessage({ id: "voxly.demo.listen" }),
    think: intl.formatMessage({ id: "voxly.demo.think" }),
    done: intl.formatMessage({ id: "voxly.demo.done" }),
  }[phase];

  return (
    <div ref={ref} className="card overflow-hidden rounded-panel">
      {/* Window chrome + OS switch */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2" aria-hidden="true">
          {os === "mac" ? (
            <>
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </>
          ) : (
            <span className="text-xs font-semibold text-muted">▢ ▢ ✕</span>
          )}
        </div>
        <div
          role="group"
          aria-label={intl.formatMessage({ id: "voxly.demo.os" })}
          className="flex rounded-full border border-line bg-surface p-1"
        >
          {Object.entries(OS).map(([k, v]) => (
            <button
              key={k}
              type="button"
              aria-pressed={os === k}
              onClick={() => setOs(k)}
              className={`min-h-9 rounded-full px-4 text-[13px] font-semibold transition-colors ${
                os === k ? "bg-ink text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="relative bg-surface-2 px-4 pb-6 pt-6 sm:px-8 sm:pb-8">
        <div className="flex flex-col gap-3">
          <p className="max-w-[80%] self-start rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-2.5 text-[15px] leading-snug">
            <FormattedMessage id="voxly.demo.incoming" />
          </p>
        </div>

        {/* Input field */}
        <div className="mt-6 flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
          <p className="min-h-6 flex-1 text-[15px] leading-snug" aria-live="off">
            {typed > 0 ? (
              <>
                {phrase.slice(0, typed)}
                {typed < phrase.length && <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-accent-ink" />}
              </>
            ) : (
              <span className="text-muted">
                <FormattedMessage id="voxly.demo.placeholder" />
                <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-ink motion-reduce:animate-none" />
              </span>
            )}
          </p>
        </div>

        {/* Voxly overlay pill */}
        <div className="mt-5 flex justify-center">
          <div
            className="inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 py-2 text-[13px] font-semibold text-bg shadow-lg"
            aria-live="polite"
          >
            {phase === "listen" ? (
              <span className="flex h-5 items-center gap-[3px]" aria-hidden="true">
                {Array.from({ length: BARS }, (_, i) => (
                  <span
                    key={i}
                    className="voxly-bar w-[3px] rounded-full bg-lime"
                    style={{ animationDelay: `${(i * 97) % 600}ms` }}
                  />
                ))}
              </span>
            ) : (
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  phase === "think" ? "animate-pulse bg-cyan" : phase === "done" ? "bg-lime" : "bg-[#FF5F57]"
                }`}
                aria-hidden="true"
              />
            )}
            <span>{pill}</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          <FormattedMessage id="voxly.demo.note" />
        </p>
      </div>
    </div>
  );
}
