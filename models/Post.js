import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    header: { type: String, required: true },
    categorys: { type: String, required: true },
    body: { type: String, required: true, minlength: 10 },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
