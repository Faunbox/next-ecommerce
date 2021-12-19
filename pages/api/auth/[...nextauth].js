import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../db/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "database",
  },
  events: {
    async createUser({ user }) {
      try {
        const mail = user.email;

        (await clientPromise)
          .db("test")
          .collection("users")
          .updateOne({ email: mail }, { $set: { role: "user" } });
        console.log("Dodano role");
      } catch {
        console.log("cos poszlo nie tak");
      }
    },
  },
});
