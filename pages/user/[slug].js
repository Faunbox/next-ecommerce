/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import { useAuth } from "../../context/auth.context";
import { getAllUsers } from "../api/users/index";
import { getSingleUser } from "../api/users/[email]";
import { Button, Container } from "react-bootstrap";
import HistoryItemList from "../../components/HistoryItem";
import Image from "next/image";

const User = ({ user }) => {
  const { userSession } = useAuth();

  const inputRef = useRef(null);

  const [showInput, setShowInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [changedUserName, setChangedUserName] = useState("");
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [showPucharseHistory, setShowPucharseHistory] = useState(false);
  const [image, setImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [history, setHistory] = useState([]);

  const changeUserName = () => {
    setUserName(inputRef.current.value);
  };

  const checkIsStatusOk = async (data) => {
    if (await data.ok) {
      console.log("Zmiana statusu", await data.json().message);
    }
    return new Error("Status is not OK.");
  };

  const sendImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "avatars");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/faunbox/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    await data.json().then((res) => setUserImage(res.secure_url));
  };

  const sendUserNameToDatabase = async () => {
    setChangedUserName(userName);
    await fetch("./api/users/change-name", {
      method: "PATCH",
      body: JSON.stringify({
        name: userName,
        email: userSession.email,
        image: userImage,
      }),
    })
      .then((data) => checkIsStatusOk(data))
      .catch(
        (err) => new Error({ message: "Błąd podczas zmiany nazwy konta" }, err)
      )
      .finally(setShowInput(false), setIsNameChanged(true));
  };

  const getUserPaymentHistory = async () => {
    setHistory(false);

    const paymentHistory = await fetch("/api/users/[email]", {
      method: "POST",
      body: user.email,
    }).then((res) => res.json());
    const res = await paymentHistory;
    res.length === 0 ? setPaymentHistory(false) : setPaymentHistory(res);
    setHistory(true);
  };

  return (
    <>
      <Container>
        {
          <ul>
            <li>{user.email}</li>
            <li>
              {!user.name ? (
                <button onClick={() => setShowInput((prevState) => !prevState)}>
                  Set username
                </button>
              ) : (
                <>
                  <p>{isNameChanged ? changedUserName : user.name}</p>
                  <button
                    onClick={() => {
                      setShowInput((prevState) => !prevState);
                    }}
                  >
                    Change username
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
                  Change username
                </button>
              </>
            ) : null}

            {!user?.image ? (
              <>
                <label>
                  Add avatar image
                  <input
                    type="file"
                    accept=".jpg,.png"
                    onChange={(e) => {
                      setImage(e.target.files);
                    }}
                  ></input>
                </label>
                <Button onClick={() => sendImageToCloudinary()}>Add</Button>
              </>
            ) : (
              <>
                <label>
                  Change avatar image
                  <input
                    type="file"
                    accept=".jpg,.png"
                    onChange={(e) => {
                      setImage(e.target.files);
                    }}
                  ></input>
                </label>
                <Button onClick={() => sendImageToCloudinary()}>Change</Button>
              </>
            )}
            {user?.image ? (
              <Image
                src={user?.image}
                alt={`Image avatar`}
                width={100}
                height={100}
              />
            ) : (
              <li>There is no image!</li>
            )}
          </ul>
        }
      </Container>
      <Container>
        <Button
          onClick={() => {
            setShowPucharseHistory(!showPucharseHistory);
            !showPucharseHistory ? getUserPaymentHistory() : null;
          }}
        >
          Show history of my latest orders
        </Button>
        {showPucharseHistory &&
          (history ? (
            <HistoryItemList items={paymentHistory} />
          ) : (
            <p>At this moment there wasnt any orders! Lets change that!</p>
          ))}
      </Container>
    </>
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
