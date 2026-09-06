import IntroImg from "../../../assets/img/intro_logo.png";
import { FiDownload, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { FormattedMessage } from "react-intl";

function Intro() {
  return (
    <section
      id="intro"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Decorative gradient blobs (purely visual, hidden from screen readers) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 animate-blob rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-500/20" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 animate-blob rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-500/20 [animation-delay:4s]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-16 md:grid-cols-2">
        {/* Text column */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            <FormattedMessage id="app.badge" />
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            <FormattedMessage id="app.header" />
          </h1>

          <p className="mt-6 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
            <FormattedMessage id="app.subtext" />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/cv/NomonovFarxodRu.pdf"
              download="Nomonov-Farxod-CV"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              <FiDownload size={16} />
              <FormattedMessage id="app.intro.download" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-indigo-400 hover:text-indigo-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
            >
              <FormattedMessage id="app.contactme" />
              <FiArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Portrait column */}
        <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-2xl" />
          <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-zinc-200 shadow-2xl dark:border-zinc-800">
            <img
              src={IntroImg}
              alt="Фарход Номонов"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Scroll-down hint */}
      <a
        href="#about"
        aria-label="Пролистать вниз"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-zinc-400 hover:text-indigo-500 sm:block"
      >
        <FiChevronDown size={26} />
      </a>
    </section>
  );
}

export default Intro;