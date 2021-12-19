import Link from "next/link";
import { useSession } from "../lib/next-auth-react-query";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";
import { useAuth } from "../context/auth.context";

const Navigation = () => {
  // const [session, loading] = useSession({
  //   required: true,
  //   redirectTo: "http://localhost:3000",
  //   queryConfig: {
  //     staleTime: 60 * 1000 * 60 * 3,
  //     refetchInterval: 60 * 1000 * 5,
  //   },
  // });

  const { userSession } = useAuth();
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
            {userSession ? (
              <Link href={`/user/${userSession.email}`} passHref>
                <Button as="div">
                  {userSession.name ? userSession.name : userSession.email}
                </Button>
              </Link>
            ) : (
              <p>brak sesji</p>
            )}
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
