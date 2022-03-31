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

const Contact = () => {
  const apiEndpoint = "./api/mail/";
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    //check
    if (!sendEmail) return alert("Checkbox is required!");

    const req = await fetch(apiEndpoint, {
      body: JSON.stringify({
        email,
        name,
        text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).catch((err) => console.error("błąd", err.message));
    const response = await req.json();
    alert(response.message);
    setText("");
    setEmail("");
    setName("");
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
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Spacer y={1} />
            <Input
              type={"text"}
              placeholder="Your name"
              aria-label="name"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </Row>
          <Spacer y={1} />
          <Input
            as="textarea"
            type={"text"}
            placeholder="Your message"
            aria-label="message"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <Button onClick={() => handleSubmit()}>Send email</Button>
        </Card>
      </Container>
    </Container>
  );
};

export default Contact;
