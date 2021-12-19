import clientPromise from "../../../db/mongodb";

export default async function changeUserName(req, res) {
  const body = JSON.parse(req.body);
  const { email, name } = body;
  console.log(email, name);
  try {
    (await clientPromise)
      .db("test")
      .collection("users")
      .updateOne({ email: email }, { $set: { name: name } });
  } catch (error) {
    res.status(404).json({ message: "błąd podczas zmiany nicku" });
  } finally {
    res.status(200).json({ message: `Nazwa została zmieniona` });
  }
}
