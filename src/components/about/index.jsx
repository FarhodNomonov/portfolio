import { FormattedMessage } from "react-intl";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import Counter from "../ui/counter";

// Numbers are locale-independent; only the labels are translated.
const STATS = [
  { value: 5, suffix: "+", labelId: "about.stat.years" },
  { value: 4, labelId: "about.stat.school" },
  { value: 400, prefix: "~", labelId: "about.stat.students" },
  { value: 540, suffix: "+", labelId: "about.stat.tests" },
];

function About() {
  return (
    <section id="about" className="section">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <h2 className="eyebrow">
            01 · <FormattedMessage id="nav.about" />
          </h2>
          <p className="h2 mt-4">
            <FormattedMessage id="about.title" />
          </p>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            <FormattedMessage id="about.text" />
          </p>
        </Reveal>

        <Stagger as="dl" className="grid grid-cols-2 gap-3 self-end sm:gap-4 lg:col-span-5">
          {STATS.map((stat) => (
            <StaggerItem
              key={stat.labelId}
              className="card flex min-h-40 flex-col justify-between p-5 transition-shadow duration-300 hover:shadow-glow-soft sm:p-6"
            >
              <dt className="order-2 mt-6 text-sm leading-snug text-muted">
                <FormattedMessage id={stat.labelId} />
              </dt>
              <dd className="order-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter {...stat} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default About;
