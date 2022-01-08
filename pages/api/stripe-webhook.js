const stripe = require("stripe")(process.env.STRIPE_SECRET);

const endpointSecret = "tak"

const bodyParser = require("body-parser")

const fulfillOrser = (session, lineItems ) => {}