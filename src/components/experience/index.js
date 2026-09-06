import { FormattedMessage } from "react-intl";
import { FiCode, FiMonitor, FiCpu } from "react-icons/fi";
import useReveal from "../../hooks/useReveal";

const STATS = [
  { valueId: "app.experience.stat1.value", labelId: "app.experience.stat1.label" },
  { valueId: "app.experience.stat2.value", labelId: "app.experience.stat2.label" },
  { valueId: "app.experience.stat3.value", labelId: "app.experience.stat3.label" },
  { valueId: "app.experience.stat4.value", labelId: "app.experience.stat4.label" },
];

const HIGHLIGHTS = [
  {
    icon: FiCode,
    titleId: "app.experience.highlight1.title",
    descId: "app.experience.highlight1.desc",
  },
  {
    icon: FiMonitor,
    titleId: "app.experience.highlight2.title",
    descId: "app.experience.highlight2.desc",
  },
  {
    icon: FiCpu,
    titleId: "app.experience.highlight3.title",
    descId: "app.experience.highlight3.desc",
  },
];

function Experience() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="experience"
      className="bg-zinc-50 px-6 py-28 dark:bg-zinc-900/40"
    >
      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-5xl`}
      >
        <div className="text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
            <FormattedMessage id="app.experience.eyebrow" />
          </h2>
          <p className="mt-3 text-3xl font-bold sm:text-4xl">
            <FormattedMessage id="app.experience.title" />
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            <FormattedMessage id="app.experience.desc" />
          </p>
        </div>

        {/* Stat cards */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.labelId}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-2xl font-extrabold text-gradient sm:text-3xl">
                <FormattedMessage id={stat.valueId} />
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                <FormattedMessage id={stat.labelId} />
              </p>
            </div>
          ))}
        </div>

        {/* Highlight cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, titleId, descId }) => (
            <div
              key={titleId}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold">
                <FormattedMessage id={titleId} />
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                <FormattedMessage id={descId} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
