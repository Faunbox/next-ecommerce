import Stripe from "stripe";
import { buffer } from "micro";
import db from "../../db/db";
import clientPromise from "../../db/mongodb";
import Product from "../../models/Product";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27",
  });
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  let event;
  let items;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      endpointSecret
    );

    //get customerId and checkoutId from event object
    const customerId = event.data.object.customer;
    const checkoutId = event.data.object.id;

    //get customer object and get email address
    const customer = await stripe.customers.retrieve(customerId);
    const email = customer.email;

    //list all pucharsed items from checkout session and map to get id and quantity
    const stripeItems = await stripe.checkout.sessions.listLineItems(
      checkoutId
    );
    items = stripeItems.data.map((item) => ({
      id: item.price.product,
      quantity: item.quantity,
    }));

    //update item quantity
    await db.connect();
    items.map(async (item) => {
      await Product.updateOne(
        { "stripe.productID": item.id },
        { $inc: { countInStock: -item.quantity } }
      );
    });

    //add checkoutId to user db
    (await clientPromise)
      .db(process.env.DB_NAME)
      .collection("users")
      .updateOne(
        { email: email },
        { $addToSet: { StripeHistory: checkoutId } }
      );
    await db.disconnect();
    res.status(200).send({ listItems });
    return;
  } catch (error) {
    res.status(400).send({ message: `Webhook error: ${error.message}` });
    return;
  }
}
