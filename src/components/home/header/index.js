import { useContext, useEffect, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import useDarkMode from "../../../hooks/useDarkMode";
import { Context } from "../../Wrapper";

// Nav links: translation id + the section id it scrolls to.
const NAV_LINKS = [
  { id: "app.header.home", href: "#intro" },
  { id: "app.header.about", href: "#about" },
  { id: "app.header.skills", href: "#skills" },
  { id: "app.header.experience", href: "#experience" },
];

const LANGUAGES = [
  { code: "Ru", label: "RU" },
  { code: "En", label: "EN" },
  { code: "Uz", label: "UZ" },
];

export default function Header() {
  const [isDark, toggleDark] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const context = useContext(Context);

  // Adds a subtle shadow/background once the page has scrolled a bit,
  // so the sticky navbar reads as "elevated" over the page content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflowY = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === context.locale)?.label ||
    context.locale?.slice(0, 2).toUpperCase() ||
    "RU";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / brand mark */}
        <a href="#intro" className="flex items-center gap-3 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 font-bold text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
            ФН
          </span>
          <span className="hidden text-sm font-semibold sm:block">
            Фарход Номонов
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-500 dark:text-zinc-300 dark:hover:text-indigo-400"
            >
              <FormattedMessage id={link.id} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex h-10 items-center gap-1 rounded-full border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:border-indigo-400 hover:text-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
            >
              {currentLangLabel}
              <FiChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    value={lang.code}
                    onClick={(e) => {
                      context.selectLanguage(e);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                      context.locale === lang.code
                        ? "font-semibold text-indigo-500"
                        : "text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDark}
            aria-label="Переключить тему"
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-indigo-400 hover:text-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Открыть меню"
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300 md:hidden"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        className={`grid overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 flex flex-col gap-1 border-t border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-indigo-500 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
            >
              <FormattedMessage id={link.id} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
