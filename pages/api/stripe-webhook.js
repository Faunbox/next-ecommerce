import initStripe from "stripe";
import { buffer } from "micro";

export const config = { api: { bodyParser: false } };
const endpointSecret = "whsec_N5DxFNWXNcizQum4nqd1SSKIJhQteOcU";

const handler = async (req, res) => {
  const stripe = initStripe(process.env.STRIPE_SECRET);
  const signature = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      endpointSecret
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  console.log({ event });

  res.send({ received: true });
};

export default handler;
