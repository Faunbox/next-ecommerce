import dynamic from "next/dynamic";
import { useCard, ACTION } from "../context/card.context";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/auth.context";
import { useMemo, useState } from "react";
import {
  Button,
  Container,
  Card,
  Grid,
  Row,
  Text,
  Spacer,
  Loading,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import SimilarProducts from "../components/SimilarProducts";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);

const Cart = () => {
  const { state, dispatch } = useCard();
  const { cart } = state;
  const { cartItems } = cart;
  const { userSession } = useAuth();
  const [fetchingFlag, setfetchingFlag] = useState(0);

  const changeQuantity = async (item, itemQuantity) => {
    //prevent item quantity to by lower than 1
    if (itemQuantity === 0) {
      return;
    }
    //check db for item quantity
    setfetchingFlag(1);
    const data = await fetch(`/api/products/${item.slug}`);
    const quantityInfo = await data.json();
    setfetchingFlag(0);
    if (quantityInfo.countInStock < itemQuantity) {
      alert(
        "Currently that amount is not avaible! In stock: ",
        quantityInfo.countInStock
      );
      return;
    }
    dispatch({ type: ACTION.ADD_TO_CART, payload: { ...item, itemQuantity } });
  };

  const deleteItem = (item) => {
    dispatch({ type: ACTION.REMOVE_FROM_CART, payload: item });
  };

  const goToCheckout = async (products, email, stripeID) => {
    //check is user logged in
    if (!userSession) {
      alert("If You want to add item to card, login first!");
    }
    const response = await fetch("/api/checkout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, email, stripeID }),
    });
    const { id, url } = await response.json();
    dispatch({ type: ACTION.SET_STRIPE_SESSION_ID, payload: id });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  };

  //preventing other components from rerenders after changing quantity
  const cartItemsMemo = useMemo(
    () =>
      cartItems.map((item) => (
        <Grid justify="center" key={item._id}>
          <Card css={{ maxWidth: "300px" }}>
            <Card.Body>
              <Container direction="row" css={{ textAlign: "center" }}>
                <Text h3>{item.name}</Text>
                <Container>
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    height={300}
                    width={300}
                    layout="responsive"
                    objectFit="cover"
                    priority={true}
                  />
                </Container>
                <Spacer y={1} />

                <Text b>Description:</Text>
                <Text>{item.description}</Text>
                <Spacer y={1} />
                <Text>
                  <Text b>Total price: </Text>
                  <Text span>{item.price * item.itemQuantity}PLN</Text>
                </Text>
                <Text>
                  <Text b>Item price: </Text>
                  <Text span>{item.price}PLN</Text>
                </Text>
                <Spacer y={1} />
                <Text b>Quantity:</Text>
              </Container>
              <Row justify="center" align="center" css={{ my: 5 }}>
                <Button
                  auto
                  onClick={() => changeQuantity(item, item.itemQuantity + 1)}
                >
                  +
                </Button>
                <Text
                  blockquote
                  // type="text"
                  // aria-label="Quantity input"
                  // value={item.itemQuantity}
                  css={{ mx: 10 }}
                  // onChange={(e) => changeQuantity(item, e.target.value)}
                >
                  {fetchingFlag ? <Loading /> : item.itemQuantity}
                </Text>

                <Button
                  auto
                  onClick={() => changeQuantity(item, item.itemQuantity - 1)}
                >
                  -
                </Button>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Button
                color="error"
                css={{ mx: "auto" }}
                onClick={() => deleteItem(item)}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
      )),
    [cartItems]
  );

  return (
    <Container display="flex" justify="center" alignItems="center">
      {cartItems.length !== 0 ? (
        <>
          <Button
            onClick={() => {
              //check is user logged in
              if (!userSession) {
                alert("If You want to buy something, login first!");
                return;
              }
              goToCheckout(cartItems, userSession.email, userSession.stripeID);
            }}
          >
            Checkout
          </Button>
        </>
      ) : null}
      {cartItems.length !== 0 ? (
        <Grid.Container justify="center" alignItems="center" gap={2}>
          {cartItemsMemo}
        </Grid.Container>
      ) : (
        <Container css={{ textAlign: "center" }}>
          <Spacer y={1} />
          <Text h4>
            Cart is empty! Lets check our
            <Link href={"/store"}>
              <a> store!</a>
            </Link>
          </Text>
          <Spacer y={1} />
          <SimilarProducts />
        </Container>
      )}
    </Container>
  );
};

export default dynamic(async () => Cart, { ssr: false });
