import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";

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
} from "../styles/styled_nav";

const PhoneMenu = () => {
  const { userSession } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputWrapperRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      inputWrapperRef.current,
      { autoAlpha: 0, x: 5 },
      { autoAlpha: 1, x: 0, duration: 1 }
    );
  }, [showSearchInput]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { autoAlpha: 0, x: 5 },
      { autoAlpha: 1, x: 0, duration: 1 }
    );
  }, [showMenu]);

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
                <a onClick={() => setShowMenu(!showMenu)}>Home</a>
              </li>
            </Link>
            <Link href="/store" passHref>
              <li>
                <a onClick={() => setShowMenu(!showMenu)}>Store</a>
              </li>
            </Link>
            <Link href="/contact" passHref>
              <li>
                <a onClick={() => setShowMenu(!showMenu)}>Contact</a>
              </li>
            </Link>
          </StyledPhoneMenuOptionsList>
        </StyledPhoneMenu>
      ) : null}
      {showSearchInput ? (
        <StyledInputWrapper ref={inputWrapperRef}>
          <StyledInput
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
            <StyledSearchButton
              onClick={() => setShowSearchInput(!showSearchInput)}
            >
              Search
            </StyledSearchButton>
          </Link>
        </StyledInputWrapper>
      ) : null}
      {showUser ? (
        <>
          {!userSession ? (
            <StyledUserButtons onClick={() => signIn()}>
              Log in
            </StyledUserButtons>
          ) : (
            <StyledUserButtons onClick={() => signOut()}>
              Log out
            </StyledUserButtons>
          )}
          {userSession ? (
            <Link href={`/user/${userSession.email}`} passHref>
              <StyledUserButtons onClick={() => setShowUser(!showUser)}>
                {userSession.name ? userSession.name : userSession.email}
              </StyledUserButtons>
            </Link>
          ) : null}
        </>
      ) : null}
    </StyledPhoneWrapper>
  );
};

export default PhoneMenu;
