import { Container, Grid, Spacer, Text } from "@nextui-org/react";
import Product from "../components/Product";

const SimilarProducts = ({ items, category, actualProduct }) => {
  return (
    <Container justify="center" alignItems="center">
      <Text h2>Similar Products:</Text>
      <Grid.Container gap={2} justify="center">
        {items
          ?.filter((item) =>
            item.category.toLowerCase().includes(category.toLowerCase())
          )
          .map((item) => <Product key={item._id} product={item} />)
          .slice(0, 4)}
      </Grid.Container>
      <Spacer y={1} css={{ display: "none", "@xs": "block" }} />
    </Container>
  );
};

export default SimilarProducts;
