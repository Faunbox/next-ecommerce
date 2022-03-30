import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { StyledSection, StyledDiv, StyledButton } from "../styles/styled_home";

import deliveryIcon from "../public/icons/delivery (1).png";
import refundIcon from "../public/icons/refund.png";
import clockIcon from "../public/icons/wall-clock.png";
import { Text } from "@nextui-org/react";

const BasicsInfo = () => {
  return (
    <StyledSection>
      <StyledDiv>
        <Text>Always free delivery</Text>
        <Image
          src={deliveryIcon}
          alt="ikona"
        />
      </StyledDiv>
      <StyledDiv>
        <Text>Send up to 24h</Text>
        <Image src={clockIcon} alt="ikona" />
      </StyledDiv>
      <StyledDiv>
        <Text>Free refund up to 150 days</Text>
        <Image src={refundIcon} alt="ikona" />
      </StyledDiv>
      <Link href={"/store"} passHref>
        <StyledButton>Check our store!</StyledButton>
      </Link>
    </StyledSection>
  );
};

export default dynamic(async () => BasicsInfo, { ssr: false });
