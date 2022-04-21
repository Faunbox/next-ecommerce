import Image from "next/image";
import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import mail from "../public/icons/mail.png";
import dynamic from "next/dynamic";
import { StyledDiv } from "../styles/styled_footer";
import { Container, Text } from "@nextui-org/react";
import Link from "next/link";

const FooterInfo = () => {
  return (
    <Container>
      <Container css={{ textAlign: "center" }}>
        <Image src={deliveryIcon} alt="ikona" />
        <Text>Our Customer service is avaible everyday in 8:00 to 16:00</Text>
      </Container>
      <StyledDiv>
        <Link href="mailto:faunbox2@gmail.com">
          <a>faunbox2@gmail.com</a>
        </Link>
        <Image src={mail} alt="ikona" />
      </StyledDiv>
      <StyledDiv>
        <Link href={"phoneto:666666666"}>
          <a>Phone Number</a>
        </Link>
        <Image src={refundIcon} alt="ikona" />
      </StyledDiv>
    </Container>
  );
};

export default dynamic(async () => FooterInfo, { ssr: false });
