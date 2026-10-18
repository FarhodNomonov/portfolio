import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

// Numbers are locale-independent; only the labels are translated.
const STATS = [
  { value: 5, suffix: "+", labelId: "about.stat.years" },
  { value: 4, labelId: "about.stat.school" },
  { value: 400, prefix: "~", labelId: "about.stat.students" },
  { value: 318, labelId: "about.stat.tests" },
];

/** Counts from 0 to `value` the first time it scrolls into view. */
function Counter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const final = `${prefix}${value}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = `${prefix}${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduce, value, prefix, suffix]);

  return (
    // The invisible final value reserves the width, so counting never reflows.
    <span className="grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span ref={ref} className="col-start-1 row-start-1">
        {reduce ? final : `${prefix}0${suffix}`}
      </span>
    </span>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <h2 className="eyebrow">
            01 · <FormattedMessage id="nav.about" />
          </h2>
          <p className="h2 mt-4">
            <FormattedMessage id="about.title" />
          </p>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            <FormattedMessage id="about.text" />
          </p>
        </Reveal>

        <Stagger as="dl" className="grid grid-cols-2 gap-3 self-end sm:gap-4 lg:col-span-5">
          {STATS.map((stat) => (
            <StaggerItem
              key={stat.labelId}
              className="card flex min-h-40 flex-col justify-between p-5 transition-shadow duration-300 hover:shadow-glow-soft sm:p-6"
            >
              <dt className="order-2 mt-6 text-sm leading-snug text-muted">
                <FormattedMessage id={stat.labelId} />
              </dt>
              <dd className="order-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter {...stat} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default About;
