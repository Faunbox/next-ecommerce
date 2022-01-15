import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let clientPromise;

client = new MongoClient(uri, options, () => console.log("Połączono"));
console.log("MongoClient", MongoClient.length);
clientPromise = client.connect();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
