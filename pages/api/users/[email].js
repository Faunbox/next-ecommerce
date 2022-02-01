import clientPromise from "../../../db/mongodb";

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
    const stripe = require("stripe")(process.env.STRIPE_SECRET);
    const customerID = req.body;

    try {
      const paymentIntents = await stripe.paymentIntents.list({
        customer: customerID,
      });
      res.status(200).json(paymentIntents.data);
    } catch (err) {
      res.status(400).json({
        paymentHistory: "Błąd podczas pobierania histori zamówień",
        error: err,
      });
    }
  }
}
