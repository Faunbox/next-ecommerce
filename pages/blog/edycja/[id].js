import { Button } from "react-bootstrap";
import db from "../../../db/db";
import Post from "../../../models/Post";

const BlogPostEdit = ({ post }) => {
  const { _id, header, categorys, body } = JSON.parse(post);
  const id = JSON.stringify(_id);

  return (
    <>
      <div>
        <h2>{header}</h2>
        <Button>Edytuj</Button>
      </div>
      <div>
        <p>{categorys}</p>
        <Button>Edytuj</Button>
      </div>
      <div>
        <p>{body}</p>
        <Button>Edytuj</Button>
      </div>
    </>
  );
};

export default BlogPostEdit;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;

  await db.connect();
  const post = JSON.stringify(await Post.findOne({ _id: id }));
  await db.disconnect();

  return {
    props: {
      post,
    },
  };
}
