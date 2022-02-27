import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth.context";
import { getAllPosts } from "../api/posts";
import parse from "html-react-parser";

const Blog = ({ posts }) => {
  const { userSession } = useAuth();
  const router = useRouter();

  const deletePost = async (postID) => {
    await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postID,
      }),
    })
      .then((data) => data.json())
      .then((res) => alert(res.json().message))
      .catch(
        (err) => new Error({ message: "Błąd podczas usuwania posta" }, err)
      )
      .finally(() => router.reload());
  };

  const editPost = async (postId) => {
    await fetch("/api/posts", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: postId
    })
  }

  return (
    <>
      {userSession?.role === "admin" ? (
        <button>
          <Link href="blog/dodaj">Dodaj post</Link>
        </button>
      ) : null}
      {posts.map((post) => (
        <div key={post?._id}>
          {parse(post.body)}
          {userSession?.role === "admin" && (
            <>
              <button onClick={() => deletePost(post?._id)}>Usuń</button>
              <button onClick={() => editPost(post?._id)}>Edytuj</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export async function getStaticProps() {
  const res = JSON.stringify(await getAllPosts());
  const posts = JSON.parse(res);

  return {
    props: {
      posts: posts,
    },
    revalidate: 1,
  };
}

export default Blog;
