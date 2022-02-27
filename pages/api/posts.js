import db from "../../db/db";
import Post from "../../models/Post";

export const getAllPosts = async () => {
  await db.connect();
  const posts = await Post.find({});
  await db.disconnect();
  return posts;
};

export default async function Posts(req, res) {
  async function addPost() {
    await db.connect();
    const { header, categorys, body } = req.body;
    const post = new Post({ header, categorys, body });
    await post.save();
    await db.disconnect();
    res.status(200).json({ message: "Post został dodany" });
  }

  async function deletePost() {
    const { id } = req.body;
    await db.connect();
    const post = await Post.findOneAndDelete({ _id: id });
    await db.disconnect();
    post
      ? res.status(200).json({ message: "Usunięto post" })
      : res.status(400).json({ message: "Nie znaleziono postu" });
  }

  switch (req.method) {
    case "GET": {
      let posts;
      try {
        posts = await getAllPosts();
        res.status(200).json(posts);
      } catch (error) {
        return res
          .status(400)
          .json({ message: `Błąd podczas pobierania postów -> `, error });
      }
      break;
    }
    case "POST": {
      try {
        addPost(req.body);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Błąd podczas dodawania postu -> ", error });
      }
      break;
    }
    case "DELETE": {
      try {
        deletePost(req.body.id);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Błąd podczas usuwania postu -> ", error });
      }
      break;
    }
    case "PATCH": {
      try {
        console.log("uzupelnij pole");

      } catch(error) {
        return res.status(400).json({message: "Błąd podczas edycji postu -> ", error})
      }
      break
    }
  }
}
