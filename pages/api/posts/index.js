import db from "../../../db/db";
import Post from "../../../models/Post";

export default async function Posts(req, res) {
  async function getAllPosts() {
    await db.connect();
    const posts = await Post.find({});
    await db.disconnect();
    res.status(200).json(posts);
  }

  async function addPost() {
    const { header, categorys, body } = req.body;
    await db.connect();
    const post = new Post({ header, categorys, body });
    post.save();
    db.disconnect();
    console.log(post);
    res.status(200).json({ message: post });
  }

  async function deletePost() {
    const { id } = req.body;
    await db.connect();
    const post = await Post.findOneAndDelete({ _id: id });
    db.disconnect();
    post
      ? res.status(200).json({ message: "Usunięto post" })
      : res.status(400).json({ message: "Nie znaleziono postu" });
  }

  switch (req.method) {
    case "GET": {
      try {
        return await getAllPosts();
      } catch (error) {
        return res
          .status(400)
          .json({ message: `Błąd podczas pobierania postów -> `, error });
      }
      break
    }
    case "POST": {
      try {
        console.log("Metoda POST");
        addPost(req.body);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Błąd podczas dodawania postu -> ", error });
      }
      break
    }
    case "DELETE": {
      try {
        console.log("Metoda DELETE");

        deletePost(req.body.id);
        return res.status(200).json({ message: "Prawidłowo usunięto post" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Błąd podczas usuwania postu -> ", error });
      }
      break;
    }
    // case "PATCH": {
    //   return editPost(req.body);
    // }
  }
}
