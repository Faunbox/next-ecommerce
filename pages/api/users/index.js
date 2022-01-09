// import db from "../../db/db";
import clientPromise from "../../../db/mongodb";

export const getAllUsers = async () => {
  let query = (await clientPromise)
    .db(process.env.DB_NAME)
    .collection("users")
    .find({});
  return query.toArray();
};

const getUsers = async (req, res) => {
  let users;
  try {
    users = await getAllUsers();
    console.log("users", users);
  } finally {
    users
      ? res.status(200).json(users)
      : res
          .status(404)
          .json({ message: "Retriving data from database failed." });
  }
};

export default getUsers;
