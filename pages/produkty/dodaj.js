import { Button, Container, Form, Row } from "react-bootstrap";

const AddProduct = () => {
  //     name: "Nazwa2",
  //     category: "Kategoria2",
  //     image: "/images/image.jpg",
  //     price: 403,
  //     brand: "Producent2",
  //     countInStock: 303,
  //     decription: "Krótki opis produktu2",
  //     slug: "nazwa2",

  return (
    <Container>
      <Form as={Row}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nazwa przedmiotu</Form.Label>
          <Form.Control type="text" placeholder="Szprej" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Kategoria</Form.Label>
          <Form.Control type="text" placeholder="Szpreje" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cena</Form.Label>
          <Form.Control type="number" placeholder="400" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Producent</Form.Label>
          <Form.Control type="text" placeholder="Djupą" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ilośc na stanie</Form.Label>
          <Form.Control type="text" placeholder="50000" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Opis</Form.Label>
          <Form.Control type="text" placeholder="Szuper szprej, polecam" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Slug</Form.Label>
          <Form.Control type="text" placeholder="szuper-szprej" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Zdjęcie</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Wyślij
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
