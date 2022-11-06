import Link from "next/link";
import { Button, Card, Col, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <Grid>
      <Card
        isPressable
        isHoverable={true}
        css={{ my: 6, maxWidth: 240 }}
        onPress={() => router.push(`/products/${product.slug}`)}
      >
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            {product?.promotion ? (
              <Text size={12} weight="bold" transform="uppercase" color="black">
                Discount!
              </Text>
            ) : null}
            <Text h3 color="black">
              {product.name}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={product?.image?.url}
            height={300}
            objectFit="cover"
            width="auto"
            alt={product.name}
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#ffffff66",
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
              {!product?.promotion ? (
                <Text color="#000" size={12}>
                  {product.price}PLN
                </Text>
              ) : (
                <>
                  <Text del color="#000" size={12}>
                    {product.price}PLN
                  </Text>
                  <Text color="#000" size={12}>
                    {product.promotionPrice}PLN
                  </Text>
                </>
              )}
            </Col>
            <Col>
              <Row justify="flex-end">
                <Link href={`/products/${product.slug}`} passHref>
                  <a>
                    <Button flat auto rounded>
                      <Text
                        css={{ color: "inherit" }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        More Info
                      </Text>
                    </Button>
                  </a>
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
