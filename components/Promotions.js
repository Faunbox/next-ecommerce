import { Grid, Spacer, Text } from "@nextui-org/react";
import Product from "../components/Product";
import { StyledPromotionContainter } from "../styles/styled_home";
import { StyledWrapper } from "../styles/styled_home";

const Promotions = ({ items }) => {
  return (
    <StyledWrapper>
      <Text h2>Promotions</Text>
      <Grid.Container gap={2} justify="center">
        {items.slice(2, 5).map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </Grid.Container>
      <Spacer y={1} />
    </StyledWrapper>
  );
};

export default Promotions;
