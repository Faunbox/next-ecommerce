import dynamic from "next/dynamic";
import { useCard, ACTION } from "../context/card.context";
import { Button, Container } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/auth.context";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);

const Card = () => {
  const { state, dispatch } = useCard();
  const { cart } = state;
  const { cartItems } = cart;
  const { userSession } = useAuth();

  const changeQuantity = async (item, quantity) => {
    const data = await fetch(`/api/products/${item.slug}`);
    const changingProduct = await data.json();
    if (changingProduct.countInStock < quantity) {
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

  return (
    <Container>
      {cartItems.length !== 0 && (
        <Button
          onClick={() =>
            goToCheckout(cartItems, userSession.email, userSession.stripeID)
          }
        >
          Kup przedmioty
        </Button>
      )}
      {cartItems.length !== 0 ? (
        cartItems.map((item) => (
          <>
            <Container key={item._id}>
              <p>{item.name}</p>
              <p>{item.decription}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
              <select
                name="ilość"
                onChange={(e) => changeQuantity(item, e.target.value)}
                defaultValue={item.quantity}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <button onClick={() => deleteItem(item)}>usuń</button>
            </Container>
          </>
        ))
      ) : (
        <p>Koszyk jest pusty!</p>
      )}
    </Container>
  );
};

export default dynamic(async () => Card, { ssr: false });
