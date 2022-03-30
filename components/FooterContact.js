import { Button, Card, Input, Spacer, Text, Checkbox } from "@nextui-org/react";
import { useState } from "react";

const FooterContact = () => {
  const apiEndpoint = "./api/mail/";
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const sendContactEmail = async () => {
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
  };

  return (
    <Card>
      <Text h6>Any questions? Contact us!</Text>
      <Spacer y={1} />
      <Input
        type={"text"}
        placeholder="Your email"
        aria-label="email"
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Spacer y={1} />
      <Input
        type={"text"}
        placeholder="Your name"
        aria-label="name"
        onChange={(e) => setName(e.target.value)}
      ></Input>
      <Spacer y={1} />
      <Input
        type={"text"}
        placeholder="Your question"
        aria-label="message"
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
      <Button onClick={() => sendContactEmail()}>Send email</Button>
    </Card>
  );
};

export default FooterContact;
