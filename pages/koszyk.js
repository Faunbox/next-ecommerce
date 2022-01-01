import Link from "next/link";
import dynamic from "next/dynamic";
import { useCard, ACTION } from "../context/card.context";
import { Button, Container } from "react-bootstrap";

const Card = () => {
  const { state, dispatch } = useCard();
  const { cart } = state;
  const { cartItems } = cart;

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

  return (
    <Container>
      {cartItems.length !== 0 ? (
        ((
          <Link href={"/zamowienie"} passHref>
            <Button>Kup przedmioty</Button>
          </Link>
        ),
        cartItems.map((item) => (
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
        )))
      ) : (
        <p>Koszyk jest pusty!</p>
      )}
    </Container>
  );
};

export default dynamic(() => Promise.resolve(Card), { ssr: false });
