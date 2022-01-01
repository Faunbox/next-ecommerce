import db from "../../../db/db";
import Post from "../../../models/Post";

export default async function AddPost(req, res) {
  const { header, categorys, body } = req.body;
  console.log(req.method);
  await db.connect();
  const post = new Post({ header, categorys, body });
  post.save();
  db.disconnect();
  console.log(post);
  res.status(200).json({ message: post });
}
