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
    const email = req.body;
    try {
      const history = (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .findOne({ email: email });
      console.log(await history);
      res.status(200).json(history);
    } catch (err) {
      res.status(400).json({
        paymentHistory: "Błąd podczas pobierania histori zamówień",
        error: err,
      });
    }
  }
}
