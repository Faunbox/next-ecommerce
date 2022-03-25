import Slider from "../components/Slider";
import BasicsInfo from "../components/BasicsInfo";
import Promotions from "../components/Promotions";
import { queryClient } from "./_app";
import { dehydrate, useQuery } from "react-query";
import { StyledMain } from "../styles/styled_home";
import StoreInfo from "../components/StoreInfo";

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
      <Promotions items={data} />
      <StoreInfo />
    </StyledMain>
  );
};

export default About;
