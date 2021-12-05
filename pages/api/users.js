import db from "../../db/db";
import { client } from "../../lib/mongodb";

async function getUsers(req, res) {
  db.connect();
  const users = await client.db("next").collection("users").find({}).toArray();
  res.status(200).json(users);
}

export default getUsers;
