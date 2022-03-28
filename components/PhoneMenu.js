import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "../context/auth.context";

import hamburgerIcon from "../public/icons/hamburger.png";
import searchIcon from "../public/icons/search.png";
import cartIcon from "../public/icons/shopping-cart.png";
import userIcon from "../public/icons/user.png";

import {
  StyledPhoneWrapper,
  StyledPhoneMenuIconsList,
  StyledInput,
  StyledPhoneMenu,
  StyledPhoneMenuOptionsList,
  StyledPhoneNavIcon,
  StyledInputWrapper,
  StyledSearchButton,
  StyledUserButtons,
  StyledUserWrapper,
} from "../styles/styled_nav";
import { Container, Input, Row, Text } from "@nextui-org/react";

const PhoneMenu = () => {
  const { userSession } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputWrapperRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <StyledPhoneWrapper>
      <StyledPhoneMenuIconsList>
        <li>
          <StyledPhoneNavIcon
            onClick={() => {
              setShowMenu(!showMenu);
              setShowUser(false);
              setShowSearchInput(false);
            }}
          >
            <Image src={hamburgerIcon} alt="menuIcon" />
          </StyledPhoneNavIcon>
        </li>
        <li>
          <Link href="/cart" passHref>
            <StyledPhoneNavIcon>
              <Image src={cartIcon} alt="cartIcon" />
            </StyledPhoneNavIcon>
          </Link>
        </li>
        <li>
          <StyledPhoneNavIcon
            onClick={() => {
              setShowSearchInput(!showSearchInput);
              setShowMenu(false);
              setShowUser(false);
            }}
          >
            <Image src={searchIcon} alt="cartIcon" />
          </StyledPhoneNavIcon>
        </li>
        <li>
          <StyledPhoneNavIcon
            onClick={() => {
              setShowUser(!showUser);
              setShowMenu(false);
              setShowSearchInput(false);
            }}
          >
            <Image src={userIcon} alt="cartIcon" />
          </StyledPhoneNavIcon>
        </li>
      </StyledPhoneMenuIconsList>

      {showMenu ? (
        <StyledPhoneMenu ref={sectionRef} active={showMenu ? "none" : "block"}>
          <StyledPhoneMenuOptionsList>
            <Link href="/" passHref>
              <li>
                <Text b onClick={() => setShowMenu(!showMenu)}>
                  Home
                </Text>
              </li>
            </Link>
            <Link href="/store" passHref>
              <li>
                <Text b onClick={() => setShowMenu(!showMenu)}>
                  Store
                </Text>
              </li>
            </Link>
            <Link href="/contact" passHref>
              <li>
                <Text b onClick={() => setShowMenu(!showMenu)}>
                  Contact
                </Text>
              </li>
            </Link>
          </StyledPhoneMenuOptionsList>
        </StyledPhoneMenu>
      ) : null}
      {showSearchInput ? (
        <Row
          align="center"
          justify="center"
          css={{ my: 10 }}
          ref={inputWrapperRef}
        >
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
            <Text h6 onClick={() => setShowSearchInput(!showSearchInput)}>
              Search
            </Text>
          </Link>
        </Row>
      ) : null}
      {showUser ? (
        <StyledPhoneMenu>
          <StyledUserWrapper>
            {!userSession ? (
              <Text auto onClick={() => signIn()}>
                Log in
              </Text>
            ) : (
              <Text onClick={() => signOut()}>Log out</Text>
            )}
            {userSession ? (
              <Link href={`/user/${userSession.email}`} passHref>
                <Text onClick={() => setShowUser(!showUser)}>
                  {userSession.name ? userSession.name : userSession.email}
                </Text>
              </Link>
            ) : null}
          </StyledUserWrapper>
        </StyledPhoneMenu>
      ) : null}
    </StyledPhoneWrapper>
  );
};

export default PhoneMenu;
