import db from "../../../db/db";
import Product from "../../../models/Product";

export const getOneProduct = async (slug) => {
  const product = slug.toString();
  let query;
  try {
    await db.connect();
    query = await Product.findOne({ slug: product });
  } catch (err) {
    console.error(err);
  } finally {
    await db.disconnect();
    return query;
  }
};

export default async function getProduct(req, res) {
  const { slug } = req.query;

  let product;
  try {
    product = await getOneProduct(slug);
  } finally {
    product
      ? res.status(200).json(product)
      : res
          .status(404)
          .json({ message: "Retriving data from database failed." });
  }
}
