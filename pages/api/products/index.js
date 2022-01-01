import db from "../../../db/db";
import Product from "../../../models/Product";

const getAllProducts = async (req, res) => {
  console.log(req.method);
  await db.connect();
  const products = await Product.find({});
  db.disconnect();
  products
    ? res.status(200).json(products)
    : res.status(404).json({ message: "brak produktów" });
};

export default getAllProducts;
