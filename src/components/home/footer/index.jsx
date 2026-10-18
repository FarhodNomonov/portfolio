import { FormattedMessage } from "react-intl";

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-site py-8 text-center text-sm text-muted">
        <FormattedMessage id="footer.copy" />
      </div>
    </footer>
  );
}

export default Footer;
