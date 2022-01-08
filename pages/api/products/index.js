import db from "../../../db/db";
import Product from "../../../models/Product";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const cloudinary = require("cloudinary").v2;
import { getCloudinarySignature } from "../../produkty/dodaj";

const Products = async (req, res) => {
  //descructure request body
  const {
    name,
    category,
    url,
    imageID,
    price,
    brand,
    countInStock,
    description,
    slug,
  } = req.body;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const getAllProducts = async () => {
    db.connect();
    const products = await Product.find({});
    db.disconnect();
    products
      ? res.status(200).json(products)
      : res.status(404).json({ message: "brak produktów" });
  };

  const addProductToStripe = async () => {
    const product = await stripe.products.create({
      name,
      description,
      images: [url],
      metadata: {
        category,
        brand,
      },
    });
    const productID = await product.id;
    const priceInGrosz = price * 100;
    const stripePrice = await stripe.prices.create({
      product: productID,
      currency: "pln",
      billing_scheme: "per_unit",
      unit_amount: priceInGrosz,
    });

    const priceID = await stripePrice.id;
    return { priceID, productID };
  };

  const addProduct = async () => {
    //getting product and price from stripe
    const { priceID, productID } = await addProductToStripe();
    const product = new Product({
      name,
      category,
      image: { url, imageID },
      price,
      brand,
      countInStock,
      description,
      slug,
      stripe: { priceID, productID },
    });
    //adding product to db
    await db.connect();
    await product.save();
    await db.disconnect();
    console.log("product", product);
    res.status(200).json({ message: "Produkt został dodany" });
  };

  const deleteProduct = async () => {
    const { id, priceID, productID, imageID } = req.body;

    //archieve stripe price and product
    await stripe.prices.update(priceID, {
      active: false,
    });
    await stripe.products.update(productID, {
      active: false,
    });

    //Delete image from cloudinary
    cloudinary.uploader.destroy(imageID, function (error, result) {
      console.log(result);
    });

    //delete item from db
    await db.connect();
    const deletedProduct = await Product.deleteOne({ _id: id });
    console.log(deletedProduct);
    await db.disconnect();
    res.status(200).json({ message: "Produkt został usunięty" });
  };

  switch (req.method) {
    case "GET": {
      try {
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
