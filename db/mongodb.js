import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

  client = new MongoClient(uri, options, () => console.log("Połączono"));
  clientPromise = client.connect();


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
