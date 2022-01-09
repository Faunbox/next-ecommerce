import clientPromise from "../../../db/mongodb";

export const getOneProduct = async (slug) => {
  const product = slug.toString();
  const query = (await clientPromise)
    .db(process.env.DB_NAME)
    .collection("products")
    .findOne({ slug: product });
  return query;
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
