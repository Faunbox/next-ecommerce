import db from "../../db/db";
// import Product from "../../models/Product";
// import data from "../../utils/data";

export default async function hanlder(req, res) {
  await db.connect();
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  await db.disconnect();
  res.status(200).json({ isWorking: "true" });
}
