import { Container, Grid, Spacer, Text } from "@nextui-org/react";
import Product from "../components/Product";

const Promotions = ({ items }) => {
  return (
    <Container justify="center">
      <Text h2>Promotions</Text>
      <Grid.Container gap={2} justify="center">
        {items.slice(2, 5).map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </Grid.Container>
      <Spacer y={1} />
    </Container>
  );
};

export default Promotions;
