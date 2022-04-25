/* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import LoggedUserPage from "../../components/LoggedUserPage";
import UserPage from "../../components/UserPage";
import { useAuth } from "../../context/auth.context";
import { getAllUsers } from "../api/users/index";
import { getSingleUser } from "../api/users/[email]";

const User = ({ user }) => {
  const { userSession } = useAuth();

  return userSession?.email === user.email || userSession?.role === "admin" ? (
    <LoggedUserPage user={user} />
  ) : (
    <UserPage user={user} />
  );
};

export async function getStaticPaths() {
  const users = await getAllUsers();

  const paths = users.map((user) => ({
    params: { slug: user.email },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const user = JSON.stringify(await getSingleUser(slug));

  return {
    props: {
      user: JSON.parse(user),
    },
    revalidate: 1,
  };
}

export default User;
