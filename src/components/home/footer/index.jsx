import { FormattedMessage } from "react-intl";

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} <FormattedMessage id="name" />
        </p>
        <p className="font-mono text-xs">
          <FormattedMessage id="footer.made" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
