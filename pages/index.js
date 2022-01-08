/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import { Button, Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useAuth } from "../context/auth.context";

export default function Home({ products }) {
  const { userSession } = useAuth();
  return (
    <>
      <Head>
        <title>Strona główna</title>
        <meta name="description" content="blog" />
        <script src="https://js.stripe.com/v3"></script>
      </Head>

      <h1>Produkty</h1>
      {userSession?.role === "admin" ? (
        <Link href={"/produkty/dodaj"} passHref>
          <Button>Dodaj produkt</Button>
        </Link>
      ) : null}
      <section>
        <Container as={Row}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Container>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.NEXTAUTH_URL}/api/products`;
  const res = await fetch(url);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
