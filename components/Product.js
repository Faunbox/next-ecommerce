import Link from "next/link";
import { Button, Card } from "react-bootstrap";

const ProductCard = ({ product }) => {
  return (
    <>
      <Card key={product._id} style={{ width: "18rem", margin: "10px" }}>
        <Card.Img variant="top" src={product?.image?.url} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.price}PLN</Card.Text>
          <Card.Text>Avaible: {product.countInStock}</Card.Text>
          <Link href={`/produkty/${product.slug}`} passHref>
            <Button variant="primary">More Info</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
