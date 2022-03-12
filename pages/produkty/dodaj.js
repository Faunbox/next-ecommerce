import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

//getting signature for authorized image upload
export const getCloudinarySignature = async () => {
  const response = await fetch("/api/products/cloud");
  const data = await response.json();
  const { signature, timestamp, api } = data;
  return { signature, timestamp, api };
};

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setProducent] = useState("");
  const [countInStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [imageToUpload, setImageToUpload] = useState("");
  const [dataFetching, setDataFetching] = useState(false);

  const router = useRouter();

  const sendImageToCloudinary = async () => {
    const { signature, timestamp, api } = await getCloudinarySignature();
    const formData = new FormData();
    formData.append("file", imageToUpload[0]);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", api);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/faunbox/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const imageData = await response.json();

    return { url: imageData.secure_url, imageID: imageData.public_id };
  };

  const addProductToShop = async () => {
    setDataFetching(true);
    const { url, imageID } = await sendImageToCloudinary();
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        url,
        imageID,
        price,
        brand,
        countInStock,
        description,
        slug,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .then(() => setDataFetching(false))
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
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Slug</Form.Label>
          <Form.Control
            type="text"
            placeholder="szuper-szprej"
            onChange={(e) => setSlug(e.target.value.toLowerCase)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Zdjęcie</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.png"
            onChange={(e) => {
              setImageToUpload(e.target.files);
            }}
          />
        </Form.Group>
        {/* TODO: zrobic upload screen */}
        {dataFetching && <div>Dodawanie...</div>}
        <Button variant="primary" onClick={() => addProductToShop()}>
          Wyślij
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
