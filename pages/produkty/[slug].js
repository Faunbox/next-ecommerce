import { useRouter } from "next/router";
import data from "../../utils/data";

const ProductScreen = () => {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);

  if (!product) {
    return <div>Produkt nie został znaleziony</div>;
  }

  return (
    <div>
      <button onClick={() => router.back()}>Wróć</button>
      <h1>{product.name}</h1>
      <p>{product.decription}</p>
    </div>
  );
};

export default ProductScreen;
