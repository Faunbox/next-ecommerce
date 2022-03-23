/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Row, DropdownButton } from "react-bootstrap";
import ProductCard from "../components/Product";
import { useAuth } from "../context/auth.context";
import { queryClient } from "./_app";
import { dehydrate, useQuery } from "react-query";

const fetchAllProducts = async () => {
  const items = await fetch(`${process.env.NEXTAUTH_URL}/api/products`);
  return items.json();
};

export async function getServerSideProps() {
  await queryClient.prefetchQuery("AllItems", fetchAllProducts, {
    enabled: false,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { userSession } = useAuth();
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //amout of items per one load
  const numberOfNewItems = 4;

  const [actualItemsCount, setActualItemsCount] = useState(numberOfNewItems);
  const [numbersOfItems, setNumbersOfItems] = useState(items.length);
  const router = useRouter();

  //possible queries
  const { search, kategoria } = router.query;

  //get data from ssr prefetch
  const { data } = useQuery("AllItems", fetchAllProducts, { enabled: false });

  const getSearchedItem = () => {
    const i = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    i.length > numberOfNewItems
      ? setActualItemsCount(numberOfNewItems)
      : setActualItemsCount(i.length);
    inputValue ? setItems(i) : setItems(data);
    setNumbersOfItems(i.length);
  };

  const showMoreItems = () => {
    if (actualItemsCount <= numbersOfItems) {
      setActualItemsCount((prevState) => prevState + numberOfNewItems);
    }
    if (actualItemsCount + numberOfNewItems > numbersOfItems)
      return setActualItemsCount(numbersOfItems);
  };

  const emptyInputValue = () => {
    setItems(data);
    setNumbersOfItems(data.length);
    setActualItemsCount(numberOfNewItems);
  };

  useEffect(() => {
    setItems(data);
    setNumbersOfItems(data.length);
  }, []);

  useEffect(() => {
    return search ? getSearchedItem() : emptyInputValue();
  }, [search]);

  useEffect(() => {
    return kategoria ? getCategoriedItems(kategoria) : null;
  }, [kategoria]);

  return (
    <>
      <Head>
        <title>Strona główna</title>
        <meta name="description" content="blog" />
      </Head>
      <Script src="https://js.stripe.com/v3"></Script>

      <h1>Produkty</h1>
      {userSession?.role === "admin" ? (
        <Link href={"/produkty/dodaj"} passHref>
          <Button>Dodaj produkt</Button>
        </Link>
      ) : null}

      <Container as={Row}>
        <form
          onSubmit={(e) => {
            getSearchedItem(e);
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
          <DropdownButton
            id="dropdown-basic-button"
            title="Kategorie"
          ></DropdownButton>
        </form>
      </Container>
      <Container>
        {items.slice(0, actualItemsCount).map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
        <Button
          disabled={actualItemsCount >= numbersOfItems ? true : false}
          onClick={() => showMoreItems()}
        >
          Show more items {actualItemsCount} of {numbersOfItems}
        </Button>
      </Container>
    </>
  );
}
