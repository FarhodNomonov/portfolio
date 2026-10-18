import { FaLinkedin, FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import { Reveal } from "../ui/motion";
import { useContactModal } from "../ContactModal";

// Real links where already known from the existing project, "#" placeholder
// where none was provided (LinkedIn).
const SOCIALS = [
  { name: "LinkedIn", icon: FaLinkedin, href: "#" },
  { name: "GitHub", icon: FaGithub, href: "https://github.com/FarhodNomonov" },
  { name: "Telegram", icon: FaTelegram, href: "https://t.me/Nomonov_Farhod" },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/nomonov_farhod/",
  },
];

function Contact() {
  const openContact = useContactModal();

  return (
    <section id="contact" className="section border-t border-line">
      <Reveal className="container-site">
        <div className="card relative overflow-hidden rounded-panel px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
          />
          <h2 className="h2 relative mx-auto max-w-2xl">
            <FormattedMessage id="app.footer.desc" />
          </h2>

          <ul className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map(({ name, icon: Icon, href }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface-2 text-ink transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:bg-lime hover:text-night"
                >
                  <Icon size={22} />
                </a>
              </li>
            ))}
          </ul>

          <button type="button" onClick={openContact} className="btn-primary relative mt-10">
            <FiSend size={16} />
            <FormattedMessage id="app.contactme" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;
