import dynamic from "next/dynamic";
import { useCard, ACTION } from "../context/card.context";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/auth.context";
import { StyledWrapper } from "../styles/styled_home";
import { StyledCardItemWrapper } from "../styles/styled_card";
import cartIcon from "../public/icons/shopping-cart.png";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Input, Row, Spacer } from "@nextui-org/react";
import Image from "next/image";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);

const Card = () => {
  const { state, dispatch } = useCard();
  const { cart } = state;
  const { cartItems } = cart;
  const { userSession } = useAuth();
  const [fetchingFlag, setfetchingFlag] = useState(false);
  const [fullPrice, setFullPrice] = useState(0);

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
        <StyledCardItemWrapper key={item._id}>
          <p>Item: {item.name}</p>
          <p>Description: {item.description}</p>
          <p>Total price: {item.price * item.quantity}PLN</p>
          <p>Item price: {item.price}PLN</p>
          <p>Quantity: {item.quantity === "" ? 0 : item.quantity}</p>
          <Row justify="center" css={{ my: 15 }}>
            <Button
              auto
              onClick={() => changeQuantity(item, item.quantity + 1)}
            >
              +
            </Button>
            <Input
              type="text"
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
          <StyledWrapper>
            <Button onClick={() => deleteItem(item)}>Delete</Button>
          </StyledWrapper>
        </StyledCardItemWrapper>
      )),
    [cartItems]
  );


  return (
    <StyledWrapper>
      {cartItems.length !== 0 ? (
        <>
          <Spacer y={1} />
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
        cartItemsMemo
      ) : (
        <p>Cart is empty! Lets check our store!</p>
      )}
    </StyledWrapper>
  );
};

export default dynamic(async () => Card, { ssr: false });
