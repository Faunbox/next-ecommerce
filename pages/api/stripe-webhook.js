import Stripe from "stripe";
import { buffer } from "micro";
import db from "../../db/db";
import Product from "../../models/Product";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27",
  });
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  const changeItemsQuanityInDb = async (pucharsedItems) => {
    await db.connect();
    pucharsedItems.forEach(async (item) => {
      await Product.findOneAndUpdate(
        { "stripe.productID": item.id },
        { $inc: { countInStock: -item.quantity } }
      );
    });
    await db.disconnect();
  };

  let event;
  let items;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      endpointSecret
    );

    const stripeItems = await stripe.checkout.sessions.listLineItems(
      event.data.object.id
    );
    items = await stripeItems.data.map((item) => ({
      id: item.price.product,
      quantity: item.quantity,
    }));

    const paymentIntent = await stripe.paymentIntents.create({
      metadata: {
        items: items,
      },
    });

    console.log(paymentIntent);

    await changeItemsQuanityInDb(items);

    res.status(200).send({ listItems });
    return;
  } catch (error) {
    res.status(400).send({ message: `Webhook error: ${error.message}` });
    return;
  }
}
