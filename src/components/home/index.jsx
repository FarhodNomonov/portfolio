import Header from "./header";
import Intro from "./intro";
import About from "../about";
import Skills from "../Skills";
import Experience from "../experience";
import Contact from "../contact";
import Footer from "./footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Intro />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
