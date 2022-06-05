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

  ///////// CLI secret \\\\\\\\\\
  // const endpointSecret =
  //   "whsec_6c78325e23d4e8b89744b38bdb66a92056eb5c65dcf108e31582bcb48e0f1108";

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  let event;
  let email;
  let items;
  let checkoutId;

  event = stripe.webhooks.constructEvent(reqBuffer, signature, endpointSecret);
  if (event.type === "checkout.session.completed") {
    try {
      // get customerId and checkoutId from event object
      const customerId = event.data.object.customer;
      checkoutId = event.data.object.id;

      // console.log(customerId, checkoutId);

      //////////////////////////////////////
      //stripe cli
      // const customerId = "cus_L48tK9LGVIdTC1";
      // const checkoutId =
      //   "cs_test_b1pRqP2x4QAewgRSKBi5HVkY11VUaImeg4izUADN5bodaDfkIEwLLUsXk4";
      /////////////////////////////////////

      //get customer object and get email address
      const customer = await stripe.customers.retrieve(customerId);
      email = await customer.email;

      //list all pucharsed items from checkout session and map to get id and quantity
      await stripe.checkout.sessions.listLineItems(
        checkoutId,
        (err, lineItems) => {
          err
            ? new Error("Błąd podczas pobierania listy kupionych przedmiotów")
            : (items = lineItems.data.map((item) => ({
                id: item.price.product,
                price: item.price.unit_amount,
                quantity: item.quantity,
                totalPrice: (item.price.unit_amount * item.quantity) / 100,
              })));
        }
      );

      //update item quantity
      await db.connect();
      for (const item of items) {
        await Product.findOneAndUpdate(
          { "stripe.productID": item.id },
          { $inc: { countInStock: -item.quantity } }
        );
      }
      await db.disconnect();
    } catch (error) {
      return res
        .status(400)
        .send({ message: `Webhook error: ${error.message}` });
    } finally {
      // update user history
      console.log(checkoutId);
      const date = new Date();
      (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .updateOne(
          { email: email },
          {
            $addToSet: { StripeHistory: { checkoutId, date } },
          }
        );
      return await res.status(200).send(items);
    }
  }
}
