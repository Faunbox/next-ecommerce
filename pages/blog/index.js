import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth.context";
import { getAllPosts } from "../api/posts";

const Blog = ({ posts }) => {
  const { userSession } = useAuth();
  const router = useRouter();
  console.log(posts);

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
      .then((res) => alert(res.json().message))
      .catch(
        (err) => new Error({ message: "Błąd podczas usuwania posta" }, err)
      )
      .finally(() => router.reload());
  };

  // const editPost = async (post) => {
  //   await fetch("/api/posts", {
  //     method: "PATCH",
  //     body: {
  //       post,
  //     },
  //   });
  // };

  return (
    <>
      {userSession?.role === "admin" ? (
        <button>
          <Link href="blog/dodaj">dodaj post</Link>
        </button>
      ) : null}
      {posts.map((post) => (
        <div key={post?._id}>
          <div>{`${post?.header}, ${post?.body}`}</div>
          {userSession?.role === "admin" && (
            <>
              <button onClick={() => deletePost(post?._id)}>Usuń</button>
              <button onClick={() => deletePost(post)}>Edytuj</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export async function getServerSideProps() {
  const res = JSON.stringify(await getAllPosts());
  const posts = JSON.parse(res);
  console.log(posts);

  return {
    props: {
      posts: posts,
    },
  };
}

export default Blog;
