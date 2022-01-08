import db from "../../db/db";
import Product from "../../models/Product";
// import data from "../../utils/data";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function hanlder(req, res) {
  // SEED PRODUCT DATA
  //
  // await db.connect();
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  // await db.disconnect();

  //
  // STRIPE TEST
  //
  // const { name, description, image, category, brand, price } = req.body;

  // const product = await stripe.products.create({
  //   name,
  //   description,
  //   images: [image],
  //   metadata: {
  //     category,
  //     brand,
  //   },
  // });
  // const productID = await product.id;
  // const priceInGrosz = price * 100;
  // const stripePrice = await stripe.prices.create({
  //   product: productID,
  //   currency: "pln",
  //   billing_scheme: "per_unit",
  //   unit_amount: priceInGrosz,
  // });

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
    return priceID, productID;
  };

  const addProduct = async () => {
    const { priceID, productID } = await addProductToStripe();
    const product = new Product({
      name,
      category,
      image: [url, imageID],
      price,
      brand,
      countInStock,
      description,
      slug,
      stripe: [priceID, productID],
    });
    await db.connect();
    await product.save();
    await db.disconnect();
    console.log("product", product);
    res.status(200).json({ message: "Produkt został dodany" });
  };


    switch (req.method) {
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
    }

    await db.connect();
    await product.save();
    await db.disconnect();
    console.log("product", product);
    res.status(200).json({ message: "Produkt został dodany" });
  };
