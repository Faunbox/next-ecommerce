import Head from "next/head";
import Product from "../components/Product";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Strona główna</title>
        <meta name="description" content="blog" />
      </Head>

      <main>
        <h1>Produkty</h1>
        <section>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const url = `${process.env.NEXTAUTH_URL}/api/products`;
  const res = await fetch(url);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
