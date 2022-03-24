import { Button } from "react-bootstrap";
import Slider from "../components/Slider";
import BasicsInfo from "../components/BasicsInfo";
import styled from "styled-components";
import Promotions from "../components/Promotions";
import { queryClient } from "./_app";
import { dehydrate, useQuery } from "react-query";
import { useEffect } from "react";
import BrandCarusel from "../components/BrandCarusel";
import Link from "next/link";
import StoreInfo from "../components/StoreInfo";

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const fetchAllProducts = async () => {
  const items = await fetch(`${process.env.NEXTAUTH_URL}/api/products`);
  return items.json();
};

export async function getServerSideProps() {
  await queryClient.prefetchQuery("AllItems", fetchAllProducts, {
    enabled: false,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const About = () => {
  const { data } = useQuery("AllItems", fetchAllProducts, { enabled: false });

  return (
    <StyledMain>
      <Slider />
      <BasicsInfo />
      <Button as={Link} href={"/store"}>
        Check our store!
      </Button>
      <Promotions items={data} />
      <StoreInfo />
    </StyledMain>
  );
};

export default About;
