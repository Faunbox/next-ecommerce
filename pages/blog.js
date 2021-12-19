import { useAuth } from "../context/auth.context";

const Blog = ({ posts }) => {
  const { userSession } = useAuth();

  return (
    <>
      {userSession.role !== "user" ? (
        <button>
          <a href="blog/dodaj">dodaj post</a>
        </button>
      ) : null}
      {userSession ? (
        posts.map((post) => <div key={post.id + post.name}>{post.email}</div>)
      ) : (
        <div>Zaloguj się żeby zobaczyć posty</div>
      )}
    </>
  );
};

export async function getStaticProps() {
  const url = `${process.env.NEXTAUTH_URL}/api/users`;
  const res = await fetch(url);
  const posts = await res.json();

  return {
    props: {
      posts: posts,
    },
  };
}

export default Blog;
