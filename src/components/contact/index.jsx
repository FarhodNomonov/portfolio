import { FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import { Reveal } from "../ui/motion";
import { useContactModal } from "../ContactModal";

const TELEGRAM = "https://t.me/Nomonov_Farhod";

const SOCIALS = [
  { name: "GitHub", icon: FaGithub, href: "https://github.com/FarhodNomonov" },
  { name: "Telegram", icon: FaTelegram, href: TELEGRAM },
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/nomonov_farhod/" },
];

function Contact() {
  const openContact = useContactModal();

  return (
    <section id="contact" className="section border-t border-line">
      <Reveal className="container-site">
        <div className="relative isolate overflow-hidden rounded-panel border border-line bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-80 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
          />
          <h2 className="eyebrow justify-center">
            06 · <FormattedMessage id="nav.contact" />
          </h2>
          <p className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.25rem,6.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
            <span className="text-accent">
              <FormattedMessage id="contact.title" />
            </span>
          </p>
          <p className="mt-6 text-lg text-muted">
            <FormattedMessage id="contact.subtitle" />
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="btn-primary group">
              <FaTelegram size={18} aria-hidden="true" />
              <FormattedMessage id="contact.telegram" />
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <button type="button" onClick={openContact} className="btn-ghost">
              <FormattedMessage id="contact.form" />
            </button>
          </div>

          <ul className="mt-12 flex justify-center gap-3">
            {SOCIALS.map(({ name, icon: Icon, href }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-ink transition duration-200 hover:-translate-y-1 hover:border-transparent hover:bg-lime hover:text-night"
                >
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;
