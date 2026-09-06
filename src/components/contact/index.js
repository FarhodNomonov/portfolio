import { useState } from "react";
import { FaLinkedin, FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import { Toaster } from "react-hot-toast";
import useReveal from "../../hooks/useReveal";
import Modal from "../ui/modal";

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
  const [ref, visible] = useReveal();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contact" className="bg-zinc-50 px-6 py-28 dark:bg-zinc-900/40">
      <div
        ref={ref}
        className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}
      >
        <h2 className="text-3xl font-bold sm:text-4xl">
          <FormattedMessage id="app.footer.desc" />
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {SOCIALS.map(({ name, icon: Icon, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
        >
          <FiSend size={16} />
          <FormattedMessage id="app.contactme" />
        </button>
      </div>

      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
      <Toaster position="top-center" />
    </section>
  );
}

export default Contact;
