import { getOneProduct } from "../api/products/[slug]";
import { useCard, ACTION } from "../../context/card.context";
import { useAuth } from "../../context/auth.context";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  Popover,
  Col,
} from "@nextui-org/react";
import { fetchAllItems } from "../../lib/next-auth-react-query";
import { dehydrate, useQuery } from "react-query";
import SimilarProducts from "../../components/SimilarProducts";
import { queryClient } from "../_app";
import { useEffect, useState } from "react";

const ProductScreen = ({ product }) => {
  const { data } = useQuery("AllItems", fetchAllItems, { enabled: false });

  const { dispatch, state } = useCard();
  const { userSession } = useAuth();
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    const itemInCart = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    itemInCart
      ? setItemQuantity(
          state.cart.cartItems.find((item) => item._id === product._id)
            ?.itemQuantity
        )
      : 1;
  }, []);

  const router = useRouter();

  const addToCart = async () => {
    //get product info from db
    const data = await fetch(`/api/products/${product.slug}`);
    const selectedProduct = await data.json();

    if (selectedProduct.countInStock === 0) {
      alert("No item avaible!");
      return;
    }
    dispatch({
      type: ACTION.ADD_TO_CART,
      payload: { ...selectedProduct, itemQuantity },
    });
    setItemQuantity(1);
  };

  const deleteProduct = async (id, priceID, productID) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      //sending id to find product in db, priceID and productID to delete price and product in stripe, imageID to delete image in cloudinary
      body: JSON.stringify({
        id,
        priceID,
        productID,
        imageID: product.image.imageID,
      }),
    })
      .then((res) => res.json())
      .then((message) => alert(message.message));
    router.push("/");
  };

  if (!product) {
    //render notFound page
    return (
      <Container justify="center" css={{ textAlign: "center" }}>
        <Text h4>We dont have this product. Sorry!</Text>
        <Spacer y={1} />
        <Button
          color="gradient"
          css={{ mx: "auto" }}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container css={{ textAlign: "center" }} justify="center">
      <Spacer y={1} />
      <Button
        auto
        css={{ backgroundColor: "Gray", mx: "auto" }}
        onClick={() => router.back()}
      >
        Back
      </Button>
      <Text h1>{product.name}</Text>
      <Grid.Container
        justify="space-around"
        alignItems="center"
        gap={3}
        css={{ height: "100%" }}
      >
        <Grid alignItems="center" justify="center">
          <Image
            src={product?.image?.url}
            alt={product.name}
            width={300}
            height={300}
            // layout="responsive"
            objectFit="cover"
          />
        </Grid>
        <Grid justify="center" alignItems="center">
          <Col>
            <Text h3>Description:</Text>
            <Text h4> {product.description}</Text>
            <Spacer y={1} />
          </Col>
          <Text h4>In stock: {product.countInStock}</Text>
          <Text h4>Category: {product.category}</Text>
          {product.promotion ? (
            <>
              <Text del h4>
                Price: {product.price}PLN
              </Text>
              <Text h4>New price: {product.promotionPrice}PLN</Text>
            </>
          ) : (
            <Text h4>Price: {product.price}PLN</Text>
          )}
          <Text h4> Quantity: </Text>
          <Row justify="center" css={{ my: 15 }}>
            <Button
              auto
              onClick={() => setItemQuantity((prevState) => prevState + 1)}
            >
              +
            </Button>
            <Input
              type="text"
              aria-label="Quantity input"
              value={itemQuantity}
              css={{ mx: 10, width: 50 }}
              onChange={(e) => changeQuantity(product, e.target.value)}
            />

            <Button
              auto
              onClick={() => {
                if (itemQuantity === 1) return setItemQuantity(1);
                setItemQuantity((prevState) => prevState - 1);
              }}
            >
              -
            </Button>
          </Row>
        </Grid>
        {/* <Spacer y={1} css={{ display: "none", "@md": { display: "block" } }} /> */}

        <Grid
          justify="center"
          md={12}
          alignItems="center"
          css={{ margin: "auto 0" }}
        >
          <Popover placement="top">
            <Popover.Trigger>
              <Button
                color="success"
                css={{ mx: "auto" }}
                onClick={() => addToCart(product)}
              >
                Add to cart
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text h4 css={{ p: "$10" }}>
                Done!
              </Text>
            </Popover.Content>
          </Popover>

          {userSession?.role === "admin" && (
            <>
              <Button
                color="error"
                onClick={() =>
                  deleteProduct(
                    product._id,
                    product.stripe.priceID,
                    product.stripe.productID
                  )
                }
              >
                Delete product
              </Button>
              <Link href={`/produkty/edycja/${product.slug}`} passHref>
                <Button css={{ mx: "auto" }}>Edit</Button>
              </Link>
            </>
          )}
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <SimilarProducts
        items={data}
        category={product.category}
        itemName={product.name}
      />
    </Container>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  await queryClient.prefetchQuery("AllItems", fetchAllItems, {
    enabled: false,
  });
  const { query } = context;
  const slug = query.slug;

  const data = JSON.stringify(await getOneProduct(slug));
  const product = JSON.parse(data);

  return {
    props: {
      product,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
