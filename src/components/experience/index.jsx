import { FormattedMessage } from "react-intl";
import { FiCode, FiMonitor, FiCpu } from "react-icons/fi";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

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
  return (
    <section id="experience" className="section border-t border-line">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <h2 className="eyebrow">
            <FormattedMessage id="app.experience.eyebrow" />
          </h2>
          <p className="h2 mt-4">
            <FormattedMessage id="app.experience.title" />
          </p>
          <p className="mt-4 text-lg text-muted">
            <FormattedMessage id="app.experience.desc" />
          </p>
        </Reveal>

        {/* Stat cards */}
        <Stagger as="dl" className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.labelId} className="card flex flex-col p-6">
              <dt className="order-2 mt-2 text-sm text-muted">
                <FormattedMessage id={stat.labelId} />
              </dt>
              <dd className="order-1 font-display text-2xl font-semibold sm:text-3xl">
                <FormattedMessage id={stat.valueId} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Highlight cards */}
        <Stagger className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, titleId, descId }) => (
            <StaggerItem key={titleId} className="card gradient-border p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-night">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                <FormattedMessage id={titleId} />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                <FormattedMessage id={descId} />
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default Experience;
