import clientPromise from "../../../db/mongodb";
import Stripe from "stripe";

export const getSingleUser = async (email) => {
  const query = (await clientPromise)
    .db(process.env.DB_NAME)
    .collection("users")
    .findOne({ email: email });
  return query;
};

export default async function getUser(req, res) {
  const { email } = req.query;

  let user;
  if (req.method === "GET") {
    try {
      user = await getSingleUser(email);
    } finally {
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: "Retriving data from database failed." });
    }
    return;
  }
  if (req.method === "POST") {
    const email = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: "2020-08-27",
    });
    try {
      let pucharsedItemsList = [];

      //get all checkoutId from db
      const history = (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .findOne({ email: email });
      const { StripeHistory } = await history;

      if (!StripeHistory) return res.status(200).json(pucharsedItemsList);

      for (const checkoutId of StripeHistory) {
        await stripe.checkout.sessions.listLineItems(
          checkoutId,
          function (err, lineItems) {
            if (err) {
              throw new Error(
                "Błąd podczas pobierania list przedmiotów ze Stripe",
                err
              );
            }
            pucharsedItemsList.push(lineItems.data);
          }
        );
        pucharsedItemsList.forEach(async (item) => {
          console.log(item);
          // const quantity = item.quantity;
          // const priceObj = item.price;
          // const { unit_amount, product } = priceObj;
          // const stripeProduct = await stripe.products.retrieve(product);
          // const { name, images } = stripeProduct;
          // console.log(
          //   "PRODUKT: ",
          //   name,
          //   images,
          //   (unit_amount * quantity) / 100
          // );
        });
      }
      return res.status(200).json(pucharsedItemsList);
    } catch (err) {
      res.status(400).json({
        message: "Błąd podczas pobierania histori zamówień",
        error: err,
      });
    }
  }
}
