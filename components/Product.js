import Image from "next/image";
import Link from "next/link";
import { useCard, ACTION } from "../context/card.context";

const Product = ({ product }) => {
  const { dispatch } = useCard();

  const addToCart = () => {
    if (product.countInStock <= 0) {
      alert("Brak na stanie!");
      return;
    }
    dispatch({
      type: ACTION.ADD_TO_CART,
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <div key={product.name}>
      <Image src={product.image} alt={"zdjecie"} width={500} height={400} />
      <Link href={`/produkty/${product.slug}`}>Wiecej info</Link>
      <p>{product.name}</p>
      <p>{product.price}$</p>
      <p>{product.brand}</p>
      <p>{product.decription}</p>
      <button onClick={() => addToCart()}>Dodaj do koszyka</button>
    </div>
  );
};

export default Product;
