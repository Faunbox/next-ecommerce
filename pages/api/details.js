const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  const id = req.body;

  let sessionDetails;
  let items;

  try {
    const sessionId = JSON.parse(id);
    const cokolwiek = await stripe.checkout.sessions.retrieve(sessionId);

    sessionDetails = await cokolwiek;

    await stripe.checkout.sessions.listLineItems(
      sessionId,
      function (err, listItems) {
        if (err)
          return new Error("Błąd podczas pobierania listy przedmiotów", err);
        items = listItems.data;
        res.status(200).json({ sessionDetails, items });
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({ message: "Błąd podczas pobierania danych o sesji", err });
  }
}
