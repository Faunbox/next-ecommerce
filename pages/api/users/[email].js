import clientPromise from "../../../db/mongodb";
import Stripe from "stripe";
import db from "../../../db/db";
import Product from "../../../models/Product";

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
    } catch (err) {
      res.status(400).send(err);
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
    let pucharsedItemsList;
    const email = req.body;
    try {
      //get all checkoutId from db
      const user = (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .findOne({ email: email });
      const { StripeHistory } = await user;
      if (!StripeHistory) return res.status(200).json([]);

      await db.connect();
      const getItemName = async (items) => {
        for (const item of items) {
          const res = await Product.findOne({ "stripe.productID": item.id });
          const { name, description } = res;
          return { name, description };
        }
      };
      const asyncArr = await Promise.all(
        StripeHistory.map(async (item) => {
          const { items } = item;
          try {
            const tak = await getItemName(items);
            const { name, description } = tak;
            if (items.length === 1) {
              Object.assign(items[0], { name, description });
              return item;
            } else {
              items.forEach((tak) => {
                Object.assign(tak, { name, description });
                return item;
              });
            }
          } catch (err) {
            res
              .status(400)
              .send("Błąd podczas pobierania nazw przedmiotów z db");
          }
        })
      );
      await db.disconnect();
      pucharsedItemsList = asyncArr;
    } catch (err) {
      res.status(400).json({
        message: "Błąd podczas pobierania histori zamówień",
        error: err,
      });
    } finally {
      return res.status(200).json(pucharsedItemsList);
    }
  }
}
