import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import {StyledSection, StyledDiv, StyledButton} from '../styles/styled_home'

import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import clockIcon from "../public/icons/wall-clock.png";



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
      <Link href={"/store"} passHref>
        <StyledButton>Check our store!</StyledButton>
      </Link>
    </StyledSection>
  );
};

export default dynamic(async () => BasicsInfo, { ssr: false });
