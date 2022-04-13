import { Button, Card, Input, Spacer, Text, Checkbox } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const FooterContact = () => {
  const apiEndpoint = "./api/mail/";
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

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
    <Card>
      <Text h6>Any questions? Contact us!</Text>
      <Spacer y={1} />
      <Input
        type="text"
        id="email"
        name="email"
        placeholder="Your email"
        aria-label="email"
        helperText={formik.errors.email}
        helperColor="error"
        onChange={formik.handleChange}
      ></Input>
      <Spacer y={1} />
      <Input
        type={"text"}
        placeholder="Your name"
        name="name"
        id="name"
        aria-label="name"
        helperText={formik.errors.name}
        helperColor="error"
        onChange={formik.handleChange}
      ></Input>
      <Spacer y={1} />
      <Input
        type={"text"}
        placeholder="Your question"
        name="message"
        id="message"
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
        Do you want to send a email
      </Checkbox>
      <Spacer y={1} />
      <Button type="submit" onClick={formik.handleSubmit}>
        Send email
      </Button>
      {/* {Object.keys(formik.errors).length !== 0 && (
        <>
          <Spacer y={1} />
          <Text h4>
            Problems:
            {Object.entries(formik.errors).map((error) => (
              <Text key={error[0]}>{error[1]}</Text>
            ))}
          </Text>
        </>
      )} */}
    </Card>
  );
};

export default FooterContact;
