import db from "../../../db/db";
import Product from "../../../models/Product";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const cloudinary = require("cloudinary").v2;

export const getAllProducts = async () => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  return products;
};

export const searchItems = async (query) => {
  let items;
  try {
    await db.connect();
    items = await Product.find({ name: { $regex: `${query}` } });
  } catch (err) {
    console.error("Błąd -> ", err);
  } finally {
    await db.disconnect();
    console.log(items);
    return items;
  }
};

export const categoryItems = async (query) => {
  let items;
  try {
    await db.connect();
    items = await Product.find({ category: query });
  } catch (err) {
    console.error("Błąd podczas wyszukiwania po kategorii");
  } finally {
    await db.disconnect();
    return items;
  }
};

export const paginatedProducts = async (page) => {
  const perPage = 2;
  let pagination;
  try {
    if (page > 0) {
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
      pagination = {
        paginatedItems,
        array,
      };
    }
  } catch (err) {
    console.error("Błąd podczas pobierania strony");
  } finally {
    await db.disconnect();
    return pagination;
  }
};

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
    oldImageID,
    productID,
    slug,
    id,
  } = req.body;

  const { page, search, kategoria } = req.query;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const sendAllProducts = async () => {
    const products = await getAllProducts();
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
      error ? console.error("Błąd podczas usuwania zdjęcia", error) : console.log(result)
    });

    //delete item from db
    await db.connect();
    await Product.deleteOne({ _id: id });
    await db.disconnect();
  };

  const editProduct = async () => {
    if (oldImageID) {
      cloudinary.uploader.destroy(oldImageID, function (error, result) {
        !error ? console.log("result", result) : console.error(error);
      });
      await stripe.products.update(productID, { images: [url] });
    }
    await db.connect();
    const item = await Product.findOneAndUpdate(
      { _id: id },
      {
        description: description,
        slug: slug,
        name: name,
        category: category,
        image: { url, imageID },
        price,
        brand,
        countInStock,
      }
    );
    await db.disconnect();
  };

  switch (req.method) {
    case "GET": {
      if (page) {
        try {
          const items = await paginatedProducts(page);
          return res.status(200).json(items);
        } catch (error) {
          res
            .status(400)
            .json({ message: "Błąd podczas pobierania produktów", error });
        }
      }
      if (search) {
        try {
          const items = await searchItems(search);
          return res.status(200).json(items);
        } catch (error) {
          res
            .status(400)
            .json({ message: "Błąd podczas pobierania produktów", error });
        }
      }
      if (kategoria) {
        try {
          const items = await categoryItems(kategoria);
          return res.status(200).json(items);
        } catch (err) {
          return res.status(400).json({
            message: "Błąd podczas wyszukiwania po kategoriach, ",
            err,
          });
        }
      }
      break;
    }
    case "POST": {
      try {
        console.log("Metoda POST w products");
        addProduct();
        return res.status(200).json({ message: "Produkt został dodany" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Błąd podczas dodawania produktu", error });
      }
      break;
    }
    case "DELETE": {
      try {
        console.log("Metoda DELETE w products");
        deleteProduct();
        return res.status(200).json({ message: "Produkt został usunięty" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Wystąpił błąd podczas usuwania produktu" });
      }
      break;
    }
    case "PATCH": {
      try {
        console.log("Metoda PATCH w products");
        editProduct();
        return res.status(200).json({ message: "Produkt został zmieniony" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Wystąpił błąd podczas edycji produktu" });
      }
    }
  }
};

export default Products;
