import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { StyledTextWrapper, StyledWrapper } from "../styles/styled_home";
import { StyledContactArticle } from "../styles/styled_contact";

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
    <StyledWrapper>
      <main>
        <StyledContactArticle>
          <p>Do You have any questions or problems?</p>
          <p>Contact Us!</p>
        </StyledContactArticle>
        <aside>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                name="email"
                placeholder="Enter email"
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
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Email text</Form.Label>
              <Form.Control
                type="text"
                name="text"
                placeholder="Text"
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="check">
              <Form.Check
                type="checkbox"
                label="I want to send an contact email"
                onClick={() => setSendEmail(!sendEmail)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </aside>
      </main>
    </StyledWrapper>
  );
};

export default Contact;
