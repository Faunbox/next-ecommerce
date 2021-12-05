import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import data from "../utils/data";

export default function Home() {
  return (
    <>
      <Head>
        <title>Strona główna</title>
        <meta name="description" content="blog" />
      </Head>

      <main>
        <h1>Produkty</h1>
        <section>
          {data.products.map((product) => (
            <div key={product.name}>
              <Image
                src={product.image}
                alt={"zdjecie"}
                width={500}
                height={400}
              />
              <Link href={`/produkty/${product.slug}`}>Wiecej info</Link>
              <p>{product.name}</p>
              <p>{product.price}$</p>
              <p>{product.brand}</p>
              <p>{product.decription}</p>
              <button>Dodaj do koszyka</button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
