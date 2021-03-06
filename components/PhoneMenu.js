import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./loginForm";

import { useAuth } from "../context/auth.context";

import hamburgerIcon from "../public/icons/hamburger.png";
import searchIcon from "../public/icons/search.png";
import cartIcon from "../public/icons/shopping-cart.png";

import { Avatar, Container, Input, Row, Spacer, Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { signOut } from "next-auth/react";

const PhoneMenu = ({ cart }) => {
  const { userSession } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputWrapperRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <>
      <Text h1>Cosmetic Shop</Text>
      <Spacer y={1} />
      <Container display="flex">
        <Text
          onClick={() => {
            setShowMenu(!showMenu);
            setShowUser(false);
            setShowSearchInput(false);
          }}
        >
          <Image src={hamburgerIcon} alt="menuIcon" />
        </Text>
        <Text
          onClick={() => {
            setShowSearchInput(false);
            setShowMenu(false);
            setShowUser(false);
          }}
        >
          <Link href="/cart" passHref>
            <a>
              <Image src={cartIcon} alt="cartIcon" />
            </a>
          </Link>
        </Text>
        <Text
          onClick={() => {
            setShowSearchInput(!showSearchInput);
            setShowMenu(false);
            setShowUser(false);
          }}
        >
          <Image src={searchIcon} alt="cartIcon" />
        </Text>
        <Text
          onClick={() => {
            setShowUser(!showUser);
            setShowMenu(false);
            setShowSearchInput(false);
          }}
        >
          <Avatar src={userSession?.image} />
        </Text>
      </Container>
      {cart?.cartItems.length !== 0 && (
        <Container>
          <Text h5>You have {cart.cartItems.length} items in cart</Text>
        </Container>
      )}

      {showMenu ? (
        <Container
          justify="center"
          ref={sectionRef}
          active={showMenu ? "none" : "block"}
        >
          <Spacer y={1} />
          <Container display="flex" justify="space-between">
            <Link href="/" passHref>
              <a>
                <Text b onClick={() => setShowMenu(!showMenu)}>
                  Home
                </Text>
              </a>
            </Link>
            <Link href="/store" passHref>
              <a>
                <Text b onClick={() => setShowMenu(!showMenu)}>
                  Store
                </Text>
              </a>
            </Link>
            <Link href="/contact" passHref>
              <a>
                <Text b onClick={() => setShowMenu(!showMenu)}>
                  Contact
                </Text>
              </a>
            </Link>
          </Container>
          <Spacer y={1} />
        </Container>
      ) : null}
      {showSearchInput ? (
        <>
          <Row
            align="center"
            justify="center"
            css={{ my: 10 }}
            ref={inputWrapperRef}
          >
            <Spacer y={1} />
            <Input
              type="text"
              aria-label="Search"
              placeholder="Search by product name"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Link
              href={{
                pathname: "/store",
                query: { search: inputValue },
              }}
              passHref
            >
              <a>
                <Text b onClick={() => setShowSearchInput(!showSearchInput)}>
                  Search
                </Text>
              </a>
            </Link>
            <Spacer y={1} />
          </Row>
        </>
      ) : null}
      {showUser ? (
        <>
          <Spacer y={1} />
          <Container display="flex" css={{ textAlign: "center" }}>
            {userSession ? (
              <Text b onClick={() => setShowUser(!showUser)}>
                <Link href={`/user/${userSession.email}`} passHref>
                  <a>
                    {userSession.name ? userSession.name : userSession.email}
                  </a>
                </Link>
              </Text>
            ) : null}
            {!userSession ? (
              <LoginForm />
            ) : (
              <Text b onClick={() => signOut()}>
                Log out
              </Text>
            )}
          </Container>
          <Spacer y={1} />
        </>
      ) : null}
    </>
  );
};

export default dynamic(async () => PhoneMenu);
