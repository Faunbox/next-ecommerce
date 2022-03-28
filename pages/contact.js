import { Form } from "react-bootstrap";
import { useState } from "react";
import { StyledTextWrapper, StyledWrapper } from "../styles/styled_home";
import { StyledContactArticle } from "../styles/styled_contact";
import { Button, Checkbox, Container, Text } from "@nextui-org/react";

const Contact = () => {
  const apiEndpoint = "./api/mail/";
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <Container>
      <Container>
        <Text>Do You have any questions or problems?</Text>
        <Text b>Contact Us!</Text>
        <Form className="my-3" onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              Well never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name"
              required
              minLength={2}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Email text</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={4}
              name="text"
              placeholder="Your message"
              required
              minLength={10}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Button css={{ mt: 10, mx: "auto" }} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Checkbox
          size="xs"
          checked={false}
          onClick={() => setSendEmail(!sendEmail)}
        >
          I want to send an contact email
        </Checkbox>
      </Container>
    </Container>
  );
};

export default Contact;
