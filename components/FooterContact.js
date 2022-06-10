import {
  Button,
  Card,
  Input,
  Spacer,
  Text,
  Checkbox,
  Col,
  Row,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const FooterContact = () => {
  const apiEndpoint = "./api/mail/";
  const [sendEmail, setSendEmail] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required to send a message"),
      name: Yup.string()
        .min(3, "Name is to short, it should have at least 3 letters")
        .required("Name is required to send a message"),
      message: Yup.string().min(20, "Message must have at least 20 letters"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async ({ email, name, message }) => {
    //check
    if (!sendEmail) return alert("Checkbox is required!");
    const req = await fetch(apiEndpoint, {
      body: JSON.stringify({
        email,
        name,
        text: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).catch((err) => console.error("błąd", err.message));
    const response = await req.json();
    alert(response.message);
  };

  return (
    <Col>
      <Text h6>Any questions? Contact us!</Text>
      <Spacer y={1} />
      <Row>
        <Input
          type="text"
          id="email"
          fullWidth
          name="email"
          labelPlaceholder="Your email"
          aria-label="email"
          helperText={formik.errors.email ? formik.errors.email : ""}
          helperColor="error"
          onChange={formik.handleChange}
        ></Input>
        <Spacer y={1} />
        <Input
          type="text"
          placeholder="Your name"
          name="name"
          id="name"
          fullWidth
          aria-label="name"
          helperText={formik.errors.name}
          helperColor="error"
          onChange={formik.handleChange}
        ></Input>
      </Row>
      <Spacer y={1} />
      <Input
        type={"text"}
        as="textarea"
        placeholder="Your question"
        fullWidth
        name="message"
        id="message"
        clearable
        aria-label="message"
        helperText={formik.errors.message}
        helperColor="error"
        onChange={formik.handleChange}
      ></Input>
      <Spacer y={1} />
      <Checkbox
        checked={false}
        size={"xs"}
        onChange={() => setSendEmail(!sendEmail)}
      >
        Do you want to send a email?
      </Checkbox>
      <Spacer y={1} />
      <Button
        type="submit"
        ghost
        css={{ w: "100%" }}
        onClick={formik.handleSubmit}
      >
        Send email
      </Button>
    </Col>
  );
};

export default FooterContact;
