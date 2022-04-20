import { signIn, useSession } from "next-auth/react";
import { getOneProduct } from "../api/products/[slug]";
import { useCard, ACTION } from "../../context/card.context";
import { useAuth } from "../../context/auth.context";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Grid, Spacer, Text } from "@nextui-org/react";
import Promotions from "../../components/Promotions";
import { queryClient } from "../_app";
import { dehydrate, useQuery } from "react-query";
import SimilarProducts from "../../components/SimilarProducts";

const fetchAllProducts = async () => {
  const items = await fetch(`${process.env.NEXTAUTH_URL}/api/products`);
  return items.json();
};

const ProductScreen = ({ product }) => {
  const { data } = useQuery("AllItems", fetchAllProducts, { enabled: false });

  const { dispatch, state } = useCard();
  const { userSession } = useAuth();
  const router = useRouter();

  const addToCart = async () => {
    //check is user logged in
    if (!userSession) {
      alert("If You want to add item to card, login first!");
      return signIn();
    }

    //get product info from db
    const data = await fetch(`/api/products/${product.slug}`);
    const selectedProduct = await data.json();

    //checking of same product in card and add 1 to quantity
    const existItem = state.cart.cartItems.find(
      (item) => item._id === selectedProduct._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (selectedProduct.countInStock < quantity) {
      alert("No item avaible!");
      return;
    }
    dispatch({
      type: ACTION.ADD_TO_CART,
      payload: { ...selectedProduct, quantity },
    });
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
      <Grid.Container
        justify="space-around"
        alignItems="center"
        gap={3}
        css={{ height: "100%" }}
      >
        <Grid>
          <Spacer y={1} />
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
          <Text h1>{product.name}</Text>
          <Text h4>Description: {product.description}</Text>
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
        </Grid>
        <Spacer y={1} css={{ display: "none", "@md": { display: "block" } }} />
        <Grid
          justify="center"
          md={12}
          alignItems="center"
          css={{ margin: "auto 0" }}
        >
          <Button
            color="success"
            css={{ mx: "auto" }}
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>
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
      <SimilarProducts items={data} category={product.category} />
    </Container>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  await queryClient.prefetchQuery("AllItems", fetchAllProducts, {
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
