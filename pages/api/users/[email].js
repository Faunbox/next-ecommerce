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
  let pucharsedItemsList = [];
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
      const history = (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .findOne({ email: email });
      const { StripeHistory } = await history;

      for (const checkoutId of StripeHistory) {
        await stripe.checkout.sessions.listLineItems(
          checkoutId,
          function (err, lineItems) {
            if (err) {
              throw new Error(
                "Błąd podczas pobierania list przedmiotów ze Stripe"
              );
            }
            pucharsedItemsList.push(lineItems.data);
          }
        );
      }

      console.log(pucharsedItemsList);

      // if (!StripeHistory) {
      //   return res.status(200).json("Brak historii");
      // }
      res.status(200).json(StripeHistory);
    } catch (err) {
      res.status(400).json({
        message: "Błąd podczas pobierania histori zamówień",
        error: err,
      });
    }
  }
}
