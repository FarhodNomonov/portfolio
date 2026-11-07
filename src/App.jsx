import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import Home from "./components/home";
import Wrapper from "./components/Wrapper";

function App({ locale, messages }) {
  return (
    <Wrapper locale={locale} messages={messages}>
      {/* reducedMotion="user": with the OS setting on, movement is dropped and
          only fades remain, without changing the markup. */}
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation} strict>
          <Home />
        </LazyMotion>
      </MotionConfig>
    </Wrapper>
  );
}

export default App;
