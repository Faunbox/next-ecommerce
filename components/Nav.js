import { useCard, ACTION } from "../context/card.context";
import PhoneMenu from "./PhoneMenu";

import { Container, Spacer } from "@nextui-org/react";
import DesktopMenu from "./DesktopMenu";

const Navigation = () => {
  const { state } = useCard();

  const { cart } = state;

  return (
    <>
      <Container
        alignItems="center"
        direction="column"
        css={{ "@xs": { display: "none" }, padding: 0, textAlign: "center" }}
      >
        <PhoneMenu cart={cart} />
      </Container>
      <Container display="none" css={{ "@xs": { display: "block" } }}>
        <DesktopMenu cart={cart} />
      </Container>
      <Spacer y={1} />
    </>
  );
};

export default Navigation;
