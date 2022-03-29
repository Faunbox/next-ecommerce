import { useAuth } from "../context/auth.context";
import { useCard, ACTION } from "../context/card.context";
import { useEffect, useState } from "react";
import PhoneMenu from "./PhoneMenu";

import styled from "styled-components";
import { Container, Grid, Input, Row, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

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

const Navigation = () => {
  const { state, dispatch } = useCard();
  const { userSession } = useAuth();
  const [cartLenght, setCarLenght] = useState("");

  const router = useRouter();

  const { cart } = state;

  useEffect(() => {
    return setCarLenght(cart.cartItems.length);
  }, [cart]);

  return (
    <>
      <Container
        justify="center"
        alignItems="center"
        direction="column"
        css={{ "@xs": { display: "none" } }}
      >
        <PhoneMenu />
      </Container>

      <Container display="none" css={{ "@xs": { display: "block" } }}>
        <Grid.Container direction="row" alignItems="center" gap={4}>
          <Grid justify="flex-start">
            <Link href="/" passHref>
              <Text h1>Cosmetic Shop</Text>
            </Link>
          </Grid>
          <Grid>
            <Input
              placeholder="Search"
              fullWidth
              onChange={(e) => router.push(`/store?search=${e.target.value}`)}
            />
          </Grid>
          <Grid xs>
            <Row justify="space-around">
              <Link href="/" passHref>
                <Text h4>Home</Text>
              </Link>
              <Link href="/store" passHref>
                <Text h4>Store</Text>
              </Link>
              <Link href="/contact" passHref>
                <Text h4>Contact</Text>
              </Link>
              <Link href="/" passHref>
                <Text h4>User</Text>
              </Link>
            </Row>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

export default Navigation;
