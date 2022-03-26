import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import { StyledCardTitle, StyledCard } from "../styles/styled_store";

const ProductCard = ({ product }) => {
  return (
    <>
      <StyledCard
        style={{ width: "clamp(120px, 20rem, 220px", margin: "10px" }}
      >
        <Card.Img variant="top" src={product?.image?.url} />
        <Card.Body>
          <StyledCardTitle>{product.name}</StyledCardTitle>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.price}PLN</Card.Text>
          <Card.Text>Avaible: {product.countInStock}</Card.Text>
          <Link href={`/produkty/${product.slug}`} passHref>
            <Button variant="primary">More Info</Button>
          </Link>
        </Card.Body>
      </StyledCard>
    </>
  );
};

export default ProductCard;
