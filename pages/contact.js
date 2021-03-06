import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import FooterSocials from "../components/FooterSocials";
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
      <Grid.Container
        alignItems="center"
        justify="space-around"
        css={{ "@lg": { flexWrap: "wrap" } }}
      >
        <Grid>
          <Text>
            Do You have any questions or want to contact to our customer
            service?
          </Text>
          <Text b>Send us a mail! We will reply as soon as possible!</Text>
        </Grid>
        <Grid md={7} css={{ p: "$7" }}>
          <Col>
            <Spacer y={1} />
            <Row>
              <Input
                type="text"
                clearable
                labelPlaceholder="Your email"
                aria-label="email"
                id="email"
                name="email"
                helperText={formik.errors.email}
                helperColor="error"
                fullWidth
                onChange={formik.handleChange}
              />
              <Spacer y={1} />
              <Input
                type={"text"}
                labelPlaceholder="Your name"
                aria-label="name"
                id="name"
                name="name"
                helperText={formik.errors.name}
                helperColor="error"
                fullWidth
                onChange={formik.handleChange}
              />
            </Row>
            <Spacer y={1} />
            <Spacer y={1} />
            <Input
              as="textarea"
              type="text"
              labelPlaceholder="Your message"
              aria-label="message"
              id="message"
              name="message"
              helperText={formik.errors.message}
              helperColor="error"
              onChange={formik.handleChange}
              fullWidth
            />
            <Spacer y={1} />
            <Checkbox
              checked={false}
              size={"xs"}
              onChange={() => setSendEmail(!sendEmail)}
            >
              Do you want to send a email?
            </Checkbox>
            <Row justify="center">
              <Button
                ghost
                css={{ w: "100%", m: "$4" }}
                onClick={() => formik.handleSubmit()}
              >
                Send email
              </Button>
            </Row>
          </Col>
        </Grid>
        <FooterSocials />
      </Grid.Container>
    </Container>
  );
};

export default Contact;
