/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button, Container, Row, Pagination } from "react-bootstrap";
import Product from "../components/Product";
import { useAuth } from "../context/auth.context";
import { paginatedProducts } from "../pages/api/products/pagination";

export default function Home({ paginatedItems, array }) {
  const { userSession } = useAuth();
  const [items, setItems] = useState(paginatedItems);

  const fetchMoreItems = async (page) => {
    try {
      const data = await fetch("./api/products/pagination", {
        method: "PUT",
        body: page,
      });
      const resp = await data.json();
      setItems(resp.paginatedItems);
    } catch (error) {
      console.error("Błąd podczas pobierania przedmiotów -> ", error);
    } finally {
      console.log(items);
    }
  };

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
          {items.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Container>
      </section>
      <Container>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {array.map((tak) => {
            return (
              <Pagination.Item
                key={tak + 1}
                onClick={() => fetchMoreItems(tak + 1)}
              >
                {tak + 1}
              </Pagination.Item>
            );
          })}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const data = JSON.stringify(await paginatedProducts(1));
  const products = JSON.parse(data);

  const { paginatedItems, array } = products;

  return {
    props: {
      paginatedItems,
      array,
    },
    revalidate: 1,
  };
}
