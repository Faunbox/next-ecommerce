import Link from "next/link";
import { useAuth } from "../../context/auth.context";

const Blog = ({ posts }) => {
  const { userSession } = useAuth();

  return (
    <>
      {userSession?.role === "admin" ? (
        <button>
          <Link href="blog/dodaj">dodaj post</Link>
        </button>
      ) : null}
      {userSession ? (
        posts.map((post) => (
          <div key={post?._id}>{`${post?.header}, ${post?.body}`}</div>
        ))
      ) : (
        <div>Zaloguj się żeby zobaczyć posty</div>
      )}
    </>
  );
};

export async function getStaticProps() {
  const url = `${process.env.NEXTAUTH_URL}/api/posts`;
  const res = await fetch(url, { method: "GET" });
  const posts = await res.json();

  return {
    props: {
      posts: posts,
    },
  };
}

export default Blog;
