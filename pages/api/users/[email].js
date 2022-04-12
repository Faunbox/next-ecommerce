import clientPromise from "../../../db/mongodb";
import db from "../../../db/db";
import Product from "../../../models/Product";

export const getSingleUser = async (email) => {
  let query;
  try {
    query = (await clientPromise)
      .db(process.env.DB_NAME)
      .collection("users")
      .findOne({ email: email });
  } catch (err) {
    console.error(err);
  } finally {
    return query;
  }
};

const getItemNameFromStripe = async (items) => {
  for (const item of items) {
    const res = await Product.findOne({ "stripe.productID": item.id });

    ////////////Dopisac obrazek
    const { name, description } = await res;
    return { name, description };
  }
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

      await Promise.all(
        StripeHistory.map(async (item) => {
          const { items } = item;
          try {
            const { name, description } = await getItemNameFromStripe(items);
            items.map((item, index) => {
              Object.assign(items[index], { name, description });
            });
            return items;
          } catch (err) {
            console.error(err);
          }
        })
      );
      pucharsedItemsList = StripeHistory;
      await db.disconnect();
    } catch (err) {
      res.status(400).json({
        message: "Błąd podczas pobierania histori zamówień",
        error: err,
      });
    } finally {
      res.status(200).json(pucharsedItemsList);
    }
  }
}
