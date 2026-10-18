import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FormattedMessage, useIntl } from "react-intl";
import { useContactModal } from "../../ContactModal";
import Terminal from "./Terminal";

const WORD_IDS = ["hero.word1", "hero.word2", "hero.word3", "hero.word4"];
const EASE = [0.22, 1, 0.36, 1];

/**
 * Radial glow that eases toward the pointer. Only on devices with a fine
 * pointer and without reduced motion; elsewhere it stays parked behind the
 * terminal. Moves with transform only, so it never triggers layout.
 */
function useCursorGlow(sectionRef, glowRef) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let active = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      glow.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5) {
        frame = requestAnimationFrame(tick);
      } else {
        active = false;
      }
    };

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const size = glow.offsetWidth;
      target.x = e.clientX - rect.left - size / 2;
      target.y = e.clientY - rect.top - size / 2;
      if (!active) {
        active = true;
        frame = requestAnimationFrame(tick);
      }
    };

    // Start from the parked position so the first move doesn't jump.
    const rect = section.getBoundingClientRect();
    const g = glow.getBoundingClientRect();
    pos.x = target.x = g.left - rect.left;
    pos.y = target.y = g.top - rect.top;
    glow.style.left = "0px";
    glow.style.top = "0px";
    glow.style.right = "auto";
    glow.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [sectionRef, glowRef, reduce]);
}

function RotatingWord() {
  const intl = useIntl();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % WORD_IDS.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const words = WORD_IDS.map((id) => intl.formatMessage({ id }));

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      {/* Every word sits in the same grid cell, so the line is always as tall
          and wide as the longest word and nothing below it shifts. */}
      <span aria-hidden="true" className="grid">
        {words.map((word, i) => (
          <m.span
            key={word}
            className="text-accent col-start-1 row-start-1 self-end justify-self-start pb-[0.06em]"
            initial={false}
            animate={
              i === index
                ? { opacity: 1, y: "0em", filter: "blur(0px)" }
                : { opacity: 0, y: i === (index + WORD_IDS.length - 1) % WORD_IDS.length ? "-0.35em" : "0.35em", filter: "blur(6px)" }
            }
            transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
          >
            {word}
          </m.span>
        ))}
      </span>
    </>
  );
}

function Intro() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const openContact = useContactModal();
  const reduce = useReducedMotion();
  useCursorGlow(sectionRef, glowRef);

  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { y: 24 },
          animate: { y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section id="intro" ref={sectionRef} className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pt-28">
      {/* Background: grid + noise + glow (decorative). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_30%,transparent_100%)]" />
        <div
          ref={glowRef}
          className="absolute right-[-10%] top-[10%] h-[560px] w-[560px] rounded-full opacity-60 dark:opacity-40 sm:h-[720px] sm:w-[720px]"
          style={{ background: "radial-gradient(circle, var(--glow) 0%, rgba(61,224,255,.12) 35%, transparent 65%)" }}
        />
        <div className="bg-noise absolute inset-0" />
      </div>

      <div className="container-site">
        <m.p {...enter(0)} className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-4 text-[13px] font-medium backdrop-blur sm:text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-lime" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
          </span>
          <FormattedMessage id="hero.badge" />
        </m.p>

        <m.h1
          {...enter(0.08)}
          className="mt-7 max-w-[18ch] font-display text-[clamp(2rem,5.6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.02em] sm:max-w-none"
        >
          <span className="block">
            <FormattedMessage id="hero.title.lead" />
          </span>
          <RotatingWord />
          <span className="block text-muted">
            <FormattedMessage id="hero.title.tail" />
          </span>
        </m.h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-8">
          <m.div {...enter(0.16)} className="lg:col-span-6">
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              <FormattedMessage id="hero.subtitle" />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary group">
                <FormattedMessage id="hero.cta.projects" />
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <button type="button" onClick={openContact} className="btn-ghost">
                <FormattedMessage id="hero.cta.contact" />
              </button>
            </div>
          </m.div>

          <m.div {...enter(0.24)} className="lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
            <Terminal />
          </m.div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
