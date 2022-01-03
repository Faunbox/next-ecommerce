import Post from "../../models/Post";

export default async function Posts(req, res) {
  async function getAllPosts() {
    const posts = await Post.find({});
    res.status(200).json(posts);
  }

  async function addPost() {
    db.connect()
    const { header, categorys, body } = req.body;
    const post = new Post({ header, categorys, body });
    post.save();
    console.log(post);
    res.status(200).json({ message: "Post został dodany" });
  }

  async function deletePost() {
    const { id } = req.body;
    const post = await Post.findOneAndDelete({ _id: id });
    console.log(post);
    post
      ? res.status(200).json({ message: "Usunięto post" })
      : res.status(400).json({ message: "Nie znaleziono postu" });
  }

  switch (req.method) {
    case "GET": {
      try {
        console.log("Metoda GET w posts");
        return await getAllPosts();
      } catch (error) {
        return res
          .status(400)
          .json({ message: `Błąd podczas pobierania postów -> `, error });
      }
      break;
    }
    case "POST": {
      try {
        console.log("Metoda POST w posts");
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
        console.log("Metoda DELETE w posts");
        deletePost(req.body.id);
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
