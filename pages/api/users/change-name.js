import clientPromise from "../../../db/mongodb";

export default async function changeUserName(req, res) {
  const body = JSON.parse(req.body);
  const { email, name, image } = body;
  console.log(email, name, image);
  try {
    (await clientPromise)
      .db(process.env.DB_NAME)
      .collection("users")
      .updateOne({ email: email }, { $set: { name: name, image: image } });
  } catch (error) {
    res.status(404).json({ message: "błąd podczas zmiany nicku" });
  } finally {
    res.status(200).json({ message: `Nazwa została zmieniona` });
  }
}
