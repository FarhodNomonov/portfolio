import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { Reveal } from "../ui/motion";

const ITEMS = [
  { titleId: "experience.item1.title", textId: "experience.item1.text" },
  { titleId: "experience.item2.title", textId: "experience.item2.text" },
  { titleId: "experience.item3.title", textId: "experience.item3.text" },
];

/** Vertical timeline whose glowing line fills as the list scrolls by. */
function Experience() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="experience" className="section border-t border-line">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h2 className="eyebrow">
            05 · <FormattedMessage id="nav.experience" />
          </h2>
          <p className="h2 mt-4">
            <FormattedMessage id="experience.title" />
          </p>
        </Reveal>

        <ol ref={listRef} className="relative space-y-12 pl-10 sm:pl-14 lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-[2px] rounded-full bg-line" />
          <m.span
            aria-hidden="true"
            className="absolute bottom-2 left-[11px] top-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-lime to-cyan shadow-[0_0_12px_rgba(198,255,61,.6)]"
            style={{ scaleY: reduce ? 1 : fill }}
          />
          {ITEMS.map(({ titleId, textId }, i) => (
            <Reveal as="li" key={titleId} delay={i * 0.05} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border border-line bg-bg sm:-left-14"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_10px_rgba(198,255,61,.8)]" />
              </span>
              <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">
                <FormattedMessage id={titleId} />
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                <FormattedMessage id={textId} />
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experience;
