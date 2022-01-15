/* eslint-disable import/no-anonymous-default-export */
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const YOUR_DOMAIN = process.env.NEXTAUTH_URL;

export default async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((item) => ({
    price: item.stripe.priceID,
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
      maximum: item.countInStock,
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["PL"],
    },
    payment_method_types: ["card", "p24"],
    success_url: `${YOUR_DOMAIN}/podsumowanie`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.status(200).json(session);
};
