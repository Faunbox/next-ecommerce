import { useAuth } from "../context/auth.context";
import { useCard, ACTION } from "../context/card.context";
import { useEffect, useState } from "react";
import PhoneMenu from "./PhoneMenu";

import styled from "styled-components";
import { Container, Grid, Input, Row, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;

  @media (min-width: 720px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  font-size: 3rem;
`;

const Navigation = () => {
  const { state, dispatch } = useCard();
  const { userSession } = useAuth();
  const [cartLenght, setCarLenght] = useState("");

  const { cart } = state;

  useEffect(() => {
    return setCarLenght(cart.cartItems.length);
  }, [cart]);

  return (
    <>
      <StyledNav>
        <Text h1>Cosmetic Shop</Text>
        <PhoneMenu />
      </StyledNav>

      <Container>
        <Grid.Container direction="row" alignItems="center" gap={2}>
          <Grid justify="flex-start">
            <Text h2>Cosmetic Shop</Text>
          </Grid>
          <Grid>
            <Input placeholder="Search" fullWidth />
          </Grid>
          <Grid xs>
            <Row justify="space-around">
              <Link href="/" passHref>
                <Text>Home</Text>
              </Link>
              <Link href="/" passHref>
                <Text>Store</Text>
              </Link>
              <Link href="/" passHref>
                <Text>Contact</Text>
              </Link>
              <Link href="/" passHref>
                <Text>User</Text>
              </Link>
            </Row>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

export default Navigation;
