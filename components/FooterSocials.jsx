import { StyledSocialsWrapper } from "../styles/styled_footer";
import facebookIcon from "../public/icons/facebook.png";
import tiktokIcon from "../public/icons/tik-tok.png";
import instagramIcon from "../public/icons/instagram.png";
import Image from "next/image";
import Link from "next/link";
import { Col, Grid, Spacer, Text } from "@nextui-org/react";

const FooterSocials = () => {
  return (
    <Col css={{ textAlign: "center" }}>
      <Spacer y={1} />
      <Text h4>Socials</Text>
      <Spacer y={1} />
      <Grid.Container justify="center">
        <Grid xs={4} justify="center">
          <Link href={"/"} passHref>
            <a>
              <Image src={facebookIcon} alt="facebook"></Image>
            </a>
          </Link>
        </Grid>
        <Grid xs={4} justify="center">
          <Link href={"/"} passHref>
            <a>
              <Image src={tiktokIcon} alt="facebook"></Image>
            </a>
          </Link>
        </Grid>
        <Grid xs={4} justify="center">
          <Link href={"/"} passHref>
            <a>
              <Image src={instagramIcon} alt="facebook"></Image>
            </a>
          </Link>
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
    </Col>
  );
};

export default FooterSocials;
