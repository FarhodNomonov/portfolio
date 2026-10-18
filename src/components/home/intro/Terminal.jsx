import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIntl } from "react-intl";
import Avatar from "../../../assets/img/intro_avatar.png";

const SCRIPT = [
  { cmd: "php artisan test", out: "✓ 170 passed", tone: "ok" },
  { cmd: "npx vitest run", out: "✓ 148 passed", tone: "ok" },
  { cmd: "git push origin main", out: "🚀 deployed", tone: "info" },
];

const TYPE_MS = 45;
const OUTPUT_DELAY_MS = 420;
const NEXT_CMD_DELAY_MS = 650;

/**
 * Types SCRIPT out one character at a time. `step` counts finished
 * commands, `typed` the characters of the command in progress. With reduced
 * motion everything is shown at once.
 */
function useTypewriter(reduce) {
  const [state, setState] = useState({ step: 0, typed: 0, output: false });

  useEffect(() => {
    if (reduce) {
      setState({ step: SCRIPT.length, typed: 0, output: false });
      return;
    }
    let timer;
    let { step, typed, output } = { step: 0, typed: 0, output: false };

    const run = () => {
      if (step >= SCRIPT.length) return;
      const cmd = SCRIPT[step].cmd;
      if (typed < cmd.length) {
        typed += 1;
        timer = setTimeout(run, TYPE_MS + Math.random() * 40);
      } else if (!output) {
        output = true;
        timer = setTimeout(run, NEXT_CMD_DELAY_MS);
      } else {
        step += 1;
        typed = 0;
        output = false;
        timer = setTimeout(run, OUTPUT_DELAY_MS);
      }
      setState({ step, typed, output });
    };

    timer = setTimeout(run, 900);
    return () => clearTimeout(timer);
  }, [reduce]);

  return state;
}

function Prompt() {
  return <span className="select-none text-lime">$ </span>;
}

export default function Terminal() {
  const intl = useIntl();
  const reduce = useReducedMotion();
  const { step, typed, output } = useTypewriter(reduce);
  const done = step >= SCRIPT.length;

  return (
    <figure className="overflow-hidden rounded-panel border border-white/10 bg-[#0E1117] text-[#EDEFF3] shadow-glow-soft">
      <div className="flex items-center gap-2 border-b border-white/[.08] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <figcaption className="ml-3 truncate font-mono text-xs text-[#9AA3B2]">
          ~/farkhod — zsh
        </figcaption>
        <img
          src={Avatar}
          alt={intl.formatMessage({ id: "name" })}
          width="28"
          height="28"
          className="ml-auto h-7 w-7 rounded-full object-cover ring-2 ring-lime/70"
        />
      </div>

      {/* Screen readers get the finished transcript instead of the typing. */}
      <pre className="sr-only">
        {SCRIPT.map((l) => `$ ${l.cmd}\n${l.out}`).join("\n")}
      </pre>

      <div aria-hidden="true" className="space-y-1 p-5 font-mono text-[13px] leading-6 sm:p-6 sm:text-sm">
        {SCRIPT.map((line, i) => {
          const isCurrent = i === step;
          const cmdText = i < step ? line.cmd : isCurrent ? line.cmd.slice(0, typed) : "";
          const showOut = i < step || (isCurrent && output);
          const started = i < step || (isCurrent && (typed > 0 || output));
          return (
            // Fixed two-line slot per command: the box never changes height.
            <div key={line.cmd} className="min-h-12">
              <div className={started ? "" : "invisible"}>
                <Prompt />
                {cmdText}
                {isCurrent && !output && (
                  <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-blink bg-lime" />
                )}
              </div>
              <div className={`${showOut ? "" : "invisible"} ${line.tone === "ok" ? "text-lime" : "text-cyan"}`}>
                {line.out}
              </div>
            </div>
          );
        })}
        <div className={done ? "" : "invisible"}>
          <Prompt />
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-lime" />
        </div>
      </div>
    </figure>
  );
}
