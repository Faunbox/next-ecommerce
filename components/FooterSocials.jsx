import { StyledSocialsWrapper } from "../styles/styled_footer";
import facebookIcon from "../public/icons/facebook.png";
import tiktokIcon from "../public/icons/tik-tok.png";
import instagramIcon from "../public/icons/instagram.png";
import Image from "next/image";
import Link from "next/link";

const FooterSocials = () => {
  return (
    <>
      <h4>Socials</h4>
      <StyledSocialsWrapper>
        <Link href={"/"} passHref>
          <Image src={facebookIcon} alt="facebook"></Image>
        </Link>
        <Link href={"/"} passHref>
          <Image src={tiktokIcon} alt="facebook"></Image>
        </Link>
        <Link href={"/"} passHref>
          <Image src={instagramIcon} alt="facebook"></Image>
        </Link>
      </StyledSocialsWrapper>
    </>
  );
};

export default FooterSocials;
