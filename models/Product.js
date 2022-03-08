import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      imageID: { type: String, required: true },
    },

    price: { type: Number, required: true },
    brand: { type: String, required: true },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    stripe: {
      priceID: { type: String, required: true },
      productID: { type: String, required: true },
    },
  },
  { timestamps: true }
);


const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);


export default Product;
