import { Button, Col, Container, Grid, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";
import { useCard, ACTION } from "../../context/card.context";
import clientPromise from "../../db/mongodb";

const FinishingOrder = ({ sessionDetails, items }) => {
  const { dispatch } = useCard();
  const { address, name } = sessionDetails;
  const stripePostalCode = address.postal_code;
  const postalCode = !stripePostalCode.includes("-")
    ? stripePostalCode.slice(0, 2) + "-" + stripePostalCode.slice(2, 5)
    : stripePostalCode;

  const clearCardItems = () => {
    dispatch({
      type: ACTION.SET_STRIPE_PUCHARSED_ITEMS,
      payload: items,
    });
    dispatch({ type: ACTION.CLEAR_CARD_ITEMS });
  };

  useEffect(() => {
    clearCardItems();
  }, []);

  return (
    <Container justify="space-around">
      <Spacer y={1} />
      <Col>
        <Text h4>Thanks, {name}!</Text>
        <Text h5>Your shipping information: </Text>
        <Spacer y={1} />
      </Col>
      {address ? (
        <Grid.Container gap={1} justify="center">
          <Grid xs={12} sm={2} key={address.city}>
            <Text>City: {address.city}</Text>
          </Grid>
          <Grid xs={12} sm={2} key={address.line1}>
            <Text>Street: {`${address.line1} ${address.line2}`}</Text>
          </Grid>
          <Grid xs={12} sm={2} key={address.postalCode}>
            <Text>Postal code: {postalCode}</Text>
          </Grid>
        </Grid.Container>
      ) : (
        "No data"
      )}
      <Col>
        <Spacer y={1} />
        <Text h5>Your pucharsed items:</Text>
        <Spacer y={1} />
      </Col>
      {items ? (
        <Grid.Container justify="center" gap={1}>
          {items.map((item) => (
            <>
              <Grid>
                <Text>Name: {item.description}</Text>
              </Grid>
              <Grid>
                <Text>Quantity: {item.quantity}</Text>
              </Grid>
              <Grid>
                <Text>Price: {item.amount_total / 100}zł</Text>
              </Grid>
            </>
          ))}
        </Grid.Container>
      ) : (
        <Text>No data!</Text>
      )}
      <Spacer y={1} />
      <Link href={"/"} passHref>
        <Button css={{ mx: "auto" }}>Go to home page</Button>
      </Link>
    </Container>
  );
};

export default FinishingOrder;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET);

  //get stripe session id from slug
  const { query } = context;
  const id = query.id;

  //get info about stripe session
  const session = await stripe.checkout.sessions.retrieve(id);
  const customerId = await session.customer;
  const customerEmail = await session.customer_details.email;

  //send info about shipping to frond-end
  const retrivedSession = await session.shipping;
  const sessionDetails = retrivedSession;

  //get user from db and check stripe customer ID
  const user = (await clientPromise)
    .db(process.env.DB_NAME)
    .collection("users")
    .findOne({ email: customerEmail });

  const userInfo = await user;

  !userInfo.stripeID
    ? (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .updateOne({ email: customerEmail }, { $set: { stripeID: customerId } })
    : console.log("User had stripeId: ", userInfo.stripeID);

  //get pucharsed items from stripe and send it to frond-end
  const pucharsedItems = await stripe.checkout.sessions.listLineItems(id);
  const items = await pucharsedItems.data;

  return {
    props: {
      sessionDetails,
      items,
    },
  };
}
