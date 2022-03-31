/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { dehydrate, useQuery } from "react-query";
import {
  Button,
  Container,
  Grid,
  Input,
  Progress,
  Spacer,
  Text,
} from "@nextui-org/react";

import ProductCard from "../components/Product";
import { useAuth } from "../context/auth.context";
import { queryClient } from "./_app";
import { StyledWrapper } from "../styles/styled_home";
import {
  StyledAddItemButton,
  StyledStoreForm,
  StyledDropdownButton,
} from "../styles/styled_store";

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

  //number of items per one load
  const numberOfNewItems = 4;

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [categorys, setCategorys] = useState([]);
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

  ////////// use memo
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
    setActualItemsCount(numberOfNewItems);
    getAllCategorys();
  }, []);

  useEffect(() => {
    return search ? getSearchedItem() : emptyInputValue();
  }, [search]);

  useEffect(() => {
    return category && getCategoriedItems();
  }, [category]);

  return (
    <>
      <Head>
        <title>Strona główna</title>
        <meta name="description" content="blog" />
      </Head>
      <Script src="https://js.stripe.com/v3"></Script>
      <Container justify="center">
        <Text h2>Products</Text>
        {userSession?.role === "admin" ? (
          <>
            <Spacer y={1} />
            <Link href={"/produkty/dodaj"} passHref>
              <Button css={{ mx: "auto" }}>Add new product</Button>
            </Link>
            <Spacer y={1} />
          </>
        ) : null}
        <Grid.Container justify="center" gap={2}>
          <StyledStoreForm
            onSubmit={() => {
              getSearchedItem();
            }}
          >
            <Grid>
              <Input
                type="text"
                size="md"
                width="auto"
                aria-label="Search"
                placeholder="Search by name"
                onChange={(e) => setInputValue(e.target.value)}
              ></Input>
            </Grid>
            <Grid>
              <Text
                as={Link}
                href={{ query: { search: inputValue } }}
                type="submit"
              >
                Search
              </Text>
            </Grid>
          </StyledStoreForm>
          <StyledDropdownButton id="dropdown-basic-button" title="Categories">
            <Link href={"/store"} passHref>
              <Dropdown.Item>Show all</Dropdown.Item>
            </Link>
            {categorys?.map((category) => (
              <Link
                href={`/store?category=${category}`}
                passHref
                key={category}
              >
                <Dropdown.Item>{category}</Dropdown.Item>
              </Link>
            ))}
          </StyledDropdownButton>
        </Grid.Container>

        <Container>
          <Grid.Container gap={2} justify="center">
            {items.slice(0, actualItemsCount).map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </Grid.Container>
          <Spacer y={1} />
        </Container>
        <Spacer y={1} />
        <Button
          disabled={actualItemsCount >= numbersOfItems ? true : false}
          onClick={() => showMoreItems()}
          css={{ mx: "auto" }}
        >
          Show more items {actualItemsCount} of {numbersOfItems}
        </Button>
        <Spacer y={1} />
      </Container>
    </>
  );
}
