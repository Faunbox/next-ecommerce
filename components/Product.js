import Image from "next/image";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <div key={product.name}>
      <Image src={product.image} alt={"zdjecie"} width={500} height={400} />
      <p>{product.name}</p>
      <p>{product.price}$</p>
      <p>{product.brand}</p>
      <p>{product?._id}</p>
      <p>{product.decription}</p>
      <Link href={`/produkty/${product.slug}`}>Wiecej info</Link>
    </div>
  );
};

export default Product;
