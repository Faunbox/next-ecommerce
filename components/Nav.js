import { useAuth } from "../context/auth.context";
import { useCard, ACTION } from "../context/card.context";
import { useEffect, useState } from "react";
import PhoneMenu from "./PhoneMenu";

import {
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
        alignItems="center"
        direction="column"
        css={{ "@xs": { display: "none" }, padding: 0 }}
      >
        <PhoneMenu />
      </Container>

      <Container display="none" css={{ "@xs": { display: "block" } }}>
        <Grid.Container direction="row" alignItems="center" gap={2} md>
          <Grid justify="center">
            <Link href="/" passHref>
              <Text h1>Cosmetic Shop</Text>
            </Link>
          </Grid>
          <Grid>
            <Input
              placeholder="Search"
              aria-label="Search"
              fullWidth
              onChange={(e) => router.push(`/store?search=${e.target.value}`)}
            />
          </Grid>
          <Grid xs>
            <Row justify="space-around" align="center">
              <Link href="/" passHref>
                <Text h4>Home</Text>
              </Link>
              <Link href="/store" passHref>
                <Text h4>Store</Text>
              </Link>
              <Link href="/cart" passHref>
                <Text h4>Cart</Text>
              </Link>
              {userSession ? (
                <Link href={`/user/${userSession.email}`} passHref>
                  <User
                    src={userSession.image ? userSession.image : ""}
                    name={
                      userSession.name ? (
                        <Text h4>{userSession.name}</Text>
                      ) : (
                        <Text h4>{userSession.email}</Text>
                      )
                    }
                  ></User>
                </Link>
              ) : (
                <Text b onClick={() => signIn()}>
                  Log in
                </Text>
              )}
            </Row>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

export default Navigation;
