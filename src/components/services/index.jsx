import { FormattedMessage } from "react-intl";
import { FiUsers, FiGrid, FiUser, FiSend, FiBarChart2, FiSmartphone, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { useContactModal } from "../ContactModal";

// Fictional deals for the CRM mini-board.
const BOARD = [
  { titleId: "services.crm.col.new", cards: [["Nova Build", "$12k"], ["Lumen Clinic", "$4k"]] },
  { titleId: "services.crm.col.work", cards: [["Ipak Textile", "$8k"]] },
  { titleId: "services.crm.col.deal", cards: [["Green Market", "$6k"]] },
];

function DealCard({ name, sum, className = "", style }) {
  return (
    <div className={`rounded-xl border border-line bg-surface px-2 py-2.5 sm:px-3 ${className}`} style={style}>
      <p className="truncate text-[12px] font-semibold sm:text-[13px]">{name}</p>
      <p className="mt-0.5 font-mono text-[11px] text-muted">{sum}</p>
    </div>
  );
}

/** Three-column board where one deal keeps sliding New → In progress → Deal. */
function MiniKanban() {
  return (
    // --gap = column gap + both column paddings: the distance between slots.
    <div aria-hidden="true" className="mt-8 grid grid-cols-3 gap-2 [--gap:1.5rem] sm:gap-3 sm:[--gap:2rem]">
      {BOARD.map(({ titleId, cards }, col) => (
        <div key={titleId} className="rounded-2xl bg-surface-2 p-2 sm:p-2.5">
          <p className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${col === 2 ? "bg-lime" : col === 1 ? "bg-cyan" : "bg-muted"}`} />
            <span className="truncate">
              <FormattedMessage id={titleId} />
            </span>
          </p>
          <div className="space-y-2">
            {/* Empty slot the travelling card glides through. */}
            <div className="relative h-[58px] rounded-xl border border-dashed border-line">
              {col === 0 && (
                <DealCard
                  name="Sardor Auto"
                  sum="$15k"
                  className="kanban-travel absolute inset-[-1px] border-lime/60 shadow-glow"
                />
              )}
            </div>
            {cards.map(([name, sum]) => (
              <DealCard key={name} name={name} sum={sum} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const SERVICES = [
  { titleId: "services.excel.title", textId: "services.excel.text", icon: FiGrid, span: "md:col-span-1 lg:col-span-5" },
  { titleId: "services.cabinets.title", textId: "services.cabinets.text", icon: FiUser, span: "md:col-span-1 lg:col-span-5" },
  { titleId: "services.bots.title", textId: "services.bots.text", icon: FiSend, span: "lg:col-span-4", chat: true },
  { titleId: "services.reports.title", textId: "services.reports.text", icon: FiBarChart2, span: "lg:col-span-4" },
  { titleId: "services.apps.title", textId: "services.apps.text", icon: FiSmartphone, span: "md:col-span-2 lg:col-span-4" },
];

function MiniChat() {
  return (
    <div aria-hidden="true" className="mt-6 space-y-1.5">
      <div className="w-fit rounded-2xl rounded-bl-md bg-surface-2 px-3 py-1.5 text-[12px]">
        <FormattedMessage id="services.bots.demo1" />
      </div>
      <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-lime px-3 py-1.5 text-[12px] font-medium text-night">
        <FormattedMessage id="services.bots.demo2" />
      </div>
    </div>
  );
}

/** Services bento (rendered inside section#services in Home). */
export default function Services() {
  const openContact = useContactModal();

  return (
    <div className="container-site">
      <Reveal className="max-w-3xl">
        <h2 className="eyebrow">
          04 · <FormattedMessage id="nav.services" />
        </h2>
        <p className="h2 mt-4">
          <FormattedMessage id="services.title" />
        </p>
      </Reveal>

      <Stagger className="mt-14 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
        <StaggerItem className="card gradient-border flex flex-col p-6 sm:p-8 md:col-span-2 lg:col-span-7 lg:row-span-2">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-night">
            <FiUsers size={22} aria-hidden="true" />
          </span>
          <h3 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">
            <FormattedMessage id="services.crm.title" />
          </h3>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            <FormattedMessage id="services.crm.text" />
          </p>
          <a
            href="#projects-crm"
            className="group mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent-ink underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current"
          >
            <FormattedMessage id="services.crm.example" />
            <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <div className="mt-auto">
            <MiniKanban />
          </div>
        </StaggerItem>

        {SERVICES.map(({ titleId, textId, icon: Icon, span, chat }) => (
          <StaggerItem key={titleId} className={`card gradient-border flex flex-col p-6 sm:p-7 ${span}`}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-surface-2 text-accent-ink">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold sm:text-xl">
              <FormattedMessage id={titleId} />
            </h3>
            <p className="mt-2 leading-relaxed text-muted">
              <FormattedMessage id={textId} />
            </p>
            {chat && <MiniChat />}
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10 flex justify-center">
        <button type="button" onClick={openContact} className="btn-primary group">
          <FormattedMessage id="services.cta" />
          <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </Reveal>
    </div>
  );
}
