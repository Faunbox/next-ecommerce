import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/auth.context";
import hamburgerIcon from "../public/icons/hamburger.png";
import searchIcon from "../public/icons/search.png";
import cartIcon from "../public/icons/shopping-cart.png";
import userIcon from "../public/icons/user.png";
import StoreMenu from "./StoreMenu.js";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { Button } from "react-bootstrap";

const StyledSection = styled.section`
  position: relative;
  text-align: center;
`;
const StyledUl = styled.ul`
  display: flex;
  list-style: none;
`;

const StyledInput = styled.input`
  margin: 20px 0;
`;

const UserInfo = () => {
  const { userSession } = useAuth();
  return (
    <>
      {!userSession ? (
        <button onClick={() => signIn()}>Log in</button>
      ) : (
        <button onClick={() => signOut()}>Log out</button>
      )}
      {userSession ? (
        <Link href={`/user/${userSession.email}`} passHref>
          <button>
            {userSession.name ? userSession.name : userSession.email}
          </button>
        </Link>
      ) : null}
    </>
  );
};

const PhoneMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      inputRef.current,
      { autoAlpha: 0, x: 5 },
      { autoAlpha: 1, x: 0, duration: 1 }
    );
  }, [showSearchInput]);

  return (
    <StyledSection>
      <StyledUl>
        <li>
          <button
            onClick={() => {
              setShowMenu(!showMenu);
              setShowUser(false);
              setShowSearchInput(false);
            }}
          >
            <Image src={hamburgerIcon} alt="menuIcon" />
          </button>
        </li>
        <li>
          <Link href="/cart" passHref>
            <button>
              <Image src={cartIcon} alt="cartIcon" />
            </button>
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              setShowSearchInput(!showSearchInput);
              setShowMenu(false);
              setShowUser(false);
            }}
          >
            <Image src={searchIcon} alt="cartIcon" />
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              setShowUser(!showUser);
              setShowMenu(false);
              setShowSearchInput(false);
            }}
          >
            <Image src={userIcon} alt="cartIcon" />
          </button>
        </li>
      </StyledUl>
      {showMenu ? <StoreMenu active={showMenu} /> : null}
      {showSearchInput ? (
        <>
          <StyledInput
            type="text"
            placeholder="Wyszukaj po nazwie"
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
          <Button
            as={Link}
            href={{
              pathname: "/store",
              query: { search: inputValue },
            }}
          >
            Szukaj
          </Button>
        </>
      ) : null}
      {showUser ? <UserInfo /> : null}
    </StyledSection>
  );
};

export default PhoneMenu;
