import Header from "./header";
import Intro from "./intro";
import TechMarquee from "./marquee";
import About from "../about";
import Skills from "../Skills";
import Placeholder from "../placeholder";
import Experience from "../experience";
import Contact from "../contact";
import Footer from "./footer";
import { ContactModalProvider } from "../ContactModal";

export default function Home() {
  return (
    <ContactModalProvider>
      <Header />
      <main>
        <Intro />
        <TechMarquee />
        <About />
        <Skills />
        {/* Projects and Services get their real content in the next step. */}
        <Placeholder id="projects" titleId="nav.projects" />
        <Placeholder id="services" titleId="nav.services" />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </ContactModalProvider>
  );
}
