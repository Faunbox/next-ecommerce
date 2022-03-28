/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import { useAuth } from "../../context/auth.context";
import { getAllUsers } from "../api/users/index";
import { getSingleUser } from "../api/users/[email]";
import HistoryItemList from "../../components/HistoryItem";
import Image from "next/image";
import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
  Progress,
  Text,
} from "@nextui-org/react";

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
    setShowPucharseHistory(false);
  };

  return (
    <Container justify="center">
      <Container justify="center">
        <Text>User email: {user.email}</Text>
        {!user.name ? (
          <Button
            auto
            css={{ my: 10, mx: "auto" }}
            onClick={() => setShowInput((prevState) => !prevState)}
          >
            Set username
          </Button>
        ) : (
          <>
            <Text>
              {isNameChanged ? changedUserName : `Username: ${user.name}`}
            </Text>
            <Button
              auto
              onClick={() => {
                setShowInput((prevState) => !prevState);
              }}
              css={{ my: 10, mx: "auto" }}
            >
              Change username
            </Button>
          </>
        )}
        {showInput ? (
          <Card css={{ xy: 10, width: "fit-content" }}>
            <Input
              ref={inputRef}
              type="text"
              bordered
              status="primary"
              css={{ my: 10 }}
              placeholder="New username"
              onChange={() => changeUserName()}
              style={{ width: "fit-content" }}
            />
            <Button
              type="submit"
              css={{ my: 10, mx: "auto" }}
              onClick={() => {
                sendUserNameToDatabase();
                setChangedUserName(userName);
              }}
            >
              Set username
            </Button>
          </Card>
        ) : null}
      </Container>
      <Container justify="center" css={{ textAlign: "center", my: 10 }}>
        {user?.image ? (
          <Image
            src={user?.image}
            alt={`Image avatar`}
            width={100}
            height={100}
          />
        ) : (
          <Text>You dont have any avatar image!</Text>
        )}
        <Input
          type="file"
          label={!user?.image ? "Add avatar image" : "Change avatar Image"}
          accept=".jpg,.png"
          onChange={(e) => {
            setImage(e.target.files);
          }}
          css={{ height: "auto" }}
        ></Input>
        <Button
          auto
          css={{ my: 20, mx: "auto" }}
          onClick={() => sendImageToCloudinary()}
        >
          {!user?.image ? "Set avatar" : "Change avatar"}
        </Button>
      </Container>
      <Container justify="center">
        <Button
          onClick={() => {
            setShowPucharseHistory(!showPucharseHistory);
            !showPucharseHistory ? getUserPaymentHistory() : null;
          }}
          css={{ mx: "auto" }}
        >
          {showPucharseHistory ? (
            <Loading color="white" size="sm" />
          ) : (
            "Show history of my latest orders"
          )}
        </Button>
        {!showPucharseHistory &&
          (history ? <HistoryItemList items={paymentHistory} /> : null)}
      </Container>
    </Container>
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
