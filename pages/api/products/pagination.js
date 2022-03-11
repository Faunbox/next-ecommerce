import db from "../../../db/db";
import Product from "../../../models/Product";

export const paginatedProducts = async (actualPage, filter = {}) => {
  const page = actualPage;
  const perPage = 1;

  if (actualPage > 0) {
    await db.connect();
    const paginatedItems = await Product.find(filter)
      .limit(perPage)
      .skip((page - 1) * perPage);

    const allItems = (await Product.find({ filter })).length;

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
  }
  if (actualPage === null) {
    console.log(filter);
    await db.connect();
    const searchedProduct = await Product.find({ name: filter });

    const allItems = (await Product.find({ name: filter })).length;

    return searchedProduct;
  }
};

const Pagination = async (req, res) => {
  const page = req.body;

  if (req.method === "PUT") {
    const products = await paginatedProducts(page);
    return res.status(200).json(products);
  }
};

export default Pagination;
