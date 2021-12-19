/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import { useAuth } from "../../context/auth.context";
import { Container } from "react-bootstrap";

const User = ({ user, users }) => {
  const { userSession } = useAuth();

  const inputRef = useRef(null);

  const [showInput, setShowInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [changedUserName, setChangedUserName] = useState("");
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");

  const changeUserName = () => {
    setUserName(inputRef.current.value);
  };

  const checkIsStatusOk = async (data) => {
    if (await data.ok) {
      setResponseStatus(await data.json().message);
      console.log("Zmiana statusu", responseStatus);
    }
    return new Error("Status is not OK.");
  };

  const sendUserNameToDatabase = async () => {
    setChangedUserName(userName);
    await fetch("/api/users/change-name", {
      method: "POST",
      body: JSON.stringify({ name: userName, email: userSession.email }),
    })
      .then((data) => checkIsStatusOk(data))
      .catch(
        (err) => new Error({ message: "Błąd podczas zmiany nazwy konta" }, err)
      )
      .finally(setShowInput(false), setIsNameChanged(true));
  };

  return (
    <>
      <Container>
        {
          <ul>
            <li>
              {userSession.email === user.email ||
              userSession.role === "admin" ? (
                <p>tak</p>
              ) : (
                <p>nie</p>
              )}
            </li>
            <li>{user.email}</li>
            <li>
              {!user.name ? (
                <button onClick={() => setShowInput((prevState) => !prevState)}>
                  Ustaw nazwe konta
                </button>
              ) : (
                <>
                  <p>{responseStatus}</p>
                  <p>{isNameChanged ? changedUserName : user.name}</p>
                  <button
                    onClick={() => {
                      setShowInput((prevState) => !prevState);
                    }}
                  >
                    Zmień nazwe konta
                  </button>
                </>
              )}
            </li>
            {showInput ? (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  onChange={() => changeUserName()}
                />
                <button
                  type="submit"
                  onClick={() => {
                    sendUserNameToDatabase();
                    setChangedUserName(userName);
                  }}
                >
                  Zmien nazwe
                </button>
              </>
            ) : null}
            <li>{user.id}</li>
            <li>{user.role}</li>
            {user?.image ? <li>jest obrazek</li> : <li>brak obrazka</li>}
          </ul>
        }
      </Container>
      <Container>
        {userSession.role !== "user" ? (
          users.map((user) => <p key={user.email}>{user.email}</p>)
        ) : (
          <p>Brak uzytkownikow</p>
        )}
      </Container>
    </>
  );
};

export async function getStaticPaths() {
  const url = `${process.env.NEXTAUTH_URL}/api/users`;
  const res = await fetch(url);
  const users = await res.json();

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

  const url = `http://localhost:3000/api/users/${slug}`;
  const res = await fetch(url);
  const user = await res.json();

  const usersUrl = "http://localhost:3000/api/users";
  const usersRes = await fetch(usersUrl);
  const users = await usersRes.json();

  return {
    props: {
      user: user,
      users: users,
    },
  };
}

export default User;
