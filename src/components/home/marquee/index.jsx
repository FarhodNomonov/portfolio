import { useIntl } from "react-intl";

const TECH = [
  "Laravel",
  "React",
  "TypeScript",
  "PHP",
  "Flutter",
  "Docker",
  "Redis",
  "PostgreSQL",
  "Tailwind",
  "Telegram API",
  "Next.js",
];

function Row({ hidden }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      {TECH.map((name) => (
        <li key={name} className="flex items-center">
          <span className="px-6 font-display text-xl font-medium text-ink/80 sm:px-8 sm:text-2xl">{name}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );
}

/** Infinite tech ticker: two identical rows slide by -50%. Pauses on hover. */
export default function TechMarquee() {
  const intl = useIntl();

  return (
    <section
      aria-label={intl.formatMessage({ id: "marquee.label" })}
      className="group relative overflow-hidden border-y border-line bg-surface/50 py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
