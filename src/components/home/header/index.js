import { useContext, useState, useEffect } from "react";
import { Logo, Github, AllSvg } from "../../../assets/export/icons";
import { Context } from "../../Wrapper";
import { FormattedMessage } from "react-intl";

export default function Header() {
  const context = useContext(Context);
  const [Menu, setMenu] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const ViziblyPopup = () => {
    setOpenPopup(!openPopup);
  };
  const { MdKeyboardArrowDown } = AllSvg;

     useEffect(() => {
     document.body.style.overflowY = Menu ? "hidden" : "auto";
   }, [Menu]);
  return (
    <div className={Menu ? "active header" : "header"}>
      <div className="header_logo">
        <Logo />
      </div>
      <nav className={Menu ? "active" : ""}>
        <div className="border"></div>
        <a onClick={() => setMenu(false)} href={"#intro"}>
          <FormattedMessage id="app.header.home" />
        </a>
        <a onClick={() => setMenu(false)} href={"#about"}>
          <FormattedMessage id="app.header.about" />
        </a>
        <a onClick={() => setMenu(false)} href={"#skills"}>
          <FormattedMessage id="app.header.skills" />
        </a>
        <a onClick={() => setMenu(false)} href={"#portfolio"}>
          <FormattedMessage id="app.header.portfolio" />
        </a>
      </nav>
      <div className="header_d_flex">
        <div className="header_contact">
          <a target={"_blank"} href={"https://github.com/FarhodNomonov"}>
            <Github />
          </a>
        </div>
        <div className="lang_select">
          <div className="selected_lang language" onClick={ViziblyPopup}>
            <p>{context.locale === "ru-RU" ? "Ru" : context.locale}</p>
            <MdKeyboardArrowDown />
          </div>
          <div
            onClick={ViziblyPopup}
            className={`select_custome ${openPopup ? "active" : ""}`}
          >
            <button
              className="language"
              style={
                context.locale === "En"
                  ? { opacity: 0.7, pointerEvents: "none" }
                  : {}
              }
              value={"En"}
              onClick={context.selectLanguage}
            >
              EN
            </button>
            <button
              className="language"
              style={
                context.locale === "Ru"
                  ? { opacity: 0.7, pointerEvents: "none" }
                  : {}
              }
              value={"Ru"}
              onClick={context.selectLanguage}
            >
              RU
            </button>
            <button
              className="language"
              style={
                context.locale === "Uz"
                  ? { opacity: 0.7, pointerEvents: "none" }
                  : {}
              }
              value={"Uz"}
              onClick={context.selectLanguage}
            >
              UZ
            </button>
          </div>
        </div>
      </div>

      <div
        onClick={() => setMenu(!Menu)}
        className={Menu ? "active header_menu_btn" : "header_menu_btn"}
      ></div>
    </div>
  );
}
