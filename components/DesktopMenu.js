import { Grid, Input, Link, Row, Text, User } from "@nextui-org/react";
import LoginForm from "./loginForm";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth.context";
import { useMemo } from "react";

const DesktopMenu = ({ cart }) => {
  const { userSession } = useAuth();

  const router = useRouter();

  const cartLengthMemo = useMemo(() => {
    return cart.length ? cart.length : null;
  }, [cart.length]);

  return (
    <Grid.Container direction="row" alignItems="center" gap={2} md>
      <Row align="center">
        <Grid>
          <Link href="/">
            <Text h1>Cosmetic Shop</Text>
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
        {userSession && (
          <Grid xs>
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
          </Grid>
        )}
      </Row>
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
          <Link href="/contact" passHref>
            <Text h4>Contact</Text>
          </Link>
          {!userSession ? (
            <LoginForm />
          ) : (
            <Text h4 onClick={() => signOut()}>
              Log out
            </Text>
          )}
        </Row>
      </Grid>
    </Grid.Container>
  );
};

export default DesktopMenu;
