import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "../context/auth.context";

import hamburgerIcon from "../public/icons/hamburger.png";
import searchIcon from "../public/icons/search.png";
import cartIcon from "../public/icons/shopping-cart.png";
import userIcon from "../public/icons/user.png";

import { Container, Input, Row, Spacer, Text } from "@nextui-org/react";

const PhoneMenu = () => {
  const { userSession } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputWrapperRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <Container justify="center" css={{ textAlign: "center" }}>
      <Text h1>Cosmetic Shop</Text>
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
        <Link href="/cart" passHref>
          <Text
            onClick={() => {
              setShowSearchInput(false);
              setShowMenu(false);
              setShowUser(false);
            }}
          >
            <Image src={cartIcon} alt="cartIcon" />
          </Text>
        </Link>
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
          <Image src={userIcon} alt="cartIcon" />
        </Text>
      </Container>

      {showMenu ? (
        <Container
          justify="center"
          ref={sectionRef}
          active={showMenu ? "none" : "block"}
        >
          <Spacer y={1} />
          <Container display="flex" justify="space-between">
            <Link href="/" passHref>
              <Text b onClick={() => setShowMenu(!showMenu)}>
                Home
              </Text>
            </Link>
            <Link href="/store" passHref>
              <Text b onClick={() => setShowMenu(!showMenu)}>
                Store
              </Text>
            </Link>
            <Link href="/contact" passHref>
              <Text b onClick={() => setShowMenu(!showMenu)}>
                Contact
              </Text>
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
              <Text b onClick={() => setShowSearchInput(!showSearchInput)}>
                Search
              </Text>
            </Link>
            <Spacer y={1} />
          </Row>
        </>
      ) : null}
      {showUser ? (
        <>
          <Spacer y={1} />
          <Container display="flex" justify="space-between">
            {!userSession ? (
              <Text b auto onClick={() => signIn()}>
                Log in
              </Text>
            ) : (
              <Text b auto onClick={() => signOut()}>
                Log out
              </Text>
            )}
            {userSession ? (
              <Link href={`/user/${userSession.email}`} passHref>
                <Text b onClick={() => setShowUser(!showUser)}>
                  {userSession.name ? userSession.name : userSession.email}
                </Text>
              </Link>
            ) : null}
          </Container>
          <Spacer y={1} />
        </>
      ) : null}
    </Container>
  );
};

export default PhoneMenu;
