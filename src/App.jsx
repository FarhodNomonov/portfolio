import { LazyMotion, domAnimation } from "framer-motion";
import Home from "./components/home";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <LazyMotion features={domAnimation} strict>
        <Home />
      </LazyMotion>
    </Wrapper>
  );
}

export default App;
