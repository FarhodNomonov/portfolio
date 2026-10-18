import { FormattedMessage } from "react-intl";
import { Reveal } from "../ui/motion";

/** Temporary anchor target for sections that are designed in the next step. */
export default function Placeholder({ id, titleId }) {
  return (
    <section id={id} className="border-t border-line py-20">
      <Reveal className="container-site">
        <h2 className="h2">
          <FormattedMessage id={titleId} />
        </h2>
        <p className="mt-4 text-muted">
          <FormattedMessage id="placeholder.soon" />
        </p>
      </Reveal>
    </section>
  );
}
