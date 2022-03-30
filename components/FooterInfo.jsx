import Image from "next/image";
import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import mail from "../public/icons/mail.png";
import dynamic from "next/dynamic";
import { StyledDiv, StyledLink, StyledSection } from "../styles/styled_footer";
import { Container, Text } from "@nextui-org/react";

const FooterInfo = () => {
  return (
    <StyledSection>
      <Container css={{ textAlign: "center" }}>
        <Image src={deliveryIcon} alt="ikona" />
        <Text>Our Customer service is avaible everyday in 8:00 to 16:00</Text>
      </Container>
      <StyledDiv>
        <StyledLink href="mailto:faunbox2@gmail.com">
          faunbox2@gmail.com
        </StyledLink>
        <Image src={mail} alt="ikona" />
      </StyledDiv>
      <StyledDiv>
        <StyledLink href={"phoneto:666666666"}>Phone Number</StyledLink>
        <Image src={refundIcon} alt="ikona" />
      </StyledDiv>
    </StyledSection>
  );
};

export default dynamic(async () => FooterInfo, { ssr: false });
