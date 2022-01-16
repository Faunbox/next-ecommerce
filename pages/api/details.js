const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  const id = req.body.id;

  let sessionDetails;
  let items;

  try {
    sessionDetails = await stripe.checkout.session.retrieve(id);
    console.log("session details", sessionDetails);

    const pucharsedItems = await stripe.checkout.sessions.listLineItems(
      id,
      function (err, listItems) {
        if (err)
          return new Error("Błąd podczas pobierania listy przedmiotów", err);

        console.log("listItems w funkcji pucharsed items", listItems);
      }
    );
    items = pucharsedItems;
    console.log("items", items);
    res.status(200).json(sessionDetails, items);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Błąd podczas pobierania danych o sesji", err });
  }
}
