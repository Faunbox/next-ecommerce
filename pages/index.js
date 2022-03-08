/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, Row, Pagination, PageItem } from "react-bootstrap";
import Product from "../components/Product";
import { useAuth } from "../context/auth.context";
import { paginatedProducts } from "../pages/api/products/pagination";

export default function Home({ paginatedItems, array }) {
  const { userSession } = useAuth();
  const [items, setItems] = useState(paginatedItems);
  const [actualPage, setActualPage] = useState(1);

  const fetchMoreItems = async (page) => {
    try {
      const data = await fetch("./api/products/pagination", {
        method: "PUT",
        body: page,
      });
      const resp = await data.json();
      setItems(resp.paginatedItems);
      setActualPage(page);
    } catch (error) {
      console.error("Błąd podczas pobierania przedmiotów -> ", error);
    }
  };

  const prevPage = async () => {
    const prevPage = actualPage - 1;
    if (prevPage < 1) return;
    await fetchMoreItems(prevPage);
  };

  const nextPage = async () => {
    const nextPage = actualPage + 1;
    const indexOfLastItem = array.length;

    if (nextPage > indexOfLastItem) return;
    await fetchMoreItems(nextPage);
  };

  const firstPage = async () => {
    await fetchMoreItems(1);
  };

  const lastPage = async () => {
    const indexOfLastItem = array.length;
    await fetchMoreItems(indexOfLastItem);
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
          <Pagination.First onClick={() => firstPage()} />
          <Pagination.Prev onClick={() => prevPage()} />
          {array.map((tak) => {
            return (
              <PageItem
                key={tak + 1}
                active={actualPage === tak + 1 ? true : false}
                onClick={(e) => fetchMoreItems(tak + 1, e.currentTarget)}
              >
                {tak + 1}
              </PageItem>
            );
          })}
          <Pagination.Next onClick={() => nextPage()} />
          <Pagination.Last onClick={() => lastPage()} />
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
