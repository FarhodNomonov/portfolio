import Header from "./header";
import Intro from "./intro";
import TechMarquee from "./marquee";
import About from "../about";
import Skills from "../Skills";
import Experience from "../experience";
import Contact from "../contact";
import Footer from "./footer";
import { ContactModalProvider } from "../ContactModal";
import { lazy, Suspense } from "react";

// The case study and services are heavy and below the fold: they load as a
// separate chunk after first paint. The <section> wrappers stay outside
// Suspense so anchors and the header's active-section observer always see them.
const Projects = lazy(() => import("../projects"));
const Services = lazy(() => import("../services"));

export default function Home() {
  return (
    <ContactModalProvider>
      <Header />
      <main>
        <Intro />
        <TechMarquee />
        <About />
        <Skills />
        <section id="projects" className="section border-t border-line">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Projects />
          </Suspense>
        </section>
        <section id="services" className="section border-t border-line">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Services />
          </Suspense>
        </section>
        <Experience />
        <Contact />
      </main>
      <Footer />
    </ContactModalProvider>
  );
}
