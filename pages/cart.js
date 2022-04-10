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
  Input,
  Row,
  Text,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);

const Cart = () => {
  const { state, dispatch } = useCard();
  const { cart } = state;
  const { cartItems } = cart;
  const { userSession } = useAuth();
  const [fetchingFlag, setfetchingFlag] = useState(false);

  const changeQuantity = async (item, quantity) => {
    //check db for item quantity
    setfetchingFlag(true);
    const data = await fetch(`/api/products/${item.slug}`);
    const quantityInfo = await data.json();
    setfetchingFlag(false);
    if (quantityInfo.countInStock < quantity) {
      alert("Brak na stanie!");
      return;
    }
    dispatch({ type: ACTION.ADD_TO_CART, payload: { ...item, quantity } });
  };

  const deleteItem = (item) => {
    dispatch({ type: ACTION.REMOVE_FROM_CART, payload: item });
  };

  const goToCheckout = async (products, email, stripeID) => {
    const response = await fetch("/api/checkout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, email, stripeID }),
    });
    const { id } = await response.json();
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
                <Container>
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    height={"100%"}
                    width={"100%"}
                    layout="responsive"
                    style={{ maxWidth: "300px", minWidth: "150px" }}
                  />
                </Container>
                <Text>Item: {item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Total price: {item.price * item.quantity}PLN</Text>
                <Text>Item price: {item.price}PLN</Text>
                <Text>
                  Quantity: {item.quantity === "" ? 0 : item.quantity}
                </Text>
              </Container>
              <Row justify="center" css={{ my: 15 }}>
                <Button
                  auto
                  onClick={() => changeQuantity(item, item.quantity + 1)}
                >
                  +
                </Button>
                <Input
                  type="text"
                  aria-label="Quantity input"
                  value={fetchingFlag ? "..." : item.quantity}
                  css={{ mx: 10, width: 50 }}
                  onChange={(e) => changeQuantity(item, e.target.value)}
                />

                <Button
                  auto
                  onClick={() => changeQuantity(item, item.quantity - 1)}
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
            onClick={() =>
              goToCheckout(cartItems, userSession.email, userSession.stripeID)
            }
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
          <Text h4>
            Cart is empty! Lets check our
            <Link href={"/store"}>
              <a> store!</a>
            </Link>
          </Text>
        </Container>
      )}
    </Container>
  );
};

export default dynamic(
  async () => Cart
  //  { ssr: false }
);
