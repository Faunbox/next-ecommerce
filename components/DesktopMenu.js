import { Grid, Input, Row, Text, User } from "@nextui-org/react";
import LoginForm from "./loginForm";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/auth.context";
import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

export const AnimatedLink = forwardRef(({ children }, ref) => {
  AnimatedLink.displayName = "motion a";
  return (
    <motion.div ref={ref} whileHover={{ scale: 1.2 }}>
      {children}
    </motion.div>
  );
});

const DesktopMenu = ({ cart }) => {
  const { userSession } = useAuth();

  const router = useRouter();

  const cartLengthMemo = useMemo(() => {
    return cart.cartItems.length ? cart.cartItems.length : 0;
  }, [cart.cartItems.length]);

  return (
    <Grid.Container direction="row" alignItems="center" gap={2} md>
      <Row align="center">
        <Grid>
          <Link href="/" passHref>
            <a>
              <Text h1>Cosmetic Shop</Text>
            </a>
          </Link>
        </Grid>
        <Grid xs>
          <Input
            clearable
            placeholder="Search"
            id="search"
            aria-label="searchbar"
            fullWidth
            onChange={(e) => router.push(`/store?search=${e.target.value}`)}
          />
        </Grid>
        {userSession && (
          <Grid xs>
            <AnimatedLink>
              <Link href={`/user/${userSession.email}`} passHref>
                <a>
                  <User
                    src={userSession.image ? userSession.image : ""}
                    name={
                      userSession?.name ? (
                        <Text h4>{userSession.name}</Text>
                      ) : (
                        <Text h4>{userSession.email}</Text>
                      )
                    }
                  ></User>
                </a>
              </Link>
            </AnimatedLink>
          </Grid>
        )}
      </Row>
      <Grid xs>
        <Row justify="space-around" align="center">
          <AnimatedLink>
            <Link href="/" passHref>
              <a>
                <Text h4>Home</Text>
              </a>
            </Link>
          </AnimatedLink>
          <AnimatedLink>
            <Link href="/store" passHref>
              <a>
                <Text h4>Store</Text>
              </a>
            </Link>
          </AnimatedLink>
          <AnimatedLink>
            <Link href="/cart" passHref>
              <a>
                <Text h4>Cart: {cartLengthMemo}</Text>
              </a>
            </Link>
          </AnimatedLink>
          <AnimatedLink>
            <Link href="/contact" passHref>
              <a>
                <Text h4>Contact</Text>
              </a>
            </Link>
          </AnimatedLink>
          {!userSession ? (
            <LoginForm />
          ) : (
            <AnimatedLink>
              <Text h4 onClick={signOut}>
                Log out
              </Text>
            </AnimatedLink>
          )}
        </Row>
      </Grid>
    </Grid.Container>
  );
};

export default dynamic(async () => DesktopMenu, { ssr: false });
