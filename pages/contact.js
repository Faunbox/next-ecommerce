import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Container,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
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
      console.log(values);
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
    <Container>
      <Container>
        <Text>
          Do You have any questions or want to contact to our customer service?
        </Text>
        <Text b>Send us a mail! We will reply as soon as possible!</Text>
        <Spacer y={1} />
        <Card>
          <Row>
            <Input
              type={"text"}
              placeholder="Your email"
              aria-label="email"
              name="email"
              fullWidth
              onChange={formik.handleChange}
            ></Input>
            <Spacer y={1} />
            <Input
              type={"text"}
              placeholder="Your name"
              aria-label="name"
              name="name"
              fullWidth
              onChange={formik.handleChange}
            ></Input>
          </Row>
          <Spacer y={1} />
          <Input
            as="textarea"
            type={"text"}
            placeholder="Your message"
            aria-label="message"
            name="message"
            onChange={formik.handleChange}
          ></Input>
          <Spacer y={1} />
          <Checkbox
            checked={false}
            size={"xs"}
            onChange={() => setSendEmail(!sendEmail)}
          >
            Do you want to send a email
          </Checkbox>
          {formik.errors !== {} && (
            <>
              <Spacer y={1} />
              <Text h4>
                Problems:
                {Object.entries(formik.errors).map((error) => (
                  <Text key={error[0]}>{error[1]}</Text>
                ))}
              </Text>
            </>
          )}
          <Spacer y={1} />
          <Button onClick={() => formik.handleSubmit()}>Send email</Button>
        </Card>
      </Container>
    </Container>
  );
};

export default Contact;
