import { Container, Grid, Spacer, Text } from "@nextui-org/react";
import Product from "../components/Product";

const Promotions = ({ items }) => {
  // console.log(items.sort((a, b) => b.date.localeCompare(a.date)));
  return (
    <Container justify="center" alignItems="center">
      <Text h2>Newest items in our store</Text>
      <Grid.Container gap={2} justify="center">
        {items
          ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((item) => <Product key={item._id} product={item} />)
          .slice(0, 4)}
      </Grid.Container>
      <Spacer y={1} />
    </Container>
  );
};

export default Promotions;
