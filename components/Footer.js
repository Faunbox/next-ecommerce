import { Container, Grid, Spacer } from "@nextui-org/react";
import FooterInfo from "./FooterInfo";
import FooterSocials from "./FooterSocials";
import FooterContact from "./FooterContact";

const Footer = () => {
  return (
    <>
      <Container>
        <Grid.Container justify="center">
          <Grid xs={12} sm={6} alignItems="center">
            <FooterInfo />
          </Grid>
          <Grid xs={12} sm={6} justify="center" alignItems="center">
            <Container direction="column" justify="center">
              <FooterSocials />
              <FooterContact />
            </Container>
          </Grid>
        </Grid.Container>
        <Spacer y={1} />
      </Container>
    </>
  );
};

export default Footer;
