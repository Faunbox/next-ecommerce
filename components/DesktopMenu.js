import { Grid, Input, Link, Row, Text, User } from "@nextui-org/react";
import LoginForm from "./loginForm";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth.context";

const DesktopMenu = () => {
  const { userSession } = useAuth();

  const router = useRouter();

  return (
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
  );
};

export default DesktopMenu;
