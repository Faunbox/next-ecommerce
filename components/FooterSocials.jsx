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
          <a>
            <Image src={facebookIcon} alt="facebook"></Image>
          </a>
        </Link>
        <Link href={"/"} passHref>
          <a>
            <Image src={tiktokIcon} alt="facebook"></Image>
          </a>
        </Link>
        <Link href={"/"} passHref>
          <a>
            <Image src={instagramIcon} alt="facebook"></Image>
          </a>
        </Link>
      </StyledSocialsWrapper>
    </>
  );
};

export default FooterSocials;
