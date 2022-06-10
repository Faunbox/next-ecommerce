/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dehydrate, useQuery } from "react-query";
import {
  Button,
  Container,
  Grid,
  Input,
  Modal,
  Spacer,
  Text,
} from "@nextui-org/react";

import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "../components/Product";
import { useAuth } from "../context/auth.context";
import { queryClient } from "./_app";
import { fetchAllItems } from "../lib/next-auth-react-query";
import { AnimatedLink } from "../components/DesktopMenu";

export async function getServerSideProps() {
  await queryClient.prefetchQuery("AllItems", fetchAllItems, {
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
  const { data } = useQuery("AllItems", fetchAllItems, { enabled: false });

  //Category modal
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  //Sorting Modal
  const [sortVisivle, setSortVisible] = useState(false);

  const modalCloseHandler = () => {
    setSortVisible(false);
  };

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
    if (category === "none")
      return (
        setItems(data),
        setNumbersOfItems(data.length),
        setActualItemsCount(numberOfNewItems)
      );
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
        <Grid.Container
          as="form"
          justify="center"
          gap={2}
          alignItems="center"
          onSubmit={() => {
            getSearchedItem();
          }}
        >
          <Grid>
            <Input
              type="text"
              size="md"
              id="Search"
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
          <Grid>
            <Button
              id="dropdown-basic-button"
              title="Categories"
              onClick={handler}
            >
              Categorys
            </Button>
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text id="modal-title" b h3>
                  Categories
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Grid.Container gap={2}>
                  <Grid>
                    <AnimatedLink>
                      <Link href={"/store?category=none"} passHref>
                        <a>
                          <Text
                            css={{ cursor: "pointer" }}
                            onClick={closeHandler}
                          >
                            Show all
                          </Text>
                        </a>
                      </Link>
                    </AnimatedLink>
                  </Grid>
                  {categorys?.map((category) => (
                    <Grid key={category}>
                      <AnimatedLink>
                        <Link
                          href={`/store?category=${category}`}
                          passHref
                          key={category}
                        >
                          <a>
                            <Text
                              css={{ cursor: "pointer" }}
                              onClick={closeHandler}
                            >
                              {category}
                            </Text>
                          </a>
                        </Link>
                      </AnimatedLink>
                    </Grid>
                  ))}
                </Grid.Container>
              </Modal.Body>
              <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Grid>
          <Grid>
            <Button
              id="dropdown-basic-button"
              title="Categories"
              onClick={() => setSortVisible(true)}
            >
              Sort
            </Button>
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={sortVisivle}
              onClose={() => setSortVisible(false)}
            >
              <Modal.Header>
                <Text id="modal-title" h3 b>
                  Sort by
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Grid.Container gap={2}>
                  <Grid>
                    <AnimatedLink>
                      <Text
                        onClick={() => {
                          setSortVisible(false);
                          setItems((prevState) =>
                            prevState.sort((a, b) =>
                              a.name.localeCompare(b.name)
                            )
                          );
                        }}
                      >
                        Name: A-Z
                      </Text>
                    </AnimatedLink>
                  </Grid>
                  <Grid>
                    <AnimatedLink>
                      <Text
                        onClick={() => {
                          setSortVisible(false);
                          setItems((prevState) =>
                            prevState.sort((a, b) =>
                              b.name.localeCompare(a.name)
                            )
                          );
                        }}
                      >
                        Z-A
                      </Text>
                    </AnimatedLink>
                  </Grid>
                  <Grid>
                    <AnimatedLink>
                      <Text
                        onClick={() => {
                          setSortVisible(false);
                          setItems((prevState) =>
                            prevState.sort((a, b) => {
                              return a.price - b.price;
                            })
                          );
                        }}
                      >
                        Low to high
                      </Text>
                    </AnimatedLink>
                  </Grid>
                  <Grid>
                    <AnimatedLink>
                      <Text
                        onClick={() => {
                          setSortVisible(false);
                          setItems((prevState) =>
                            prevState.sort((a, b) => {
                              return b.price - a.price;
                            })
                          );
                        }}
                      >
                        High to low
                      </Text>
                    </AnimatedLink>
                  </Grid>
                </Grid.Container>
              </Modal.Body>
              <Modal.Footer>
                <Button auto flat color="error" onClick={modalCloseHandler}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Grid>
        </Grid.Container>

        <Container>
          <AnimatePresence>
            <Grid.Container gap={2} justify="center">
              {items.slice(0, actualItemsCount).map((item) => (
                <motion.div
                  // animate={{ opacity: 1}}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={item._id}
                >
                  <ProductCard product={item} />
                </motion.div>
              ))}
            </Grid.Container>
          </AnimatePresence>
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
      </Container>
    </>
  );
}
