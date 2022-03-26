/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import { useAuth } from "../../context/auth.context";
import { getAllUsers } from "../api/users/index";
import { getSingleUser } from "../api/users/[email]";
import { Button, Container, Spinner } from "react-bootstrap";
import HistoryItemList from "../../components/HistoryItem";
import Image from "next/image";
import { StyledButton, StyledWrapper } from "../../styles/styled_home";
import {
  StyledAvatarWrapper,
  StyledUserUl,
} from "../../styles/styled_user-page";

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
      <StyledWrapper>
        {
          <StyledUserUl>
            <li>User email: {user.email}</li>
            <li>
              {!user.name ? (
                <Button onClick={() => setShowInput((prevState) => !prevState)}>
                  Set username
                </Button>
              ) : (
                <>
                  <p>
                    {isNameChanged ? changedUserName : `Username: ${user.name}`}
                  </p>
                  <Button
                    onClick={() => {
                      setShowInput((prevState) => !prevState);
                    }}
                  >
                    Change username
                  </Button>
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
                <Button
                  type="submit"
                  onClick={() => {
                    sendUserNameToDatabase();
                    setChangedUserName(userName);
                  }}
                >
                  Change username
                </Button>
              </>
            ) : null}
            <StyledAvatarWrapper>
              {user?.image ? (
                <Image
                  src={user?.image}
                  alt={`Image avatar`}
                  width={100}
                  height={100}
                />
              ) : (
                <li>You dont have any avatar image!</li>
              )}
              <label>
                {!user?.image ? "Add avatar image" : "Change avatar Image"}
                <input
                  type="file"
                  accept=".jpg,.png"
                  onChange={(e) => {
                    setImage(e.target.files);
                  }}
                ></input>
              </label>
              <StyledButton onClick={() => sendImageToCloudinary()}>
                {!user?.image ? "Set avatar" : "Change avatar"}
              </StyledButton>
            </StyledAvatarWrapper>
          </StyledUserUl>
        }
      </StyledWrapper>
      <StyledWrapper>
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
            <>
              <Spinner animation="border" variant="primary" />
              {/* <p>At this moment there wasnt any orders! Lets change that!</p> */}
            </>
          ))}
      </StyledWrapper>
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
