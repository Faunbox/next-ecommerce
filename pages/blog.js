import { useSession } from "next-auth/react";

const Blog = ({ posts }) => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <button>
          <a href="blog/dodaj">dodaj post</a>
        </button>
      ) : null}
      {session ? (
        posts.map((post) => <div key={post.id + post.name}>{post.email}</div>)
      ) : (
        <div>Zaloguj się żeby zobaczyć posty</div>
      )}
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1/comments"
  );
  const posts = await res.json();

  return {
    props: {
      posts: posts,
    },
  };
}

export default Blog;
