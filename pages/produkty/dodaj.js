import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setProducent] = useState("");
  const [countInStock, setInStock] = useState("");
  const [decription, setDecription] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();
  // const [img, setImg] = useState("");

  const addProductToShop = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        price,
        brand,
        countInStock,
        decription,
        slug,
      }),
    })
      .then((res) => alert(res.json().message))
      .catch((err) => new Error("Błąd podczas dodawania produktu", err))
      .finally(() => router.push("/"));
  };

  return (
    <Container>
      <Form as={Row}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nazwa przedmiotu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Szprej"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Kategoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Szpreje"
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="number"
            placeholder="400"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Producent</Form.Label>
          <Form.Control
            type="text"
            placeholder="Djupą"
            onChange={(e) => setProducent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ilośc na stanie</Form.Label>
          <Form.Control
            type="text"
            placeholder="50000"
            onChange={(e) => setInStock(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type="text"
            placeholder="Szuper szprej, polecam"
            onChange={(e) => setDecription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Slug</Form.Label>
          <Form.Control
            type="text"
            placeholder="szuper-szprej"
            onChange={(e) => setSlug(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Zdjęcie</Form.Label>
          <Form.Control type="file" onChange={(e) => setImg(e.target.value)} />
        </Form.Group> */}
        <Button variant="primary" onClick={() => addProductToShop()}>
          Wyślij
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
