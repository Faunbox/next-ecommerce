import clientPromise from "../../../db/mongodb";

export default async function changeUserName(req, res) {
  const body = JSON.parse(req.body);
  const { email, name, image } = body;

  const changeName = async () => {
    try {
      (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .updateOne({ email: email }, { $set: { name: name } });
    } catch (error) {
      res.status(404).json({ message: "Błąd podczas zmiany nicku" });
    } finally {
      res.status(200).json({ message: `Nazwa została zmieniona` });
    }
  };

  const changeAvatar = async () => {
    try {
      (await clientPromise)
        .db(process.env.DB_NAME)
        .collection("users")
        .updateOne({ email: email }, { $set: { image: image } });
    } catch (error) {
      res.status(404).json({ message: "Błąd podczas zmiany avataru" });
    } finally {
      res.status(200).json({ message: `Avatar został zmieniony` });
    }
  };

  try {
    name ? await changeName() : await changeAvatar();
  } catch (err) {}
}
