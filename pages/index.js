import Slider from "../components/Slider";
import BasicsInfo from "../components/BasicsInfo";
import Promotions from "../components/Promotions";
import { queryClient } from "./_app";
import { dehydrate, useQuery } from "react-query";
import { StyledMain } from "../styles/styled_home";
import StoreInfo from "../components/StoreInfo";
import { Container, Grid, Spacer } from "@nextui-org/react";

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
    <>
      <StyledMain>
        <Slider />
        <Grid.Container
          direction="column-reverse"
          css={{ "@xs": { justifyContent: "column-reverse" } }}
        >
          <BasicsInfo />
          <Promotions items={data} />
        </Grid.Container>
        <Spacer y={1} />
        <StoreInfo />
      </StyledMain>
    </>
  );
};

export default About;
