import { StyledFooter } from "../styles/styled_footer";
import FooterInfo from "./FooterInfo";
import FooterSocials from "./FooterSocials";

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
