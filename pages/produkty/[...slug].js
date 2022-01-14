import { signIn, useSession } from "next-auth/react";
import { getOneProduct } from "../api/products/[slug]";
import { Button } from "react-bootstrap";
import { useCard, ACTION } from "../../context/card.context";
import { useAuth } from "../../context/auth.context";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";

const ProductScreen = ({ product }) => {
  const { dispatch, state } = useCard();
  const { userSession } = useAuth();
  const router = useRouter();

  const addToCart = async () => {
    //check is user logged in
    if (!userSession) {
      alert("Aby dodawać przedmioty do koszyka, zaloguj się");
      return signIn();
    }

    const data = await fetch(`/api/products/${product.slug}`);
    const selectedProduct = await data.json();

    const existItem = state.cart.cartItems.find(
      (item) => item._id === selectedProduct._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (selectedProduct.countInStock < quantity) {
      alert("Brak na stanie!");
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
      body: JSON.stringify({
        id,
        priceID,
        productID,
        imageID: product.image.imageID,
      }),
    }).then((res) => alert(res.json().message));
    router.push("/");
  };

  if (!product) {
    return (
      <>
        <div>Produkt nie został znaleziony</div>{" "}
        <Button variant="secondary" onClick={() => router.back()}>
          Wróć
        </Button>
      </>
    );
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => router.back()}>
        Wróć
      </Button>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Image
        src={product?.image.url}
        alt={product.name}
        width={300}
        height={300}
      />
      <br />
      <Button variant="success" onClick={() => addToCart(product)}>
        Dodaj do koszyka
      </Button>
      {userSession?.role === "admin" && (
        <Button
          variant="danger"
          onClick={() =>
            deleteProduct(
              product._id,
              product.stripe.priceID,
              product.stripe.productID
            )
          }
        >
          Usuń produkt
        </Button>
      )}
    </div>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;

  const data = JSON.stringify(await getOneProduct(slug));
  const product = JSON.parse(data);

  return {
    props: {
      product,
    },
  };
}
