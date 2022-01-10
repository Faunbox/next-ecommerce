import Link from "next/link";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";
import { useAuth } from "../context/auth.context";
import { useCard } from "../context/card.context";
import { useEffect, useState } from "react";

const Navigation = () => {
  const { state } = useCard();
  const { userSession } = useAuth();
  const [cartLenght, setCarLenght] = useState("");

  const { cart } = state;

  useEffect(() => {
    console.log(userSession);
    return setCarLenght(cart.cartItems.length);
  }, [cart]);
  useEffect(() => {
    console.log("userSession", userSession);
  }, []);

  return (
    <Navbar bg="primary" expand="sm">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/about" passHref>
              <Nav.Link>About</Nav.Link>
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
              <Link href="/koszyk" passHref>
                <Button>Koszyk: {cartLenght}</Button>
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
    </Navbar>
  );
};

export default Navigation;
