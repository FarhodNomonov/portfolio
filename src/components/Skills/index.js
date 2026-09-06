import { AiFillHtml5 } from "react-icons/ai";
import { DiCss3Full, DiReact } from "react-icons/di";
import { SiJavascript, SiGit } from "react-icons/si";
import useReveal from "../../hooks/useReveal";

const SKILLS = [
  { name: "HTML", percent: 95, icon: AiFillHtml5, color: "text-orange-500" },
  { name: "CSS/SCSS", percent: 95, icon: DiCss3Full, color: "text-blue-500" },
  { name: "JavaScript", percent: 80, icon: SiJavascript, color: "text-yellow-400" },
  { name: "ReactJS", percent: 90, icon: DiReact, color: "text-cyan-400" },
  { name: "Git", percent: 90, icon: SiGit, color: "text-red-500" },
];

// A single skill card: icon + name + a progress bar that animates from
// 0 to its target percentage the first time it scrolls into view.
function SkillCard({ name, percent, icon: Icon, color }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${
        visible ? "is-visible" : ""
      } rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`${color} shrink-0`} size={28} />
        <span className="font-semibold">{name}</span>
        <span className="ml-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {percent}%
        </span>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-[width] duration-1000 ease-out"
          style={{ width: visible ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-zinc-50 px-6 py-28 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Навыки
          </h2>
          <p className="mt-3 text-3xl font-bold sm:text-4xl">
            Технологии, с которыми я работаю
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
