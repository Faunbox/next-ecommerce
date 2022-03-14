import { Button } from "react-bootstrap";
import Slider from "../components/Slider";
import BasicsInfo from "../components/BasicsInfo";
import styled from "styled-components";

const StyledMain = styled.main``;

const About = () => {
  return (
    <StyledMain>
      <Slider />
      <BasicsInfo />
      <Button>Check our store!</Button>
    </StyledMain>
  );
};

export default About;
