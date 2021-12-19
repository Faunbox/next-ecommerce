import Image from "next/image";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <div key={product.name}>
      <Image src={product.image} alt={"zdjecie"} width={500} height={400} />
      <Link href={`/produkty/${product.slug}`}>Wiecej info</Link>
      <p>{product.name}</p>
      <p>{product.price}$</p>
      <p>{product.brand}</p>
      <p>{product.decription}</p>
      <button>Dodaj do koszyka</button>
    </div>
  );
};

export default Product;
