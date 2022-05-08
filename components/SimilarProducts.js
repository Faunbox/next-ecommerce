import { Container, Grid, Spacer, Text } from "@nextui-org/react";
import { useEffect } from "react";
import Product from "../components/Product";

const SimilarProducts = ({ items, category, itemName }) => {
  return (
    <Container justify="center" alignItems="center">
      <Text h2>Similar Products:</Text>
      <Grid.Container gap={2} justify="center">
        {items
          ?.filter((element) => {
            return element.name != itemName;
          })
          .map((item) => <Product key={item._id} product={item} />)
          .slice(0, 4)}
      </Grid.Container>
      <Spacer y={1} css={{ display: "none", "@xs": "block" }} />
    </Container>
  );
};

export default SimilarProducts;
