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
  //   if (req.method === "POST") {
  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      endpointSecret
    );
    console.log("event w srodku try data obj", event.data.object);
    const listItems = stripe.checkout.sessions.listLineItems(
      event.data.object.id,
      function (err, lineItems) {
        if (err)
          return res.status(400).json({
            message: "Błąd podczas pobierania listy przedmiotów",
            err,
          });
        console.log("lista przedmiotów: ", lineItems);
      }
    );
    console.log("listItems", listItems);
    res.status(200).json(event);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).send(`Webhook error: ${error.message}`);
    return;
  }
  //   } else {
  //     res.status(405).end("Method not allowed");
  //   }

  //   console.log("event za blokiem try/catch", { event });
};

export default handler;
