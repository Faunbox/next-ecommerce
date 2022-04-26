import LoggedUserPage from "../../components/LoggedUserPage";
import UserPage from "../../components/UserPage";
import { useAuth } from "../../context/auth.context";
// import { getAllUsers } from "../api/users/index";
import { getSingleUser } from "../api/users/[email]";

const User = ({ user }) => {
  const { userSession } = useAuth();

  return userSession?.email === user.email || userSession?.role === "admin" ? (
    <LoggedUserPage user={user} />
  ) : (
    <UserPage user={user} />
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const user = JSON.stringify(await getSingleUser(slug));

  return {
    props: {
      user: JSON.parse(user),
    },
  };
}

export default User;
