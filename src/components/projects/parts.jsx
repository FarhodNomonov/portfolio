import { FormattedMessage, useIntl } from "react-intl";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import Counter from "../ui/counter";

// Building blocks shared by the case studies, so every case reads the same.

export function SubHeading({ id }) {
  return (
    <h4 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      <FormattedMessage id={id} />
    </h4>
  );
}

/**
 * Badges, title, subtitle on the left; description and stack on the right.
 * `badges` items: { id, dot } where dot is a Tailwind bg class; `pulse` adds a ring.
 */
export function CaseHeader({ badges, title, subtitleId, textId, stack }) {
  const intl = useIntl();
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-7">
        <div className="flex flex-wrap gap-2">
          {badges.map(({ id, dot, pulse }) => (
            <p key={id} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                {pulse && <span className={`absolute inset-0 animate-pulse-dot rounded-full ${dot}`} />}
                <span className={`relative h-2 w-2 rounded-full ${dot}`} />
              </span>
              <FormattedMessage id={id} />
            </p>
          ))}
        </div>
        <h3 className="mt-5 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          {title}
        </h3>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
          <FormattedMessage id={subtitleId} />
        </p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-5 lg:pt-14">
        <p className="leading-relaxed text-muted">
          <FormattedMessage id={textId} />
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={intl.formatMessage({ id: "projects.stack.label" })}>
          {stack.map((tag) => (
            <li key={tag} className="pill">
              {tag}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function Stats({ items }) {
  return (
    <Stagger as="dl" className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((stat) => (
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
  );
}

export function ArchitectureBlock({ children }) {
  return (
    <Reveal className="mt-24">
      <SubHeading id="projects.arch.title" />
      <div className="card mt-8 overflow-hidden rounded-panel p-4 sm:p-8">{children}</div>
    </Reveal>
  );
}

export function Decisions({ items }) {
  return (
    <>
      <Reveal className="mt-24">
        <SubHeading id="projects.decisions.title" />
      </Reveal>
      <Stagger className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-2">
        {items.map(({ icon: Icon, titleId, textId }) => (
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
    </>
  );
}
