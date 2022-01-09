/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import { Button, Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useAuth } from "../context/auth.context";
import { getAllProducts } from "./api/products/index";

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
  const data = JSON.stringify(await getAllProducts());
  const products = JSON.parse(data);

  return {
    props: {
      products,
    },
  };
}
