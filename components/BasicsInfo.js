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
    <Container>
      <Spacer y={1} />
      <Grid.Container alignItems="center" justify="space-around" gap={1}>
        <Grid css={{ textAlign: "center", w: "33%" }}>
          <Text>Always free delivery</Text>
          <Image src={deliveryIcon} alt="ikona" />
        </Grid>
        <Grid css={{ textAlign: "center", w: "33%" }}>
          <Text>Send up to 24h</Text>
          <Image src={clockIcon} alt="ikona" />
        </Grid>
        <Grid css={{ textAlign: "center", w: "33%" }}>
          <Text>Free refund up to 150 days</Text>
          <Image src={refundIcon} alt="ikona" />
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
