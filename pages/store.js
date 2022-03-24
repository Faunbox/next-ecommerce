/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, DropdownButton, Dropdown } from "react-bootstrap";
import ProductCard from "../components/Product";
import { useAuth } from "../context/auth.context";
import { queryClient } from "./_app";
import { dehydrate, useQuery } from "react-query";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (min-width: 413px) {
    flex-direction: row;
  }
`;

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
  const [categorys, setCategorys] = useState([]);

  //amout of items per one load
  const numberOfNewItems = 4;

  const [actualItemsCount, setActualItemsCount] = useState(numberOfNewItems);
  const [numbersOfItems, setNumbersOfItems] = useState(items.length);
  const router = useRouter();

  //possible queries
  const { search, category } = router.query;

  //get data from ssr prefetch
  const { data } = useQuery("AllItems", fetchAllProducts, { enabled: false });

  const getSearchedItem = () => {
    const i = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    i.length > numberOfNewItems
      ? setActualItemsCount(numberOfNewItems)
      : setActualItemsCount(i.length);
    search ? setItems(i) : setItems(data);
    setNumbersOfItems(i.length);
  };

  const getCategoriedItems = () => {
    const i = data.filter((item) =>
      item.category.toLowerCase().includes(category.toLowerCase())
    );
    i.length > numberOfNewItems
      ? setActualItemsCount(numberOfNewItems)
      : setActualItemsCount(i.length);
    category ? setItems(i) : setItems(data);
    setNumbersOfItems(i.length);
  };

  const showMoreItems = () => {
    if (actualItemsCount <= numbersOfItems) {
      setActualItemsCount((prevState) => prevState + numberOfNewItems);
    }
    if (actualItemsCount + numberOfNewItems > numbersOfItems)
      return setActualItemsCount(numbersOfItems);
  };

  const getAllCategorys = () => {
    let categoryArray = [];
    data?.map((item) => {
      categoryArray.push(item.category);
    });
    setCategorys([...new Set(categoryArray)]);
  };

  const emptyInputValue = () => {
    setItems(data);
    setNumbersOfItems(data.length);
    setActualItemsCount(numberOfNewItems);
  };

  useEffect(() => {
    setItems(data);
    setNumbersOfItems(data.length);
    getAllCategorys();
  }, []);

  useEffect(() => {
    return search ? getSearchedItem() : emptyInputValue();
  }, [search]);

  useEffect(() => {
    return category ? getCategoriedItems() : null;
  }, [category]);

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

      <StyledContainer>
        <form
          onSubmit={() => {
            getSearchedItem();
          }}
        >
          <input
            type="text"
            placeholder="Wyszukaj po nazwie"
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <Button
            as={Link}
            href={{ query: { search: inputValue } }}
            type="submit"
          >
            Szukaj
          </Button>
          <DropdownButton id="dropdown-basic-button" title="Kategorie">
            <Dropdown.Item href="/store">Show all</Dropdown.Item>
            {categorys?.map((category) => (
              <Dropdown.Item
                href={`/store?category=${category}`}
                key={category}
              >
                {category}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </form>
      </StyledContainer>
      <StyledContainer>
        {items.slice(0, actualItemsCount).map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </StyledContainer>
      <Button
        disabled={actualItemsCount >= numbersOfItems ? true : false}
        onClick={() => showMoreItems()}
      >
        Show more items {actualItemsCount} of {numbersOfItems}
      </Button>
    </>
  );
}
