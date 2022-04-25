import Slider from "../components/Slider";
import BasicsInfo from "../components/BasicsInfo";
import Promotions from "../components/Promotions";
import dynamic from "next/dynamic";
import { queryClient } from "./_app";
import { dehydrate, useQuery } from "react-query";
import StoreInfo from "../components/StoreInfo";
import { Container, Grid, Row, Spacer } from "@nextui-org/react";

const fetchAllProducts = async () => {
  const items = await fetch(`${process.env.NEXTAUTH_URL}/api/products`);
  return items.json();
};

export async function getStaticProps() {
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
    <Container>
      <Row
        justify="center"
        align="center"
        css={{ "@xs": { flexWrap: "wrap" }, "@md": { flexWrap: "nowrap" } }}
      >
        <Slider />
        <BasicsInfo />
      </Row>
      <Grid.Container
      // css={{ "@xs": { justifyContent: "column-reverse" } }}
      >
        <Promotions items={data} />
      </Grid.Container>
      <Spacer y={1} />
      <StoreInfo />
    </Container>
  );
};

export default dynamic(async () => About);
