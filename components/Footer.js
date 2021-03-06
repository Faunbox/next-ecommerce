import { Container, Grid, Spacer } from "@nextui-org/react";
import FooterInfo from "./FooterInfo";
import FooterContact from "./FooterContact";

const Footer = () => {
  return (
    <>
      <Container>
        <Spacer y={1} />
        <Grid.Container justify="center">
          <Grid xs={12} sm={6} justify="center" alignItems="center">
            <Container direction="column" justify="center">
              <FooterContact />
            </Container>
          </Grid>
          <Grid xs={12} sm={6} alignItems="center">
            <FooterInfo />
          </Grid>
        </Grid.Container>
        <Spacer y={1} />
      </Container>
    </>
  );
};

export default Footer;
