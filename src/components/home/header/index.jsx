import { useContext, useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { FormattedMessage, useIntl } from "react-intl";
import useDarkMode from "../../../hooks/useDarkMode";
import { Context } from "../../Wrapper";

// Nav links: translation id + the section id it scrolls to.
const NAV_LINKS = [
  { id: "nav.about", href: "#about" },
  { id: "nav.skills", href: "#skills" },
  { id: "nav.projects", href: "#projects" },
  { id: "nav.services", href: "#services" },
  { id: "nav.experience", href: "#experience" },
  { id: "nav.contact", href: "#contact" },
];

const LANGUAGES = ["ru", "en", "uz"];

// Highlights the nav link of the section currently in the middle of the viewport.
function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

function LanguageSwitch({ className = "" }) {
  const { locale, selectLanguage } = useContext(Context);
  const intl = useIntl();

  return (
    <div
      role="group"
      aria-label={intl.formatMessage({ id: "nav.language" })}
      className={`flex h-10 items-center rounded-full border border-line p-1 ${className}`}
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={locale === code}
          onClick={() => selectLanguage(code)}
          className={`h-8 min-w-9 rounded-full px-2.5 font-mono text-xs font-medium uppercase transition-colors ${
            locale === code ? "bg-lime text-night" : "text-muted hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const [isDark, toggleDark] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const reduce = useReducedMotion();
  const intl = useIntl();

  // Lock page scroll behind the fullscreen menu; Escape closes it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const themeLabel = intl.formatMessage({ id: isDark ? "nav.theme.light" : "nav.theme.dark" });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Glass layer lives in its own element: backdrop-filter on <header>
          would trap the fixed mobile menu inside the 64px bar. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-16 border-b border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
      />
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a href="#intro" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent font-display text-sm font-bold text-night transition-transform group-hover:-rotate-6">
            FN
          </span>
          <span className="hidden font-display text-sm font-medium sm:block">
            <FormattedMessage id="name" />
          </span>
        </a>

        <nav aria-label={intl.formatMessage({ id: "nav.label" })} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active === link.href ? "bg-ink/[.06] text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <FormattedMessage id={link.id} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch className="hidden sm:flex" />
          <button
            type="button"
            onClick={toggleDark}
            aria-label={themeLabel}
            title={themeLabel}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
          >
            {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={intl.formatMessage({ id: menuOpen ? "nav.menu.close" : "nav.menu.open" })}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto bg-bg px-4 pb-8 pt-6 sm:px-6 lg:hidden"
          >
            <nav aria-label={intl.formatMessage({ id: "nav.label" })} className="flex-1">
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <m.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 py-4 font-display text-[clamp(1.75rem,8vw,2.75rem)] font-medium leading-tight"
                    >
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      <FormattedMessage id={link.id} />
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <LanguageSwitch className="mt-8 self-start sm:hidden" />
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
