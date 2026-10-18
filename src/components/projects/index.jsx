import { FormattedMessage, useIntl } from "react-intl";
import { FiTarget, FiShield, FiLayers, FiLock } from "react-icons/fi";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import Counter from "../ui/counter";
import Showcase from "./showcase";
import Architecture from "./Architecture";

const STACK = [
  "Laravel 12",
  "PHP 8.3",
  "React 18",
  "TypeScript",
  "Inertia",
  "Tailwind",
  "MySQL/PostgreSQL",
  "Redis",
  "Docker",
  "GitHub Actions",
  "Telegram Bot API",
];

const STATS = [
  { value: 5, labelId: "projects.stat.roles" },
  { value: 66, labelId: "projects.stat.actions" },
  { value: 318, labelId: "projects.stat.tests" },
  { value: 400, prefix: "~", labelId: "projects.stat.students" },
];

const DECISIONS = [
  { icon: FiTarget, titleId: "projects.decision1.title", textId: "projects.decision1.text" },
  { icon: FiShield, titleId: "projects.decision2.title", textId: "projects.decision2.text" },
  { icon: FiLayers, titleId: "projects.decision3.title", textId: "projects.decision3.text" },
  { icon: FiLock, titleId: "projects.decision4.title", textId: "projects.decision4.text" },
];

function SubHeading({ id }) {
  return (
    <h4 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      <FormattedMessage id={id} />
    </h4>
  );
}

/** Featured case study: Stanford Weekly Test (rendered inside section#projects in Home). */
export default function Projects() {
  const intl = useIntl();
  return (
    <div className="container-site">
      <Reveal>
        <h2 className="eyebrow">
          03 · <FormattedMessage id="projects.eyebrow" />
        </h2>
      </Reveal>

      {/* Case header */}
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium">
            <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
            <FormattedMessage id="projects.badge" />
          </p>
          <h3 className="mt-5 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Stanford Weekly Test
          </h3>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
            <FormattedMessage id="projects.subtitle" />
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:pt-14">
          <p className="leading-relaxed text-muted">
            <FormattedMessage id="projects.text" />
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={intl.formatMessage({ id: "projects.stack.label" })}>
            {STACK.map((tag) => (
              <li key={tag} className="pill">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Role showcase */}
      <Reveal className="mt-16 sm:mt-20">
        <Showcase />
      </Reveal>

      {/* Numbers */}
      <Stagger as="dl" className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StaggerItem key={stat.labelId} className="card flex flex-col p-5 sm:p-6">
            <dt className="order-2 mt-3 text-sm leading-snug text-muted">
              <FormattedMessage id={stat.labelId} />
            </dt>
            <dd className="order-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              <Counter {...stat} />
            </dd>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Architecture */}
      <Reveal className="mt-24">
        <SubHeading id="projects.arch.title" />
        <div className="card mt-8 overflow-hidden rounded-panel p-4 sm:p-8">
          <Architecture />
        </div>
      </Reveal>

      {/* Decisions */}
      <Reveal className="mt-24">
        <SubHeading id="projects.decisions.title" />
      </Reveal>
      <Stagger className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-2">
        {DECISIONS.map(({ icon: Icon, titleId, textId }) => (
          <StaggerItem key={titleId} className="card gradient-border flex gap-5 p-6 sm:p-7">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-accent-ink">
              <Icon size={22} aria-hidden="true" />
            </span>
            <div>
              <h5 className="font-display text-lg font-semibold">
                <FormattedMessage id={titleId} />
              </h5>
              <p className="mt-2 leading-relaxed text-muted">
                <FormattedMessage id={textId} />
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
