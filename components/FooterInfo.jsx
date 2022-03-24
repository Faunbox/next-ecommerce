import styled from "styled-components";
import Image from "next/image";
import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import mail from "../public/icons/mail.png";
import dynamic from "next/dynamic";
import Link from "next/link";

const StyledSection = styled.section`
  display: flex;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  margin: 30px 0;
  overflow: hidden;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  align-content: center;
  align-items: center;
  margin: 10px 0;
`;

const StyledLink = styled(Link)`
  margin: 0 5px;
`;

const FooterInfo = () => {
  return (
    <StyledSection>
      <StyledDiv>
        <p>Our Customer service is avaible everyday in 8:00 to 16:00</p>
        <Image src={deliveryIcon} alt="ikona" />
      </StyledDiv>
      <StyledDiv>
        <StyledLink href="mailto:faunbox2@gmail.com">
          faunbox2@gmail.com
        </StyledLink>
        <Image src={mail} alt="ikona" />
      </StyledDiv>
      <StyledDiv>
        <p>Free refund up to 150 days</p>
        <Image src={refundIcon} alt="ikona" />
      </StyledDiv>
    </StyledSection>
  );
};

export default dynamic(async () => FooterInfo, { ssr: false });
