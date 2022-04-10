import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
  Modal,
  Spacer,
  Text,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import HistoryItemList from "./HistoryItem";

const LoggedUserPage = ({ user }) => {
  const inputRef = useRef(null);
  const router = useRouter();

  //Modal
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const [showInput, setShowInput] = useState(false);
  const [userName, setUserName] = useState(user.name ? user.name : "");
  const [changedUserName, setChangedUserName] = useState("");
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [showPucharseHistory, setShowPucharseHistory] = useState(false);
  const [image, setImage] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [history, setHistory] = useState([]);

  const cloudinaryUploadLink =
    "https://api.cloudinary.com/v1_1/faunbox/image/upload";

  const checkIsStatusOk = async (status) => {
    if (await status.ok) {
      console.log("Zmiana statusu", await status.json().message);
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
    if (!image)
      return alert("You probably forgot to set new image for avatar!");
    const newImage = await sendImageToCloudinary();
    await fetch("/api/users/change-name", {
      method: "PATCH",
      body: JSON.stringify({
        email: user.email,
        image: newImage,
      }),
    })
      .then((data) => checkIsStatusOk(data.status))
      .catch(
        (err) => new Error({ message: "Błąd podczas zmiany avataru" }, err)
      )
      .finally(setShowInput(false), router.reload());
  };

  const sendUserNameToDatabase = async () => {
    setChangedUserName(userName);
    await fetch("/api/users/change-name", {
      method: "PATCH",
      body: JSON.stringify({
        name: userName,
        email: user.email,
      }),
    })
      .then((data) => checkIsStatusOk(data.status))
      .catch(
        (err) => new Error({ message: "Błąd podczas zmiany nazwy konta" }, err)
      )
      .finally(setShowInput(false), router.reload);
  };

  const getUserPaymentHistory = async () => {
    setHistory(false);
    const paymentHistory = await fetch("/api/users/[email]", {
      method: "POST",
      body: user.email,
    }).then((res) => res.json());
    const res = await paymentHistory;
    console.log({ res });
    res.length === 0 ? setPaymentHistory(false) : setPaymentHistory(res);
    setHistory(true);
    setShowPucharseHistory(false);
  };
  return (
    <Container justify="center">
      <Card bordered="true">
        <Container>
          <Text>User email: {user.email}</Text>
          {!user.name ? (
            <Button auto css={{ my: 10, mx: "auto" }} onClick={() => handler()}>
              Set username
            </Button>
          ) : (
            <>
              <Text>
                {isNameChanged
                  ? `Username: ${changedUserName}`
                  : `Username: ${user.name}`}
              </Text>
              <Container>
                <Button
                  auto
                  onClick={() => {
                    setShowInput((prevState) => !prevState);
                    handler();
                  }}
                  css={{ my: 10, mx: "auto" }}
                >
                  Change username
                </Button>
                {showInput ? (
                  <Modal
                    closeButton
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={() => closeHandler()}
                  >
                    <Modal.Header>
                      <Text b>Set your nickname</Text>
                    </Modal.Header>
                    <Modal.Body>
                      <Input
                        ref={inputRef}
                        type="text"
                        id="username"
                        aria-label="username"
                        aria-labelledby="username"
                        bordered
                        required
                        status="primary"
                        css={{ my: 10 }}
                        placeholder="SuperUser997"
                        onChange={(e) => setUserName(e.target.value)}
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
                        Set nickname
                      </Button>
                    </Modal.Body>
                  </Modal>
                ) : null}
                <Spacer y={1} />
              </Container>
            </>
          )}
        </Container>
        <Container justify="center" css={{ textAlign: "center", my: 10 }}>
          {!user?.image ? (
            <>
              <Text h4>You dont have any avatar image!</Text>
              <Input
                type="file"
                id="file"
                aria-label="file"
                accept=".jpg,.png"
                required
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
            </>
          ) : (
            <Grid.Container justify="space-evenly" alignItems="center">
              <Grid>
                <Image
                  src={user?.image}
                  alt={`Image avatar`}
                  width={100}
                  height={100}
                />
              </Grid>
              <Grid>
                <Input
                  type="file"
                  id="file"
                  aria-label="file"
                  accept=".jpg,.png"
                  required
                  onChange={(e) => {
                    setImage(e.target.files);
                  }}
                  css={{ height: "auto" }}
                ></Input>
              </Grid>
              <Grid>
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
      </Card>
    </Container>
  );
};

export default LoggedUserPage;
