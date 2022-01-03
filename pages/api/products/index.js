import db from "../../../db/db";
import Product from "../../../models/Product";

const Products = async (req, res) => {
  const getAllProducts = async () => {
    db.connect();
    const products = await Product.find({});
    db.disconnect();
    products
      ? res.status(200).json(products)
      : res.status(404).json({ message: "brak produktów" });
  };

  const addProduct = async () => {
    const { name, category, price, brand, countInStock, decription, slug } =
      req.body;
    const product = new Product({
      name,
      category,
      price,
      brand,
      countInStock,
      decription,
      slug,
    });
    await db.connect();
    await product.save();
    await db.disconnect();
    console.log(product);
    res.status(200).json({ message: "Produkt został dodany" });
  };

  const deleteProduct = async () => {
    const { id } = req.body;
    await db.connect();
    const deletedProduct = await Product.deleteOne({ _id: id });
    console.log(deletedProduct);
    await db.disconnect();
    res.status(200).json({ message: "Produkt został usunięty" });
  };

  switch (req.method) {
    case "GET": {
      try {
        console.log("Metoda GET w products");
        getAllProducts();
      } catch (error) {
        res
          .status(404)
          .json({ message: "Błąd podczas pobierania produktów", error });
      }
      break;
    }
    case "POST": {
      try {
        console.log("Metoda POST w products");
        addProduct();
      } catch (error) {
        res
          .status(404)
          .json({ message: "Błąd podczas dodawania produktu", error });
      }
      break;
    }
    case "DELETE": {
      try {
        console.log("Metoda DELETE w products");
        deleteProduct();
      } catch (error) {
        res
          .status(404)
          .json({ message: "Wystąpił błąd podczas usuwania produktu" });
      }
    }
  }
};

export default Products;
