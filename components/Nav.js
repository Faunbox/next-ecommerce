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
import { signIn, signOut } from "next-auth/react";
import LoginForm from "./loginForm";

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
          <Row align="center">
            <Grid justify="center">
              <Link href="/" passHref>
                <a>
                  <Text h1>Cosmetic Shop</Text>
                </a>
              </Link>
            </Grid>
            <Grid xs>
              <Input
                placeholder="Search"
                id="search"
                aria-label="searchbar"
                fullWidth
                onChange={(e) => router.push(`/store?search=${e.target.value}`)}
              />
            </Grid>
            <Grid xs>
              {userSession && (
                <Link href={`/user/${userSession.email}`} passHref>
                  <a>
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
                  </a>
                </Link>
              )}
            </Grid>
          </Row>
          <Grid xs>
            <Row justify="space-around" align="center">
              <Link href="/" passHref>
                <a>
                  <Text h4>Home</Text>
                </a>
              </Link>
              <Link href="/store" passHref>
                <a>
                  <Text h4>Store</Text>
                </a>
              </Link>
              <Link href="/cart" passHref>
                <a>
                  <Text h4>Cart</Text>
                </a>
              </Link>
              <Link href="/contact" passHref>
                <a>
                  <Text h4>Contact</Text>
                </a>
              </Link>
              {!userSession ? (
                <LoginForm />
              ) : (
                <Text h4 i onClick={() => signOut()}>
                  Log out
                </Text>
              )}
            </Row>
          </Grid>
        </Grid.Container>
      </Container>
      <Spacer y={1} />
    </>
  );
};

export default Navigation;
