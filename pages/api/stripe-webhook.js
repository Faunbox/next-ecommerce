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
  let pucharsedItems;
  
  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      endpointSecret
    );
    await stripe.checkout.sessions.listLineItems(
      event.data.object.id,
      function (err, listItems) {
        if (err)
          return res.status(400).json({
            message: "Błąd podczas pobierania listy przedmiotów",
            err,
          });
        pucharsedItems = listItems;
      }
    );
    res.status(200).json({ session: event, items: pucharsedItems });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Webhook error: ${error.message}` });
    return;
  }
};

export default handler;
