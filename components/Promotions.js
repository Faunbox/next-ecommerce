import { Container } from "react-bootstrap";
import styled from "styled-components";
import Product from "../components/Product";

const StyledDivider = styled.h1`
  width: 100%;
  height: 2px;
  margin: 30px 0;
  background-color: #000;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Promotions = ({ items }) => {
  return (
    <Container>
      <StyledDivider>Promocje</StyledDivider>
      <StyledContainer>
        {items.slice(2, 5).map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </StyledContainer>
    </Container>
  );
};

export default Promotions;
