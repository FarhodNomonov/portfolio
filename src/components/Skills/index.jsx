import { FiServer, FiLayout, FiSmartphone, FiBox, FiZap } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

// Tags are product names, except the few with an `id`, which are translated.
const GROUPS = [
  {
    titleId: "skills.backend",
    icon: FiServer,
    span: "lg:col-span-7",
    tags: ["PHP 8", "Laravel", "REST API", "MySQL", "PostgreSQL", "Redis", "Node.js"],
  },
  {
    titleId: "skills.frontend",
    icon: FiLayout,
    span: "lg:col-span-5",
    tags: ["React", "TypeScript", "Next.js", "Inertia", "Tailwind", "HTML/CSS"],
  },
  {
    titleId: "skills.mobile",
    icon: FiSmartphone,
    span: "lg:col-span-4",
    tags: ["Flutter", "React Native", "Kotlin", "Swift"],
  },
  {
    titleId: "skills.infra",
    icon: FiBox,
    span: "lg:col-span-4",
    tags: ["Docker", "GitHub Actions", "Linux/VPS", "Git"],
  },
  {
    titleId: "skills.integrations",
    icon: FiZap,
    span: "md:col-span-2 lg:col-span-4",
    tags: [
      "Telegram Bot API",
      "Google Sheets API",
      { id: "skills.tag.excel" },
      { id: "skills.tag.ai" },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="section border-t border-line">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <h2 className="eyebrow">
            02 · <FormattedMessage id="skills.title" />
          </h2>
          <p className="h2 mt-4">
            <FormattedMessage id="skills.subtitle" />
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
          {GROUPS.map(({ titleId, icon: Icon, span, tags }, i) => (
            <StaggerItem
              key={titleId}
              className={`card gradient-border group flex flex-col p-6 transition-shadow duration-300 hover:shadow-glow-soft sm:p-7 ${span}`}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-accent-ink transition-colors duration-300 group-hover:border-transparent group-hover:bg-lime group-hover:text-night">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-xl font-semibold sm:text-2xl">
                <FormattedMessage id={titleId} />
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag.id || tag} className="pill">
                    {tag.id ? <FormattedMessage id={tag.id} /> : tag}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default Skills;
