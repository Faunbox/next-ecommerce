import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const client = new MongoClient(uri, options, () =>
  console.log("połączono")
);
const clientPromise = client.connect();
export default clientPromise;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
