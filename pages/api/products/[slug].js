import clientPromise from "../../../db/mongodb";

const getProduct = async (req, res) => {
  const { slug } = req.query;

  let product;
  try {
    let query = (await clientPromise)
      .db(process.env.DB_NAME)
      .collection("products")
      .findOne({ slug: slug });
    product = await query;
  } finally {
    product
      ? res.status(200).json(product)
      : res
          .status(404)
          .json({ message: "Retriving data from database failed." });
  }
};

export default getProduct;
