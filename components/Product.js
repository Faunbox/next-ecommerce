import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <>
      <Card key={product._id} style={{ width: "18rem", margin: "10px" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.decription}</Card.Text>
          <Link href={`/produkty/${product.slug}`} passHref>
            <Button variant="primary">Wiecej informacji</Button>
          </Link>
        </Card.Body>
      </Card>

      {/* <div key={product.name}>
        <Image src={product.image} alt={"zdjecie"} width={500} height={400} />
        <p>{product.name}</p>
        <p>{product.price}$</p>
        <p>{product.brand}</p>
        <p>{product?._id}</p>
        <p>{product.decription}</p>
        <Link href={`/produkty/${product.slug}`}>Wiecej info</Link>
      </div> */}
    </>
  );
};

export default Product;
