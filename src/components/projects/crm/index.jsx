import "@fontsource-variable/fraunces";
import { FiLock, FiClock, FiDivide, FiGitMerge } from "react-icons/fi";
import { Reveal } from "../../ui/motion";
import Showcase from "../showcase";
import { LAPTOP, PHONE } from "../showcase/devices";
import { ArchitectureFigure } from "../Architecture";
import { ArchitectureBlock, CaseHeader, Decisions, Stats } from "../parts";
import { ChessScreen, DealsScreen, InstallmentsScreen, ContractScreen, ReportsScreen, TelegramScreen } from "./screens";

const STACK = [
  "Laravel 13",
  "PHP 8.4",
  "React 19",
  "TypeScript",
  "Inertia",
  "Tailwind 4",
  "shadcn/ui",
  "PostgreSQL 16",
  "Docker",
  "PhpWord",
  "LibreOffice",
  "Telegram Bot API",
  "Pest",
];

const BADGES = [
  { id: "crm.badge", dot: "bg-lime" },
  { id: "crm.badge.live", dot: "bg-cyan", pulse: true },
];

const TABS = [
  {
    key: "chess",
    titleId: "crm.tab.chess",
    Screen: ChessScreen,
    canvas: LAPTOP,
    points: ["crm.chess.p1", "crm.chess.p2", "crm.chess.p3"],
  },
  {
    key: "deals",
    titleId: "crm.tab.deals",
    Screen: DealsScreen,
    canvas: LAPTOP,
    points: ["crm.deals.p1", "crm.deals.p2", "crm.deals.p3"],
  },
  {
    key: "installments",
    titleId: "crm.tab.installments",
    Screen: InstallmentsScreen,
    canvas: LAPTOP,
    points: ["crm.installments.p1", "crm.installments.p2", "crm.installments.p3"],
  },
  {
    key: "contract",
    titleId: "crm.tab.contract",
    Screen: ContractScreen,
    canvas: LAPTOP,
    points: ["crm.contract.p1", "crm.contract.p2", "crm.contract.p3"],
  },
  {
    key: "reports",
    titleId: "crm.tab.reports",
    Screen: ReportsScreen,
    canvas: LAPTOP,
    points: ["crm.reports.p1", "crm.reports.p2"],
  },
  {
    key: "telegram",
    titleId: "crm.tab.telegram",
    Screen: TelegramScreen,
    canvas: PHONE,
    glow: true,
    points: ["crm.telegram.p1", "crm.telegram.p2"],
  },
];

const STATS = [
  { value: 7, labelId: "crm.stat.days" },
  { value: 224, labelId: "crm.stat.tests" },
  { value: 22, labelId: "crm.stat.screens" },
  { value: 2, labelId: "crm.stat.langs" },
];

const DECISIONS = [
  { icon: FiLock, titleId: "crm.decision1.title", textId: "crm.decision1.text" },
  { icon: FiClock, titleId: "crm.decision2.title", textId: "crm.decision2.text" },
  { icon: FiDivide, titleId: "crm.decision3.title", textId: "crm.decision3.text" },
  { icon: FiGitMerge, titleId: "crm.decision4.title", textId: "crm.decision4.text" },
];

// Same diagram language as the Stanford case (see Architecture.jsx).
const ARCH_DESKTOP = {
  width: 1100,
  height: 410,
  nodes: [
    { id: "crm.arch.manager", x: 0, y: 80, w: 160, h: 48 },
    { id: "crm.arch.admin", x: 0, y: 152, w: 160, h: 48 },
    { label: "React 19 + Inertia", sub: "frontend · uz / ru", x: 260, y: 100, w: 200, h: 80 },
    { label: "Laravel 13", sub: "Actions · Policies", x: 540, y: 90, w: 220, h: 100, main: true },
    { label: "PostgreSQL 16", subId: "crm.arch.db", x: 840, y: 90, w: 260, h: 100 },
    { id: "crm.arch.queue", x: 300, y: 336, w: 200, h: 70 },
    { id: "crm.arch.scheduler", x: 550, y: 336, w: 200, h: 70 },
    { id: "crm.arch.bot", x: 800, y: 336, w: 200, h: 70 },
  ],
  segments: [
    [160, 104, 200, 104],
    [160, 176, 200, 176],
    [200, 104, 200, 140],
    [200, 140, 200, 176, true],
    [200, 140, 260, 140],
    [460, 140, 540, 140],
    [760, 140, 840, 140],
    [650, 190, 650, 296],
    [400, 296, 650, 296, true],
    [650, 296, 900, 296],
    [400, 296, 400, 336],
    [650, 296, 650, 336],
    [900, 296, 900, 336],
  ],
};

const ARCH_MOBILE = {
  width: 340,
  height: 510,
  nodes: [
    { id: "crm.arch.manager", x: 30, y: 0, w: 130, h: 40, small: true, nowrap: true },
    { id: "crm.arch.admin", x: 180, y: 0, w: 130, h: 40, small: true, nowrap: true },
    { label: "React 19 + Inertia", sub: "frontend · uz / ru", x: 60, y: 100, w: 220, h: 56 },
    { label: "Laravel 13", sub: "Actions · Policies", x: 60, y: 196, w: 220, h: 60, main: true },
    { label: "PostgreSQL 16", subId: "crm.arch.db", x: 30, y: 296, w: 280, h: 76 },
    { id: "crm.arch.queue", x: 5, y: 436, w: 104, h: 74, small: true },
    { id: "crm.arch.scheduler", x: 118, y: 436, w: 104, h: 74, small: true },
    { id: "crm.arch.bot", x: 231, y: 436, w: 104, h: 74, small: true },
  ],
  segments: [
    [95, 40, 95, 64],
    [245, 40, 245, 64],
    [95, 64, 170, 64],
    [170, 64, 245, 64, true],
    [170, 64, 170, 100],
    [170, 156, 170, 196],
    [170, 256, 170, 296],
    [14, 226, 60, 226, true],
    [14, 226, 14, 412],
    [14, 412, 283, 412],
    [57, 412, 57, 436],
    [170, 412, 170, 436],
    [283, 412, 283, 436],
  ],
};

/** Case study: CRM for a property developer (its own lazy chunk). */
export default function CrmCase({ title }) {
  return (
    <div>
      <CaseHeader badges={BADGES} title={title} subtitleId="crm.subtitle" textId="crm.text" stack={STACK} />

      <Reveal className="mt-16 sm:mt-20">
        <Showcase tabs={TABS} labelId="crm.tabs.label" idPrefix="crm-" />
      </Reveal>

      <Stats items={STATS} />

      <ArchitectureBlock>
        <ArchitectureFigure desktop={ARCH_DESKTOP} mobile={ARCH_MOBILE} altId="crm.arch.alt" prefix="crm" />
      </ArchitectureBlock>

      <Decisions items={DECISIONS} />
    </div>
  );
}
