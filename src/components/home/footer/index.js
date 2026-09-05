import { AllSvg, Github } from "../../../assets/export/icons";
import { FormattedMessage } from "react-intl";

function Footer() {
  const { BsInstagram, BsTelegram, BsWhatsapp, BsFacebook } = AllSvg;
  return (
    <div className="footer">
      <p>
        <FormattedMessage id="app.footer.desc" />
      </p>
      <div className="footer_icons">
        <a
          target={"_blank"}
          href="https://t.me/Nomonov_Farhod"
          rel="noopener noreferrer"
        >
          <BsTelegram />
        </a>
        <a
          target={"_blank"}
          href={"https://www.instagram.com/nomonov_farhod/"}
          rel="noopener noreferrer"
        >
          <BsInstagram />
        </a>
        <a
          target={"_blank"}
          href={"https://www.facebook.com/profile.php?id=100069224957501"}
          rel="noopener noreferrer"
        >
          <BsFacebook />
        </a>
        <a
          target={"_blank"}
          href={"https://wa.me/998907972434/"}
          rel="noopener noreferrer"
        >
          <BsWhatsapp />
        </a>
        <a
          className="git"
          target={"_blank"}
          href={"https://github.com/FarhodNomonov"}
        >
          <Github />
        </a>
      </div>
      <p>Copyright © 2022 NomonovFarxod Inc. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
