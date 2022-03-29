import Link from "next/link";
import {
  Button,
  Card,
  Col,
  Grid,
  Row,
  Text,
  useTheme,
} from "@nextui-org/react";

const ProductCard = ({ product }) => {
  const { theme } = useTheme();
  return (
    <Grid>
      <Card cover css={{ my: 6, maxWidth: 240 }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            {product?.promotion ? (
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                Discount!
              </Text>
            ) : null}
            <Text h3 color="black">
              {product.name}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body>
          <Card.Image
            src={product?.image?.url}
            height={300}
            width="auto"
            alt={product.name}
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: "absolute",
            bgBlur: "#ffffff",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Text color="primary" size={12}>
                Avaible: {product.countInStock}
              </Text>
              <Text color="#000" size={12}>
                {product.price}PLN
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Link href={`/produkty/${product.slug}`} passHref>
                  <Button flat auto rounded color="gradient">
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      More Info
                    </Text>
                  </Button>
                </Link>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default ProductCard;
