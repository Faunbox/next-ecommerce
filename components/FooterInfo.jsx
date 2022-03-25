import Image from "next/image";
import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import mail from "../public/icons/mail.png";
import dynamic from "next/dynamic";
import { StyledDiv, StyledText, StyledLink, StyledSection } from "../styles/styled_footer";


const FooterInfo = () => {
  return (
    <StyledSection>
      <StyledDiv>
        <StyledText>
          Our Customer service is avaible everyday in 8:00 to 16:00
        </StyledText>
        <Image src={deliveryIcon} alt="ikona" />
      </StyledDiv>
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
