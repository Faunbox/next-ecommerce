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
          pass: process.env.EMAIL_SERVER_PASSWORD2,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user, token }) {
      session.role = user.role;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      try {
        const mail = user.email;

        const role = (await clientPromise)
          .db(process.env.DB_NAME)
          .collection("users")
          .updateOne({ email: mail }, { $set: { role: "user" } });
        const data = await role;
        console.log("Dodano role do uzytkownika", data);
      } catch (error) {
        console.log("cos poszlo nie tak", error);
      }
    },
  },
});
