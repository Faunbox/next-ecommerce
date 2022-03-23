import Link from "next/link";
import styled from "styled-components";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const StyledSection = styled.section`
  /* position: fixed;
  z-index: 99999999; */
  background-color: white;
  /* padding: 20px; */
  text-align: center;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 0;
  list-style: none;
`;

const StoreMenu = ({ active }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { autoAlpha: 0, x: 5 },
      { autoAlpha: 1, x: 0, duration: 1 }
    );
  }, [active]);

  return (
    <StyledSection ref={sectionRef} active={active ? "none" : "block"}>
      <StyledUl>
        <li>
          <Link href="/" passHref>
            Home
          </Link>
        </li>
        <li>
          <Link href="/store">Store</Link>
        </li>
        <li>
          <Link href="/contact" passHref>
            Contact
          </Link>
        </li>
      </StyledUl>
    </StyledSection>
  );
};

export default StoreMenu;
