import styled from "styled-components";
import Image from "next/image";
import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import clockIcon from "../public/icons/wall-clock.png";
import dynamic from "next/dynamic";

const StyledSection = styled.section`
  display: flex;
  min-height: auto;
  flex-wrap: wrap;
  height: 20vh;
  align-items: center;
  justify-content: space-around;
`;

const StyledDiv = styled.div`
  flex-basis: 33%;
`;

const BasicsInfo = () => {
  return (
    <StyledSection>
      <StyledDiv>
        <p>Always free delivery</p>
        <Image src={deliveryIcon} alt="ikona" />
      </StyledDiv>
      <StyledDiv>
        <p>Send up to 24h</p>
        <Image src={clockIcon} alt="ikona" />
      </StyledDiv>
      <StyledDiv>
        <p>Free refund up to 150 days</p>
        <Image src={refundIcon} alt="ikona" />
      </StyledDiv>
    </StyledSection>
  );
};

export default dynamic(async () => BasicsInfo, { ssr: false });
