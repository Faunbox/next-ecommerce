import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
  Text,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import HistoryItemList from "./HistoryItem";

const LoggedUserPage = ({ user }) => {
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

  const cloudinaryUploadLink =
    "https://api.cloudinary.com/v1_1/faunbox/image/upload";

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

    const res = await fetch(cloudinaryUploadLink, {
      method: "POST",
      body: formData,
    });
    const { secure_url } = await res.json();
    return secure_url;
  };

  const sendNewAvatarImageToDb = async () => {
    const newImage = await sendImageToCloudinary();
    await fetch("/api/users/change-name", {
      method: "PATCH",
      body: JSON.stringify({
        name: userName,
        email: user.email,
        image: newImage,
      }),
    })
      .then((data) => checkIsStatusOk(data))
      .catch(
        (err) => new Error({ message: "Błąd podczas zmiany avataru" }, err)
      )
      .finally(setShowInput(false), setIsNameChanged(true));
  };

  const sendUserNameToDatabase = async () => {
    setChangedUserName(userName);
    await fetch("/api/users/change-name", {
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
      <Container css={{ textAlign: "right" }}>
        <Text h4 onClick={() => signOut()}>
          Logout
        </Text>
      </Container>
      <Container>
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
              id="username"
              aria-label="username"
              aria-labelledby="username"
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
        {!user?.image ? (
          <Text>You dont have any avatar image!</Text>
        ) : (
          <Grid.Container justify="space-around" alignItems="center">
            <Grid xs>
              <Image
                src={user?.image}
                alt={`Image avatar`}
                width={100}
                height={100}
              />
              <Input
                type="file"
                id="file"
                aria-label="file"
                accept=".jpg,.png"
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                css={{ height: "auto" }}
              ></Input>
              <Button
                auto
                css={{ my: 20, mx: "auto" }}
                onClick={() => sendNewAvatarImageToDb()}
              >
                {!user?.image ? "Set avatar" : "Change avatar"}
              </Button>
            </Grid>
          </Grid.Container>
        )}
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

export default LoggedUserPage;
