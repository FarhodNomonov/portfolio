import { FiTarget, FiShield, FiLayers, FiLock } from "react-icons/fi";
import { Reveal } from "../ui/motion";
import Showcase from "./showcase";
import Architecture from "./Architecture";
import { ArchitectureBlock, CaseHeader, Decisions, Stats } from "./parts";

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

const BADGES = [{ id: "projects.badge", dot: "bg-lime" }];

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

/** Case study: Stanford Weekly Test. */
export default function StanfordCase() {
  return (
    <div>
      <CaseHeader
        badges={BADGES}
        title="Stanford Weekly Test"
        subtitleId="projects.subtitle"
        textId="projects.text"
        stack={STACK}
      />

      {/* Role showcase */}
      <Reveal className="mt-16 sm:mt-20">
        <Showcase />
      </Reveal>

      <Stats items={STATS} />

      <ArchitectureBlock>
        <Architecture />
      </ArchitectureBlock>

      <Decisions items={DECISIONS} />
    </div>
  );
}
