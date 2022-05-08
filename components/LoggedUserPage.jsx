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
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [image, setImage] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [history, setHistory] = useState(false);
  const [showProgressButton, setShowProgressButton] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Please insert username")
        .min(3, "Username must have at least 3 letters")
        .max(12, "12 is max number of letters"),
    }),
    onSubmit: async (values) => {
      await fetch("/api/users/change-name", {
        method: "PATCH",
        body: JSON.stringify({
          name: values.username,
          email: user.email,
        }),
      })
        .then((data) => checkIsStatusOk(data.status))
        .catch(
          (err) =>
            new Error({ message: "Błąd podczas zmiany nazwy konta" }, err)
        )
        .finally(() => router.reload());
    },
  });

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

  const getUserPaymentHistory = async () => {
    setHistory(true);
    setShowProgressButton(true);
    const paymentHistory = await fetch("/api/users/[email]", {
      method: "POST",
      body: user.email,
    }).then((res) => res.json());
    const res = await paymentHistory;
    res.length !== 0 ? setPaymentHistory(res) : null;
    setShowProgressButton(false);
  };
  return (
    <Container justify="center">
      <Card bordered="true">
        <Container>
          <Text h4>User email: {user.email}</Text>
          {!user.name ? (
            <Button auto css={{ my: 10, mx: "auto" }} onClick={() => handler()}>
              Set username
            </Button>
          ) : (
            <>
              {user?.name && <Text h4>Username: {user.name}</Text>}
              <Container>
                <Spacer y={1} />
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
                    onClose={() => {
                      setShowInput((prevState) => !prevState);
                      closeHandler();
                    }}
                  >
                    <Modal.Header>
                      <Text b>Set your nickname</Text>
                    </Modal.Header>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault(), formik.handleSubmit();
                      }}
                    >
                      <Modal.Body>
                        <Input
                          ref={inputRef}
                          type="text"
                          id="username"
                          aria-label="username"
                          aria-labelledby="username"
                          name="username"
                          bordered
                          required
                          status="primary"
                          css={{ my: 10 }}
                          placeholder="SuperUser997"
                          onChange={formik.handleChange}
                          style={{ width: "fit-content" }}
                          helperText={formik.errors.username}
                        />
                        <Button type="submit" css={{ my: 10, mx: "auto" }}>
                          Set nickname
                        </Button>
                      </Modal.Body>
                    </form>
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
              <Spacer y={1} />
            </>
          ) : (
            <Grid.Container
              justify="space-evenly"
              alignItems="center"
              css={{ border: "1px solid grey" }}
            >
              <Grid>
                <Image
                  src={user?.image}
                  alt={`Image avatar`}
                  width={200}
                  height={200}
                  objectFit="scale-down"
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
                <Button
                  auto
                  css={{ my: 20, mx: "auto" }}
                  onClick={() => sendNewAvatarImageToDb()}
                >
                  {!user?.image ? "Set avatar" : "Change avatar"}
                </Button>
                <Spacer y={1} />
              </Grid>
            </Grid.Container>
          )}
        </Container>
        <Container justify="center">
          <Spacer y={1} />
          <Button
            onClick={() => {
              !history ? getUserPaymentHistory() : setHistory(false);
            }}
            css={{ mx: "auto" }}
          >
            {showProgressButton ? (
              <Loading color="white" size="sm" />
            ) : (
              "Show history of my latest orders"
            )}
          </Button>
          {history &&
            (paymentHistory.length !== 0 ? (
              <HistoryItemList items={paymentHistory} />
            ) : (
              <Container css={{ textAlign: "center" }}>
                <Spacer y={1} />
                <Text h3>You dont have any pucharsed items</Text>
                <Spacer y={1} />
              </Container>
            ))}
        </Container>
        <Spacer y={1} />
      </Card>
    </Container>
  );
};

export default LoggedUserPage;
