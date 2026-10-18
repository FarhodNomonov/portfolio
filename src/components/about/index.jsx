import { FormattedMessage } from "react-intl";
import useReveal from "../../hooks/useReveal";

const TAGS = ["Scratch", "HTML/CSS", "Office", "AI & Prompt Engineering"];

function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" className="px-6 py-28">
      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl text-center`}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
          <FormattedMessage id="app.about.aboutme" />
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
          <FormattedMessage id="app.about.desc" />
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
