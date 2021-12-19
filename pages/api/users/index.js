// import db from "../../db/db";
import clientPromise from "../../../db/mongodb";

const getUsers = async (req, res) => {
  let users;
  try {
    let query = (await clientPromise).db("test").collection("users").find({});
    users = await query.toArray();
  } finally {
    users
      ? res.status(200).json(users)
      : res
          .status(404)
          .json({ message: "Retriving data from database failed." });
  }
};

export default getUsers;
