import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useIntl } from "react-intl";
import {
  FiClock,
  FiImage,
  FiFileText,
  FiUpload,
  FiEye,
  FiLock,
  FiChevronLeft,
  FiPaperclip,
  FiMic,
  FiSearch,
} from "react-icons/fi";
import { AppBar, Laptop, Phone } from "./devices";

// All names, groups and numbers below are made up for the mockups.
const EASE = [0.22, 1, 0.36, 1];
const SUBJECTS = [
  { name: "IT", value: 92 },
  { name: "Matematika", value: 85 },
  { name: "Ingliz tili", value: 88 },
  { name: "Ona tili", value: 90 },
];

function useT() {
  const intl = useIntl();
  return (id) => intl.formatMessage({ id });
}

function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 px-2.5 py-[3px] text-[11px] font-medium ${className}`}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Student */

export function StudentScreen() {
  const t = useT();
  const reduce = useReducedMotion();
  const [left, setLeft] = useState(12 * 60 + 45);

  // Ticks only while this tab is on screen (the screen unmounts otherwise).
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [reduce]);

  const time = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  const options = [
    ["A", "13"],
    ["B", "15"],
    ["C", "14"],
    ["D", "12"],
  ];

  return (
    <Laptop>
      <AppBar title="Stanford Weekly">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 font-mono text-[12px] font-medium text-bg tabular-nums">
          <FiClock size={12} /> {time}
        </span>
      </AppBar>
      <div className="px-8 pt-6">
        <div className="flex items-center justify-between text-[12px] text-muted">
          <span>Matematika · {t("mock.week")} 6</span>
          <span className="font-mono font-semibold text-ink">3 / 10</span>
        </div>
        <div className="mt-2 h-[6px] overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-full origin-left scale-x-[.3] rounded-full bg-accent" />
        </div>
        <p className="mt-6 font-display text-[22px] font-semibold leading-snug">{t("mock.student.question")}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {options.map(([letter, value]) => {
            const picked = letter === "B";
            return (
              <div
                key={letter}
                className={`flex items-center gap-3 rounded-[14px] border px-4 py-3 text-[15px] ${
                  picked ? "border-lime bg-lime/15 font-semibold" : "border-line bg-surface"
                }`}
              >
                <span
                  className={`grid h-[26px] w-[26px] place-items-center rounded-full font-mono text-[12px] ${
                    picked ? "bg-lime text-night" : "bg-surface-2 text-muted"
                  }`}
                >
                  {letter}
                </span>
                {value}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent-ink">
            {t("mock.student.saved")}
          </span>
          <div className="flex gap-2">
            <span className="rounded-full border border-line px-4 py-2 text-[12px] font-semibold">{t("mock.back")}</span>
            <span className="rounded-full bg-lime px-4 py-2 text-[12px] font-semibold text-night">{t("mock.next")}</span>
          </div>
        </div>
      </div>
    </Laptop>
  );
}

/* ---------------------------------------------------------------- Teacher */

const QUESTIONS = [
  { text: "48 : 6 + 7 = ?", week: 6, lang: "ru", icon: null },
  { text: "Matnni o‘qing: «Bahor» hikoyasi", week: 6, lang: "uz", icon: FiFileText },
  { text: "Kvadratning perimetrini toping", week: 5, lang: "uz", icon: FiImage },
  { text: "Найдите лишнее слово", week: 5, lang: "ru", icon: null },
];

export function TeacherScreen() {
  const t = useT();
  return (
    <Laptop>
      <AppBar title={t("mock.teacher.title")}>
        <span className="rounded-full bg-lime px-3.5 py-1.5 text-[12px] font-semibold text-night">
          {t("mock.teacher.open")} · 4-A
        </span>
      </AppBar>
      <div className="px-6 pt-5">
        <div className="flex items-center gap-2">
          <span className="flex h-[30px] w-[180px] items-center gap-2 rounded-full border border-line bg-surface px-3 text-[11px] text-muted">
            <FiSearch size={12} /> {t("mock.search")}
          </span>
          <Pill>{t("mock.week")} 6 ▾</Pill>
          <Pill>Matematika ▾</Pill>
          <Pill>uz / ru ▾</Pill>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-[5px] text-[11px] font-semibold">
            <FiUpload size={12} /> {t("mock.teacher.upload")}
          </span>
        </div>
        <div className="mt-4 overflow-hidden rounded-[14px] border border-line bg-surface">
          <div className="grid grid-cols-[1fr_80px_70px] border-b border-line px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
            <span>{t("mock.teacher.col.question")}</span>
            <span>{t("mock.week")}</span>
            <span>{t("mock.teacher.col.lang")}</span>
          </div>
          {QUESTIONS.map(({ text, week, lang, icon: Icon }) => (
            <div key={text} className="grid grid-cols-[1fr_80px_70px] items-center border-b border-line px-4 py-3 text-[13px] last:border-0">
              <span className="flex items-center gap-2 truncate">
                {Icon && (
                  <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-surface-2 text-accent-ink">
                    <Icon size={12} />
                  </span>
                )}
                {text}
              </span>
              <span className="font-mono text-[12px] text-muted">{week}</span>
              <span>
                <Pill className="font-mono uppercase">{lang}</Pill>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-[14px] border border-dashed border-line px-4 py-3 text-[12px]">
          <span className="text-muted">{t("mock.teacher.written")}</span>
          <span className="font-mono font-semibold">8 / 10</span>
        </div>
      </div>
    </Laptop>
  );
}

/* ------------------------------------------------------------------ Admin */

const STUDENTS = [
  { nameId: "mock.name1", group: "4-A" },
  { nameId: "mock.name2", group: "3-B" },
  { nameId: "mock.name3", group: "4-A" },
  { nameId: "mock.name4", group: "3-B" },
];

export function AdminScreen() {
  const t = useT();
  const initials = (name) => name.split(" ").map((p) => p[0]).join("");
  const preview = [
    { name: t("mock.name5"), group: "3-B", status: "new" },
    { name: t("mock.name1"), group: "4-A", status: "updated" },
    { name: t("mock.name2"), group: "3-B", status: "same" },
  ];
  const statusLabel = {
    new: "mock.admin.status.new",
    updated: "mock.admin.status.updated",
    same: "mock.admin.status.same",
  };
  const statusClass = {
    new: "bg-lime/20 text-accent-ink",
    updated: "bg-cyan/20 text-ink",
    same: "bg-surface-2 text-muted",
  };

  return (
    <Laptop>
      <AppBar title="Boshqaruv">
        <Pill>admin</Pill>
      </AppBar>
      <div className="grid grid-cols-[1fr_250px] gap-4 px-5 pt-4">
        <div className="rounded-[14px] border border-line bg-surface">
          <p className="border-b border-line px-4 py-2.5 text-[12px] font-semibold">{t("mock.admin.students")}</p>
          {STUDENTS.map(({ nameId, group }) => (
            <div key={nameId} className="flex items-center gap-2.5 border-b border-line px-4 py-2 text-[12px] last:border-0">
              <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-surface-2 text-[10px] font-semibold">
                {initials(t(nameId))}
              </span>
              <span className="flex-1 truncate">{t(nameId)}</span>
              <span className="font-mono text-[11px] text-muted">{group}</span>
              <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold">{t("mock.admin.move")}</span>
              <span className="rounded-full px-2 py-1 text-[10px] font-semibold text-muted">{t("mock.admin.archive")}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[14px] border border-line bg-surface p-3.5 shadow-glow-soft">
          <p className="text-[12px] font-semibold">{t("mock.admin.import")}</p>
          <p className="mt-1.5 flex items-center gap-1.5 truncate rounded-[8px] bg-surface-2 px-2.5 py-1.5 font-mono text-[10px]">
            <FiFileText size={11} /> students_4A.xlsx
          </p>
          <div className="mt-2.5 space-y-1.5">
            {preview.map(({ name, group, status }) => (
              <div key={name} className="flex items-center gap-2 text-[11px]">
                <span className="flex-1 truncate">{name}</span>
                <span className="font-mono text-[10px] text-muted">{group}</span>
                <span className={`rounded-full px-2 py-[2px] text-[10px] font-medium ${statusClass[status]}`}>
                  {t(statusLabel[status])}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-muted">{t("mock.admin.dupes")}: 0</span>
            <span className="rounded-full bg-lime px-3 py-1.5 text-[11px] font-semibold text-night">{t("mock.admin.run")}</span>
          </div>
        </div>
      </div>
      <div className="mx-5 mt-4 rounded-[14px] border border-line bg-surface px-4 py-2.5">
        <p className="text-[12px] font-semibold">{t("mock.admin.log")}</p>
        <div className="mt-1.5 space-y-1 font-mono text-[11px] text-muted">
          <p>
            <span className="text-ink">09:41</span> admin · {t("mock.admin.log1")}
          </p>
          <p>
            <span className="text-ink">09:38</span> admin · {t("mock.admin.log2")}
          </p>
          <p>
            <span className="text-ink">09:30</span> teacher · {t("mock.admin.log3")}
          </p>
        </div>
      </div>
    </Laptop>
  );
}

/* ------------------------------------------------------------- Leadership */

const CLASSES = [
  ["2-A", 81],
  ["3-B", 74],
  ["4-A", 86],
  ["5-A", 72],
  ["6-B", 79],
  ["7-A", 77],
  ["8-A", 83],
  ["9-B", 70],
];

export function LeadershipScreen() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <Laptop>
      <AppBar title={t("mock.lead.title")}>
        <Pill>
          <FiEye size={11} /> {t("mock.lead.readonly")}
        </Pill>
      </AppBar>
      <div className="px-6 pt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-[14px] border border-line bg-surface p-3.5">
            <p className="text-[11px] text-muted">{t("mock.lead.avg")}</p>
            <p className="mt-1 font-display text-[26px] font-semibold text-accent-ink">78%</p>
          </div>
          <div className="rounded-[14px] border border-line bg-surface p-3.5">
            <p className="text-[11px] text-muted">{t("mock.lead.students")}</p>
            <p className="mt-1 font-display text-[26px] font-semibold">396</p>
          </div>
          <div className="rounded-[14px] border border-line bg-surface p-3.5">
            <p className="text-[11px] text-muted">{t("mock.week")}</p>
            <p className="mt-1 font-display text-[26px] font-semibold">6</p>
          </div>
        </div>
        <div className="mt-3 rounded-[14px] border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">{t("mock.lead.chart")}</p>
            <div className="flex gap-1">
              <Pill>{t("mock.lead.school")}</Pill>
              <Pill className="!border-transparent !bg-ink !text-bg">{t("mock.lead.classes")}</Pill>
              <Pill>{t("mock.lead.groups")}</Pill>
            </div>
          </div>
          <div className="mt-3 flex h-[150px] items-end gap-3">
            {CLASSES.map(([name, value], i) => (
              <div key={name} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="font-mono text-[10px] text-muted">{value}%</span>
                <m.div
                  className="w-full origin-bottom rounded-t-[8px] bg-gradient-to-t from-cyan to-lime"
                  style={{ height: `${value * 1.4}px` }}
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
                />
                <span className="font-mono text-[10px]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Laptop>
  );
}

/* ----------------------------------------------------------------- Parent */

function Ring({ value, label, delay }) {
  const reduce = useReducedMotion();
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <m.div
      className="flex flex-col items-center rounded-[18px] border border-line bg-surface p-3"
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <div className="relative h-[72px] w-[72px]">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#C6FF3D" />
              <stop offset="1" stopColor="#3DE0FF" />
            </linearGradient>
          </defs>
          <circle cx="36" cy="36" r={r} fill="none" strokeWidth="7" className="stroke-surface-2" />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            stroke="url(#ring-grad)"
            strokeDasharray={`${(c * value) / 100} ${c}`}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-[15px] font-semibold">{value}%</span>
      </div>
      <span className="mt-1.5 text-[11px] font-medium text-muted">{label}</span>
    </m.div>
  );
}

const HISTORY = [81, 84, 83, 87, 86, 89];

export function ParentScreen() {
  const t = useT();
  const points = HISTORY.map((v, i) => [12 + i * 44, 70 - (v - 78) * 5]);
  const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

  return (
    <Phone>
      <div className="flex h-full flex-col bg-bg px-4 pt-11 text-ink">
        <div className="flex items-center gap-3">
          <span className="grid h-[40px] w-[40px] place-items-center rounded-full bg-accent font-display text-[13px] font-bold text-night">
            {t("mock.name1").split(" ").map((p) => p[0]).join("")}
          </span>
          <div>
            <p className="text-[15px] font-semibold">{t("mock.name1")}</p>
            <p className="text-[11px] text-muted">
              4-A · {t("mock.week")} 6
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {SUBJECTS.map((s, i) => (
            <Ring key={s.name} value={s.value} label={s.name} delay={0.1 + i * 0.08} />
          ))}
        </div>
        <div className="mt-2.5 rounded-[18px] border border-line bg-surface p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">{t("mock.parent.history")}</p>
            <span className="font-mono text-[11px] text-accent-ink">89%</span>
          </div>
          <svg viewBox="0 0 244 84" className="mt-1 h-[70px] w-full">
            <path d={path} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent-ink" />
            {points.map(([x, y], i) => (
              <circle key={x} cx={x} cy={y} r={i === points.length - 1 ? 5 : 3} className="fill-accent-ink" />
            ))}
          </svg>
        </div>
        <p className="mt-auto flex items-center justify-center gap-1.5 pb-5 pt-3 text-[10px] text-muted">
          <FiLock size={10} /> {t("mock.parent.link")}
        </p>
      </div>
    </Phone>
  );
}

/* --------------------------------------------------------------- Telegram */

// Chat timeline (ms after the tab opens). Every message has its slot
// reserved from the start, so revealing it never moves the others.
const CHAT = [
  { at: 300 }, // /start
  { at: 1400, typingFrom: 700 }, // subscription reply
  { at: 2100 }, // /natija
  { at: 3300, typingFrom: 2500 }, // result card
];

export function Typing() {
  return (
    <span className="absolute left-0 top-0 inline-flex gap-1 rounded-[16px] rounded-bl-[4px] bg-[#182533] px-3.5 py-3">
      {[0, 1, 2].map((i) => (
        <span key={i} className="typing-dot h-[6px] w-[6px] rounded-full bg-[#7F91A4]" />
      ))}
    </span>
  );
}

export function Bubble({ out, shown, typing, children, time }) {
  return (
    <div className={`relative flex ${out ? "justify-end" : "justify-start"}`}>
      {typing && !shown && <Typing />}
      <div
        className={`max-w-[85%] rounded-[16px] px-3 py-2 text-[12.5px] leading-snug transition duration-300 ${
          out ? "rounded-br-[4px] bg-[#2B5278]" : "rounded-bl-[4px] bg-[#182533]"
        } ${shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      >
        {children}
        <span className="ml-2 inline-block translate-y-0.5 text-[9.5px] text-[#7F91A4]">
          {time}
          {out && <span className="ml-0.5 text-[#5FB6F0]">✓✓</span>}
        </span>
      </div>
    </div>
  );
}

export function TelegramScreen() {
  const t = useT();
  const reduce = useReducedMotion();
  const [ticked, setElapsed] = useState(0);
  const elapsed = reduce ? Infinity : ticked;

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    const id = setInterval(() => {
      const ms = performance.now() - start;
      setElapsed(ms);
      if (ms > 3500) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [reduce]);

  const shown = CHAT.map((c) => elapsed >= c.at);
  const typing = CHAT.map((c) => c.typingFrom !== undefined && elapsed >= c.typingFrom);
  const botTyping = typing.some((v, i) => v && !shown[i]);

  return (
    <Phone className="shadow-[0_0_80px_-10px_rgba(61,224,255,.55)]">
      <div className="flex h-full flex-col bg-[#0E1621] text-[#EDEFF3]">
        <div className="flex items-center gap-2.5 bg-[#17212B] px-3 pb-2.5 pt-10">
          <FiChevronLeft size={20} className="text-[#5FB6F0]" />
          <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-accent font-display text-[11px] font-bold text-night">
            SW
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold">Stanford Weekly Bot</p>
            <p className={`text-[11px] ${botTyping ? "text-[#5FB6F0]" : "text-[#7F91A4]"}`}>
              {botTyping ? t("mock.tg.typing") : t("mock.tg.bot")}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-hidden px-2.5 pt-3">
          <Bubble out shown={shown[0]} time="18:00">
            /start
          </Bubble>
          <Bubble shown={shown[1]} typing={typing[1]} time="18:00">
            {t("mock.tg.subscribed")}
          </Bubble>
          <Bubble out shown={shown[2]} time="18:02">
            /natija
          </Bubble>
          <div className="relative">
            {typing[3] && !shown[3] && <Typing />}
            <div
              className={`w-[220px] overflow-hidden rounded-[16px] rounded-bl-[4px] bg-[#182533] p-1.5 transition duration-500 ${
                shown[3] ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {/* The weekly card the bot sends as a picture. */}
              <div className="rounded-[12px] bg-gradient-to-br from-[#F6F5F1] to-[#E7F7D0] p-3 text-[#0F1115]">
                <p className="text-[10.5px] font-semibold leading-tight">
                  {t("mock.name1")} · 4-A · {t("mock.week")} 6
                </p>
                <div className="mt-2 space-y-1.5">
                  {SUBJECTS.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-[9.5px]">
                        <span>{s.name}</span>
                        <span className="font-mono font-semibold">{s.value}%</span>
                      </div>
                      <div className="mt-0.5 h-[5px] overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#7CC400] to-[#1FB5D6]"
                          style={{ transform: `scaleX(${s.value / 100})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-2 border-t border-black/10 pt-1.5 text-[10.5px] font-semibold">
                  {t("mock.tg.avg")}: 89%
                </p>
              </div>
              <span className="block px-1.5 pt-1 text-right text-[9.5px] text-[#7F91A4]">18:02</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-[#17212B] px-3 pb-6 pt-2.5 text-[#7F91A4]">
          <FiPaperclip size={17} />
          <span className="flex-1 text-[12px]">{t("mock.tg.message")}</span>
          <FiMic size={17} />
        </div>
      </div>
    </Phone>
  );
}
