import Image from "next/image";
import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import mail from "../public/icons/mail.png";
import dynamic from "next/dynamic";
import { Container, Grid, Text } from "@nextui-org/react";
import Link from "next/link";

const FooterInfo = () => {
  return (
    <Grid.Container
      alignItems="center"
      justify="center"
      direction="column"
      gap={2}
    >
      <Grid css={{ textAlign: "center" }}>
        <Image src={deliveryIcon} alt="ikona" />
        <Text>Our Customer service is avaible everyday in 8:00 to 16:00</Text>
      </Grid>
      <Grid css={{ textAlign: "center" }}>
        <Image src={mail} alt="ikona" />
        <Link href="mailto:faunbox2@gmail.com">
          <a>
            <Text>faunbox2@gmail.com</Text>
          </a>
        </Link>
      </Grid>
      <Grid css={{ textAlign: "center" }}>
        <Image src={refundIcon} alt="ikona" />
        <Link href={"phoneto:666666666"}>
          <a>
            <Text>Phone Number</Text>
          </a>
        </Link>
      </Grid>
    </Grid.Container>
  );
};

export default dynamic(async () => FooterInfo, { ssr: false });
