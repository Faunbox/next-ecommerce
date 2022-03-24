import FooterInfo from "./FooterInfo";
import styled from "styled-components";
import FooterSocials from "./FooterSocials";

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  background-color: #eee;
`;

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <FooterInfo />
        <FooterSocials />
      </StyledFooter>
    </>
  );
};

export default Footer;
