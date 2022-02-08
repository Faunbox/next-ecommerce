import Stripe from "stripe";
import { buffer } from "micro";
import db from "../../db/db";
import Product from "../../models/Product";
import clientPromise from "../../db/mongodb";

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
      console.log("item", item);
      const taa = await Product.updateOne(
        { "stripe.productID": item.id },
        { $inc: { countInStock: -item.quantity } }
      );
      console.log("taa", taa);
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

    const customerId = event.data.object.customer;
    const checkoutId = event.data.object.id;

    const customer = await stripe.customers.retrieve(customerId);
    // await stripe.customers.update(event.data.object.customer, {
    //   metadata: {},
    // });
    // const metadata = customer.metadata;
    // const metadataLength = [metadata].length;
    // await stripe.customers.update(event.data.object.customer, {
    //   metadata: { metadataLength: event.data.object.id },
    // });

    const stripeItems = await stripe.checkout.sessions.listLineItems(
      checkoutId
    );
    items = stripeItems.data.map((item) => ({
      id: item.price.product,
      quantity: item.quantity,
    }));

    const email = customer.email;

    await db.connect();
    items.map(async (item) => {
      await Product.updateOne(
        { "stripe.productID": item.id },
        { $inc: { countInStock: -item.quantity } }
      );
    });
    console.log("zmieniono wartosci");
    // (await clientPromiseise)
    //   .db(process.env.DB_NAME)
    //   .collection("users")
    //   .updateOne({ email: email }, { $addToSet: { history: checkoutId } });
    await db.disconnect();

    res.status(200).send({ listItems });
    return;
  } catch (error) {
    res.status(400).send({ message: `Webhook error: ${error.message}` });
    return;
  }
}
