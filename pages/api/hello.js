import db from "../../db/db";

export default async function hanlder(req, res) {
  await db.connect();
  await db.disconnect();
  res.status(200).json({ isWorking: "true" });
}
