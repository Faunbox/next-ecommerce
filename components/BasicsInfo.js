import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { StyledSection, StyledDiv } from "../styles/styled_home";

import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import clockIcon from "../public/icons/wall-clock.png";
import {
  Button,
  Col,
  Container,
  Grid,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";

const BasicsInfo = () => {
  return (
    <Container
      css={{
        "@md": { width: "35%" },
      }}
    >
      <Spacer y={1} css={{ "@md": { display: "none" } }} />
      <Grid.Container
        alignItems="center"
        justify="space-around"
        gap={1}
        css={{ "@md": { display: "flex", flexDirection: "column" } }}
      >
        <Grid css={{ textAlign: "center", w: "33%" }}>
          <Text h4>Always free delivery</Text>
          <Image src={deliveryIcon} alt="ikona" width="40" height="40" />
        </Grid>
        <Grid css={{ textAlign: "center", w: "33%" }}>
          <Text h4>Send up to 24h</Text>
          <Image src={clockIcon} alt="ikona" width="40" height="40" />
        </Grid>
        <Grid css={{ textAlign: "center", w: "33%" }}>
          <Text h4>Free refund up to 150 days</Text>
          <Image src={refundIcon} alt="ikona" width="40" height="40" />
        </Grid>
        <Col>
          <Spacer y={1} />
          <Link href={"/store"} passHref>
            <Button css={{ mx: "auto" }}>Check our store!</Button>
          </Link>
        </Col>
      </Grid.Container>
    </Container>
  );
};

export default dynamic(async () => BasicsInfo, { ssr: false });
