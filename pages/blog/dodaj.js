import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

const AddPost = () => {
  const [header, setHeader] = useState("");
  const [categorys, setCategorys] = useState("");
  //   const [image, setImage] = useState("");
  const [body, setBody] = useState("");

  const addPostHandler = async () => {
    let response;
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        header: header,
        categorys: categorys,
        body: body,
      }),
    })
      .then((data) => (response = data.message))
      .catch(
        (err) => new Error({ message: "Błąd podczas dodawania posta" }, err)
      )
      .finally(alert(response));
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nagłówek</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nagłówek nowego postu"
            onChange={(e) => setHeader(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Kategorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="IT, Programowanie"
            multiple
            onChange={(e) => setCategorys(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Zdjęcie</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Post</Form.Label>
          <Form.Control
            type="text"
            placeholder="Szuper szprej, polecam"
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>

        <Button variant="primary" onClick={() => addPostHandler()}>
          Wyślij
        </Button>
      </Form>
    </Container>
  );
};

export default AddPost;
