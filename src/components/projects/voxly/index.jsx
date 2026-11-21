import { FormattedMessage } from "react-intl";
import { FiWifiOff, FiZap, FiLayers, FiMonitor } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { Reveal } from "../../ui/motion";
import { ArchitectureFigure } from "../Architecture";
import { ArchitectureBlock, CaseHeader, Decisions, Stats } from "../parts";
import Demo from "./Demo";

export const VOXLY_REPO = "https://github.com/FarhodNomonov/voxly";

const STACK = ["Swift", "AppKit", "C", "C++20", "Win32", "Direct2D", "whisper.cpp", "Metal", "Vulkan", "Silero VAD", "CMake", "llvm-mingw"];

const BADGES = [
  { id: "voxly.badge", dot: "bg-lime" },
  { id: "voxly.badge.open", dot: "bg-cyan" },
];

const STATS = [
  { value: 3, labelId: "voxly.stat.langs" },
  { value: 10, prefix: ">", suffix: "×", labelId: "voxly.stat.speed" },
  { value: 2, labelId: "voxly.stat.platforms" },
  { value: 0, labelId: "voxly.stat.network" },
];

const DECISIONS = [
  { icon: FiWifiOff, titleId: "voxly.decision1.title", textId: "voxly.decision1.text" },
  { icon: FiZap, titleId: "voxly.decision2.title", textId: "voxly.decision2.text" },
  { icon: FiLayers, titleId: "voxly.decision3.title", textId: "voxly.decision3.text" },
  { icon: FiMonitor, titleId: "voxly.decision4.title", textId: "voxly.decision4.text" },
];

// Same diagram language as the other cases (see Architecture.jsx).
const ARCH_DESKTOP = {
  width: 1100,
  height: 330,
  nodes: [
    { id: "voxly.arch.hotkey", x: 0, y: 92, w: 170, h: 66 },
    { id: "voxly.arch.mic", x: 240, y: 92, w: 210, h: 66 },
    { label: "whisper.cpp", subId: "voxly.arch.core", x: 530, y: 75, w: 240, h: 100, main: true },
    { id: "voxly.arch.insert", x: 850, y: 92, w: 250, h: 66 },
    { label: "macOS", sub: "Swift · AppKit · Metal", x: 380, y: 260, w: 220, h: 66 },
    { label: "Windows", sub: "C++ · Win32 · Vulkan", x: 700, y: 260, w: 220, h: 66 },
  ],
  segments: [
    [170, 125, 240, 125],
    [450, 125, 530, 125],
    [770, 125, 850, 125],
    [650, 175, 650, 220],
    [490, 220, 650, 220, true],
    [650, 220, 810, 220],
    [490, 220, 490, 260],
    [810, 220, 810, 260],
  ],
};

const ARCH_MOBILE = {
  width: 340,
  height: 470,
  nodes: [
    { id: "voxly.arch.hotkey", x: 60, y: 0, w: 220, h: 52 },
    { id: "voxly.arch.mic", x: 60, y: 92, w: 220, h: 52 },
    { label: "whisper.cpp", subId: "voxly.arch.core", x: 40, y: 184, w: 260, h: 70, main: true },
    { id: "voxly.arch.insert", x: 60, y: 294, w: 220, h: 52 },
    { label: "macOS", sub: "Swift · Metal", x: 5, y: 410, w: 160, h: 56, small: true },
    { label: "Windows", sub: "C++ · Vulkan", x: 175, y: 410, w: 160, h: 56, small: true },
  ],
  segments: [
    [170, 52, 170, 92],
    [170, 144, 170, 184],
    [170, 254, 170, 294],
    [14, 219, 40, 219, true],
    [14, 219, 14, 380],
    [14, 380, 255, 380],
    [85, 380, 85, 410],
    [255, 380, 255, 410],
  ],
};

/** Case study: Voxly, offline dictation for macOS and Windows (lazy chunk). */
export default function VoxlyCase() {
  return (
    <div>
      <CaseHeader badges={BADGES} title="Voxly" subtitleId="voxly.subtitle" textId="voxly.text" stack={STACK} />

      <Reveal className="mt-16 sm:mt-20">
        <Demo />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={VOXLY_REPO} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FaGithub size={18} aria-hidden="true" />
            <FormattedMessage id="voxly.repo" />
          </a>
        </div>
      </Reveal>

      <Stats items={STATS} />

      <ArchitectureBlock>
        <ArchitectureFigure desktop={ARCH_DESKTOP} mobile={ARCH_MOBILE} altId="voxly.arch.alt" prefix="vx" />
      </ArchitectureBlock>

      <Decisions items={DECISIONS} />
    </div>
  );
}
