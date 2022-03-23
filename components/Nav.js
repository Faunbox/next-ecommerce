import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useAuth } from "../context/auth.context";
import { useCard, ACTION } from "../context/card.context";
import { useEffect, useState } from "react";
import PhoneMenu from "./PhoneMenu";

import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  transition: 3s ease;
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
        <StyledDiv>Sklep kosmetyczny</StyledDiv>
        <PhoneMenu />
      </StyledNav>

      {/* <Navbar bg="primary" expand="sm">
        <Container>
          <Navbar.Brand href="/">SuperStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/store/?page=1" passHref>
                <Nav.Link>Store</Nav.Link>
              </Link>
              <Link href="/blog" passHref>
              <Nav.Link>Blog</Nav.Link>
            </Link>
              <Link href="/contact" passHref>
                <Nav.Link>Contact</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              {userSession && (
                <Link href="/cart" passHref>
                  <Button>Cart: {cartLenght}</Button>
                </Link>
              )}
            </Nav>
            <Nav>
              {userSession ? (
                <Link href={`/user/${userSession.email}`} passHref>
                  <Button>
                    {userSession.name ? userSession.name : userSession.email}
                  </Button>
                </Link>
              ) : null}
              {!userSession ? (
                <Button onClick={() => signIn()}>Log in</Button>
              ) : (
                <Button onClick={() => signOut()}>Log out</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};

export default Navigation;

