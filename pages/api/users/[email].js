import clientPromise from "../../../db/mongodb";

const getUsers = async (req, res) => {
  const { email } = req.query;

  let user;
  try {
    let query = (await clientPromise)
      .db(process.env.DB_NAME)
      .collection("users")
      .findOne({ email: email });
    user = await query;
  } finally {
    user
      ? res.status(200).json(user)
      : res
          .status(404)
          .json({ message: "Retriving data from database failed." });
  }
};

export default getUsers;
