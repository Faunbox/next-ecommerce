import db from "../../../db/db";
import Product from "../../../models/Product";

export const paginatedProducts = async (actualPage) => {
  const page = actualPage;
  const perPage = 1;

  await db.connect();
  const paginatedItems = await Product.find({})
    .limit(perPage)
    .skip((page - 1) * perPage);

  const allItems = (await Product.find({})).length;

  const pages = Math.ceil(allItems / perPage);
  let array = [];
  for (let i = 0; i < pages; i++) {
    array.push(i);
  }
  const pagination = {
    paginatedItems,
    array,
  };
  return pagination;
};

const Pagination = async (req, res) => {
  const page = req.body;

  if (req.method === "PUT") {
    const products = await paginatedProducts(page);
    return res.status(200).json(products);
  }
};

export default Pagination;
