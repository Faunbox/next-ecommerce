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
    <>
      <div>
        <h1>Thanks, {name}!</h1>
        <h2>Your shipping information: </h2>
        {address ? (
          <div key={address.city}>
            <p>City: {address.city}</p>
            <p>Street: {`${address.line1} ${address.line2}`}</p>
            <p>Postal code: {postalCode}</p>
          </div>
        ) : (
          "No data"
        )}
      </div>
      <div>
        <h1>Your pucharsed items</h1>
        {items ? (
          items.map((item) => (
            <div key={item.id}>
              <p>Name {item.description}</p>
              <p>Quantity {item.quantity}</p>
              <p>Price {item.amount_total / 100}zł</p>
            </div>
          ))
        ) : (
          <p>No data!</p>
        )}
      </div>
    </>
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
