import Stripe from "stripe";
import { buffer } from "micro";

export const config = { api: { bodyParser: false } };

const handler = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27",
  });
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  let event;
  if (req.method === "POST") {
    console.log("signature", signature);
    console.log("endpoint", endpointSecret);
    console.log("req", req);
    try {
      event = stripe.webhooks.constructEvent(
        reqBuffer,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(`Webhook error: ${error.message}`);
      return;
    }
  } else {
    res.status(405).end("Method not allowed");
  }

  console.log({ event });

  res.json({ received: true });
};

export default handler;
