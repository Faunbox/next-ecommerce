import { Text } from "@nextui-org/react";
import Product from "../components/Product";
import { StyledPromotionContainter } from "../styles/styled_home";
import { StyledWrapper } from "../styles/styled_home";

const Promotions = ({ items }) => {
  return (
    <StyledWrapper>
      <Text h2>Promotions</Text>
      <StyledPromotionContainter>
        {items.slice(2, 5).map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </StyledPromotionContainter>
    </StyledWrapper>
  );
};

export default Promotions;
