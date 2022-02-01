import mongoose from "mongoose";

const connection = { isConnected: false };

async function connect() {
  const uri = process.env.DATABASE_URI;
  let db;

  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  console.log("new connection");
  connection.isConnected = mongoose.connections[0].readyState;
  return (db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
}

async function disconnect() {
  if (connection.isConnected) {
    // if (process.env.NODE_ENV === "production") {
    await mongoose.disconnect();
    connection.isConnected = false;
  } else {
    console.log("not disconnected");
  }
}

const db = { connect, disconnect };
export default db;
