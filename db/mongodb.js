import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export let client;
let clientPromise;

client = new MongoClient(uri, options, () => console.log("Połączono"));
if (MongoClient.length <= 0) {
  clientPromise = client.connect();
} else {
  console.warn("Uzyj starego połączenia");
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
