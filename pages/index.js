/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Row, Pagination, PageItem } from "react-bootstrap";
import Product from "../components/Product";
import { useAuth } from "../context/auth.context";
import { paginatedProducts, searchItems } from "../pages/api/products/";

export default function Home({ paginatedItems, array, searchedItems }) {
  const { userSession } = useAuth();
  const [items, setItems] = useState(paginatedItems);
  const [actualPage, setActualPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const { page, search } = router.query;

  async function fetchMoreItems(pageToFetch) {
    const indexOfLastItem = array.length;
    if (page >= 1 && page <= indexOfLastItem) {
      try {
        const data = await fetch(`./api/products/?page=${pageToFetch}`);
        const resp = await data.json();
        setItems(resp.paginatedItems);
      } catch (error) {
        console.error("Błąd podczas pobierania przedmiotów -> ", error);
      } finally {
        setActualPage(page);
      }
    }
  }

  async function fetchSearchedItem(e) {
    e.preventDefault();
    try {
      const data = await fetch(`./api/products/?search=${search}`);
      const resp = await data.json();
      console.log(resp);
      setItems(resp);
    } catch (error) {
      console.error("Błąd podczas pobierania przedmiotów -> ", error);
    } finally {
      setActualPage(parseInt(page));
    }
  }

  useEffect(() => {
    return fetchMoreItems(page);
  }, [page]);

  const prevPage = () => {
    const prevPage = actualPage - 1;
    if (prevPage < 1) return;
    router.push(`?page=${prevPage}`);
  };

  const nextPage = () => {
    const nextPage = parseInt(actualPage) + 1;
    const indexOfLastItem = array.length;

    if (nextPage > indexOfLastItem) return;
    router.push(`?page=${nextPage}`);
  };

  const firstPage = () => {
    router.push("?page=1");
  };

  const lastPage = () => {
    const indexOfLastItem = array.length;
    router.push(`?page=${indexOfLastItem}`);
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
          <form
            onSubmit={(e) => {
              fetchSearchedItem(e);
            }}
          >
            Wyszukaj po nazwie
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <Button
              as={Link}
              href={{ query: { search: inputValue } }}
              type="submit"
            >
              Szukaj
            </Button>
          </form>
          {!searchedItems
            ? items.map((product) => (
                <Product key={product._id} product={product} />
              ))
            : searchedItems.map((product) => (
                <Product key={product._id} product={product} />
              ))}
        </Container>
      </section>
      <Container>
        <Pagination>
          <Pagination.First onClick={() => firstPage()} />
          <Pagination.Prev onClick={() => prevPage()} />
          {array.map((tak, index) => {
            return tak < 5 ? (
              <PageItem
                key={tak + 1}
                active={
                  parseInt(actualPage) === parseInt(tak + 1) ? true : false
                }
                onClick={(e) => router.push(`?page=${tak + 1}`)}
              >
                {tak + 1}
              </PageItem>
            ) : (
              <>
                <PageItem
                  key={tak + 1}
                  active={actualPage === tak + 1 ? true : false}
                  onClick={(e) => router.push(`?page=${tak + 1}`)}
                >
                  {tak + 1}
                </PageItem>
                <Pagination.Ellipsis key={parseInt(index + tak)} />
                <PageItem
                  key={parseInt(tak + 1 + tak)}
                  active={actualPage === tak + 1 ? true : false}
                  onClick={(e) => router.push(`?page=${tak + 1}`)}
                >
                  {array.length}
                </PageItem>
              </>
            );
          })}
          <Pagination.Next onClick={() => nextPage()} />
          <Pagination.Last onClick={() => lastPage()} />
          <input
            type="number"
            onChange={async (e) => {
              e.target.value > 0 && (await fetchMoreItems(e.target.value));
            }}
            placeholder="Wyszukaj po numerze"
          ></input>
        </Pagination>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { page, search } = context.query;

  const data = page
    ? JSON.stringify(await paginatedProducts(page))
    : JSON.stringify(await paginatedProducts(1));
  const products = JSON.parse(data);

  const searchedItems = search
    ? JSON.stringify(await searchItems(search))
    : null;

  const { paginatedItems, array } = products;

  return {
    props: {
      paginatedItems: paginatedItems,
      array: array,
      searchedItems: JSON.parse(searchedItems),
    },
  };
}
