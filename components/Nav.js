import Link from "next/link";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();
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
            {session && (
              <Link href={`/user/${session.user.email}`} passHref>
                <Button as="div">{session.user.email}</Button>
              </Link>
            )}
            {!session ? (
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
